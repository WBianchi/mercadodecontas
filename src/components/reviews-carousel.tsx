"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    id: 1,
    name: "João Silva",
    avatar: "/avatars/avatar-1.jpg",
    rating: 5,
    comment: "Excelente serviço! Comprei uma conta premium e foi entregue instantaneamente. Suporte muito atencioso.",
    date: "2 dias atrás",
    verified: true,
    product: "Netflix Premium",
  },
  {
    id: 2,
    name: "Maria Santos",
    avatar: "/avatars/avatar-2.jpg",
    rating: 5,
    comment: "Melhor marketplace de contas que já usei. Tudo funciona perfeitamente e o preço é justo.",
    date: "1 semana atrás",
    verified: true,
    product: "Spotify Family",
  },
  {
    id: 3,
    name: "Pedro Costa",
    avatar: "/avatars/avatar-3.jpg",
    rating: 5,
    comment: "Comprei uma licença do Windows e foi ativada na hora. Muito satisfeito com a rapidez do serviço!",
    date: "3 dias atrás",
    verified: true,
    product: "Windows 11 Pro",
  },
  {
    id: 4,
    name: "Ana Oliveira",
    avatar: "/avatars/avatar-4.jpg",
    rating: 5,
    comment: "Incrível! Já é a terceira vez que compro aqui e sempre com a mesma qualidade e segurança.",
    date: "5 dias atrás",
    verified: true,
    product: "Disney+ Premium",
  },
]

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(timer)
  }, [currentIndex])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#097bff] to-blue-600 bg-clip-text text-transparent mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto text-lg">
            Descubra por que milhares de clientes confiam em nós para sua melhor compra
          </p>
        </div>

        <div className="relative">
          {/* Controles do Carrossel */}
          <div className="absolute -left-4 right-0 top-[45%] -translate-y-1/2 flex justify-between z-10">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg rounded-full w-12 h-12"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg rounded-full w-12 h-12"
              onClick={handleNext}
            >
              <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </Button>
          </div>

          {/* Cards de Avaliação */}
          <div className="overflow-hidden relative min-h-[320px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    reviews[currentIndex],
                    reviews[(currentIndex + 1) % reviews.length],
                    reviews[(currentIndex + 2) % reviews.length],
                  ].map((review) => (
                    <div
                      key={review.id}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative group"
                    >
                      {/* Efeito de Gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Ícone de Aspas */}
                      <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-100 dark:text-blue-900/20" />
                      
                      <div className="relative">
                        {/* Cabeçalho */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#097bff] p-0.5">
                              <img
                                src={review.avatar}
                                alt={review.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            </div>
                            {review.verified && (
                              <div className="absolute -bottom-1 -right-1 bg-[#097bff] rounded-full p-1">
                                <Shield className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{review.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {review.product}
                            </p>
                          </div>
                        </div>

                        {/* Avaliação */}
                        <div className="flex items-center gap-1 mb-3">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 text-yellow-400 fill-yellow-400"
                            />
                          ))}
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                            {review.date}
                          </span>
                        </div>

                        {/* Comentário */}
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                          "{review.comment}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center gap-3 mt-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-12 bg-[#097bff]"
                    : "w-6 bg-gray-300 dark:bg-gray-700"
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
