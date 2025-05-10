import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const categorias = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true
      },
      orderBy: {
        name: "asc"
      }
    })

    return NextResponse.json(categorias)
  } catch (error) {
    console.error("[CATEGORIAS_GET]", error)
    return new NextResponse("Erro interno", { status: 500 })
  }
}
