import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Função para verificar se o usuário é admin
async function isAdmin() {
  const session = await getServerSession(authOptions)
  return session?.user?.role === "ADMIN"
}

// GET - Buscar uma categoria específica
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID inválido" }, 
        { status: 400 }
      )
    }

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            Product: true
          }
        }
      }
    })

    if (!category) {
      return NextResponse.json(
        { error: "Categoria não encontrada" }, 
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...category,
      productsCount: category._count.Product
    })
  } catch (error) {
    console.error("[ADMIN_CATEGORY_GET]", error)
    return NextResponse.json(
      { error: "Erro ao buscar categoria" }, 
      { status: 500 }
    )
  }
}

// PATCH - Atualizar uma categoria
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID inválido" }, 
        { status: 400 }
      )
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
    
    // Verificar se já existe outra categoria com esse nome ou slug
    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name },
          { slug }
        ],
        NOT: {
          id
        }
      }
    })

    if (existingCategory) {
      return NextResponse.json(
        { error: "Já existe outra categoria com esse nome" }, 
        { status: 400 }
      )
    }

    // Atualizar a categoria
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        icon: icon || "category",
        image: image || "/images/placeholder.jpg"
      }
    })

    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error("[ADMIN_CATEGORY_PATCH]", error)
    return NextResponse.json(
      { error: "Erro ao atualizar categoria" }, 
      { status: 500 }
    )
  }
}

// DELETE - Excluir uma categoria
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID inválido" }, 
        { status: 400 }
      )
    }

    // Verificar se a categoria tem produtos associados
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            Product: true
          }
        }
      }
    })

    if (!category) {
      return NextResponse.json(
        { error: "Categoria não encontrada" }, 
        { status: 404 }
      )
    }

    if (category._count.Product > 0) {
      return NextResponse.json(
        { 
          error: "Não é possível excluir uma categoria com produtos associados",
          productsCount: category._count.Product
        }, 
        { status: 400 }
      )
    }

    // Excluir a categoria
    await prisma.category.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[ADMIN_CATEGORY_DELETE]", error)
    return NextResponse.json(
      { error: "Erro ao excluir categoria" }, 
      { status: 500 }
    )
  }
}
