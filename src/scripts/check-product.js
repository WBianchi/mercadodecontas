// Script para verificar a estrutura de um produto
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchProducts() {
  try {
    // Verificar todos os produtos
    const allProducts = await prisma.product.findMany({
      where: {
        inStock: true
      },
      take: 20,
      select: {
        id: true,
        name: true,
        slug: true,
        sku: true
      }
    });
    
    console.log('Total de produtos encontrados:', allProducts.length);
    
    // Filtrando produtos com e sem slug
    const productsWithSlug = allProducts.filter(p => p.slug !== null && p.slug !== undefined);
    const productsWithoutSlug = allProducts.filter(p => p.slug === null || p.slug === undefined);
    
    console.log('Produtos com slug:', productsWithSlug.length);
    console.log('Produtos sem slug:', productsWithoutSlug.length);
    
    if (productsWithSlug.length > 0) {
      const sampleProduct = productsWithSlug[0];
      console.log('\nExemplo de produto com slug:', JSON.stringify(sampleProduct, null, 2));
      
      console.log('\nURLs possíveis para este produto:');
      console.log(`1. /produto/${sampleProduct.slug}`);
      console.log(`2. /produto/${sampleProduct.sku}`);
      console.log(`3. /produto/${sampleProduct.id}`);
      console.log(`4. /produto/${sampleProduct.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`);
    }
    
    if (productsWithoutSlug.length > 0) {
      console.log('\nExemplo de produto sem slug:', JSON.stringify(productsWithoutSlug[0], null, 2));
    }
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchProducts();
