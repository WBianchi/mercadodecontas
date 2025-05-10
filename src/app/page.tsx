"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { BlogPostCard } from "@/components/blog-post-card"
import { HeroCarousel } from "@/components/hero-carousel"
import { CategoriesCarousel } from "@/components/categories-carousel"
import { Category } from "@/types/category"
import { SEO } from "@/components/seo"
import Link from "next/link"
import { ShieldCheck, Star, Zap, ShoppingCart, Shield, Lock, CheckCircle, TrendingUp, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ReviewsCarousel } from "@/components/reviews-carousel"
import { featuredProducts } from "@/types/product"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { prisma } from "@/lib/prisma"


const topSellers = [
  {
    id: 1,
    name: "Game Store Brasil",
    avatar: "/sellers/placeholder-seller.svg",
    rating: 4.9,
    sales: 15234,
    verified: true,
    badges: ["Elite", "Top 10", "1 Ano+"],
    description: "Especialista em contas de jogos e consoles"
  },
  {
    id: 2,
    name: "Digital Keys",
    avatar: "/sellers/placeholder-seller.svg",
    rating: 4.8,
    sales: 12543,
    verified: true,
    badges: ["Premium", "Top 20", "6 Meses+"],
    description: "Licenças originais para softwares"
  },
  {
    id: 3,
    name: "Stream Plus",
    avatar: "/sellers/placeholder-seller.svg",
    rating: 4.9,
    sales: 10876,
    verified: true,
    badges: ["Elite", "Top 10", "2 Anos+"],
    description: "Contas premium de streaming verificadas"
  },
  {
    id: 4,
    name: "Software House",
    avatar: "/sellers/placeholder-seller.svg",
    rating: 4.7,
    sales: 9432,
    verified: true,
    badges: ["Premium", "Top 50", "1 Ano+"],
    description: "Especialista em softwares profissionais"
  }
]

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [categories, setCategories] = useState<Category[]>([])
  const [licencasDigitais, setLicencasDigitais] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    const fetchLicencasDigitais = async () => {
      try {
        const response = await fetch(`${window.location.origin}/api/produtos/categorias?ids=148,149&limit=12`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        })
        
        if (!response.ok) {
          console.error("Erro na API:", await response.text())
          throw new Error("Falha ao carregar produtos")
        }
        
        const data = await response.json()
        setLicencasDigitais(data)
      } catch (error) {
        console.error("Erro ao carregar licenças digitais:", error)
      }
    }

    const loadCategories = async () => {
      try {
        const response = await fetch("/api/categories", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache"
          }
        })
        
        if (!response.ok) {
          console.error("[CATEGORIES_LOAD]", await response.text())
          return
        }
        
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error("[CATEGORIES_LOAD]", error)
      }
    }

    const loadProducts = async () => {
      try {
        const response = await fetch("/api/products/featured", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache"
          }
        })
        
        if (!response.ok) {
          console.error("[PRODUCTS_LOAD]", await response.text())
          return
        }
        
        const data = await response.json()
        setFeaturedProducts(data)
      } catch (error) {
          console.error("[PRODUCTS_LOAD]", error)
      }
    }

    fetchLicencasDigitais()
    loadCategories()
    loadProducts()
  }, [])

  const texts = [
    "Contas Premium",
    "Licenças Digitais",
    "Serviços Exclusivos"
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <SEO 
        title="Mercado de Contas - O Maior Marketplace de Contas Premium e Licenças Digitais"
        description="Encontre as melhores contas premium, licenças digitais e serviços exclusivos com total segurança e garantia. Marketplace líder em contas verificadas."
        keywords={[
          "contas premium",
          "licenças digitais",
          "marketplace",
          "streaming",
          "jogos",
          "software",
          "contas verificadas",
          "garantia",
          "segurança"
        ]}
      />
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[105vh] flex items-center justify-center">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-gray-900/50 dark:via-gray-950 dark:to-gray-950" />

          {/* Main Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Hero Content with Advanced Animations */}
              <div className="text-center space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <h1 className="font-poppins text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-[#097bff] to-blue-600 bg-clip-text text-transparent">
                      O Maior Marketplace de
                    </span>
                    <br />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentTextIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block bg-gradient-to-r from-blue-600 to-[#097bff] bg-clip-text text-transparent"
                      >
                        {texts[currentTextIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-poppins max-w-2xl mx-auto"
                >
                  Encontre as melhores ofertas com total
                  <span className="text-[#097bff] font-semibold"> segurança </span>
                  e
                  <span className="text-[#097bff] font-semibold"> garantia</span>.
                </motion.p>

                {/* Feature Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-8"
                >
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                    <Shield className="w-8 h-8 text-[#097bff] mx-auto mb-2" />
                    <p className="text-sm font-medium">Compra Segura</p>
                  </div>
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                    <Lock className="w-8 h-8 text-[#097bff] mx-auto mb-2" />
                    <p className="text-sm font-medium">Garantia Total</p>
                  </div>
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                    <ShoppingCart className="w-8 h-8 text-[#097bff] mx-auto mb-2" />
                    <p className="text-sm font-medium">Entrega Imediata</p>
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="mt-12"
                >
                  <Link
                    href="/anunciar"
                    className="relative group bg-[#097bff] hover:bg-[#097bff]/90 font-poppins font-bold text-lg px-12 py-6 rounded-[48px] inline-flex items-center text-white"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Anuncie agora
                      <motion.div
                        className="transition-all duration-500"
                        initial={false}
                        animate={{ x: [-5, 0] }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </span>
                    <motion.div
                      className="absolute inset-0 rounded-[48px] bg-gradient-to-r from-blue-600 to-[#097bff]"
                      initial={false}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute -inset-1 rounded-[48px] bg-gradient-to-r from-blue-400 to-[#097bff] opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300"
                      initial={false}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                    />
                  </Link>
                </motion.div>

                {/* Stats Counter */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex justify-center gap-8 mt-12 text-sm text-gray-600 dark:text-gray-400"
                >
                  <div>
                    <span className="block text-2xl font-bold text-[#097bff]">50mil+</span>
                    <span>Clientes Satisfeitos</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-[#097bff]">100mil+</span>
                    <span>Produtos Vendidos</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-[#097bff]">4.9/5</span>
                    <span>Avaliação Média</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Animated Shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full"
              animate={{
                y: [0, 50, 0],
                x: [0, 30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-12 -left-4 w-32 h-32 bg-[#097bff]/10 rounded-full"
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-poppins text-3xl font-bold mb-8">
              Explore por Categorias
            </h2>
            <CategoriesCarousel 
              categories={categories.filter(cat => 
                ["Instagram", "Facebook", "Tiktok", "Google", "Kwai", "WhatsApp", 
                "Assinaturas e premium", "Licenças", "Licenças digitais", "Youtube", "Windows 11 Pro"]
                .includes(cat.name)
              )} 
            />
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-poppins text-3xl font-bold bg-gradient-to-r from-[#097bff] to-blue-600 bg-clip-text text-transparent">
                  Contas em Destaque
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  As melhores contas premium com garantia total
                </p>
              </div>
              <Link href="/contas">
                <Button variant="outline" className="font-poppins">
                  Ver Todos
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {featuredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Seção CTA Neumórfica */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-24 mb-24 relative "
            >
              <div className="relative overflow-hidden bg-[#020817] py-32 rounded-3xl">
                {/* Animated Pattern Background */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,#097bff15_1px,transparent_1px)] bg-[length:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                  
                  {/* Animated Lines */}
                  <motion.div 
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ 
                      opacity: [0.3, 0.5, 0.3],
                      x: [0, 100, 0]
                    }}
                    transition={{ 
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-y-0 left-0 w-[120%] bg-[linear-gradient(90deg,transparent_0%,#097bff10_50%,transparent_100%)] transform -skew-x-12"
                  />
                  <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ 
                      opacity: [0.2, 0.4, 0.2],
                      x: [0, -100, 0]
                    }}
                    transition={{ 
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-y-0 right-0 w-[120%] bg-[linear-gradient(90deg,transparent_0%,#097bff08_50%,transparent_100%)] transform skew-x-12"
                  />
                  
                  {/* Floating Particles */}
                  <div className="absolute inset-0">
                    <motion.div
                      initial={{ opacity: 0.3 }}
                      animate={{ 
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-[#097bff]/10 via-transparent to-[#097bff]/10"
                    />
                  </div>
                </div>

                <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 px-4">
                  <div className="space-y-4">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-[#097bff] font-medium tracking-wider text-sm md:text-base uppercase"
                    >
                      Bem-vindo ao futuro do entretenimento
                    </motion.span>
                    
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins text-white leading-tight"
                    >
                      Transforme sua{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#097bff] to-blue-400">
                        Experiência Digital
                      </span>
                    </motion.h2>
                  </div>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-gray-300 text-lg md:text-xl font-poppins max-w-2xl mx-auto leading-relaxed"
                  >
                    <span className="text-white font-medium">Acesso premium exclusivo</span>{" "}
                    para uma nova era de entretenimento digital.{" "}
                    <span className="text-[#097bff]">Segurança garantida</span>{" "}
                    e experiência incomparável.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="relative pt-8"
                  >
                    <Button 
                      size="lg"
                      className="relative group bg-[#097bff]/10 backdrop-blur-sm border border-[#097bff]/30 text-white hover:bg-[#097bff] font-poppins text-lg px-14 py-7 rounded-2xl transition-all duration-500 shadow-[0_0_30px_-5px_rgba(9,123,255,0.3)]"
                    >
                      <span className="relative z-10 flex items-center gap-3 font-medium">
                        Anuncie agora
                        <motion.div
                          className="transition-all duration-500"
                          initial={false}
                          animate={{ x: [-5, 0] }}
                        >
                          <ArrowRight className="w-6 h-6" />
                        </motion.div>
                        <ShoppingCart className="w-6 h-6" />
                      </span>
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#097bff] to-blue-600 opacity-0 group-hover:opacity-100"
                        initial={false}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Seção de Licenças Digitais */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="font-poppins text-3xl font-bold bg-gradient-to-r from-[#097bff] to-blue-600 bg-clip-text text-transparent">
                    Licenças Digitais
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Ative seus serviços favoritos com segurança
                  </p>
                </div>
                <Link href="/licencas">
                  <Button variant="outline" className="hidden md:flex">
                    Ver Todas
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
                {licencasDigitais?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              

              <div className="mt-8 text-center md:hidden">
                <Link href="/licencas">
                  <Button variant="outline">
                    Ver Todas
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Top Sellers Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="font-poppins text-3xl font-bold bg-gradient-to-r from-[#097bff] to-blue-600 bg-clip-text text-transparent">
                    Top Lojistas
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Conheça nossos vendedores mais bem avaliados
                  </p>
                </div>
                <Button variant="outline" className="font-poppins">
                  Ver Todos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {topSellers.map((seller) => (
                  <motion.div
                    key={seller.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="p-6 h-full  border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
                      {/* Efeito de gradiente no hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative">
                        {/* Avatar e Status */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#097bff] p-0.5">
                              <img
                                src={seller.avatar}
                                alt={seller.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            </div>
                            {seller.verified && (
                              <div className="absolute -bottom-1 -right-1 bg-[#097bff] rounded-full p-1">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-semibold">{seller.rating}</span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-3">
                          <h3 className="text-xl font-bold">{seller.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {seller.description}
                          </p>
                          
                          {/* Badges */}
                          <div className="flex flex-wrap gap-2">
                            {seller.badges.map((badge) => (
                              <span
                                key={badge}
                                className="px-2 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>

                          {/* Stats */}
                          <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium">
                                {seller.sales.toString()} vendas
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-blue-500" />
                              <span className="text-sm font-medium">
                                {Math.floor(seller.sales * 0.8).toString()} clientes
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Carrossel de Avaliações */}
          <ReviewsCarousel /> 
        </section>
      </main>
      <Footer />
    </>
  )
}
