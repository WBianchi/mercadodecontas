"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PixPayment } from "./pix-payment"
import { CreditCardPayment } from "./credit-card-payment-stripe"
import { Product } from "@prisma/client"
import { CheckoutForm } from "./checkout-form"
import { toast } from "sonner"

interface PaymentModalProps {
  open: boolean
  onClose: () => void
  product: Product
}

export function PaymentModal({ open, onClose, product }: PaymentModalProps) {
  const { data: session } = useSession()
  const [step, setStep] = useState<"form" | "payment">("form")
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit_card">()
  const [loading, setLoading] = useState(false)
  const [clientData, setClientData] = useState<any>()

  const price = Number(product.price)

  const handlePaymentMethodSelect = (value: string) => {
    setPaymentMethod(value as "pix" | "credit_card")
  }

  const handleClientDataSubmit = async (data: any) => {
    setClientData(data)
    setStep("payment")
  }

  const handleCreateOrder = async (data?: any) => {
    // Remover check de sessão temporariamente para testes
    // if (!session) {
    //   toast.error("Você precisa estar logado para fazer um pedido")
    //   return
    // }

    if (!paymentMethod) {
      toast.error("Selecione uma forma de pagamento")
      return
    }

    if (!clientData) {
      toast.error("Preencha seus dados pessoais")
      return
    }

    try {
      setLoading(true)
      console.log("Iniciando criação de pedido com método:", paymentMethod);
      console.log("Dados do cliente:", clientData);
      console.log("Sessão:", session);

      const orderData = {
        products: [{
          productId: Number(product.id),
          value: price, 
          name: product.name,
          quantity: 1
        }],
        paymentMethod: paymentMethod?.toUpperCase(),
        lojistaId: product.lojistaId,
        clientName: clientData.name || (session?.user?.name || "Cliente Teste"),
        clientEmail: clientData.email || (session?.user?.email || "cliente@teste.com"),
        clientPhone: clientData.phone || "(11) 99999-9999",
        cpfCnpj: clientData.cpfCnpj || "12345678909",
        address: clientData.address || "Endereço Teste",
        city: clientData.city || "São Paulo",
        neighborhood: clientData.neighborhood || "Bairro Teste",
      }

      // Se for cartão de crédito, inclui os dados do cartão
      if (data && paymentMethod === "credit_card") {
        Object.assign(orderData, {
          cardNumber: data.cardNumber?.replace(/\D/g, ''),
          cardHolder: data.cardHolder,
          cardExpiry: data.cardExpiry?.replace(/\D/g, ''),
          cardCvv: data.cardCvv,
          installments: data.installments || 1
        })
      }

      console.log("Dados do pedido a serem enviados:", JSON.stringify(orderData, null, 2));

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      })

      console.log("Resposta da API (status):", response.status);
      
      if (!response.ok) {
        const error = await response.json()
        console.error("Erro da API:", error);
        throw new Error(error.message || "Erro ao criar pedido")
      }

      // Certifique-se de extrair todo o conteúdo da resposta para order
      const order = await response.json()
      console.log("Dados do pedido recebidos (completo):", JSON.stringify(order, null, 2));
      
      // Verificar explicitamente a presença dos dados de PIX
      if (paymentMethod === "pix") {
        console.log("Verificando dados de PIX na resposta:");
        console.log("QR Code URL:", order.qrCodeUrl);
        console.log("PIX Key:", order.pixKey);
        
        if (order.qrCodeUrl) {
          toast.success("Pedido criado com sucesso! Use o QR Code para pagar.")
        } else {
          console.warn("QR Code não encontrado na resposta!");
          toast.warning("Pedido criado, mas o QR Code não foi gerado. Tente novamente.")
        }
      } else {
        toast.success("Pedido criado com sucesso!")
      }
      
      // Garanta que estamos retornando os dados do pedido
      setLoading(false)
      return order
    } catch (error: any) {
      console.error("Erro ao criar pedido:", error)
      toast.error(error.message || "Erro ao criar pedido")
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {step === "form" ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Dados para entrega</h2>
            <CheckoutForm
              onSubmit={handleClientDataSubmit}
              defaultValues={{
                name: session?.user?.name || "",
                email: session?.user?.email || "",
              }}
            />
          </div>
        ) : (
          <Tabs
            defaultValue={paymentMethod}
            onValueChange={handlePaymentMethodSelect}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pix">PIX</TabsTrigger>
              <TabsTrigger value="credit_card">Cartão de Crédito</TabsTrigger>
            </TabsList>

            <TabsContent value="pix">
              <PixPayment
                value={price}
                onCreateOrder={handleCreateOrder}
                disabled={loading}
              />
            </TabsContent>

            <TabsContent value="credit_card">
              <CreditCardPayment
                value={price}
                onCreateOrder={handleCreateOrder}
                disabled={loading}
              />
            </TabsContent>
          </Tabs>
        )}

        {step === "payment" && (
          <Button
            variant="outline"
            onClick={() => setStep("form")}
            className="w-full mt-4"
          >
            Voltar para dados pessoais
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}
