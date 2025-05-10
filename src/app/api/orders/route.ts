import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { orderService } from "@/services/order"
import { mercadoPagoApi } from "@/services/mercadopago"

export async function POST(req: Request) {
  try {
    // Deserializar dados do corpo da requisição
    const reqData = await req.json()
    
    // Extrair dados do payload
    const { 
      products, 
      paymentMethod, 
      clientName, 
      clientEmail, 
      clientPhone, 
      cpfCnpj, 
      address,
      city,
      neighborhood,
      lojistaId,
      cardNumber,
      cardHolder,
      cardExpiry,
      cardCvv,
      installments = 1,
      ...rest 
    } = reqData

    // Validação básica
    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ message: "Produtos inválidos" }, { status: 400 })
    }

    if (!paymentMethod) {
      return NextResponse.json({ message: "Método de pagamento não informado" }, { status: 400 })
    }

    if (!clientEmail) {
      return NextResponse.json({ message: "Email do cliente não informado" }, { status: 400 })
    }

    // Validações adicionais para compra sem login
    if (!clientName || !clientPhone || !cpfCnpj) {
      return NextResponse.json(
        { error: "Dados do cliente incompletos" },
        { status: 400 }
      )
    }

    // Dados completos do cliente para pagamento
    const clientData = {
      clientName,
      clientEmail,
      clientPhone,
      cpfCnpj,
      address,
      city,
      neighborhood,
      paymentMethod
    }
    
    console.log("Debug - Request data:", reqData);
    console.log("Debug - Dados completos do cliente:", JSON.stringify(clientData, null, 2));

    // Se for cartão de crédito, valida os dados do cartão
    if (paymentMethod === "CREDIT_CARD") {
      if (!cardNumber || !cardHolder || !cardExpiry || !cardCvv) {
        return NextResponse.json(
          { error: "Dados do cartão incompletos" },
          { status: 400 }
        )
      }
    }

    try {
      // Criar o pedido
      const order = await orderService.create({
        products,
        paymentMethod,
        lojistaId,
        clientName,
        clientEmail,
        clientPhone,
        cpfCnpj,
        address,
        city,
        neighborhood,
      })

      const total = products.reduce((acc, product) => acc + product.value * product.quantity, 0)

      // Se for PIX, gerar o QR Code com Mercado Pago
      if (paymentMethod === "PIX") {
        console.log("Processando pagamento PIX...");
        
        // Obter o ID do pedido para referenciar no pagamento
        const orderId = order.id;
        
        const pixResponse = await mercadoPagoApi.createPixPayment({
          customerName: clientName || clientEmail,
          customerEmail: clientEmail,
          customerPhone: clientPhone || "(00) 00000-0000",
          documentNumber: cpfCnpj?.replace(/\D/g, '') || "00000000000",
          value: total,
          productName: products[0].name,
          orderId
        });

        console.log("Debug - MercadoPago PIX Response:", JSON.stringify(pixResponse, null, 2));

        if (!pixResponse.success) {
          return NextResponse.json(
            { message: `Erro ao criar pagamento PIX no Mercado Pago: ${pixResponse.error}` },
            { status: 500 }
          );
        }

        // Extrair os dados do QR Code e Pix com segurança
        // Verificando primeiro no objeto data e depois no objeto principal
        const qrCodeUrl = pixResponse.data?.qrCodeBase64 || 
                         pixResponse.data?.qrCodeUrl || 
                         pixResponse.qrCodeBase64 || 
                         pixResponse.qrCodeUrl || '';
                         
        const pixKey = pixResponse.data?.pixKey || 
                      pixResponse.pixKey || '';
                      
        const ticketUrl = pixResponse.data?.ticketUrl || 
                         pixResponse.ticketUrl || '';
                         
        const paymentId = pixResponse.data?.id || 
                         pixResponse.id || '';
        
        // Garantir que qrCodeUrl existe e está preenchido
        if (!qrCodeUrl) {
          console.error("QR Code URL não encontrado na resposta:", JSON.stringify(pixResponse, null, 2));
          return NextResponse.json(
            { message: "Erro ao obter QR Code do PIX" },
            { status: 500 }
          );
        }
        
        // Construir resposta com dados formatados corretamente e na raiz do objeto
        const pixData = {
          success: true,
          orderId: order.id,
          qrCodeUrl: qrCodeUrl,
          pixKey: pixKey,
          ticketUrl: ticketUrl,
          paymentId: paymentId,
          expirationDate: pixResponse.data?.expirationDate || 
                         pixResponse.expirationDate || 
                         new Date(Date.now() + 30*60000).toISOString()
        };

        console.log("Debug - Dados de resposta PIX formatados:", JSON.stringify(pixData, null, 2));
        
        return NextResponse.json(pixData);
      }

      // Se for cartão de crédito
      else if (paymentMethod === "CREDIT_CARD") {
        console.log("Processando pagamento com cartão de crédito...");
        
        // Verificar se temos os dados necessários do cartão
        if (!cardNumber || !cardHolder || !cardExpiry || !cardCvv) {
          return NextResponse.json(
            { message: "Dados do cartão incompletos" },
            { status: 400 }
          );
        }
        
        // Verificar se temos o CPF/CNPJ do cliente
        if (!cpfCnpj) {
          return NextResponse.json(
            { message: "CPF ou CNPJ é obrigatório para pagamento com cartão" },
            { status: 400 }
          );
        }
        
        // Dados para tokenização do cartão
        const cardTokenData = {
          cardNumber: cardNumber.replace(/\D/g, ''),
          cardHolder: cardHolder,
          cardExpiry: cardExpiry.replace(/\D/g, ''),
          cardCvv: cardCvv,
          documentType: cpfCnpj.replace(/\D/g, '').length <= 11 ? 'CPF' : 'CNPJ',
          documentNumber: cpfCnpj.replace(/\D/g, '')
        };
        
        console.log("Debug - Tokenizando cartão...");
        
        // Tokenizar o cartão
        const tokenResponse = await mercadoPagoApi.tokenizeCard(cardTokenData);
        
        if (!tokenResponse.success) {
          console.error("Erro ao tokenizar cartão:", tokenResponse.error);
          return NextResponse.json(
            { message: `Erro ao processar cartão: ${tokenResponse.error}` },
            { status: 500 }
          );
        }
        
        // Acessar o token corretamente do objeto de resposta
        const cardToken = tokenResponse.cardToken || tokenResponse.data?.token;
        
        console.log("Debug - Cartão tokenizado com sucesso:", cardToken);
        
        if (!cardToken) {
          console.error("Erro: Token do cartão não encontrado na resposta");
          return NextResponse.json(
            { message: "Erro ao processar cartão: token não gerado" },
            { status: 500 }
          );
        }
        
        // Criar o pagamento com o token do cartão
        const paymentResponse = await mercadoPagoApi.createCreditCardPayment({
          customerName: clientName,
          customerEmail: clientEmail,
          customerPhone: clientPhone,
          documentNumber: cpfCnpj.replace(/\D/g, ''),
          cardToken: cardToken,
          installments: Number(installments),
          value: total,
          productName: products[0].name,
          orderId: order.id,
          cardNumber: cardNumber // Passar o número do cartão para detectar a bandeira
        });
        
        console.log("Debug - Resposta do pagamento com cartão:", JSON.stringify(paymentResponse, null, 2));
        
        if (!paymentResponse.success) {
          console.error("Erro ao processar pagamento com cartão:", paymentResponse.error);
          return NextResponse.json(
            { 
              success: false,
              message: `Erro ao processar pagamento: ${paymentResponse.error}`,
              details: paymentResponse.errorDetails
            },
            { status: 400 }
          );
        }
        
        // Extrair dados da resposta
        const paymentStatus = paymentResponse.status || 'pending';
        const paymentId = paymentResponse.id || '';
        
        // Atualizar o status do pedido com base na resposta
        if (paymentStatus === "approved") {
          console.log("Pagamento aprovado!");
          
          // TODO: Atualizar status do pedido para aprovado no banco de dados
          // await prisma.order.update({
          //   where: { id: order.id },
          //   data: { 
          //     status: "APPROVED",
          //     paymentId: paymentId
          //   }
          // });
        }
        
        return NextResponse.json({
          success: true,
          orderId: order.id,
          paymentId: paymentId,
          status: paymentStatus,
          message: paymentStatus === "approved" 
            ? "Pagamento aprovado com sucesso!" 
            : "Pagamento em processamento. Aguarde a confirmação."
        });
      }
      
      return NextResponse.json({
        success: true,
        orderId: order.id
      })
    } catch (e: any) {
      console.error("Erro ao processar pedido:", e);
      return NextResponse.json(
        { error: e.message || "Erro ao processar pedido" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Erro geral na rota de pedidos:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
