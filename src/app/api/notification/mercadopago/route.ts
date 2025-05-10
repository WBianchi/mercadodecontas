import { NextResponse } from "next/server";
import { mercadoPagoApi } from "@/services/mercadopago";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  console.log("Webhook do Mercado Pago recebido");
  
  try {
    const body = await req.json();
    console.log("Payload do webhook:", JSON.stringify(body, null, 2));

    // Verificar se é uma notificação de pagamento
    if (body.action === "payment.updated" || body.action === "payment.created") {
      const paymentId = body.data?.id;
      
      if (!paymentId) {
        console.error("ID de pagamento não encontrado no webhook");
        return NextResponse.json({ error: "ID de pagamento não encontrado" }, { status: 400 });
      }
      
      console.log(`Verificando status do pagamento ${paymentId}`);
      
      // Verificar status do pagamento
      const paymentStatus = await mercadoPagoApi.checkPaymentStatus(paymentId);
      
      if (!paymentStatus.success) {
        console.error("Erro ao verificar status do pagamento:", paymentStatus.error);
        return NextResponse.json({ error: "Erro ao verificar status" }, { status: 500 });
      }
      
      const status = paymentStatus.data.status;
      const statusDetail = paymentStatus.data.statusDetail;
      const externalReference = paymentStatus.data.externalReference;
      
      console.log(`Status do pagamento ${paymentId}: ${status}, detalhe: ${statusDetail}, referência: ${externalReference}`);
      
      // Atualizar o pedido no banco de dados baseado no external_reference
      if (externalReference) {
        const orderId = parseInt(externalReference);
        
        if (isNaN(orderId)) {
          console.error("Referência externa inválida:", externalReference);
          return NextResponse.json({ error: "Referência externa inválida" }, { status: 400 });
        }
        
        // Mapear status do Mercado Pago para status do pedido
        let orderStatus = "PENDING";
        
        if (status === "approved") {
          orderStatus = "APPROVED";
        } else if (status === "rejected" || status === "cancelled") {
          orderStatus = "REJECTED";
        } else if (status === "in_process" || status === "pending") {
          orderStatus = "PENDING";
        }
        
        // Atualizar o pedido no banco de dados
        await prisma.order.update({
          where: { id: orderId },
          data: {
            status: orderStatus,
            paymentId: paymentId.toString(),
            statusDetail: statusDetail || null
          }
        });
        
        console.log(`Pedido ${orderId} atualizado para ${orderStatus}`);
        
        // Criar registro de pagamento
        await prisma.payment.create({
          data: {
            orderId: orderId,
            paymentId: paymentId.toString(),
            status: status,
            statusDetail: statusDetail || "",
            method: "CREDIT_CARD",
            value: paymentStatus.data.transactionAmount || 0,
            paymentData: JSON.stringify(paymentStatus.data)
          }
        });
        
        console.log(`Registro de pagamento criado para o pedido ${orderId}`);
      } else {
        console.warn("Referência externa não encontrada no pagamento");
      }
    }
    
    // Responder ao Mercado Pago com sucesso
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Erro ao processar webhook do Mercado Pago:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
