import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mercadodecontas.com.br'
  
  try {
    // Buscar posts do blog
    const blogPosts = await prisma.BlogPost.findMany({
      where: {
        published: true
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        slug: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    // Criar o XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

    // Adicionar cada post ao XML
    blogPosts.forEach((post) => {
      const lastMod = post.updatedAt || post.createdAt
      xml += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastMod.toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`
    })

    xml += `</urlset>`

    // Retornar o XML com o tipo correto
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('Erro ao gerar post-sitemap.xml:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}
