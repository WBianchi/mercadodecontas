"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Lock, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function AnimatedHero() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
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
    <section className="relative min-h-[85vh] flex items-center justify-center">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12"
            >
              <Link
                href="/loja"
                className="relative group bg-[#097bff] hover:bg-[#097bff]/90 font-poppins font-bold text-lg px-12 py-6 rounded-[32px] inline-flex items-center text-white"
              >
                <span className="relative z-10">Ver anúncios digitais</span>
                <motion.div
                  className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-blue-600 to-[#097bff]"
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
  )
}
