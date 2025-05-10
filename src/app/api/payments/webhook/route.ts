import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { OrderStatus, PaymentMethod } from '@prisma/client';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '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');

// Esta função é necessária para lidar com o raw body do webhook
export const config = {
  api: {
    bodyParser: false,
  },
};

// Função auxiliar para converter o stream em buffer
async function getRawBody(req: NextRequest): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  
  for await (const chunk of req.body as any) {
    chunks.push(chunk instanceof Uint8Array ? chunk : Buffer.from(chunk));
  }
  
  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers.get('stripe-signature') || '';
    
    if (!signature) {
      return NextResponse.json({ error: 'Assinatura Stripe ausente' }, { status: 400 });
    }
    
    // Verificar assinatura do webhook para garantir que a requisição veio do Stripe
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
    let event;
    
    try {
      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        webhookSecret
      );
    } catch (err: any) {
      console.error(`Webhook error: ${err.message}`);
      return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
    }
    
    // Lidar com diferentes tipos de eventos
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handleSuccessfulPayment(event.data.object);
        break;
        
      case 'payment_intent.payment_failed':
        await handleFailedPayment(event.data.object);
        break;
        
      default:
        console.log(`Evento não processado: ${event.type}`);
    }
    
    return NextResponse.json({ received: true });
    
  } catch (error: any) {
    console.error('Erro no webhook:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook', details: error.message },
      { status: 500 }
    );
  }
}

// Função para lidar com pagamentos bem-sucedidos
async function handleSuccessfulPayment(paymentIntent: Stripe.PaymentIntent) {
  const { id, metadata, amount } = paymentIntent;
  
  try {
    // Encontrar o pedido associado a este pagamento
    const pedido = await prisma.pedido.findFirst({
      where: {
        OR: [
          { orderSummary: { contains: id } },
          { clientIp: id }
        ]
      }
    });
    
    if (pedido) {
      // Atualizar o status do pedido para pago
      await prisma.pedido.update({
        where: { id: pedido.id },
        data: {
          status: OrderStatus.PAGO,
          updatedAt: new Date(),
          orderSummary: JSON.stringify({
            ...JSON.parse(pedido.orderSummary || '{}'),
            stripePaymentId: id,
            stripePaymentIntent: paymentIntent
          })
        }
      });
      
      console.log(`Pedido ${pedido.id} atualizado para status PAGO`);
      
      // Aqui você pode adicionar mais lógica, como enviar emails de confirmação,
      // atualizar estoque, etc.
      
    } else {
      // Se o pedido não foi encontrado, registrar apenas um log
      // Não criamos pedidos automaticamente pelo webhook já que precisamos
      // de muitas informações obrigatórias como endereço, comissões, etc.
      console.log('Nenhum pedido encontrado para este pagamento do Stripe.');
      console.log('O pagamento será associado a um pedido quando o usuário finalizar o processo de compra.');
      
      // Extrair informações do usuário do metadata
      const { userId, email, paymentMethod } = metadata || {};
      
      // Log para fins de depuração
      console.log(`Pagamento do Stripe processado: ID ${id}, Usuário: ${userId || 'desconhecido'}, Email: ${email || 'desconhecido'}, Método: ${paymentMethod || 'desconhecido'}`);
      console.log(`Valor: R$ ${amount ? amount / 100 : 0}`);

      
      // Não criamos pedidos aqui, então apenas registramos que o webhook foi processado
      console.log('Webhook de pagamento processado com sucesso');
    }
    
  } catch (error) {
    console.error('Erro ao processar pagamento bem-sucedido:', error);
    throw error;
  }
}

// Função para lidar com pagamentos que falharam
async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
  const { id, last_payment_error } = paymentIntent;
  
  try {
    // Encontrar o pedido associado a este pagamento
    const pedido = await prisma.pedido.findFirst({
      where: {
        OR: [
          { orderSummary: { contains: id } },
          { clientIp: id }
        ]
      }
    });
    
    if (pedido) {
      // Atualizar o status do pedido para cancelado
      await prisma.pedido.update({
        where: { id: pedido.id },
        data: {
          status: OrderStatus.CANCELADO,
          updatedAt: new Date(),
          orderSummary: JSON.stringify({
            ...JSON.parse(pedido.orderSummary || '{}'),
            stripePaymentId: id,
            stripePaymentError: last_payment_error,
            failedPaymentIntent: paymentIntent
          })
        }
      });
      
      console.log(`Pedido ${pedido.id} atualizado para status CANCELADO devido a falha no pagamento`);
    } else {
      console.log('Nenhum pedido encontrado para este pagamento falho');
    }
    
  } catch (error) {
    console.error('Erro ao processar pagamento falho:', error);
    throw error;
  }
}
