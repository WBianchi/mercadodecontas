-- Adiciona a coluna slug como nullable temporariamente
ALTER TABLE "Product" ADD COLUMN "slug" TEXT;

-- Atualiza a coluna slug com valores baseados no nome do produto
UPDATE "Product" SET "slug" = LOWER(REPLACE(REPLACE(REPLACE(REPLACE(name, ' ', '-'), '.', ''), ',', ''), '/', '-'));

-- Garante que todos os slugs sejam únicos adicionando o ID ao final em caso de duplicação
UPDATE "Product" SET "slug" = "slug" || '-' || id::text
WHERE id IN (
    SELECT id FROM "Product" p
    WHERE (
        SELECT COUNT(*) FROM "Product" p2
        WHERE p2."slug" = p."slug"
    ) > 1
);

-- Cria o índice de unicidade
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- Altera a coluna para NOT NULL após preencher todos os valores
ALTER TABLE "Product" ALTER COLUMN "slug" SET NOT NULL;
