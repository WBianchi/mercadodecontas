import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkProducts() {
  try {
    const products = await prisma.product.findMany()
    console.log('Total de produtos:', products.length)
    console.log('\nPrimeiros 3 produtos:')
    products.slice(0, 3).forEach(product => {
      console.log(`\nNome: ${product.name}`)
      console.log(`Preço: R$ ${product.price}`)
      console.log(`SKU: ${product.sku}`)
      console.log(`Em estoque: ${product.inStock ? 'Sim' : 'Não'}`)
      console.log(`Foto: ${product.productPhoto || 'Sem foto'}`)
      console.log(`Descrição: ${product.shortDescription || 'Sem descrição'}`)
      console.log('---')
    })
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkProducts()
