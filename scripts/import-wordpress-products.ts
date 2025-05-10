import { PrismaClient, Prisma } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

interface WPProductAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

interface WPProductVariation {
  id: number;
  attributes: {
    name: string;
    option: string;
  }[];
  price: string;
  regular_price: string;
  sale_price: string;
}

interface WPProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_modified: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_quantity: number | null;
  stock_status: string;
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
  images: {
    id: number;
    src: string;
    name: string;
    alt: string;
  }[];
  attributes: WPProductAttribute[];
  variations: number[];
  meta_data: {
    key: string;
    value: string;
  }[];
}

// Função para delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Função para fazer requisições à API do WooCommerce com retry
async function wooCommerceRequest(endpoint: string, params: Record<string, any> = {}, retries = 3) {
  // Gerar o timestamp OAuth
  const timestamp = Math.floor(Date.now() / 1000);
  
  // Construir a URL base
  const url = new URL(`${process.env.WP_URL}/wp-json/wc/v3/${endpoint}`);
  
  // Adicionar parâmetros à URL
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value.toString());
  });

  // Adicionar parâmetros de autenticação OAuth
  url.searchParams.append('consumer_key', process.env.WC_CONSUMER_KEY!);
  url.searchParams.append('consumer_secret', process.env.WC_CONSUMER_SECRET!);
  url.searchParams.append('oauth_timestamp', timestamp.toString());

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url.toString());

      if (!response.ok) {
        if (response.status === 503 && attempt < retries) {
          console.log(`⚠️ Servidor indisponível (503), tentativa ${attempt} de ${retries}. Aguardando 5 segundos...`);
          await delay(5000);
          continue;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (attempt === retries) throw error;
      console.log(`⚠️ Erro na tentativa ${attempt}, tentando novamente em 5 segundos...`);
      await delay(5000);
    }
  }
}

async function getProductVariations(productId: number): Promise<WPProductVariation[]> {
  try {
    return await wooCommerceRequest(`products/${productId}/variations`) as WPProductVariation[];
  } catch (error) {
    console.error(`❌ Erro ao buscar variações do produto ${productId}:`, error);
    return [];
  }
}

async function importCategories(categories: WPProduct['categories']) {
  const importedCategories = [];
  for (const category of categories) {
    try {
      // Primeiro tenta encontrar por wpCategoryId
      let existingCategory = await prisma.category.findFirst({
        where: { wpCategoryId: category.id }
      });

      // Se não encontrar por wpCategoryId, tenta encontrar por slug
      if (!existingCategory) {
        existingCategory = await prisma.category.findFirst({
          where: { slug: category.slug }
        });
      }

      if (existingCategory) {
        // Se encontrou a categoria, atualiza o wpCategoryId se necessário
        if (!existingCategory.wpCategoryId) {
          await prisma.category.update({
            where: { id: existingCategory.id },
            data: { wpCategoryId: category.id }
          });
        }
        importedCategories.push(existingCategory);
      } else {
        // Buscar detalhes adicionais da categoria via API
        const categoryDetails = await wooCommerceRequest(`products/categories/${category.id}`);
        
        // Gerar um slug único se necessário
        let uniqueSlug = category.slug;
        let counter = 1;
        while (true) {
          const slugExists = await prisma.category.findFirst({
            where: { slug: uniqueSlug }
          });
          if (!slugExists) break;
          uniqueSlug = `${category.slug}-${counter}`;
          counter++;
        }
        
        const newCategory = await prisma.category.create({
          data: {
            name: category.name,
            slug: uniqueSlug,
            description: categoryDetails.description || "",
            icon: "", // Campo obrigatório, mas não existe no WooCommerce
            image: "", // Campo obrigatório, mas vamos preencher com wpImage
            wpCategoryId: category.id,
            wpParentId: categoryDetails.parent || null,
            wpDescription: categoryDetails.description || null,
            wpImage: categoryDetails.image?.src || null,
            wpDisplayType: categoryDetails.display || null,
            wpMetadata: categoryDetails.meta_data || null
          }
        });
        importedCategories.push(newCategory);
      }
    } catch (error) {
      console.error(`❌ Erro ao processar categoria ${category.id}:`, error);
      // Continue com a próxima categoria mesmo se houver erro
      continue;
    }
  }
  return importedCategories;
}

async function importTags(tags: WPProduct['tags']) {
  const importedTags = [];
  for (const tag of tags) {
    const existingTag = await prisma.tag.findFirst({
      where: { wpTagId: tag.id }
    });

    if (existingTag) {
      importedTags.push(existingTag);
    } else {
      // Buscar detalhes adicionais da tag via API
      const tagDetails = await wooCommerceRequest(`products/tags/${tag.id}`);
      
      const newTag = await prisma.tag.create({
        data: {
          name: tag.name,
          wpTagId: tag.id,
          wpSlug: tag.slug,
          wpDescription: tagDetails.description || null,
          wpMetadata: tagDetails.meta_data || null
        }
      });
      importedTags.push(newTag);
    }
  }
  return importedTags;
}

async function getDefaultAdmin() {
  const admin = await prisma.admin.findFirst({
    where: { role: "ADMIN" }
  });

  if (!admin) {
    throw new Error("❌ Nenhum admin encontrado no banco de dados!");
  }

  return admin;
}

// Set para armazenar IDs que falharam
const failedProductIds = new Set<number>();

async function importProducts(specificIds?: number[]) {
  console.log("🔄 Iniciando importação de produtos...");
  let page = 1;
  const perPage = 100;
  let totalImported = 0;
  let defaultAdmin = null;

  try {
    while (true) {
      // Se temos IDs específicos, não precisamos paginar
      if (specificIds && page > 1) break;

      console.log(`📃 ${specificIds ? 'Buscando produtos específicos' : `Buscando página ${page} de produtos`}...`);
      
      let products: WPProduct[];
      if (specificIds) {
        // Buscar produtos específicos
        products = await Promise.all(
          specificIds.map(id => wooCommerceRequest(`products/${id}`))
        );
      } else {
        // Buscar página normal
        products = await wooCommerceRequest("products", {
          per_page: perPage,
          page: page,
        }) as WPProduct[];
      }

      if (!products.length) {
        break;
      }

      for (const product of products) {
        try {
          // Buscar o lojista pelo ID do vendor nos metadados
          const vendorId = product.meta_data.find(m => m.key === "_wcfm_product_author")?.value;
          let lojista = null;
          
          if (vendorId) {
            lojista = await prisma.lojista.findFirst({
              where: { wpVendorId: parseInt(vendorId) }
            });
          }

          // Se não encontrar lojista, usar o admin padrão
          if (!lojista) {
            if (!defaultAdmin) {
              defaultAdmin = await getDefaultAdmin();
            }
            console.log(`⚠️ Produto ${product.id} sem lojista, atribuindo ao admin...`);
          }

          // Importar categorias e tags
          const categories = await importCategories(product.categories);
          const tags = await importTags(product.tags);

          // Buscar variações se o produto for variável
          const variations = product.type === 'variable' 
            ? await getProductVariations(product.id)
            : [];

          // Verificar se o produto já existe
          const existingProduct = await prisma.product.findUnique({
            where: { wpProductId: product.id }
          });

          const productData = {
            name: product.name,
            description: product.description,
            shortDescription: product.short_description,
            price: parseFloat(product.regular_price || product.price || "0"),
            discountPrice: product.sale_price ? parseFloat(product.sale_price) : null,
            pixPrice: null,
            productPhoto: product.images[0]?.src || "",
            productGallery: product.images.slice(1).map(img => img.src),
            sku: product.sku || `WP-${product.id}`,
            inStock: product.stock_status === "instock",
            stockQuantity: product.stock_quantity,
            fileLink: product.meta_data.find(m => m.key === "_digital_file_url")?.value || null,
            wpProductId: product.id,
            wpStatus: product.status,
            wpType: product.type,
            wpVisibility: product.catalog_visibility,
            wpAttributes: product.attributes as any,
            wpMetadata: product.meta_data as any,
            wpVariations: variations as any,
            wpDateCreated: new Date(product.date_created),
            wpDateModified: new Date(product.date_modified),
            lojistaId: lojista ? lojista.id : defaultAdmin!.id,
            categories: {
              connect: categories.map(cat => ({ id: cat.id }))
            },
            tags: {
              connect: tags.map(tag => ({ id: tag.id }))
            }
          };

          if (existingProduct) {
            // Primeiro desconectar todas as categorias e tags existentes
            await prisma.product.update({
              where: { id: existingProduct.id },
              data: {
                categories: { set: [] },
                tags: { set: [] }
              }
            });

            // Depois atualizar com os novos dados
            await prisma.product.update({
              where: { id: existingProduct.id },
              data: productData
            });
            console.log(`📝 Produto atualizado: ${product.name}`);
          } else {
            await prisma.product.create({
              data: productData
            });
            console.log(`✨ Novo produto criado: ${product.name}`);
          }

          totalImported++;
          
          // Se estamos reprocessando, remover da lista de falhas
          if (specificIds) {
            failedProductIds.delete(product.id);
          }
        } catch (error) {
          console.error(`❌ Erro ao processar produto ${product.id}:`, error);
          // Adicionar à lista de falhas
          failedProductIds.add(product.id);
        }
      }

      if (!specificIds) {
        // Aguarda 1 segundo entre as páginas para não sobrecarregar o servidor
        await delay(1000);
        page++;
      }
    }

    console.log(`✅ Importação concluída! Total de produtos processados: ${totalImported}`);
    
    if (failedProductIds.size > 0) {
      console.log(`\n⚠️ ${failedProductIds.size} produtos falharam durante a importação:`);
      console.log(Array.from(failedProductIds));
    }
  } catch (error) {
    console.error("❌ Erro durante a importação:", error);
  }
}

async function retryFailedProducts() {
  if (failedProductIds.size === 0) {
    console.log("✅ Não há produtos para reprocessar!");
    return;
  }

  console.log(`🔄 Reprocessando ${failedProductIds.size} produtos que falharam...`);
  await importProducts(Array.from(failedProductIds));
}

async function main() {
  try {
    if (process.argv.includes("--retry-failed")) {
      await retryFailedProducts();
    } else {
      console.log("🚀 Iniciando importação de produtos do WordPress...");
      await importProducts();
    }
    console.log("✅ Processo concluído com sucesso!");
  } catch (error) {
    console.error("❌ Erro durante o processo:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
