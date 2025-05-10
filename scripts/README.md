# Scripts de Importação WooCommerce

Este diretório contém scripts para importar dados do WooCommerce e WCFM Marketplace para o novo sistema.

## Configuração

1. Adicione as seguintes variáveis ao seu arquivo `.env`:

```env
# WordPress/WooCommerce
WP_URL=https://seu-site.com
WC_CONSUMER_KEY=sua_consumer_key
WC_CONSUMER_SECRET=seu_consumer_secret
```

2. Certifique-se de que o banco de dados está atualizado:

```bash
yarn prisma db push
```

3. Execute o script de importação:

```bash
yarn tsx scripts/import-woocommerce.ts
```

## O que é importado

O script importa:

1. **Categorias** do WooCommerce
   - Nome, slug, descrição, imagens
   - Mantém IDs originais para sincronização

2. **Tags** do WooCommerce
   - Nome, slug, descrição
   - Mantém IDs originais

3. **Lojistas** do WCFM Marketplace
   - Informações da loja
   - Dados de contato
   - Redes sociais
   - Políticas da loja
   - Mantém IDs originais

4. **Produtos**
   - Informações básicas
   - Preços e estoque
   - Imagens
   - Variações
   - Atributos
   - Categorias e tags
   - Mantém IDs originais

## Notas Importantes

1. O script usa `upsert` para atualizar registros existentes ou criar novos
2. As senhas dos lojistas precisarão ser redefinidas
3. As imagens são mantidas com as URLs originais do WordPress
4. Os metadados originais são preservados no campo `wpMetadata`

## Resolução de Problemas

Se encontrar erros:

1. Verifique as credenciais do WooCommerce
2. Confirme se a API REST está ativa
3. Verifique se o WCFM Marketplace está configurado corretamente
4. Verifique os logs de erro no console
