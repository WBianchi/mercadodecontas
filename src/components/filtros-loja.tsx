"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronDown, ChevronRight, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"

interface Categoria {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  _count?: {
    Product: number;
  };
}

interface FiltrosLojaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialSearchTerm?: string;
}

export function FiltrosLoja({ open, onOpenChange, initialSearchTerm = "" }: FiltrosLojaProps) {
  const router = useRouter()
  const [precoRange, setPrecoRange] = useState<[number, number]>([0, 1000])
  const [precoMin, setPrecoMin] = useState(0)
  const [precoMax, setPrecoMax] = useState(1000)
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCategories, setVisibleCategories] = useState(5)

  // Atualiza o termo de busca quando o initialSearchTerm mudar
  useEffect(() => {
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm)
    }
  }, [initialSearchTerm])

  // Carregar dados dinâmicos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/filtros')
        const data = await response.json()
        
        setCategorias(data.categorias || [])
        
        const minPrice = data.precos?.min || 0
        const maxPrice = data.precos?.max || 1000
        setPrecoMin(minPrice)
        setPrecoMax(maxPrice)
        setPrecoRange([minPrice, maxPrice])
        
        setIsLoading(false)
      } catch (error) {
        console.error('Erro ao carregar dados dos filtros:', error)
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const toggleCategoria = (categoriaId: string) => {
    setSelectedCategorias(prev =>
      prev.includes(categoriaId)
        ? prev.filter(c => c !== categoriaId)
        : [...prev, categoriaId]
    )
  }

  const clearFilters = () => {
    setPrecoRange([precoMin, precoMax])
    setSelectedCategorias([])
    setSearchTerm("")
  }

  const applyFilters = () => {
    // Criar a query string para a busca
    const params = new URLSearchParams()
    
    if (searchTerm) {
      params.set("q", searchTerm)
    }
    
    if (selectedCategorias.length > 0) {
      params.set("categoria", selectedCategorias.join(","))
    }
    
    if (precoRange[0] !== precoMin || precoRange[1] !== precoMax) {
      params.set("preco", `${precoRange[0]},${precoRange[1]}`)
    }
    
    // Redirecionar para a página de busca
    router.push(`/busca?${params.toString()}`)
    onOpenChange(false)
  }

  // Formatar moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }
  
  // Lidar com mais categorias
  const showMoreCategories = () => {
    setVisibleCategories(categorias.length)
  }
  
  const showLessCategories = () => {
    setVisibleCategories(5)
  }
  
  // Funções para arrastar os ranges de preço
  const handleDragStart = (e: React.MouseEvent, isMin: boolean) => {
    e.preventDefault();
    
    const slider = e.currentTarget.parentElement;
    if (!slider) return;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const rect = slider.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / rect.width));
      const value = Math.round(precoMin + percent * (precoMax - precoMin));
      
      if (isMin) {
        if (value < precoRange[1]) {
          setPrecoRange([value, precoRange[1]]);
        }
      } else {
        if (value > precoRange[0]) {
          setPrecoRange([precoRange[0], value]);
        }
      }
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] sm:h-[80vh] rounded-t-3xl p-0 border-t-0 overflow-hidden">
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 pt-3 px-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6" />
          <SheetHeader className="text-left mb-4">
            <SheetTitle className="text-xl font-bold">Filtros</SheetTitle>
            <SheetDescription>
              {searchTerm ? `Pesquisando por: "${searchTerm}"` : "Encontre o produto perfeito para você"}
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(85vh-150px)]">
          <div className="space-y-6">
            {/* Faixa de Preço com marcadores interativos */}
            <div className="space-y-3">
              <h3 className="text-base font-medium">Faixa de Preço</h3>
              
              <div className="mt-6 px-2">
                {/* Barra de preço personalizada */}
                <div className="relative w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                  {/* Barra de progresso */}
                  <div 
                    className="absolute h-1 bg-blue-500 rounded-full"
                    style={{
                      left: `${((precoRange[0] - precoMin) / (precoMax - precoMin)) * 100}%`,
                      width: `${((precoRange[1] - precoRange[0]) / (precoMax - precoMin)) * 100}%`
                    }}
                  />
                  
                  {/* Ponto mínimo arrastável */}
                  <div 
                    className="absolute w-5 h-5 bg-blue-500 rounded-full -mt-2 cursor-pointer border-2 border-white dark:border-gray-800 z-10"
                    style={{
                      left: `calc(${((precoRange[0] - precoMin) / (precoMax - precoMin)) * 100}% - 10px)`,
                      touchAction: "none"
                    }}
                    onMouseDown={(e) => handleDragStart(e, true)}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      
                      // Capturar o elemento slider antes de configurar os manipuladores
                      const slider = e.currentTarget.parentElement;
                      if (!slider) return;
                      
                      const handleTouchMove = (touchEvent: TouchEvent) => {
                        const rect = slider.getBoundingClientRect();
                        const touchMove = touchEvent.touches[0];
                        const percent = Math.max(0, Math.min(1, (touchMove.clientX - rect.left) / rect.width));
                        const value = Math.round(precoMin + percent * (precoMax - precoMin));
                        
                        if (value < precoRange[1]) {
                          setPrecoRange([value, precoRange[1]]);
                        }
                      };
                      
                      const handleTouchEnd = () => {
                        document.removeEventListener('touchmove', handleTouchMove);
                        document.removeEventListener('touchend', handleTouchEnd);
                      };
                      
                      document.addEventListener('touchmove', handleTouchMove);
                      document.addEventListener('touchend', handleTouchEnd);
                    }}
                  />
                  
                  {/* Ponto máximo arrastável */}
                  <div 
                    className="absolute w-5 h-5 bg-blue-500 rounded-full -mt-2 cursor-pointer border-2 border-white dark:border-gray-800 z-10"
                    style={{
                      left: `calc(${((precoRange[1] - precoMin) / (precoMax - precoMin)) * 100}% - 10px)`,
                      touchAction: "none"
                    }}
                    onMouseDown={(e) => handleDragStart(e, false)}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      
                      // Capturar o elemento slider antes de configurar os manipuladores
                      const slider = e.currentTarget.parentElement;
                      if (!slider) return;
                      
                      const handleTouchMove = (touchEvent: TouchEvent) => {
                        const rect = slider.getBoundingClientRect();
                        const touchMove = touchEvent.touches[0];
                        const percent = Math.max(0, Math.min(1, (touchMove.clientX - rect.left) / rect.width));
                        const value = Math.round(precoMin + percent * (precoMax - precoMin));
                        
                        if (value > precoRange[0]) {
                          setPrecoRange([precoRange[0], value]);
                        }
                      };
                      
                      const handleTouchEnd = () => {
                        document.removeEventListener('touchmove', handleTouchMove);
                        document.removeEventListener('touchend', handleTouchEnd);
                      };
                      
                      document.addEventListener('touchmove', handleTouchMove);
                      document.addEventListener('touchend', handleTouchEnd);
                    }}
                  />
                  
                  {/* Pontos de preço clicáveis */}
                  {[0, 25, 50, 75, 100].map((percent) => {
                    const valor = Math.round(precoMin + (percent / 100) * (precoMax - precoMin))
                    const isActive = 
                      valor >= precoRange[0] && 
                      valor <= precoRange[1]
                    
                    return (
                      <div
                        key={percent}
                        className={`absolute w-4 h-4 rounded-full -mt-1.5 cursor-pointer border-2 
                          ${isActive 
                            ? 'bg-blue-500 border-white dark:border-gray-800' 
                            : 'bg-gray-200 dark:bg-gray-700 border-white dark:border-gray-800'}`
                        }
                        style={{ left: `calc(${percent}% - 6px)` }}
                        onClick={() => {
                          if (percent === 0) {
                            setPrecoRange([valor, precoRange[1]])
                          } else if (percent === 100) {
                            setPrecoRange([precoRange[0], valor])
                          } else if (Math.abs(valor - precoRange[0]) < Math.abs(valor - precoRange[1])) {
                            setPrecoRange([valor, precoRange[1]])
                          } else {
                            setPrecoRange([precoRange[0], valor])
                          }
                        }}
                      />
                    )
                  })}
                </div>
                
                {/* Valores */}
                <div className="flex justify-between mt-6 text-sm">
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">Mínimo</div>
                    <div className="font-medium">{formatCurrency(precoRange[0])}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500 dark:text-gray-400">Máximo</div>
                    <div className="font-medium">{formatCurrency(precoRange[1])}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Categorias */}
            <div className="space-y-3">
              <h3 className="text-base font-medium">Categorias</h3>
              
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-10 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {categorias.slice(0, visibleCategories).map((categoria) => (
                    <div 
                      key={categoria.id}
                      onClick={() => toggleCategoria(String(categoria.id))}
                      className={`flex items-center justify-between p-2.5 rounded-md cursor-pointer transition-all
                        ${selectedCategorias.includes(String(categoria.id))
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 flex items-center justify-center rounded-md
                          ${selectedCategorias.includes(String(categoria.id))
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {selectedCategorias.includes(String(categoria.id)) ? (
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                            </svg>
                          ) : null}
                        </div>
                        <span className="text-sm">{categoria.name}</span>
                      </div>
                      <Badge variant="outline" className="bg-transparent">
                        {categoria._count?.Product || 0}
                      </Badge>
                    </div>
                  ))}
                  
                  {categorias.length > 5 && (
                    visibleCategories < categorias.length ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-sm text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 mt-1"
                        onClick={showMoreCategories}
                      >
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Ver mais {categorias.length - visibleCategories} categorias
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-sm text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 mt-1"
                        onClick={showLessCategories}
                      >
                        <ChevronDown className="h-3.5 w-3.5 mr-1 rotate-180" />
                        Mostrar menos
                      </Button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={clearFilters}
            >
              Limpar
            </Button>
            <Button
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              onClick={applyFilters}
              type="button"
            >
              Ver Resultados
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
