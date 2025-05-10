# Guia de Configuração de Autenticação Social

Este guia explica como configurar os provedores de autenticação social para o Mercado de Contas.

## Configuração do Google OAuth

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. No menu lateral, navegue até "APIs e Serviços" > "Credenciais"
4. Clique em "Criar Credenciais" e selecione "ID do Cliente OAuth"
5. Selecione "Aplicativo da Web" como tipo de aplicativo
6. Dê um nome para o cliente, por exemplo, "Mercado de Contas"
7. Em "Origens JavaScript autorizadas", adicione:
   - `http://localhost:3000` (para desenvolvimento)
   - `https://mercadodecontas.com.br` (para produção)
8. Em "URIs de redirecionamento autorizados", adicione:
   - `http://localhost:3000/api/auth/callback/google` (para desenvolvimento)
   - `https://mercadodecontas.com.br/api/auth/callback/google` (para produção)
9. Clique em "Criar"
10. Copie o "ID do cliente" e o "Segredo do cliente"
11. Adicione essas credenciais ao seu arquivo `.env`:
    ```
    GOOGLE_CLIENT_ID=seu-client-id
    GOOGLE_CLIENT_SECRET=seu-client-secret
    ```

## Configuração do Facebook OAuth

1. Acesse o [Facebook Developers](https://developers.facebook.com/)
2. Clique em "Meus Aplicativos" e depois em "Criar Aplicativo"
3. Selecione "Consumidor" como tipo de aplicativo
4. Preencha as informações básicas do aplicativo e clique em "Criar aplicativo"
5. Na página de configuração do aplicativo, navegue até "Adicionar produtos" e selecione "Login do Facebook"
6. Em "Configurações" do Login do Facebook, adicione as seguintes URLs:
   - URIs de redirecionamento do OAuth: 
     - `http://localhost:3000/api/auth/callback/facebook` (para desenvolvimento)
     - `https://mercadodecontas.com.br/api/auth/callback/facebook` (para produção)
   - Domínios do site: 
     - `localhost` (para desenvolvimento)
     - `mercadodecontas.com.br` (para produção)
7. Em "Configurações" > "Básico", você encontrará o "ID do Aplicativo" e a "Chave Secreta do Aplicativo"
8. Adicione essas credenciais ao seu arquivo `.env`:
    ```
    FACEBOOK_CLIENT_ID=seu-app-id
    FACEBOOK_CLIENT_SECRET=seu-app-secret
    ```

## Configuração do SMTP para E-mails de Recuperação de Senha

1. Configure um servidor SMTP (você pode usar serviços como Gmail, Amazon SES, SendGrid, etc.)
2. Adicione as seguintes variáveis ao seu arquivo `.env`:
    ```
    SMTP_HOST=smtp.example.com
    SMTP_PORT=587
    SMTP_SECURE=false
    SMTP_USER=seu-email@example.com
    SMTP_PASSWORD=sua-senha
    SMTP_FROM=noreply@mercadodecontas.com.br
    ```

3. Se estiver usando o Gmail, você precisará:
   - Ativar a verificação em duas etapas
   - Criar uma "Senha de aplicativo" específica para usar aqui

## URLs de Callback

Certifique-se de que as URLs de callback estejam corretas no arquivo `next.config.js`:

```js
module.exports = {
  // ... outras configurações
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
    ];
  },
};
```

## Testando a Configuração

1. Reinicie o servidor após adicionar as variáveis de ambiente
2. Acesse a página de login e tente fazer login com o Google ou Facebook
3. Teste a recuperação de senha enviando um e-mail de recuperação
