"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import { FiltrosLoja } from "@/components/filtros-loja"

// Re-exportando o componente FiltrosLoja para manter compatibilidade com páginas existentes
export { FiltrosLoja } from "@/components/filtros-loja"

export function NovoFiltro() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtrosOpen, setFiltrosOpen] = useState(false)
  
  // Função para lidar com a mudança no campo de busca
  const handleSearchInput = (value: string) => {
    setSearchTerm(value)
    
    // Abre o modal de filtros se o usuário digitar pelo menos 3 caracteres
    if (value.length >= 3 && !filtrosOpen) {
      setFiltrosOpen(true)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => handleSearchInput(e.target.value)}
            className="w-full"
          />
        </div>

        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setFiltrosOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Modal de Filtros */}
      <FiltrosLoja 
        open={filtrosOpen} 
        onOpenChange={setFiltrosOpen} 
        initialSearchTerm={searchTerm}
      />
    </div>
  )
}
