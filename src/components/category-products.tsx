"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, PackageSearch, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { motion, AnimatePresence } from "framer-motion"
import { PaginationControl } from "@/components/pagination-control"
import { createCleanSlug } from "@/lib/utils"

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
  slug?: string
  Category?: {
    name: string
  }[]
}

interface Category {
  id: number
  name: string
  description: string
  icon: string
  image: string
  Product: Product[]
}

interface CategoryProductsProps {
  category: Category
}

export function CategoryProducts({ category }: CategoryProductsProps) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12
  const { addItem } = useCart()

  const totalPages = Math.ceil(category.Product.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = category.Product.slice(startIndex, startIndex + productsPerPage)

  // Função para criar um slug limpo a partir do nome do produto
  function createSafeSlug(text: string): string {
    if (!text) return '';
    
    // Tratamento adicional para caracteres que possam causar problemas
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
      .replace(/"/g, '')  // Remove aspas
      .replace(/'/g, '')  // Remove apóstrofos
      .replace(/\+/g, 'plus') // Substitui + por 'plus'
      .trim()
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-') // Remove hífens duplicados
      .toLowerCase();
  }

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

  return (
    <div className="container mx-auto py-24 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">{category.name}</h1>
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Button 
            variant="link" 
            className="p-0 h-auto font-normal text-[#097bff] hover:text-blue-700"
            onClick={() => router.push('/loja')}
          >
            Loja
          </Button>
          <span className="text-[#097bff]">/</span>
          <Button 
            variant="link" 
            className="p-0 h-auto font-normal text-[#097bff] hover:text-blue-700"
            onClick={() => router.push('/loja')}
          >
            Categorias
          </Button>
          <span className="text-[#097bff]">/</span>
          <span className="text-muted-foreground">{category.name}</span>
        </nav>
      </div>

      {category.Product.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <PackageSearch className="w-20 h-20 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-600">Nenhum produto encontrado</h2>
          <p className="text-gray-500">Não há produtos disponíveis nesta categoria no momento.</p>
          <Button onClick={() => router.push('/loja')} className="mt-4">
            Ver todos os produtos
          </Button>
        </div>
      ) : (
        <div className="space-y-16">
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
                  <Card className="flex flex-col group overflow-hidden cursor-pointer" onClick={() => {
                    // Usar o slug do produto se disponível, ou criar um a partir do nome
                    const slug = product.slug || createCleanSlug(product.name);
                    // Navegar para a página do produto usando o ID e o slug
                    router.push(`/produto/${product.id}-${slug}`);
                  }}>
                    <CardHeader className="p-0">
                      <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                        <img
                          src={product.productPhoto || '/placeholder.jpg'}
                          alt={product.name}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        />
                        {product.discountPrice && (
                          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                            -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                          </Badge>
                        )}
                        {!product.inStock && (
                          <Badge variant="destructive" className="absolute top-2 right-2">
                            Esgotado
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
                    <CardFooter className="p-3">
                      <Button 
                        size="sm"
                        className="w-full bg-[#097bff] hover:bg-[#097bff]/90 h-8 text-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddToCart(product)
                        }}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                        Comprar
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
      )}
    </div>
  )
}
