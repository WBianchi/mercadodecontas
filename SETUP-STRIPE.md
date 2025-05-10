# Configuração do Stripe

## Chaves do Stripe
As seguintes chaves do Stripe precisam ser adicionadas ao arquivo `.env.local`:

```
# Stripe (Produção)
STRIPE_SECRET_KEY=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
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51QYEkLJxaFHPndkBHPcXPjwH2QHfkl9kEAJ7xaJlKnoqeYMiQQjHBrFNfV9mKu3S95KlziGyhPbk1SBVmUWP4nWN003rjAzaC8
```

## Webhook do Stripe

Para receber notificações de pagamentos do Stripe, é necessário configurar um webhook:

1. Acesse o painel do Stripe: https://dashboard.stripe.com/webhooks
2. Clique em "Add endpoint"
3. Adicione a URL do webhook: `https://mercadodecontas.com.br/api/payments/webhook`
4. Selecione os eventos:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Obtenha a chave de assinatura do webhook e adicione ao arquivo `.env.local`:

```
STRIPE_WEBHOOK_SECRET=seu_webhook_signing_secret
```

## Testando o Gateway de Pagamento

Para testar o gateway de pagamento do Stripe em ambiente de desenvolvimento:

1. Inicie o servidor Next.js com `yarn dev`
2. Use os cartões de teste do Stripe:
   - Cartão aprovado: 4242 4242 4242 4242
   - Cartão recusado: 4000 0000 0000 0002
   - CVV: qualquer 3 dígitos
   - Data de expiração: qualquer data futura

## Implementação Realizada

1. Um novo componente `credit-card-payment-stripe.tsx` foi criado para integração com o Stripe
2. Endpoints de API foram criados:
   - `/api/payments/create-intent` - para criar um PaymentIntent do Stripe
   - `/api/payments/webhook` - para receber notificações do Stripe

### Para Substituir o Mercado Pago pelo Stripe:

1. Atualize os imports em qualquer componente que esteja usando o `credit-card-payment.tsx` para usar o novo componente:

```tsx
// Substituir isso
import { CreditCardPayment } from "@/components/credit-card-payment"

// Por isso
import { CreditCardPayment } from "@/components/credit-card-payment-stripe"
```

2. Certifique-se de que a função `onCreateOrder` passe os dados necessários:

```tsx
const handleCreateOrder = async (data: any) => {
  // O componente do Stripe passará um campo 'stripePaymentId' 
  // ou 'paymentIntentId' que deve ser salvo no seu banco de dados
  return await createOrder({
    ...data,
    // outros dados necessários
  });
};
```
