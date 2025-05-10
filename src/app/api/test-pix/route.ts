import { NextResponse } from "next/server"
import { mercadoPagoApi } from "@/services/mercadopago"

export async function GET() {
  try {
    // Dados de teste para gerar um PIX
    const pixResponse = await mercadoPagoApi.createPixPayment({
      customerName: "Cliente Teste",
      customerEmail: "cliente@teste.com",
      customerPhone: "(11) 99999-9999",
      documentNumber: "12345678909",
      value: 10.00,
      productName: "Produto Teste",
      orderId: 12345
    });

    console.log("Resposta PIX Teste:", JSON.stringify(pixResponse, null, 2));

    if (!pixResponse.success) {
      return NextResponse.json(
        { message: `Erro ao criar pagamento PIX de teste: ${pixResponse.error}` },
        { status: 500 }
      );
    }

    // Logs específicos para debugging
    console.log("QR Code URL:", pixResponse.qrCodeUrl || pixResponse.data?.qrCodeUrl);
    console.log("PIX Key:", pixResponse.pixKey || pixResponse.data?.pixKey);

    return NextResponse.json({
      success: true,
      message: "PIX de teste gerado com sucesso",
      data: {
        qrCodeUrl: pixResponse.qrCodeUrl || pixResponse.data?.qrCodeUrl,
        pixKey: pixResponse.pixKey || pixResponse.data?.pixKey,
        ticketUrl: pixResponse.ticketUrl || pixResponse.data?.ticketUrl,
        paymentId: pixResponse.id || pixResponse.data?.id,
        expirationDate: pixResponse.expirationDate || pixResponse.data?.expirationDate
      }
    });
  } catch (error: any) {
    console.error("Erro ao gerar PIX de teste:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
