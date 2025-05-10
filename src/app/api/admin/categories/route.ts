import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Função para verificar se o usuário é admin
async function isAdmin() {
  const session = await getServerSession(authOptions)
  return session?.user?.role === "ADMIN"
}

// GET - Buscar todas as categorias (sem filtrar por quantidade de produtos)
export async function GET() {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

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

    // Retornar todas as categorias, mesmo as que não têm produtos
    return NextResponse.json(categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      image: category.image,
      slug: category.slug,
      productsCount: category._count.Product
    })))
  } catch (error) {
    console.error("[ADMIN_CATEGORIES_GET]", error)
    return NextResponse.json(
      { error: "Erro ao buscar categorias" }, 
      { status: 500 }
    )
  }
}

// POST - Criar uma nova categoria
export async function POST(request: Request) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    const body = await request.json()
    const { name, description, icon, image } = body

    // Validar dados obrigatórios
    if (!name || !description) {
      return NextResponse.json(
        { error: "Nome e descrição são obrigatórios" }, 
        { status: 400 }
      )
    }

    // Gerar slug a partir do nome
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')

    // Verificar se já existe uma categoria com esse nome ou slug
    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name },
          { slug }
        ]
      }
    })

    if (existingCategory) {
      return NextResponse.json(
        { error: "Já existe uma categoria com esse nome" }, 
        { status: 400 }
      )
    }

    // Criar a categoria
    const newCategory = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        icon: icon || "category",
        image: image || "/images/placeholder.jpg"
      }
    })

    return NextResponse.json(newCategory)
  } catch (error) {
    console.error("[ADMIN_CATEGORIES_POST]", error)
    return NextResponse.json(
      { error: "Erro ao criar categoria" }, 
      { status: 500 }
    )
  }
}
