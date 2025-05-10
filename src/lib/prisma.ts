import { PrismaClient, Prisma } from '@prisma/client'
import { BlogPostWithRelations, BlogCategoryWithCount, BlogTagWithCount } from '@/types/prisma'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = globalThis.prisma || new PrismaClient()
export { Prisma }

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export async function getPosts(): Promise<BlogPostWithRelations[]> {
  const posts = await prisma.blogPost.findMany({
    include: {
      categories: true,
      tags: true,
      author: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  
  return posts
}

export async function getPostBySlug(slug: string): Promise<BlogPostWithRelations> {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      categories: true,
      tags: true,
      author: true
    }
  })

  if (!post) {
    throw new Error('Post não encontrado')
  }

  return post
}

export async function getCategories(): Promise<BlogCategoryWithCount[]> {
  const categories = await prisma.blogCategory.findMany({
    include: {
      _count: {
        select: {
          posts: true
        }
      }
    }
  })

  return categories
}

export async function getTags(): Promise<BlogTagWithCount[]> {
  const tags = await prisma.blogTag.findMany({
    include: {
      _count: {
        select: {
          posts: true
        }
      }
    }
  })

  return tags
}

export async function getProductCategories() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      icon: true,
      image: true,
      slug: true,
      _count: {
        select: {
          Product: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })

  // Filtra apenas categorias que têm pelo menos um produto
  return categories
    .filter(category => category._count.Product > 0)
    .map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      image: category.image,
      slug: category.slug,
      productsCount: category._count.Product
    }))
}
