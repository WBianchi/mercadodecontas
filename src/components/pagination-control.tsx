import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationControlProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationControl({ currentPage, totalPages, onPageChange }: PaginationControlProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Anterior
      </Button>
      <span className="text-muted-foreground">
        Página {currentPage} de {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Próxima
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
