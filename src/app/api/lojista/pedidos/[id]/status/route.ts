import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Não autorizado", { status: 401 })
    }

    const body = await request.json()
    const { status } = body

    // Verifica se o status é válido
    if (!["AGUARDANDO", "PAGO", "CONCLUIDO", "REEMBOLSADO", "CANCELADO"].includes(status)) {
      return new NextResponse("Status inválido", { status: 400 })
    }

    // Verifica se o pedido pertence ao lojista
    const pedido = await prisma.pedido.findFirst({
      where: {
        id: Number(params.id),
        Lojista: {
          email: session.user.email
        }
      }
    })

    if (!pedido) {
      return new NextResponse("Pedido não encontrado", { status: 404 })
    }

    // Atualiza o status do pedido
    const updatedPedido = await prisma.pedido.update({
      where: {
        id: Number(params.id)
      },
      data: {
        status
      }
    })

    return NextResponse.json(updatedPedido)
  } catch (error) {
    console.error("[LOJISTA_PEDIDO_STATUS_PATCH]", error)
    return new NextResponse("Erro interno do servidor", { status: 500 })
  }
}
