"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, ShoppingBag, Zap, Film, Controller, Music, Smartphone, CreditCard, Laptop, Sparkles, Star, Users, Book, Headphones, Gamepad, Coffee, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Category } from "@/types/category"

interface CategoriesCarouselProps {
  categories: Category[]
}

const iconMap: Record<string, React.ReactNode> = {
  streaming: <Film className="w-6 h-6" />,
  games: <Gamepad className="w-6 h-6" />,
  musica: <Music className="w-6 h-6" />,
  redes: <Users className="w-6 h-6" />,
  software: <Laptop className="w-6 h-6" />,
  cursos: <Book className="w-6 h-6" />,
  creditos: <CreditCard className="w-6 h-6" />,
  instagram: <Users className="w-6 h-6" />,
  facebook: <Users className="w-6 h-6" />,
  tiktok: <Smartphone className="w-6 h-6" />,
  spotify: <Music className="w-6 h-6" />,
  netflix: <Film className="w-6 h-6" />,
  discord: <Headphones className="w-6 h-6" />,
  default: <Star className="w-6 h-6" />
}

export function CategoriesCarousel({ categories = [] }: CategoriesCarouselProps) {
  // Ordenar categorias para priorizar redes sociais principais
  const sortedCategories = [...categories].sort((a, b) => {
    const priority = {
      'instagram': 1,
      'facebook': 2,
      'google': 3
    }
    const aPriority = priority[a.slug.toLowerCase()] || 999
    const bPriority = priority[b.slug.toLowerCase()] || 999
    return aPriority - bPriority
  })

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: true,
    containScroll: "keepSnaps",
  })

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Se não houver categorias, mostra um placeholder
  if (isLoading || categories.length === 0) {
    return (
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className={`relative flex-none w-[167px] h-[223px] rounded-lg overflow-hidden bg-gradient-to-b from-blue-400 to-blue-600 ${i === 8 ? "mr-[-83.5px]" : ""}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent animate-pulse" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="h-6 w-24 bg-white/20 rounded animate-pulse mb-2" />
              <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Container do Carrossel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {sortedCategories.map((category, index) => (
            <Link
              key={category.id}
              href={`/categoria/${category.slug}`}
              className={`relative flex-none w-[167px] h-[223px] rounded-xl overflow-hidden group transition-all duration-300 border border-gray-100 group-hover:border-[#0a7afd] shadow-sm ${
                index === categories.length - 1 ? "mr-[-83.5px]" : ""
              }`}
            >
              {/* Fundo branco com pattern no estado normal */}
              <div className="absolute inset-0 bg-white group-hover:bg-[#0a7afd] transition-colors duration-300" />
              
              {/* Pattern de pontos azuis (normal) que fica branco no hover */}
              <div 
                className="absolute inset-0 opacity-20 transition-opacity duration-300" 
                style={{ 
                  backgroundImage: `radial-gradient(circle at 1px 1px, #0a7afd 1px, transparent 0)`,
                  backgroundSize: '16px 16px'
                }} 
              />
              
              {/* Imagem da categoria */}
              {category.image && (
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
                />
              )}
              
              {/* Título */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-[#0a7afd] group-hover:text-white font-poppins font-semibold text-lg truncate text-center transition-colors duration-300">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Botões de Navegação */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-950/90"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-950/90"
        onClick={scrollNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}
