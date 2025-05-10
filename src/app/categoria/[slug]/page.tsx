import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CategoryProducts } from "@/components/category-products"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const slug = params.slug
  
  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      description: true,
      image: true,
    },
  })

  if (!category) {
    return {
      title: "Categoria não encontrada | Mercado de Contas",
    }
  }

  return {
    title: `${category.name} | Mercado de Contas`,
    description: category.description,
    openGraph: {
      images: [category.image],
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const slug = params.slug
  
  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
    include: {
      Product: {
        where: {
          inStock: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          description: true,
          shortDescription: true,
          price: true,
          discountPrice: true,
          productPhoto: true,
          inStock: true,
          sku: true,
          slug: true, 
          Category: {
            select: {
              name: true
            }
          }
        }
      },
    },
  })

  if (!category) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <CategoryProducts category={category} />
      </main>
      <Footer />
    </>
  )
}
