import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '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');

export async function POST(req: NextRequest) {
  try {
    // Verificar autenticação (opcional)
    const session = await getServerSession(authOptions);
    
    // Mesmo sem sessão, permitimos a criação do intent
    // Podemos usar as informações da sessão se disponíveis
    
    // Extrair dados do corpo da requisição
    const body = await req.json();
    const { amount, currency = 'brl', paymentMethod } = body;
    
    if (!amount || isNaN(amount)) {
      return NextResponse.json({ error: 'Valor inválido' }, { status: 400 });
    }
    
    // Criar Payment Intent no Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Garantir que o valor esteja em centavos e seja um inteiro
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: session?.user?.id || 'guest',
        email: session?.user?.email || 'guest@example.com',
        paymentMethod,
      },
    });
    
    // Retornar client_secret para o frontend
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
    
  } catch (error: any) {
    console.error('Erro ao criar payment intent:', error);
    
    return NextResponse.json(
      { error: 'Erro ao processar pagamento', details: error.message },
      { status: 500 }
    );
  }
}
