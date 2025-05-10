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

    console.log("Usuário logado:", session.user)

    // Buscar o lojista pelo email do usuário
    const lojista = await prisma.lojista.findFirst({
      where: {
        OR: [
          { email: session.user.email },
          { wpMetadata: { path: ['email'], equals: session.user.email } }
        ]
      }
    })

    if (!lojista) {
      return new NextResponse("Lojista não encontrado", { status: 404 })
    }

    console.log("Lojista encontrado:", lojista.id, lojista.email)

    const produtos = await prisma.product.findMany({
      where: {
        lojistaId: lojista.id
      },
      include: {
        Category: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    console.log("Produtos encontrados:", produtos.length)
    return NextResponse.json(produtos)
  } catch (error) {
    console.error("[LOJISTA_PRODUTOS_GET]", error)
    return new NextResponse("Erro interno do servidor", { status: 500 })
  }
}
