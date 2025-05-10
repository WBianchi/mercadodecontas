import { PrismaClient } from '@prisma/client';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const prisma = new PrismaClient();

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WP_URL!,
  consumerKey: process.env.WC_CONSUMER_KEY!,
  consumerSecret: process.env.WC_CONSUMER_SECRET!,
  version: 'wc/v3'
});

async function importProducts() {
  try {
    console.log('🚀 Iniciando importação dos produtos do WooCommerce...');

    const { data: products } = await WooCommerce.get('products', {
      per_page: 100, // Importar 100 produtos por vez
      status: 'publish', // Apenas produtos publicados
    });

    // Assumindo que temos pelo menos um lojista no sistema
    const lojista = await prisma.lojista.findFirst();
    if (!lojista) {
      throw new Error('Nenhum lojista encontrado no sistema');
    }

    for (const wcProduct of products) {
      console.log(`\n📦 Processando produto: ${wcProduct.name}`);

      try {
        // Criar ou atualizar o produto
        const product = await prisma.product.upsert({
          where: {
            wpProductId: wcProduct.id,
          },
          update: {
            name: wcProduct.name,
            description: wcProduct.description || '',
            shortDescription: wcProduct.short_description || '',
            price: parseFloat(wcProduct.price || '0'),
            discountPrice: wcProduct.sale_price ? parseFloat(wcProduct.sale_price) : null,
            pixPrice: wcProduct.sale_price ? parseFloat(wcProduct.sale_price) : parseFloat(wcProduct.price || '0'),
            productPhoto: wcProduct.images[0]?.src || '',
            productGallery: wcProduct.images.map(img => img.src),
            sku: wcProduct.sku || String(wcProduct.id),
            inStock: wcProduct.in_stock,
            stockQuantity: wcProduct.stock_quantity || null,
            wpAttributes: wcProduct.attributes,
            wpDateCreated: new Date(wcProduct.date_created),
            wpDateModified: new Date(wcProduct.date_modified),
            wpMetadata: wcProduct.meta_data,
            wpProductId: wcProduct.id,
            wpStatus: wcProduct.status,
            wpType: wcProduct.type,
            wpVariations: wcProduct.variations,
            wpVisibility: wcProduct.catalog_visibility,
            lojistaId: lojista.id,
          },
          create: {
            name: wcProduct.name,
            description: wcProduct.description || '',
            shortDescription: wcProduct.short_description || '',
            price: parseFloat(wcProduct.price || '0'),
            discountPrice: wcProduct.sale_price ? parseFloat(wcProduct.sale_price) : null,
            pixPrice: wcProduct.sale_price ? parseFloat(wcProduct.sale_price) : parseFloat(wcProduct.price || '0'),
            productPhoto: wcProduct.images[0]?.src || '',
            productGallery: wcProduct.images.map(img => img.src),
            sku: wcProduct.sku || String(wcProduct.id),
            inStock: wcProduct.in_stock,
            stockQuantity: wcProduct.stock_quantity || null,
            wpAttributes: wcProduct.attributes,
            wpDateCreated: new Date(wcProduct.date_created),
            wpDateModified: new Date(wcProduct.date_modified),
            wpMetadata: wcProduct.meta_data,
            wpProductId: wcProduct.id,
            wpStatus: wcProduct.status,
            wpType: wcProduct.type,
            wpVariations: wcProduct.variations,
            wpVisibility: wcProduct.catalog_visibility,
            lojistaId: lojista.id,
          },
        });

        // Processar categorias
        if (wcProduct.categories?.length > 0) {
          for (const cat of wcProduct.categories) {
            const category = await prisma.category.upsert({
              where: { wpCategoryId: cat.id },
              update: {
                name: cat.name,
                slug: cat.slug,
                description: cat.description || '',
                icon: '', // Você pode definir um ícone padrão
                image: cat.image?.src || '',
                wpDescription: cat.description,
                wpDisplayType: '',
                wpImage: cat.image?.src || '',
                wpMetadata: {},
                wpParentId: cat.parent,
              },
              create: {
                name: cat.name,
                slug: cat.slug,
                description: cat.description || '',
                icon: '', // Você pode definir um ícone padrão
                image: cat.image?.src || '',
                wpCategoryId: cat.id,
                wpDescription: cat.description,
                wpDisplayType: '',
                wpImage: cat.image?.src || '',
                wpMetadata: {},
                wpParentId: cat.parent,
              },
            });

            // Conectar produto à categoria
            await prisma.product.update({
              where: { id: product.id },
              data: {
                Category: {
                  connect: { id: category.id },
                },
              },
            });
          }
        }

        console.log(`✅ Produto "${wcProduct.name}" importado com sucesso!`);
      } catch (error) {
        console.error(`❌ Erro ao processar produto "${wcProduct.name}":`, error);
      }
    }

    console.log('\n🎉 Importação de produtos concluída com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante a importação:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importProducts();
