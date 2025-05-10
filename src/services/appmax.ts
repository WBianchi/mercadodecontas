import axios from 'axios';
import { APPMAX_CONFIG } from '@/config/appmax';

interface CreatePixPaymentProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  documentNumber: string;
  expirationDate?: string;
  value: number;
  productName: string;
}

interface PixPaymentResponse {
  success: boolean;
  data?: {
    pix_qrcode: string;
    pix_emv: string;
    pix_creation_date: string;
    pix_expiration_date: string;
  };
  error?: string;
}

export const appmaxApi = {
  async createCustomer({
    name,
    email,
    phone,
    documentNumber
  }) {
    try {
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ');

      const payload = {
        "access-token": APPMAX_CONFIG.TOKEN,
        firstname: firstName,
        lastname: lastName || firstName,
        email: email,
        telephone: phone?.replace(/\D/g, '') || '',
        document_number: documentNumber?.replace(/\D/g, '')
      };

      console.log('Debug - Appmax Create Customer Payload:', payload);

      const response = await axios.post(
        `${APPMAX_CONFIG.BASE_URL}/customer`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'access-token': APPMAX_CONFIG.TOKEN
          }
        }
      );

      console.log('Debug - Appmax Create Customer Response:', response.data);

      if (!response.data.success) {
        throw new Error(response.data.text || 'Erro ao criar cliente na Appmax');
      }

      return response.data.data;
    } catch (error: any) {
      console.error('Erro ao criar cliente na Appmax:', error);
      
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      
      throw error;
    }
  },

  async createOrder({
    customerId,
    value,
    productName
  }) {
    try {
      const payload = {
        "access-token": APPMAX_CONFIG.TOKEN,
        products: [{
          sku: "123123", // Fixo por enquanto
          name: productName,
          qty: 1,
          price: value,
          digital_product: 1
        }],
        customer_id: customerId
      };

      console.log('Debug - Appmax Create Order Payload:', payload);

      const response = await axios.post(
        `${APPMAX_CONFIG.BASE_URL}/order`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'access-token': APPMAX_CONFIG.TOKEN
          }
        }
      );

      console.log('Debug - Appmax Create Order Response:', response.data);

      if (!response.data.success) {
        throw new Error(response.data.text || 'Erro ao criar pedido na Appmax');
      }

      return response.data.data;
    } catch (error: any) {
      console.error('Erro ao criar pedido na Appmax:', error);
      
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      
      throw error;
    }
  },

  async tokenizeCard({
    cardHolder,
    cardNumber,
    cardCvv,
    cardExpiry
  }) {
    try {
      // Extrair mês e ano da data MM/YY
      const [month, year] = cardExpiry.split('/');

      const payload = {
        "access-token": APPMAX_CONFIG.TOKEN,
        "card": {
          name: cardHolder,
          number: cardNumber.replace(/\D/g, ''),
          cvv: cardCvv,
          month: parseInt(month),
          year: parseInt(year)  // Já vem como YY
        }
      };

      console.log('Debug - Appmax Tokenize Card Payload:', payload);

      const response = await axios.post(
        `${APPMAX_CONFIG.BASE_URL}/tokenize/card`,
        payload
      );

      console.log('Debug - Appmax Tokenize Card Response:', response.data);

      if (!response.data.success) {
        throw new Error(response.data.text || 'Erro ao tokenizar cartão');
      }

      return response.data.data.token;
    } catch (error: any) {
      console.error('Erro ao tokenizar cartão:', error);
      
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      
      throw error;
    }
  },

  async createPixPayment({
    customerName,
    customerEmail,
    customerPhone,
    documentNumber,
    expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('.')[0].replace('T', ' '),
    value,
    productName
  }: CreatePixPaymentProps): Promise<PixPaymentResponse> {
    try {
      // Primeiro cria o cliente na Appmax
      const customer = await this.createCustomer({
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        documentNumber
      });

      // Depois cria o pedido na Appmax
      const order = await this.createOrder({
        customerId: customer.id,
        value,
        productName
      });

      // Por fim cria o pagamento PIX
      const payload = {
        "access-token": APPMAX_CONFIG.TOKEN,
        cart: {
          order_id: order.id
        },
        customer: {
          customer_id: customer.id
        },
        payment: {
          pix: {
            document_number: documentNumber.replace(/\D/g, ''),
            expiration_date: expirationDate
          }
        }
      };

      console.log('Debug - Appmax PIX Payment Payload:', payload);

      const response = await axios.post(
        `${APPMAX_CONFIG.BASE_URL}/payment/pix`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'access-token': APPMAX_CONFIG.TOKEN
          }
        }
      );

      console.log('Debug - Appmax PIX Payment Response:', response.data);

      if (response.data.success !== "ATIVA") {
        throw new Error(response.data.text || 'Erro ao gerar PIX');
      }

      return {
        success: true,
        data: {
          pix_qrcode: response.data.data.pix_qrcode,
          pix_emv: response.data.data.pix_emv,
          pix_creation_date: response.data.data.pix_creation_date,
          pix_expiration_date: response.data.data.pix_expiration_date
        }
      };
    } catch (error: any) {
      console.error('Erro ao processar pagamento PIX:', error);
      
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      
      return {
        success: false,
        error: error.response?.data?.text || error.message || 'Erro ao processar pagamento PIX'
      };
    }
  },

  async createCreditCardPayment({
    customerName,
    customerEmail,
    customerPhone,
    cardNumber,
    cardHolder,
    cardExpiry,
    cardCvv,
    documentNumber,
    installments = 1,
    value,
    productName
  }) {
    try {
      // Primeiro tokeniza o cartão
      const cardToken = await this.tokenizeCard({
        cardHolder,
        cardNumber,
        cardCvv,
        cardExpiry
      });

      console.log('Debug - Card Token:', cardToken);

      // Depois cria o cliente na Appmax
      const customer = await this.createCustomer({
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        documentNumber
      });

      console.log('Debug - Customer:', customer);

      // Depois cria o pedido na Appmax
      const order = await this.createOrder({
        customerId: customer.id,
        value,
        productName
      });

      console.log('Debug - Order:', order);

      // Por fim processa o pagamento
      const response = await axios.post(
        `${APPMAX_CONFIG.BASE_URL}/payment/credit-card`,
        {
          "access-token": APPMAX_CONFIG.TOKEN,
          cart: {
            order_id: order.id
          },
          customer: {
            customer_id: customer.id
          },
          payment: {
            CreditCard: {
              cvv: cardCvv,
              token: cardToken,
              document_number: documentNumber.replace(/\D/g, ''),
              installments,
              soft_descriptor: "MERCADOCONTA"
            }
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      console.log('Debug - Appmax Credit Card Payment Response:', response.data);

      if (!response.data.success) {
        const errorMessage = response.data.data?.message || response.data.text || 'Erro ao processar cartão';
        console.error('Erro no processamento:', errorMessage, response.data);
        
        // Se for erro de cartão, retorna uma mensagem mais amigável
        if (response.data.status === 400 && response.data.data?.errorCode === 400) {
          throw new Error('Cartão não autorizado. Por favor, verifique os dados ou tente outro cartão.');
        }
        
        throw new Error(errorMessage);
      }

      return {
        success: true,
        orderId: order.id,
        status: response.data.data?.order?.status || 'pendente'
      };
    } catch (error: any) {
      console.error('Erro ao processar cartão:', error);
      throw error;
    }
  }
};
