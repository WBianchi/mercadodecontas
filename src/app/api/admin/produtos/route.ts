import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Não autorizado", { status: 401 })
    }

    const produtos = await prisma.product.findMany({
      include: {
        lojista: true,
        Category: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(produtos)
  } catch (error) {
    console.error("[ADMIN_PRODUTOS_GET]", error)
    return new NextResponse("Erro interno do servidor", { status: 500 })
  }
}
