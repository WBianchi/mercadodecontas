import { Metadata } from "next"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ProductDetails } from "@/components/product-details"
import { Suspense } from "react"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug;
  
  try {
    // Extrair ID do início do slug (formato: ID-resto-do-slug)
    const idMatch = slug.match(/^(\d+)-/);
    const productId = idMatch ? parseInt(idMatch[1]) : null;
    
    // Verifica se o slug contém um SKU no final (formato antigo: nome-produto=SKU)
    const skuMatch = slug.match(/=([A-Za-z0-9-]+)$/);
    const possibleSku = skuMatch ? skuMatch[1] : null;
    
    // Busca pelo produto
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          // Prioridade 1: Busca pelo ID extraído da URL (novo formato)
          ...(productId ? [{ id: productId }] : []),
          
          // Prioridade 2: Busca pelo SKU extraído do final do slug (formato antigo)
          ...(possibleSku ? [{ sku: possibleSku }] : []),
          
          // Prioridade 3: Busca pelo SKU completo
          { sku: slug },
          
          // Prioridade 4: Busca pelo slug
          { slug },
          
          // Prioridade 5: Tenta encontrar por ID (se for um número)
          ...(isNaN(parseInt(slug)) ? [] : [{ id: parseInt(slug) }])
        ]
      },
      include: {
        Category: true,
      }
    })

    if (!product) {
      return {
        title: 'Produto não encontrado | Mercado de Contas',
      }
    }

    return {
      title: `${product.name} | Mercado de Contas`,
      description: product.shortDescription,
      openGraph: {
        images: [product.productPhoto],
      },
    }
  } catch (error) {
    console.error("Erro ao gerar metadados:", error)
    return { title: "Erro ao carregar produto" }
  }
}

export default async function ProductPage({ params }: PageProps) {
  const slug = params.slug;
  
  try {
    console.log(`Buscando produto com parâmetro: '${slug}'`);
    
    // Extrair ID do início do slug (formato: ID-resto-do-slug)
    const idMatch = slug.match(/^(\d+)-/);
    const productId = idMatch ? parseInt(idMatch[1]) : null;
    
    console.log(`ID extraído da URL: ${productId || 'Nenhum'}`);
    
    // Verifica se o slug contém um SKU no final (formato antigo: nome-produto=SKU)
    const skuMatch = slug.match(/=([A-Za-z0-9-]+)$/);
    const possibleSku = skuMatch ? skuMatch[1] : null;
    
    if (possibleSku) {
      console.log(`SKU extraído (formato antigo): ${possibleSku}`);
    }
    
    // Gerar variações do slug para busca somente se não tiver ID
    let slugVariations = [slug];
    
    if (!productId) {
      // Remove hífen no início e no fim, se existir
      const cleanedSlug = slug.replace(/^-+|-+$/g, '');
      if (cleanedSlug !== slug) {
        slugVariations.push(cleanedSlug);
      }
      
      // Normaliza hífens duplos
      const normalizedSlug = slug.replace(/-+/g, '-');
      if (normalizedSlug !== slug && !slugVariations.includes(normalizedSlug)) {
        slugVariations.push(normalizedSlug);
      }
      
      // Adiciona algumas variações com diferentes caracteres
      const simplifiedSlug = slug
        .replace(/[^a-z0-9-]/g, '') // Remove todos os caracteres que não são letras, números ou hífens
        .replace(/-+/g, '-')  // Normaliza hífens duplicados
        .toLowerCase();
      
      if (simplifiedSlug !== slug && !slugVariations.includes(simplifiedSlug)) {
        slugVariations.push(simplifiedSlug);
      }
      
      console.log(`Tentando encontrar produto com os seguintes slugs: ${slugVariations.join(', ')}`);
    }
    
    // Busca pelo produto
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          // Prioridade 1: Busca pelo ID extraído da URL (novo formato)
          ...(productId ? [{ id: productId }] : []),
          
          // Prioridade 2: Busca pelo SKU extraído do final do slug (formato antigo)
          ...(possibleSku ? [{ sku: possibleSku }] : []),
          
          // Prioridade 3: Busca pelo SKU completo
          { sku: slug },
          
          // Prioridade 4: Busca pelas variações de slug (somente se não tiver ID)
          ...(!productId ? slugVariations.map(s => ({ slug: s })) : []),
          
          // Prioridade 5: Busca por slug contendo a string (somente se não tiver ID)
          ...(!productId ? slugVariations.map(s => ({ 
            slug: { 
              contains: s.length > 5 ? s : undefined 
            } 
          })).filter(item => item.slug.contains !== undefined) : []),
          
          // Prioridade 6: Tenta encontrar por ID (se for um número)
          ...(isNaN(parseInt(slug)) ? [] : [{ id: parseInt(slug) }])
        ]
      },
      include: {
        Category: true,
        lojista: true,
        reviews: {
          include: {
            cliente: true
          }
        }
      }
    })

    if (!product) {
      // Busca mais ampla para diagnóstico
      const similarProducts = await prisma.product.findMany({
        where: {
          OR: [
            // Busca produtos com slug parcialmente similar
            ...slugVariations.map(s => ({ 
              slug: { 
                contains: s.length > 3 ? s.substring(0, Math.min(s.length, 10)) : undefined 
              } 
            })).filter(item => item.slug.contains !== undefined),
            // Busca produtos com nome similar
            ...slugVariations.map(s => ({ 
              name: { 
                contains: s.replace(/-/g, ' ').length > 3 ? s.replace(/-/g, ' ') : undefined 
              } 
            })).filter(item => item.name.contains !== undefined)
          ]
        },
        take: 5,
        select: {
          id: true,
          name: true,
          slug: true,
          sku: true
        }
      });
      
      if (similarProducts.length > 0) {
        console.error(`Produto não encontrado para '${slug}', mas encontramos produtos similares:`, 
                     similarProducts.map(p => `${p.id}: ${p.name} (${p.slug})`).join(', '));
      }
      
      console.error(`Erro ao carregar produto: produto não encontrado para '${slug}'`);
      notFound();
    }

    return (
      <Suspense fallback={<div>Carregando...</div>}>
        <ProductDetails product={product} />
      </Suspense>
    )
  } catch (error) {
    console.error("Erro ao carregar produto:", error)
    notFound()
  }
}
