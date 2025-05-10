"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import { FiltrosLoja } from "@/components/filtros-loja"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useCart } from "@/contexts/cart-context"
import { motion, AnimatePresence } from "framer-motion"
import { PaginationControl } from "@/components/pagination-control"

interface Product {
  id: number
  name: string
  description: string
  price: number
  discountPrice: number | null
  category: string
  productPhoto: string
  sku: string
  inStock: boolean
  sales: number
  Category?: {
    name: string
  }[]
}

export default function MaisVendidosPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12
  const { addItem } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/featured')
        const data = await response.json()
        // Ordena produtos por número de vendas
        const sortedProducts = [...data].sort((a: Product, b: Product) => (b.sales || 0) - (a.sales || 0))
        setProducts(sortedProducts)
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: String(product.id),
      name: product.name,
      sku: product.sku,
      title: product.name,
      description: product.description,
      price: product.discountPrice || product.price,
      image: product.productPhoto
    })
  }

  const totalPages = Math.ceil(products.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Mais Vendidos</h1>
            <p className="text-muted-foreground">
              Mostrando {currentProducts.length} produtos
            </p>
          </div>

          <Suspense fallback={<div>Carregando filtros...</div>}>
            <FiltrosLoja />
          </Suspense>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <AnimatePresence mode="popLayout">
              {currentProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="flex flex-col group overflow-hidden cursor-pointer" onClick={() => router.push(`/produto/${product.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`)}>
                    <CardHeader className="p-0">
                      <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                        <img
                          src={product.productPhoto || '/placeholder.jpg'}
                          alt={product.name}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        />
                        {product.discountPrice && (
                          <Badge className="absolute top-2 right-2 bg-green-500">
                            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-sm font-medium truncate">
                        {product.name}
                      </CardTitle>
                      <div className="flex items-center mt-2 space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">4.5</span>
                      </div>
                      <div className="mt-2">
                        <div className="text-lg font-bold">
                          R$ {(product.discountPrice || product.price).toFixed(2)}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 mt-auto">
                      <Button
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddToCart(product)
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Adicionar
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <PaginationControl
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
