import { PrismaClient, PaymentMethod, OrderStatus } from '@prisma/client';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const prisma = new PrismaClient();

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WP_URL!,
  consumerKey: process.env.WC_CONSUMER_KEY!,
  consumerSecret: process.env.WC_CONSUMER_SECRET!,
  version: 'wc/v3'
});

async function mapWooCommercePaymentMethod(method: string): Promise<PaymentMethod> {
  switch (method.toLowerCase()) {
    case 'pagamentos_para_woocommerce_com_appmax_pix':
      return PaymentMethod.PIX;
    case 'pagamentos_para_woocommerce_com_appmax_boleto':
      return PaymentMethod.BOLETO;
    case 'pagamentos_para_woocommerce_com_appmax_credit':
      return PaymentMethod.CARTAO;
    default:
      return PaymentMethod.PIX; // Default para PIX
  }
}

async function mapWooCommerceStatus(status: string): Promise<OrderStatus> {
  switch (status.toLowerCase()) {
    case 'pending':
      return OrderStatus.AGUARDANDO;
    case 'processing':
    case 'completed':
      return OrderStatus.PAGO;
    case 'refunded':
      return OrderStatus.REEMBOLSADO;
    case 'cancelled':
      return OrderStatus.CANCELADO;
    default:
      return OrderStatus.AGUARDANDO;
  }
}

async function importOrders() {
  try {
    console.log('🚀 Iniciando importação dos últimos 5 pedidos do WooCommerce...');

    const { data: orders } = await WooCommerce.get('orders', {
      per_page: 5,
      orderby: 'date',
      order: 'desc',
    });

    for (const wcOrder of orders) {
      console.log(`\n📦 Processando pedido #${wcOrder.id}...`);

      // Encontrar ou criar o cliente
      const customer = await prisma.cliente.upsert({
        where: { wpUserId: wcOrder.customer_id || 0 },
        update: {
          wpEmail: wcOrder.billing.email,
          wpFirstName: wcOrder.billing.first_name,
          wpLastName: wcOrder.billing.last_name,
          wpBillingAddress: wcOrder.billing,
          wpShippingAddress: wcOrder.shipping,
        },
        create: {
          username: wcOrder.billing.email.split('@')[0],
          email: wcOrder.billing.email,
          password: 'imported-customer', // Senha temporária
          wpUserId: wcOrder.customer_id || 0,
          wpEmail: wcOrder.billing.email,
          wpFirstName: wcOrder.billing.first_name,
          wpLastName: wcOrder.billing.last_name,
          wpBillingAddress: wcOrder.billing,
          wpShippingAddress: wcOrder.shipping,
        },
      });

      // Calcular comissões (exemplo: 10% para admin, 80% para lojista)
      const total = parseFloat(wcOrder.total);
      const adminCommission = total * 0.1;
      const lojistaCommission = total * 0.8;
      const adminProfit = adminCommission;
      const lojistaProfit = lojistaCommission;

      // Criar o pedido
      const pedido = await prisma.pedido.create({
        data: {
          paymentMethod: await mapWooCommercePaymentMethod(wcOrder.payment_method),
          status: await mapWooCommerceStatus(wcOrder.status),
          address: `${wcOrder.billing.address_1} ${wcOrder.billing.address_2 || ''}`,
          city: wcOrder.billing.city,
          neighborhood: wcOrder.billing.neighborhood || '',
          clientIp: wcOrder.customer_ip_address,
          cpfCnpj: wcOrder.billing.cpf || wcOrder.billing.cnpj || '',
          clientEmail: wcOrder.billing.email,
          clientName: `${wcOrder.billing.first_name} ${wcOrder.billing.last_name}`,
          clientPhone: wcOrder.billing.phone,
          orderSummary: `Pedido WooCommerce #${wcOrder.id}`,
          purchaseTime: new Date(wcOrder.date_created),
          lojistaCommission,
          adminCommission,
          adminProfit,
          lojistaProfit,
          clienteId: customer.id,
          // Assumindo que existe apenas um lojista no momento
          lojistaId: 1,
          updatedAt: new Date(), // Adicionando o campo updatedAt
          OrderItem: {
            create: wcOrder.line_items.map((item: any) => ({
              productName: item.name,
              quantity: item.quantity,
              value: parseFloat(item.total),
              // Opcional: vincular ao produto se existir
              productId: null,
            })),
          },
        },
      });

      console.log(`✅ Pedido #${wcOrder.id} importado com sucesso!`);
    }

    console.log('\n🎉 Importação concluída com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante a importação:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importOrders();
