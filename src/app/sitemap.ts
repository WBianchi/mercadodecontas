import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

// Função para criar um slug limpo a partir do nome do produto
function createSafeSlug(text: string): string {
  if (!text) return '';
  
  // Tratamento adicional para caracteres que possam causar problemas
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/"/g, '')  // Remove aspas
    .replace(/'/g, '')  // Remove apóstrofos
    .replace(/\+/g, 'plus') // Substitui + por 'plus'
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .toLowerCase()
    .trim();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mercadodecontas.com.br'

  const sitemapEntries: MetadataRoute.Sitemap = [
    // Páginas estáticas principais
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categorias`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Páginas de política e informações
    {
      url: `${baseUrl}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/termos-e-condicoes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  try {
    // Adicionar categorias
    const categories = await prisma.category.findMany({
      where: {
        Product: {
          some: {
            inStock: true,
          },
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    categories.forEach((category) => {
      sitemapEntries.push({
        url: `${baseUrl}/categoria/${category.slug}`,
        lastModified: category.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })

    // Adicionar produtos populares (somente os com estoque)
    const products = await prisma.product.findMany({
      where: {
        inStock: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 100, // Limitar aos 100 mais recentes
      select: {
        name: true,
        sku: true,
        updatedAt: true,
      },
    })

    products.forEach((product) => {
      sitemapEntries.push({
        url: `${baseUrl}/produto/${createSafeSlug(product.name)}=${product.sku}`,
        lastModified: product.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    })

    // Adicionar posts do blog
    const blogPosts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        slug: true,
        createdAt: true,
      },
    })

    blogPosts.forEach((post) => {
      sitemapEntries.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.createdAt,
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    })

    return sitemapEntries
  } catch (error) {
    console.error('Erro ao gerar sitemap dinâmico:', error)
  }

  // Fallback para lista estática se não pudermos acessar o banco de dados
  return sitemapEntries
}
