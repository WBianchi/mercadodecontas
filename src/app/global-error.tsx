"use client"

import { Suspense } from "react"
import { Inter } from "next/font/google"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="container flex flex-col items-center max-w-md text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center justify-center scale-[2] opacity-10">
                <div className="w-64 h-64 border-8 rounded-full border-red-600"></div>
              </div>
              <div className="relative text-9xl font-bold text-red-600">
                Erro
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Erro crítico detectado</h1>
            
            <p className="text-muted-foreground mb-8">
              Encontramos um problema grave com esta página. 
              Isso pode ser um erro temporário, tente novamente em alguns instantes.
            </p>
            
            <div className="flex flex-col space-y-3">
              <Button onClick={reset} variant="destructive" size="lg">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Tentar novamente
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
