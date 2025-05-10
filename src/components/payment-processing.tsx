"use client"

import { Loader2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

interface PaymentProcessingProps {
  paymentMethod: "PIX" | "CREDIT_CARD"
  paymentId: string
  externalReference: string
  onSuccess: () => void
}

export function PaymentProcessing({
  paymentMethod,
  paymentId,
  externalReference,
  onSuccess
}: PaymentProcessingProps) {
  const [countdown, setCountdown] = useState(20)
  const [checking, setChecking] = useState(true)

  // Verificar o status do pagamento a cada 3 segundos
  useEffect(() => {
    if (!paymentId) return

    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(`/api/payments/check-status?id=${paymentId}`)
        const data = await response.json()

        if (data.status === "approved") {
          onSuccess()
          return true
        }

        return false
      } catch (error) {
        console.error("Erro ao verificar pagamento:", error)
        return false
      }
    }

    const interval = setInterval(async () => {
      const success = await checkPaymentStatus()
      
      if (success) {
        clearInterval(interval)
        setChecking(false)
      }
    }, 3000)

    // Iniciar o contador regressivo
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(timer)
    }
  }, [paymentId, onSuccess])

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader className="flex flex-col items-center justify-center">
        <DialogTitle className="text-xl">
          {paymentMethod === "PIX" 
            ? "Processando pagamento PIX" 
            : "Processando pagamento"}
        </DialogTitle>
        <DialogDescription className="text-center mt-2">
          {paymentMethod === "PIX" 
            ? "Aguardando a confirmação do seu pagamento PIX" 
            : "Processando o pagamento do seu cartão"}
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col items-center justify-center py-6 space-y-4">
        {paymentMethod === "PIX" ? (
          <div className="w-32 h-32 relative animate-pulse">
            <Image 
              src="/pix-logo.png" 
              alt="Logo PIX"
              width={128}
              height={128}
              className="object-contain" 
            />
          </div>
        ) : (
          <div className="w-32 h-32 relative">
            <Image 
              src="/card-processing.svg" 
              alt="Processando cartão"
              width={128}
              height={128}
              className="object-contain" 
            />
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <p className="text-sm">
            {checking 
              ? `Verificando pagamento... (${countdown}s)` 
              : "Pagamento confirmado!"}
          </p>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Referência: {externalReference || "N/A"}
        </p>
      </div>
    </DialogContent>
  )
}
