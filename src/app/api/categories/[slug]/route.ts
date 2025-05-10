import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const slug = url.pathname.split("/").pop()
    
    if (!slug) {
      return NextResponse.json({ error: "Slug não fornecido" }, { status: 400 })
    }

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          where: { status: "active" },
          orderBy: { createdAt: "desc" }
        }
      }
    })

    if (!category) {
      return NextResponse.json({ error: "Categoria não encontrada" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("Erro ao buscar categoria:", error)
    return NextResponse.json(
      { error: "Erro ao buscar categoria" },
      { status: 500 }
    )
  }
}
