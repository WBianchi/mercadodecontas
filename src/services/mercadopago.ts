import { MercadoPagoConfig, Payment, CardToken } from 'mercadopago';
import { MERCADOPAGO_CONFIG } from '@/config/mercadopago';

// Configuração do SDK do Mercado Pago v2
const client = new MercadoPagoConfig({ 
  accessToken: MERCADOPAGO_CONFIG.ACCESS_TOKEN 
});

const payment = new Payment(client);
const cardToken = new CardToken(client);

interface CreatePixPaymentProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  documentNumber: string;
  value: number;
  productName: string;
  orderId: number;
}

interface PixPaymentResponse {
  success: boolean;
  data?: {
    id: string;
    status: string;
    qrCodeUrl: string;
    qrCodeBase64: string;
    pixKey: string;
    ticketUrl: string;
    expirationDate: string;
  };
  error?: string;
}

interface CreateCreditCardPaymentProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  documentNumber: string;
  cardToken: string;
  installments?: number;
  value: number;
  productName: string;
  orderId: number;
  cardNumber?: string; // Opcional, mas útil para detectar a bandeira do cartão
}

interface TokenizeCardProps {
  cardNumber: string;
  cardHolder: string;
  cardExpiry: string;
  cardCvv: string;
  documentType?: string;
  documentNumber?: string;
}

export const mercadoPagoApi = {
  /**
   * Processa a data de expiração do cartão para suportar vários formatos
   */
  processExpiryDate(expiryDate: string) {
    let month, year;
    
    // Remove caracteres não numéricos e barras
    const cleanExpiry = expiryDate.replace(/[^\d\/]/g, '');
    
    // Se contém barra, ex: MM/YY ou MM/YYYY
    if (cleanExpiry.includes('/')) {
      [month, year] = cleanExpiry.split('/');
    } 
    // Se é apenas números (MMYY)
    else if (cleanExpiry.length === 4) {
      month = cleanExpiry.substring(0, 2);
      year = cleanExpiry.substring(2, 4);
    }
    // Se é MMYYYY
    else if (cleanExpiry.length === 6) {
      month = cleanExpiry.substring(0, 2);
      year = cleanExpiry.substring(2, 6);
    }
    // Se é apenas MM/Y (um dígito para o ano)
    else if (cleanExpiry.length === 3) {
      month = cleanExpiry.substring(0, 2);
      year = `0${cleanExpiry.substring(2, 3)}`;
    }
    else {
      // Fallback para o mês e ano atual
      const currentDate = new Date();
      month = String(currentDate.getMonth() + 1).padStart(2, '0');
      year = String(currentDate.getFullYear()).slice(2);
    }
    
    // Garantir que o mês esteja no formato correto (2 dígitos)
    month = month.padStart(2, '0');
    
    return { month, year };
  },

  /**
   * Detecta o tipo/bandeira do cartão com base nos primeiros dígitos
   */
  detectCardType(cardNumber: string): string {
    const cleanNumber = cardNumber.replace(/\D/g, '');
    
    // Cartões específicos do cliente
    if (/^9696/.test(cleanNumber)) {
      console.log('Cartão específico detectado com prefixo 9696. Usando bandeira master.');
      return 'master';
    }
    
    // Cartões de teste do Mercado Pago têm tratamento especial
    if (cleanNumber === '5031755734530604' || cleanNumber === '5031755734530605') {
      return 'master';
    }
    
    if (cleanNumber === '4235647728025682' || cleanNumber === '4235647728025683') {
      return 'visa';
    }
    
    if (cleanNumber === '371180303257522') {
      return 'amex';
    }
    
    // Sequências regulares para detecção de bandeira comum
    // Visa: começa com 4
    if (/^4/.test(cleanNumber)) return 'visa';
    
    // Mastercard: começa com 5[1-5] ou faixas específicas que começam com 2
    if (/^5[1-5]/.test(cleanNumber) || /^(222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)/.test(cleanNumber)) return 'master';
    
    // American Express: começa com 34 ou 37
    if (/^3[47]/.test(cleanNumber)) return 'amex';
    
    // Elo: várias faixas específicas
    if (/^(401178|401179|438935|457631|457632|431274|451416|457393|504175|506699|506770|506771|506772|506773|506774|506775|506776|506777|506778|627780|636297|636368|(506(7|9)|5067(7|8|9)|50900|50901|50902))/.test(cleanNumber)) return 'elo';
    
    // Hipercard: começa com 606282 ou faixas específicas
    if (/^(606282|3841)/.test(cleanNumber) || /^(384[0-9])/.test(cleanNumber)) return 'hipercard';
    
    // JCB: começa com 35
    if (/^35/.test(cleanNumber)) return 'jcb';
    
    // Diners: começa com 36, 38 ou 30[0-5]
    if (/^(36|38|30[0-5])/.test(cleanNumber)) return 'diners';
    
    // Caso não identifique, mantém o padrão como 'credit_card'
    return 'credit_card';
  },

  /**
   * Tokeniza um cartão de crédito
   */
  async tokenizeCard({
    cardNumber,
    cardHolder,
    cardExpiry,
    cardCvv,
    documentType = 'CPF',
    documentNumber
  }: TokenizeCardProps) {
    try {
      // Processar data de expiração
      const expiryData = this.processExpiryDate(cardExpiry);
      console.log('Debug - Data de expiração processada:', expiryData);

      // Construir o payload para tokenização
      const payload = {
        card_number: cardNumber.replace(/\D/g, ''),
        cardholder: {
          name: cardHolder,
          identification: {
            type: documentNumber.length <= 11 ? 'CPF' : 'CNPJ',
            number: documentNumber.replace(/\D/g, '')
          }
        },
        security_code: cardCvv,
        expiration_month: expiryData.month,
        expiration_year: expiryData.year.length === 2 ? `20${expiryData.year}` : expiryData.year
      };

      console.log('Debug - MercadoPago Tokenize Card Payload:', JSON.stringify(payload, null, 2));

      const response = await cardToken.create({ body: payload });

      console.log('Debug - MercadoPago Tokenize Card Response:', JSON.stringify(response, null, 2));

      if (response && response.id) {
        return {
          success: true,
          data: {
            token: response.id
          },
          cardToken: response.id // Para compatibilidade com código existente
        };
      }

      return {
        success: false,
        error: "Falha ao tokenizar cartão"
      };
    } catch (error: any) {
      console.error('Erro ao tokenizar cartão:', error);
      return {
        success: false,
        error: error.message || 'Erro ao tokenizar cartão'
      };
    }
  },

  /**
   * Cria um pagamento via PIX
   */
  async createPixPayment({
    customerName,
    customerEmail,
    customerPhone,
    documentNumber,
    value,
    productName,
    orderId
  }: CreatePixPaymentProps): Promise<PixPaymentResponse> {
    try {
      // Formatação do número de telefone para o padrão do Mercado Pago
      const phone = customerPhone.replace(/\D/g, '');
      const areaCode = phone.substring(0, 2);
      const phoneNumber = phone.substring(2);

      // Gerar chave de idempotência
      const idempotencyKey = `pix-${orderId}-${Date.now()}`;

      const payload = {
        transaction_amount: Number(value.toFixed(2)),
        description: productName,
        payment_method_id: 'pix',
        payer: {
          email: customerEmail,
          first_name: customerName.split(' ')[0],
          last_name: customerName.split(' ').slice(1).join(' ') || customerName.split(' ')[0],
          identification: {
            type: documentNumber.length <= 11 ? 'CPF' : 'CNPJ',
            number: documentNumber.replace(/\D/g, '')
          },
          phone: {
            area_code: areaCode,
            number: phoneNumber
          }
        },
        external_reference: String(orderId),
        notification_url: "https://mercadodecontas.com.br/api/notification/mercadopago"
      };

      console.log('Debug - MercadoPago Create PIX Payment Payload:', JSON.stringify(payload, null, 2));

      // Adicionar cabeçalho X-Idempotency-Key
      const response = await payment.create({ 
        body: payload,
        requestOptions: {
          idempotencyKey: idempotencyKey
        }
      });

      console.log('Debug - MercadoPago Create PIX Payment Response:', JSON.stringify(response, null, 2));

      if (response.id) {
        // Obter dados do PIX
        const qrCode = response.point_of_interaction?.transaction_data?.qr_code;
        const qrCodeBase64 = response.point_of_interaction?.transaction_data?.qr_code_base64;
        const ticketUrl = response.point_of_interaction?.transaction_data?.ticket_url;

        console.log('Debug - PIX Transaction Data:', JSON.stringify(response.point_of_interaction?.transaction_data, null, 2));

        if (!qrCode && !qrCodeBase64) {
          console.error('Erro: QR Code não encontrado na resposta do Mercado Pago');
          return {
            success: false,
            error: "QR Code não encontrado na resposta do Mercado Pago"
          };
        }

        // Formatando data de expiração (30 minutos a frente)
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 30);

        // Formatar a string base64 como data URL, se necessário
        let formattedQrCodeBase64 = qrCodeBase64;
        if (qrCodeBase64 && !qrCodeBase64.startsWith('data:image')) {
          formattedQrCodeBase64 = `data:image/png;base64,${qrCodeBase64}`;
        }

        // Garantir que os dados retornados estejam disponíveis tanto no objeto data 
        // quanto diretamente no objeto de resposta para compatibilidade
        const pixData = {
          id: response.id,
          status: response.status,
          qrCodeUrl: formattedQrCodeBase64,
          qrCodeBase64: qrCodeBase64, // Manter a string original para compatibilidade
          pixKey: qrCode,
          ticketUrl: ticketUrl,
          expirationDate: expirationDate.toISOString()
        };

        const responseData = {
          success: true,
          data: pixData,
          // Incluir também no nível raiz para compatibilidade com clientes existentes
          ...pixData
        };

        console.log('Debug - Dados formatados do PIX:', JSON.stringify(responseData, null, 2));

        return responseData;
      }

      return {
        success: false,
        error: "Erro ao gerar pagamento PIX"
      };
    } catch (error: any) {
      console.error('Erro ao criar pagamento PIX no Mercado Pago:', error);
      
      if (error.cause) {
        console.error('Causa do erro:', error.cause);
      }
      
      return {
        success: false,
        error: error.message || 'Erro ao criar pagamento PIX no Mercado Pago'
      };
    }
  },

  /**
   * Cria um pagamento via cartão de crédito
   */
  async createCreditCardPayment({
    customerName,
    customerEmail,
    customerPhone,
    documentNumber,
    cardToken,
    installments = 1,
    value,
    productName,
    orderId,
    cardNumber
  }: CreateCreditCardPaymentProps & { cardNumber: string }) {
    try {
      // Formatação do número de telefone para o padrão do Mercado Pago
      const phone = customerPhone.replace(/\D/g, '');
      const areaCode = phone.substring(0, 2);
      const phoneNumber = phone.substring(2);
      
      // Gerar chave de idempotência
      const idempotencyKey = `card-${orderId}-${Date.now()}`;

      // Detectar o tipo de cartão com base nos primeiros dígitos
      const cardType = this.detectCardType(cardNumber);
      console.log(`Debug - Bandeira do cartão detectada: ${cardType}, baseado no número: ${cardNumber.substring(0, 6)}****${cardNumber.slice(-4)}`);

      const payload = {
        transaction_amount: Number(value.toFixed(2)),
        token: cardToken,
        description: productName,
        installments: Number(installments),
        payment_method_id: cardType,
        payer: {
          email: customerEmail,
          first_name: customerName.split(' ')[0],
          last_name: customerName.split(' ').slice(1).join(' ') || customerName,
          identification: {
            type: documentNumber.length <= 11 ? 'CPF' : 'CNPJ',
            number: documentNumber
          },
          phone: {
            area_code: areaCode,
            number: phoneNumber
          }
        },
        external_reference: orderId.toString(),
        notification_url: `${MERCADOPAGO_CONFIG.BASE_URL}/api/notification/mercadopago`
      };

      console.log('Debug - MercadoPago Create Credit Card Payment Payload:', JSON.stringify(payload, null, 2));

      // Verificar se a URL de notificação está definida corretamente
      if (!MERCADOPAGO_CONFIG.BASE_URL || MERCADOPAGO_CONFIG.BASE_URL === 'undefined') {
        console.error('URL base não definida corretamente nas configurações do Mercado Pago');
        return {
          success: false,
          error: 'URL de notificação inválida. Verifique a configuração BASE_URL.',
          errorDetails: [{
            code: 4020,
            description: 'Configuração de URL de notificação ausente ou inválida'
          }]
        };
      }

      // Criar o pagamento via API
      const response = await payment.create({
        body: payload,
        requestOptions: {
          idempotencyKey: idempotencyKey
        }
      });

      console.log('Debug - MercadoPago Create Credit Card Payment Response:', JSON.stringify(response, null, 2));

      if (response && response.id) {
        return {
          success: true,
          id: response.id.toString(),
          status: response.status,
          statusDetail: response.status_detail,
          externalReference: response.external_reference,
          paymentMethodId: response.payment_method_id
        };
      }

      return {
        success: false,
        error: "Erro ao criar pagamento por cartão"
      };
    } catch (error: any) {
      console.error('Erro ao criar pagamento por cartão no Mercado Pago:', error);
      
      if (error.cause) {
        console.error('Causa do erro:', error.cause);
      }
      
      return {
        success: false,
        error: error.message || 'Erro ao criar pagamento por cartão',
        errorDetails: error.cause || []
      };
    }
  },

  /**
   * Verifica o status de um pagamento
   */
  async checkPaymentStatus(paymentId: string) {
    try {
      const response = await payment.get({ id: paymentId });

      console.log('Debug - MercadoPago Payment Status:', response);

      return {
        success: true,
        data: {
          status: response.status,
          status_detail: response.status_detail,
          external_reference: response.external_reference
        }
      };
    } catch (error: any) {
      console.error('Erro ao verificar status do pagamento no Mercado Pago:', error);
      
      if (error.cause) {
        console.error('Causa do erro:', error.cause);
      }
      
      return {
        success: false,
        error: error.message || 'Erro ao verificar status do pagamento no Mercado Pago'
      };
    }
  }
};
