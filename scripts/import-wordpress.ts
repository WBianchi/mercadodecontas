import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import { JSDOM } from 'jsdom'
import { stripHtml } from 'string-strip-html'

const prisma = new PrismaClient()
const WP_API_URL = process.env.WORDPRESS_API_URL

interface WordPressPost {
  id: number
  date: string
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
    }>
    'wp:term'?: Array<Array<{
      id: number
      name: string
      slug: string
      taxonomy: string
      description?: string
    }>>
    author?: Array<{
      name: string
      avatar_urls?: {
        '96': string
      }
    }>
  }
  yoast_head_json: {
    twitter_misc?: {
      "Est. reading time": string
    }
  }
}

async function fetchAllPosts(): Promise<WordPressPost[]> {
  const posts: WordPressPost[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    try {
      const response = await axios.get(`${WP_API_URL}/wp/v2/posts`, {
        params: {
          page,
          per_page: 100,
          _embed: true
        }
      })
      
      const newPosts = response.data
      posts.push(...newPosts)
      
      // Verifica se há mais páginas
      const totalPages = parseInt(response.headers['x-wp-totalpages'])
      hasMore = page < totalPages
      page++
    } catch (error) {
      hasMore = false
    }
  }

  return posts
}

async function fetchAllCategories() {
  const response = await axios.get(`${WP_API_URL}/wp/v2/categories`, {
    params: {
      per_page: 100
    }
  })
  return response.data
}

async function fetchAllTags() {
  const response = await axios.get(`${WP_API_URL}/wp/v2/tags`, {
    params: {
      per_page: 100
    }
  })
  return response.data
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

function getShortDescription(excerpt: string): string {
  return stripHtml(excerpt).result.substring(0, 160)
}

async function importWordPressPosts() {
  try {
    console.log('🚀 Iniciando importação do WordPress...')

    // Cria um autor padrão se não existir
    const defaultAuthor = await prisma.admin.upsert({
      where: { email: 'admin@mercadodecontas.com.br' },
      update: {},
      create: {
        username: 'Admin',
        email: 'admin@mercadodecontas.com.br',
        password: 'senha_temporaria_123', // Lembre-se de mudar depois
        role: 'ADMIN',
        adminCommission: 0
      }
    })

    console.log('✅ Autor padrão criado/atualizado')

    // Busca todos os posts, categorias e tags
    const [posts, wpCategories, wpTags] = await Promise.all([
      fetchAllPosts(),
      fetchAllCategories(),
      fetchAllTags()
    ])

    console.log(`📝 Encontrados ${posts.length} posts`)
    console.log(`📁 Encontradas ${wpCategories.length} categorias`)
    console.log(`🏷️  Encontradas ${wpTags.length} tags`)

    // Importa categorias
    for (const cat of wpCategories) {
      await prisma.blogCategory.upsert({
        where: { slug: cat.slug },
        update: {
          name: cat.name,
          description: cat.description || null
        },
        create: {
          name: cat.name,
          slug: cat.slug,
          description: cat.description || null
        }
      })
    }
    console.log('✅ Categorias importadas')

    // Importa tags
    for (const tag of wpTags) {
      await prisma.blogTag.upsert({
        where: { slug: tag.slug },
        update: { name: tag.name },
        create: {
          name: tag.name,
          slug: tag.slug
        }
      })
    }
    console.log('✅ Tags importadas')

    // Importa posts
    for (const post of posts) {
      try {
        const readTime = post.yoast_head_json?.twitter_misc?.["Est. reading time"]
          ? parseInt(post.yoast_head_json.twitter_misc["Est. reading time"])
          : estimateReadTime(post.content.rendered)

        // Busca categorias e tags do post
        const postCategories = post._embedded?.['wp:term']?.[0]
          ?.filter(term => term.taxonomy === 'category')
          ?.map(cat => ({ slug: cat.slug })) || []
        
        const postTags = post._embedded?.['wp:term']?.[1]
          ?.filter(term => term.taxonomy === 'post_tag')
          ?.map(tag => ({ slug: tag.slug })) || []

        // Verifica se as categorias existem
        const existingCategories = await Promise.all(
          postCategories.map(async (cat) => {
            const category = await prisma.blogCategory.findUnique({
              where: { slug: cat.slug }
            })
            return category ? { slug: cat.slug } : null
          })
        )

        // Verifica se as tags existem
        const existingTags = await Promise.all(
          postTags.map(async (tag) => {
            const tagRecord = await prisma.blogTag.findUnique({
              where: { slug: tag.slug }
            })
            return tagRecord ? { slug: tag.slug } : null
          })
        )

        // Filtra apenas categorias e tags que existem
        const validCategories = existingCategories.filter(Boolean)
        const validTags = existingTags.filter(Boolean)

        // Cria ou atualiza o post
        await prisma.blogPost.upsert({
          where: { slug: post.slug },
          update: {
            title: post.title.rendered,
            description: post.content.rendered,
            shortDescription: getShortDescription(post.excerpt.rendered),
            content: post.content.rendered,
            thumbnail: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
            readTime,
            published: true,
            categories: {
              connect: validCategories
            },
            tags: {
              connect: validTags
            }
          },
          create: {
            title: post.title.rendered,
            description: post.content.rendered,
            shortDescription: getShortDescription(post.excerpt.rendered),
            content: post.content.rendered,
            thumbnail: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
            slug: post.slug,
            readTime,
            published: true,
            authorId: defaultAuthor.id,
            categories: {
              connect: validCategories
            },
            tags: {
              connect: validTags
            }
          }
        })

        console.log(`✅ Post importado: ${post.title.rendered}`)
      } catch (error) {
        console.error(`❌ Erro ao importar post: ${post.title.rendered}`, error)
      }
    }

    console.log('✨ Importação concluída com sucesso!')
  } catch (error) {
    console.error('❌ Erro durante a importação:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Executa a importação
importWordPressPosts()
