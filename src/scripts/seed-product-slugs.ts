import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function main() {
  // Busca todos os produtos
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  console.log(`Encontrados ${products.length} produtos para atualizar.`);
  
  // Atualiza cada produto com um slug baseado no nome
  let updated = 0;
  let skipped = 0;
  
  for (const product of products) {
    // Pula os produtos que já têm slug
    if (product.slug) {
      skipped++;
      continue;
    }
    
    // Cria um slug a partir do nome
    let slug = slugify(product.name, {
      lower: true,       // Converte para minúsculas
      strict: true,      // Remove caracteres especiais
      locale: 'pt',      // Tratamento específico para português
    });
    
    // Verificar duplicidade
    const existing = await prisma.product.findUnique({
      where: { slug },
      select: { id: true },
    });
    
    // Se já existe um produto com este slug, adiciona o ID ao final
    if (existing && existing.id !== product.id) {
      slug = `${slug}-${product.id}`;
    }
    
    // Atualiza o produto com o novo slug
    await prisma.product.update({
      where: { id: product.id },
      data: { slug },
    });
    
    updated++;
    
    if (updated % 100 === 0) {
      console.log(`Atualizados ${updated} produtos...`);
    }
  }
  
  console.log(`Atualização concluída. Atualizados: ${updated}, Ignorados: ${skipped}`);
}

main()
  .catch((e) => {
    console.error('Erro ao atualizar slugs:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
