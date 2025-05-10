"use client"

import { CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { useRouter } from "next/navigation"

interface PaymentSuccessProps {
  onClose: () => void
}

export function PaymentSuccess({ onClose }: PaymentSuccessProps) {
  const router = useRouter()

  const handleGoToOrders = () => {
    router.push("/meu-perfil/compras")
    onClose()
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader className="flex flex-col items-center justify-center">
        <div className="bg-green-100 p-2 rounded-full mb-4">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <DialogTitle className="text-xl">Pagamento Confirmado!</DialogTitle>
        <DialogDescription className="text-center mt-2">
          Seu pedido foi registrado com sucesso e será processado em breve.
          Você receberá um email com os detalhes da sua compra.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col items-center justify-center mt-2 space-y-2">
        <Image
          src="/success.gif"
          alt="Sucesso"
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

      <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
        <Button
          variant="outline"
          className="sm:w-1/2"
          onClick={onClose}
        >
          Continuar Comprando
        </Button>
        <Button 
          className="sm:w-1/2"
          onClick={handleGoToOrders}
        >
          Ver Minhas Compras
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
