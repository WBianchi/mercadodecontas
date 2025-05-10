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

    const lojista = await prisma.lojista.findUnique({
      where: {
        email: session.user.email
      }
    })

    if (!lojista) {
      return new NextResponse("Lojista não encontrado", { status: 404 })
    }

    const pedidos = await prisma.pedido.findMany({
      where: {
        lojistaId: lojista.id
      },
      include: {
        OrderItem: {
          include: {
            product: true
          }
        },
        Cliente: true,
        Lojista: true,
        Admin: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(pedidos)
  } catch (error) {
    console.error("[LOJISTA_PEDIDOS_GET]", error)
    return new NextResponse("Erro interno do servidor", { status: 500 })
  }
}
