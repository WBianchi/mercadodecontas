import { ProductCard } from "@/components/cards/product-card"
import { prisma } from "@/lib/prisma"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Licenças Digitais | Mercado de Contas",
  description: "Encontre as melhores licenças digitais para softwares, jogos e muito mais",
}

export default async function LicencasDigitaisPage() {
  const products = await prisma.product.findMany({
    where: {
      Category: {
        some: {
          slug: "licencas-digitais",
        }
      },
      inStock: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      Category: true
    }
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Licenças Digitais</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            id={product.id}
            name={product.name}
            shortDescription={product.shortDescription}
            price={product.price}
            discountPrice={product.discountPrice}
            pixPrice={product.pixPrice}
            productPhoto={product.productPhoto}
            inStock={product.inStock}
            Category={product.Category}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Nenhum produto encontrado nesta categoria
          </p>
        </div>
      )}
    </main>
  )
}
