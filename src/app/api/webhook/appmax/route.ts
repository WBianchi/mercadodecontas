import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher"

export async function POST(req: Request) {
  try {
    const payload = await req.json()

    // Validar se é um payload válido da Appmax
    if (!payload.order_id || !payload.status) {
      return NextResponse.json(
        { error: "Payload inválido" },
        { status: 400 }
      )
    }

    // Atualizar o status do pedido no banco
    const order = await prisma.order.update({
      where: {
        id: parseInt(payload.order_id)
      },
      data: {
        status: payload.status
      }
    })

    // Se o pagamento foi aprovado, notificar o cliente
    if (payload.status === "approved" && process.env.PUSHER_APP_ID) {
      try {
        await pusherServer.trigger(`order-${order.id}`, "payment-success", {
          orderId: order.id,
          status: "approved"
        })
      } catch (error) {
        console.error("Erro ao notificar via Pusher:", error)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro no webhook:", error)
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    )
  }
}
