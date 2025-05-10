"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Verificar se o usuário já aceitou os cookies anteriormente
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted")
    if (!hasAcceptedCookies) {
      // Atraso pequeno antes de mostrar o banner para evitar flash durante carregamento
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true")
    setIsVisible(false)
  }

  const declineCookies = () => {
    // Pode adicionar lógica adicional para usuários que recusam cookies
    localStorage.setItem("cookiesAccepted", "false")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">🍪 Utilizamos cookies!</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Este site utiliza cookies para melhorar sua experiência. Ao utilizar nosso site, você concorda com nossa{" "}
              <Link href="/politicas/privacidade" className="text-blue-600 hover:underline">
                Política de Privacidade
              </Link>{" "}
              e{" "}
              <Link href="/politicas/termos" className="text-blue-600 hover:underline">
                Termos de Serviço
              </Link>.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={declineCookies}>
              Recusar
            </Button>
            <Button onClick={acceptCookies} className="bg-[#0a7afd] hover:bg-blue-700">
              Aceitar todos
            </Button>
            <button 
              onClick={declineCookies} 
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Fechar aviso de cookies"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
