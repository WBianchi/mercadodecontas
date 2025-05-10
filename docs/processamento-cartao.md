# Processamento de Pagamentos com Cartão

Este documento descreve o fluxo de processamento de pagamentos com cartão de crédito no Mercado de Contas.

## Fluxo de Processamento

1. **Tokenização do Cartão**
   - Os dados do cartão são enviados para o Mercado Pago
   - Um token de cartão é gerado para uso único
   - Dados sensíveis não trafegam em nossos servidores

2. **Criação do Pagamento**
   - O token é usado para criar um pagamento
   - A bandeira do cartão é detectada automaticamente
   - O pagamento é processado via Mercado Pago

## Detecção de Bandeira do Cartão

O sistema detecta automaticamente a bandeira do cartão com base nos primeiros dígitos:

- **Visa**: começa com 4
- **Mastercard**: começa com 5[1-5] ou faixas específicas começando com 2
- **American Express**: começa com 34 ou 37
- **Elo**: várias faixas específicas
- **Hipercard**: começa com 606282 ou faixas específicas
- **JCB**: começa com 35
- **Diners**: começa com 36, 38 ou 30[0-5]

## Tratamento de Datas de Expiração

O sistema processa diferentes formatos de data de expiração:

- MM/YY (ex: 01/25)
- MM/YYYY (ex: 01/2025)
- MMYY (ex: 0125)
- MMYYYY (ex: 012025)

## Códigos de Erro Comuns

| Código | Descrição                          | Solução                                             |
|--------|------------------------------------|----------------------------------------------------|
| 10103  | Different parameters for the bin   | Bandeira do cartão incorreta                        |
| 10105  | Bin not found                      | Número do cartão inválido                           |
| 2062   | Invalid card token                 | O token do cartão é inválido ou expirou             |
| 2046   | Fundos insuficientes               | O cartão não tem saldo para completar a compra      |
| 2040   | Cartão não autorizado              | Portador do cartão não autorizou o pagamento        |
| 3012   | Cartão inválido                    | Dados do cartão são inválidos                       |
| 2001   | Cartão expirado                    | O cartão expirou                                    |

## Exemplo de Implementação

```typescript
// 1. Tokenização do cartão
const tokenResponse = await mercadoPagoApi.tokenizeCard({
  cardNumber: '5031755734530604',
  cardHolder: 'NOME DO TITULAR',
  cardExpiry: '11/25',
  cardCvv: '123',
  documentType: 'CPF',
  documentNumber: '12345678900'
});

// 2. Criação do pagamento
const paymentResponse = await mercadoPagoApi.createCreditCardPayment({
  customerName: 'Nome do Cliente',
  customerEmail: 'cliente@email.com',
  customerPhone: '(11) 98765-4321',
  documentNumber: '12345678900',
  cardToken: tokenResponse.cardToken,
  installments: 1,
  value: 100.00,
  productName: 'Nome do Produto',
  orderId: 123,
  cardNumber: '5031755734530604' // Para detecção da bandeira
});
```

## Testes

Para testar o processamento, utilize os cartões de teste oficiais do Mercado Pago listados no arquivo `cartoes-teste.md`.

## Tratamento de Erros

O sistema inclui tratamento robusto de erros, fornecendo mensagens claras sobre problemas no processamento:

- Validação de dados do cartão
- Verificação do CPF/CNPJ
- Detecção correta da bandeira
- Tratamento adequado do token
- Respostas formatadas para o frontend

## Configurações

O sistema usa as configurações definidas em `MERCADOPAGO_CONFIG`, que deve conter:

- ACCESS_TOKEN: Token de acesso à API do Mercado Pago
- PUBLIC_KEY: Chave pública do Mercado Pago
- BASE_URL: URL base da sua aplicação para notificações
