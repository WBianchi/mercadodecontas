"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  Shield,
  CheckCircle2,
  ShoppingCart,
  CreditCard,
  Clock,
  Award,
  ThumbsUp,
  Gift,
  User,
  Store,
  TrendingUp,
  MessageSquare,
  Heart,
  Wallet,
  AlertCircle
} from "lucide-react"
import { PaymentModal } from "@/components/payment-modal"
import { useCart } from "@/contexts/cart-context"

interface ProductDetailsProps {
  product: any
}

function stripHtmlTags(html: string) {
  if (typeof window === 'undefined') return html;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: Number(product.id),
      name: product.name,
      price: product.price,
      image: product.productPhoto,
      quantity: 1
    })
  }

  const images = [
    product.productPhoto || "https://placehold.co/400x300/097bff/ffffff.jpg?text=1",
    ...(product.productGallery || []),
    "https://placehold.co/400x300/097bff/ffffff.jpg?text=2",
    "https://placehold.co/400x300/097bff/ffffff.jpg?text=3",
  ]

  const averageRating = product.reviews?.length 
    ? product.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / product.reviews.length 
    : 5

  return (
    <main className="min-h-screen pt-8 bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 pb-16">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-blue-50 to-transparent dark:from-blue-900/20 dark:via-blue-900/5 dark:to-transparent rounded-3xl" />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 rounded-3xl backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20">
            {/* Galeria de Imagens */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="relative aspect-[4/3] w-full mt-6 sm:mt-8 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                {product.inStock && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#097bff]/90 backdrop-blur-sm text-white px-3 py-1.5">
                      <Award className="w-4 h-4 mr-1" />
                      Em Estoque
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2 px-2">
                {images.map((img, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="relative w-20 sm:w-28 aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-white/80 dark:ring-white/20 shadow-lg hover:ring-[#097bff] transition-all"
                  >
                    <Image
                      src={img}
                      alt={`Miniatura ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Informações do Produto */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="space-y-4 sm:space-y-6">
                <Badge variant="secondary" className="text-xs sm:text-sm font-medium bg-blue-100/80 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 backdrop-blur-sm px-3 py-1.5">
                  {product.Category?.[0]?.name || 'Sem categoria'}
                </Badge>

                <h1 className="text-2xl sm:text-4xl font-bold font-poppins tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= averageRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                    {product.reviews?.length || 0} avaliações
                  </span>
                </div>

                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                  {stripHtmlTags(product.shortDescription)}
                </p>

                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                  <span>SKU: {product.sku}</span>
                  <span>•</span>
                  <span>Categoria: {product.Category?.name || 'Não categorizado'}</span>
                </div>
              </div>

              {/* Preços e CTA */}
              <Card className="bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-gray-900/80 dark:to-gray-800/80 border-0 shadow-xl backdrop-blur-xl">
                <CardContent className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    {product.discountPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg text-gray-500 line-through">
                          R$ {Number(product.discountPrice).toFixed(2)}
                        </span>
                        <Badge variant="destructive" className="text-xs bg-red-500/80 backdrop-blur-sm">
                          -{Math.round(((product.discountPrice - product.price) / product.discountPrice) * 100)}% OFF
                        </Badge>
                      </div>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-6xl font-bold text-[#097bff] tracking-tight">
                        R$ {Number(product.price).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">à vista</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {product.pixPrice && (
                      <div className="flex items-center gap-1.5 sm:gap-2 text-green-600 dark:text-green-500">
                        <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">
                          {Math.round(((product.price - product.pixPrice) / product.price) * 100)}% de desconto no PIX
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 sm:gap-2 text-green-600 dark:text-green-500">
                      <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">12x sem juros</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-green-600 dark:text-green-500">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">Entrega imediata</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-green-600 dark:text-green-500">
                      <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">7 dias de garantia</span>
                    </div>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-gray-700" />

                  <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 space-y-4">
                    <div className="flex items-center gap-4">
                      <Button
                        className="flex-1 bg-[#097bff] hover:bg-[#097bff]/90"
                        size="lg"
                        onClick={() => setPaymentModalOpen(true)}
                      >
                        Comprar Agora
                      </Button>
                      <Button
                        onClick={handleAddToCart}
                        variant="outline"
                        className="w-full"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Adicionar ao Carrinho
                      </Button>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Tabs de Informações */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="seller">Vendedor</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="prose prose-blue max-w-none dark:prose-invert">
                  <h3 className="text-xl font-semibold mb-4">Descrição do Produto</h3>
                  <div dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seller" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={product.lojista?.photo || "https://placehold.co/100x100"}
                      alt={product.lojista?.username || "Vendedor"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{product.lojista?.username}</h3>
                    <p className="text-sm text-gray-500">{product.lojista?.city}, {product.lojista?.state}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Sobre o Vendedor</h4>
                    <p className="text-sm text-gray-600">{product.lojista?.description || "Vendedor verificado na plataforma."}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Informações de Contato</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{product.lojista?.address}</p>
                      <p className="text-sm text-gray-600">{product.lojista?.city}, {product.lojista?.state}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#097bff]">{averageRating.toFixed(1)}</div>
                    <div className="flex items-center justify-center mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= averageRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{product.reviews?.length || 0} avaliações</div>
                  </div>

                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = product.reviews?.filter((r: any) => r.rating === rating).length || 0
                      const percentage = product.reviews?.length ? (count / product.reviews.length) * 100 : 0
                      
                      return (
                        <div key={rating} className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1 w-20">
                            <span>{rating}</span>
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          </div>
                          <Progress value={percentage} className="h-2" />
                          <span className="text-sm text-gray-500 w-12">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-6">
                  {product.reviews?.map((review: any) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      
                      <h4 className="font-medium mb-1">{review.cliente?.username || "Cliente"}</h4>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <PaymentModal 
        open={paymentModalOpen} 
        onClose={() => setPaymentModalOpen(false)}
        product={{
          id: product.id,
          price: Number(product.price), // Convertendo para número
          name: product.name
        }}
      />
      {/* Debug */}
      <pre className="hidden">
        {JSON.stringify({
          originalPrice: product.price,
          convertedPrice: Number(product.price),
          type: typeof product.price
        }, null, 2)}
      </pre>
    </main>
  )
}
