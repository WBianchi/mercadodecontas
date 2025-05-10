import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const pedidos = await prisma.pedido.findMany({
      where: {
        status: {
          in: ['AGUARDANDO', 'PAGO', 'CONCLUIDO', 'REEMBOLSADO', 'CANCELADO']
        }
      },
      include: {
        Cliente: {
          select: {
            id: true,
            wpFirstName: true,
            wpLastName: true,
            wpEmail: true
          }
        },
        OrderItem: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true
              }
            }
          }
        }
      },
      orderBy: {
        purchaseTime: 'desc'
      }
    })

    return NextResponse.json(pedidos)
  } catch (error) {
    console.error("[PEDIDOS_GET] Error", error)
    return NextResponse.json(
      { error: "Erro ao buscar pedidos" },
      { status: 500 }
    )
  }
}
