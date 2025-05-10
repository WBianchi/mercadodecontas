# Cartões de Teste para o Mercado Pago

Este documento lista os cartões de teste oficiais do Mercado Pago que podem ser usados durante o desenvolvimento e testes da integração de pagamento.

## Cartões de Teste

Você pode usar estes cartões para testar diferentes cenários em nosso ambiente de desenvolvimento:

### Mastercard

| Número do Cartão    | Status           | Código de Segurança | Data de Validade | Titular        |
|---------------------|------------------|---------------------|------------------|----------------|
| 5031 7557 3453 0604 | APROVADO         | 123                 | 11/25            | APRO           |
| 5031 7557 3453 0605 | REJEITADO        | 123                 | 11/25            | OTHE           |

### Visa

| Número do Cartão    | Status           | Código de Segurança | Data de Validade | Titular        |
|---------------------|------------------|---------------------|------------------|----------------|
| 4235 6477 2802 5682 | APROVADO         | 123                 | 11/25            | APRO           |
| 4235 6477 2802 5683 | REJEITADO        | 123                 | 11/25            | OTHE           |

### American Express

| Número do Cartão    | Status           | Código de Segurança | Data de Validade | Titular        |
|---------------------|------------------|---------------------|------------------|----------------|
| 3711 8030 3257 522  | APROVADO         | 1234                | 11/25            | APRO           |

## Dados do Titular para Testes

Para testes em ambiente de desenvolvimento, você pode usar os seguintes dados:

**Nome do Titular**: "APRO" para pagamentos aprovados, "OTHE" para outros resultados
**Documento (CPF)**: 19119119100
**Email**: test_user_123@testuser.com

## Códigos de Erro Comuns

| Código | Descrição                          | Solução                                             |
|--------|------------------------------------|----------------------------------------------------|
| 2062   | Invalid card token                 | O token do cartão é inválido ou expirou             |
| 2046   | Fundos insuficientes               | O cartão não tem saldo para completar a compra      |
| 2040   | Cartão não autorizado              | Portador do cartão não autorizou o pagamento        |
| 3012   | Cartão inválido                    | Dados do cartão são inválidos                       |
| 2001   | Cartão expirado                    | O cartão expirou                                    |
| 2004   | Cartão com restrições              | O cartão possui restrições para pagamentos online   |

## Documentação Oficial

Para mais informações, consulte a [documentação oficial do Mercado Pago](https://www.mercadopago.com.br/developers/pt/docs/checkout-api/integration-test/test-cards).
