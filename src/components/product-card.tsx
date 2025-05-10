"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { formatCurrency, createCleanSlug } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge" 
import { Card } from "@/components/ui/card"
import { Star, ShoppingCart, Shield } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: {
    id: number
    name: string
    sku: string
    slug: string
    productPhoto: string
    price: number
    discountPrice?: number | null
    inStock: boolean
    Category?: {
      name: string
    }[]
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const router = useRouter()

  // Calcular desconto se houver preço com desconto
  const desconto = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0

  const handleAddToCart = () => {
    addItem({
      id: String(product.id),
      name: product.name,
      sku: product.sku,
      title: product.name,
      description: `SKU: ${product.sku}`,
      price: product.discountPrice || product.price,
      image: product.productPhoto
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="flex flex-col group overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => {
        // Usar o slug do produto se disponível, ou criar um a partir do nome
        const slug = product.slug || createCleanSlug(product.name);
        // Navegar para a página do produto usando o ID e o slug
        router.push(`/produto/${product.id}-${slug}`);
      }}>
        {/* Imagem do Produto */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={product.productPhoto || "/images/placeholder.jpg"}
            alt={product.name}
            width={200}
            height={200}
            className="object-cover w-full h-48 rounded-t-lg"
          />
          {desconto > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              -{desconto}%
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Esgotado
            </Badge>
          )}
        </div>

        {/* Conteúdo */}
        <div className="p-3">
          {/* Categoria */}
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="font-poppins text-xs">
              {product.Category?.length > 0 ? product.Category[0].name : "Conta Digital"}
            </Badge>
          </div>

          {/* Título */}
          <h3 className="font-poppins font-medium text-sm mb-2 line-clamp-1 group-hover:text-[#097bff] transition-colors capitalize">
            {product.name.toLowerCase()}
          </h3>

          {/* Avaliações - Usando um valor fixo por enquanto */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              (Produto Verificado)
            </span>
          </div>

          {/* Preço e Botão */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {product.discountPrice && (
                <span className="text-xs text-gray-500 line-through">
                  R$ {product.price.toFixed(2)}
                </span>
              )}
              <span className="text-lg font-bold text-[#097bff] font-poppins leading-none">
                R$ {(product.discountPrice || product.price).toFixed(2)}
              </span>
            </div>
            <Button 
              size="sm" 
              className="bg-[#097bff] hover:bg-[#097bff]/90"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>

          {/* Garantia */}
          <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
            <Shield className="w-3 h-3" />
            <span>Garantia Vitalícia</span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
