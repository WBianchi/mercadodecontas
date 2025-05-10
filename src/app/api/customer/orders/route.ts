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

    const cliente = await prisma.cliente.findUnique({
      where: {
        email: session.user.email as string,
      },
      select: {
        id: true,
      }
    })

    if (!cliente) {
      return new NextResponse("Cliente não encontrado", { status: 404 })
    }

    const orders = await prisma.pedido.findMany({
      where: {
        clienteId: cliente.id,
      },
      include: {
        OrderItem: {
          include: {
            product: true,
          },
        },
        Lojista: {
          select: {
            username: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("[ORDERS_GET]", error)
    return new NextResponse("Erro interno", { status: 500 })
  }
}
