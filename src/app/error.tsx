"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log do erro para análise
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-20">
      <div className="container flex flex-col items-center max-w-md text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center scale-[2] opacity-10">
            <div className="w-64 h-64 border-8 rounded-full border-red-500"></div>
          </div>
          <div className="relative text-9xl font-bold text-red-500">500</div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Algo deu errado</h1>
        
        <p className="text-muted-foreground mb-8">
          Desculpe, encontramos um problema ao processar sua solicitação. 
          Nossa equipe foi notificada e está trabalhando para resolver isso.
        </p>
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <Button onClick={reset} variant="default">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Tentar novamente
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
