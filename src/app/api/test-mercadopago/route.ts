import { NextResponse } from "next/server"
import { mercadoPagoApi } from "@/services/mercadopago"

export async function GET() {
  try {
    console.log('🧪 Iniciando testes de integração com Mercado Pago...')
    
    const testOrderId = Date.now()
    const testValue = 0.50 
    const testProductName = 'Produto de Teste'
    
    // Dados de teste
    const customerData = {
      customerName: 'Cliente Teste',
      customerEmail: 'teste@exemplo.com',
      customerPhone: '11999999999',
      documentNumber: '12345678909', // CPF de teste
      value: testValue,
      productName: testProductName,
      orderId: testOrderId
    }

    const results = {
      pix: null,
      pixStatus: null,
      cardToken: null,
      cardPayment: null,
      cardStatus: null,
    }

    // 1. Testar criação de pagamento PIX
    console.log('\n📱 Testando criação de pagamento PIX...')
    try {
      const pixResponse = await mercadoPagoApi.createPixPayment(customerData)
      
      if (pixResponse.success && pixResponse.data) {
        console.log('✅ PIX criado com sucesso!')
        results.pix = {
          id: pixResponse.data.id,
          status: pixResponse.data.status,
          qrCodeGenerated: !!pixResponse.data.qr_code,
          qrCodeBase64Generated: !!pixResponse.data.qr_code_base64
        }
        
        // 2. Testar verificação de status do pagamento PIX
        if (pixResponse.data.id) {
          console.log('\n🔍 Testando verificação de status do pagamento PIX...')
          const statusResponse = await mercadoPagoApi.checkPaymentStatus(pixResponse.data.id)
          
          if (statusResponse.success) {
            console.log('✅ Verificação de status realizada com sucesso!')
            results.pixStatus = {
              status: statusResponse.data?.status,
              details: statusResponse.data?.status_detail
            }
          } else {
            console.error('❌ Erro ao verificar status:', statusResponse.error)
            results.pixStatus = { error: statusResponse.error }
          }
        }
      } else {
        console.error('❌ Erro ao criar PIX:', pixResponse.error)
        results.pix = { error: pixResponse.error }
      }
    } catch (error: any) {
      console.error('❌ Exceção ao testar PIX:', error)
      results.pix = { error: error.message }
    }

    // 3. Testar tokenização de cartão
    console.log('\n💳 Testando tokenização de cartão de crédito...')
    const cardData = {
      cardNumber: '5031433215406351', // Cartão Mastercard de teste
      cardHolder: 'APRO TEST',
      cardExpiry: '12/25',
      cardCvv: '123',
      docType: 'CPF',
      docNumber: '12345678909'
    }
    
    try {
      const tokenResponse = await mercadoPagoApi.tokenizeCard(cardData)
      
      if (tokenResponse.success && tokenResponse.data?.token) {
        console.log('✅ Cartão tokenizado com sucesso!')
        results.cardToken = { 
          token: `${tokenResponse.data.token.substring(0, 8)}...`
        }
        
        // 4. Testar criação de pagamento com cartão
        console.log('\n💰 Testando pagamento com cartão de crédito...')
        const cardPaymentData = {
          ...customerData,
          cardToken: tokenResponse.data.token,
          installments: 1
        }
        
        const cardResponse = await mercadoPagoApi.createCreditCardPayment(cardPaymentData)
        
        if (cardResponse.success && cardResponse.data) {
          console.log('✅ Pagamento com cartão criado com sucesso!')
          results.cardPayment = {
            id: cardResponse.data.id,
            status: cardResponse.data.status,
            details: cardResponse.data.status_detail
          }
          
          // 5. Testar verificação de status do pagamento com cartão
          if (cardResponse.data.id) {
            console.log('\n🔍 Testando verificação de status do pagamento com cartão...')
            const cardStatusResponse = await mercadoPagoApi.checkPaymentStatus(cardResponse.data.id)
            
            if (cardStatusResponse.success) {
              console.log('✅ Verificação de status realizada com sucesso!')
              results.cardStatus = {
                status: cardStatusResponse.data?.status,
                details: cardStatusResponse.data?.status_detail
              }
            } else {
              console.error('❌ Erro ao verificar status:', cardStatusResponse.error)
              results.cardStatus = { error: cardStatusResponse.error }
            }
          }
        } else {
          console.error('❌ Erro ao criar pagamento com cartão:', cardResponse.error)
          results.cardPayment = { error: cardResponse.error }
        }
      } else {
        console.error('❌ Erro ao tokenizar cartão:', tokenResponse.error)
        results.cardToken = { error: tokenResponse.error }
      }
    } catch (error: any) {
      console.error('❌ Exceção ao testar cartão:', error)
      results.cardToken = { error: error.message }
    }
    
    console.log('\n🏁 Testes finalizados!')
    
    return NextResponse.json({
      success: true,
      message: 'Testes de integração do Mercado Pago concluídos',
      results
    })
  } catch (error: any) {
    console.error('Erro no teste de integração:', error)
    return NextResponse.json({
      success: false,
      message: 'Erro ao executar testes de integração',
      error: error.message
    }, { status: 500 })
  }
}
