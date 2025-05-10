import { mercadoPagoApi } from '../services/mercadopago';

async function testMercadoPagoIntegration() {
  console.log('🧪 Iniciando testes de integração com Mercado Pago...');
  
  const testOrderId = Date.now(); // Usar timestamp como ID de ordem para testes
  const testValue = 0.50; // Valor mínimo para teste - R$ 0,50
  const testProductName = 'Produto de Teste';
  
  // Dados de teste
  const customerData = {
    customerName: 'Cliente Teste',
    customerEmail: 'teste@exemplo.com',
    customerPhone: '11999999999',
    documentNumber: '12345678909', // CPF de teste
    value: testValue,
    productName: testProductName,
    orderId: testOrderId
  };

  // 1. Testar criação de pagamento PIX
  console.log('\n📱 Testando criação de pagamento PIX...');
  try {
    const pixResponse = await mercadoPagoApi.createPixPayment(customerData);
    
    if (pixResponse.success && pixResponse.data) {
      console.log('✅ PIX criado com sucesso!');
      console.log('📊 Detalhes do PIX:');
      console.log(`- ID do pagamento: ${pixResponse.data.id}`);
      console.log(`- Status: ${pixResponse.data.status}`);
      console.log(`- Código PIX: ${pixResponse.data.qr_code ? 'Gerado' : 'Não gerado'}`);
      console.log(`- QR Code (base64): ${pixResponse.data.qr_code_base64 ? 'Gerado' : 'Não gerado'}`);
      
      // 2. Testar verificação de status do pagamento PIX
      if (pixResponse.data.id) {
        console.log('\n🔍 Testando verificação de status do pagamento PIX...');
        const statusResponse = await mercadoPagoApi.checkPaymentStatus(pixResponse.data.id);
        
        if (statusResponse.success) {
          console.log('✅ Verificação de status realizada com sucesso!');
          console.log(`- Status atual: ${statusResponse.data?.status}`);
          console.log(`- Detalhes: ${statusResponse.data?.status_detail}`);
        } else {
          console.error('❌ Erro ao verificar status:', statusResponse.error);
        }
      }
    } else {
      console.error('❌ Erro ao criar PIX:', pixResponse.error);
    }
  } catch (error) {
    console.error('❌ Exceção ao testar PIX:', error);
  }

  // 3. Testar tokenização de cartão
  console.log('\n💳 Testando tokenização de cartão de crédito...');
  
  // Dados de cartão de teste do Mercado Pago
  // https://www.mercadopago.com.br/developers/pt/docs/checkout-api/integration-test/test-cards
  const cardData = {
    cardNumber: '5031433215406351', // Cartão Mastercard de teste
    cardHolder: 'APRO TEST',
    cardExpiry: '12/25',
    cardCvv: '123',
    docType: 'CPF',
    docNumber: '12345678909'
  };
  
  try {
    const tokenResponse = await mercadoPagoApi.tokenizeCard(cardData);
    
    if (tokenResponse.success && tokenResponse.data?.token) {
      console.log('✅ Cartão tokenizado com sucesso!');
      console.log(`- Token: ${tokenResponse.data.token.substring(0, 8)}...`);
      
      // 4. Testar criação de pagamento com cartão
      console.log('\n💰 Testando pagamento com cartão de crédito...');
      const cardPaymentData = {
        ...customerData,
        cardToken: tokenResponse.data.token,
        installments: 1
      };
      
      const cardResponse = await mercadoPagoApi.createCreditCardPayment(cardPaymentData);
      
      if (cardResponse.success && cardResponse.data) {
        console.log('✅ Pagamento com cartão criado com sucesso!');
        console.log('📊 Detalhes do pagamento:');
        console.log(`- ID do pagamento: ${cardResponse.data.id}`);
        console.log(`- Status: ${cardResponse.data.status}`);
        console.log(`- Detalhes: ${cardResponse.data.status_detail}`);
        
        // 5. Testar verificação de status do pagamento com cartão
        if (cardResponse.data.id) {
          console.log('\n🔍 Testando verificação de status do pagamento com cartão...');
          const cardStatusResponse = await mercadoPagoApi.checkPaymentStatus(cardResponse.data.id);
          
          if (cardStatusResponse.success) {
            console.log('✅ Verificação de status realizada com sucesso!');
            console.log(`- Status atual: ${cardStatusResponse.data?.status}`);
            console.log(`- Detalhes: ${cardStatusResponse.data?.status_detail}`);
          } else {
            console.error('❌ Erro ao verificar status:', cardStatusResponse.error);
          }
        }
      } else {
        console.error('❌ Erro ao criar pagamento com cartão:', cardResponse.error);
      }
    } else {
      console.error('❌ Erro ao tokenizar cartão:', tokenResponse.error);
    }
  } catch (error) {
    console.error('❌ Exceção ao testar cartão:', error);
  }
  
  console.log('\n🏁 Testes finalizados!');
}

// Executar os testes
testMercadoPagoIntegration().catch(console.error);
