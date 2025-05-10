import { NextResponse } from "next/server"
import { orderService } from "@/services/order"
import { mercadoPagoApi } from "@/services/mercadopago"

export async function GET(req: Request) {
  try {
    // Obter o ID do pagamento da URL
    const url = new URL(req.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "ID do pagamento não fornecido" },
        { status: 400 }
      )
    }

    // Verificar o status do pagamento no Mercado Pago
    const checkResponse = await mercadoPagoApi.checkPaymentStatus(id)

    if (!checkResponse.success) {
      return NextResponse.json(
        { error: checkResponse.error || "Erro ao verificar pagamento" },
        { status: 500 }
      )
    }

    // Se o pagamento foi aprovado, atualizar o pedido
    if (checkResponse.data?.status === "approved") {
      // Obter o ID do pedido da referência externa
      const orderId = Number(checkResponse.data.external_reference)
      
      if (orderId) {
        // Atualizar o status do pedido para PAGO
        await orderService.updateStatus(orderId, "PAGO")
      }
    }

    return NextResponse.json({
      status: checkResponse.data?.status,
      status_detail: checkResponse.data?.status_detail,
      external_reference: checkResponse.data?.external_reference
    })
  } catch (error: any) {
    console.error("Erro ao verificar status:", error)
    return NextResponse.json(
      { error: error.message || "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
