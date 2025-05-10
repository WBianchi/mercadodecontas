"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useCart } from "@/contexts/cart-context"
import { motion, AnimatePresence } from "framer-motion"
import { NovoFiltro } from "@/components/loja/filtros"

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
  Category?: {
    name: string
  }[]
}

export default function LicencasPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12
  const { addItem } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/licenses')
        const data = await response.json()
        setProducts(data)
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

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-24">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-square bg-gray-200 rounded-lg"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Licenças Digitais</h1>
          <p className="text-muted-foreground">
            Mostrando {currentProducts.length} produtos
          </p>
        </div>

        <NovoFiltro />

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
                        <Badge className="absolute top-2 right-2 bg-[#097bff]">
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
                      className="w-full bg-[#097bff] hover:bg-[#097bff]/90"
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

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-[#097bff]/10 to-blue-500/10 hover:from-[#097bff]/20 hover:to-blue-500/20 border-none"
            >
              <ChevronLeft className="h-4 w-4 text-[#097bff]" />
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else {
                  if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                }
                
                return (
                  <Button
                    key={pageNumber}
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-9 h-9 rounded-full transition-all duration-200 border-none
                      ${currentPage === pageNumber
                        ? "bg-gradient-to-r from-[#097bff] to-blue-500 text-white"
                        : "bg-gradient-to-r from-[#097bff]/10 to-blue-500/10 hover:from-[#097bff]/20 hover:to-blue-500/20 text-[#097bff]"
                      }`}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="text-[#097bff] mx-1">...</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(totalPages)}
                    className={`w-9 h-9 rounded-full transition-all duration-200 border-none
                      ${currentPage === totalPages
                        ? "bg-gradient-to-r from-[#097bff] to-blue-500 text-white"
                        : "bg-gradient-to-r from-[#097bff]/10 to-blue-500/10 hover:from-[#097bff]/20 hover:to-blue-500/20 text-[#097bff]"
                      }`}
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-[#097bff]/10 to-blue-500/10 hover:from-[#097bff]/20 hover:to-blue-500/20 border-none"
            >
              <ChevronRight className="h-4 w-4 text-[#097bff]" />
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
