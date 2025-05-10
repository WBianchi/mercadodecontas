"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import Image from "next/image"
import { toast } from "sonner"
import { CopyIcon, ExternalLink, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog"
import { PaymentSuccess } from "./payment-success"
import { PaymentProcessing } from "./payment-processing"

interface PixPaymentProps {
  value: number
  onCreateOrder: (data: any) => Promise<any>
  disabled?: boolean
}

export function PixPayment({ value, onCreateOrder, disabled }: PixPaymentProps) {
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [showProcessing, setShowProcessing] = useState(false)
  const [qrCode, setQrCode] = useState("")
  const [pixKey, setPixKey] = useState("")
  const [ticketUrl, setTicketUrl] = useState("")
  const [paymentId, setPaymentId] = useState("")
  const [orderId, setOrderId] = useState("")
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null)
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Criar data URL a partir da string base64
  // Inicia um timer de 15 segundos quando o QR code for exibido
  useEffect(() => {
    if (!showVerification) return
    
    // Limpar timer anterior se existir
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    
    // Iniciar novo timer de 15 segundos
    timerRef.current = setTimeout(() => {
      setShowWhatsAppModal(true)
    }, 15000) // 15 segundos
    
    // Cleanup do timer quando o componente for desmontado
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [showVerification])

  useEffect(() => {
    if (qrCode) {
      try {
        // Verificar se a string já é uma URL ou precisa ser convertida de base64
        if (qrCode.startsWith('data:image') || qrCode.startsWith('http')) {
          // Já é uma URL válida, pode usar diretamente
          setQrCodeDataUrl(qrCode);
        } else {
          // É uma string base64, precisamos formatar como data URL
          const formattedQrCode = `data:image/png;base64,${qrCode.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')}`;
          setQrCodeDataUrl(formattedQrCode);
        }
        console.log("QR Code formatado com sucesso");
      } catch (error) {
        console.error("Erro ao formatar QR Code:", error);
        toast.error("Erro ao gerar QR Code");
      }
    }
  }, [qrCode]);

  const handleCreatePix = async () => {
    try {
      setLoading(true)
      console.log("Iniciando criação de PIX...")

      // Mostrar para o usuário que estamos processando
      toast.info("Estamos gerando o código PIX, aguarde um momento...");

      const response = await onCreateOrder({
        paymentMethod: "PIX"
      })

      console.log("Resposta do servidor completa:", JSON.stringify(response, null, 2));

      // Verificação mais robusta para os campos necessários
      // Acessa diretamente os campos esperados na resposta da API
      const qrCodeUrl = response?.qrCodeUrl;
      const pixKey = response?.pixKey;
      
      console.log("QR Code URL:", qrCodeUrl);
      console.log("PIX Key:", pixKey);

      if (qrCodeUrl && pixKey) {
        setQrCode(qrCodeUrl)
        setPixKey(pixKey)
        
        if (response.ticketUrl) {
          console.log("Ticket URL:", response.ticketUrl);
          setTicketUrl(response.ticketUrl)
        }
        
        if (response.paymentId) {
          console.log("Payment ID:", response.paymentId);
          setPaymentId(response.paymentId.toString())
        }

        if (response.orderId) {
          console.log("Order ID:", response.orderId);
          setOrderId(response.orderId.toString())
        }
        
        setLoading(false)
        setShowVerification(true)
      } else {
        console.error("Erro: resposta não contém qrCodeUrl ou pixKey", response)
        toast.error("Erro ao gerar QR Code do PIX")
        setLoading(false)
      }
    } catch (error: any) {
      console.error("Erro ao processar PIX:", error)
      toast.error(error.message || "Erro ao processar PIX")
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Código PIX copiado para a área de transferência")
  }

  // Resetar estados
  const handleClose = () => {
    setShowSuccess(false)
    setShowVerification(false)
    setShowProcessing(false)
    setShowWhatsAppModal(false)
    setQrCode("")
    setPixKey("")
    setTicketUrl("")
    setPaymentId("")
    setOrderId("")
    setQrCodeDataUrl(null)
    
    // Limpar timer se existir
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const handleStartProcessing = () => {
    setShowVerification(false)
    setShowProcessing(true)
  }

  const handlePaymentSuccess = () => {
    setShowProcessing(false)
    setShowSuccess(true)
  }

  return (
    <div className="flex flex-col gap-5">
      {!showVerification && !showProcessing && !showSuccess && (
        <>
          <div className="text-center">
            <p className="text-xl font-semibold">Pagamento via PIX</p>
            <p className="text-sm text-muted-foreground mt-1">
              O pagamento via PIX é processado rapidamente e você receberá acesso
              imediato ao produto assim que confirmado.
            </p>
          </div>

          <div className="border-t border-b py-3 my-2">
            <p className="text-center text-sm font-medium">
              Total a pagar <span className="font-bold text-base">R$ {value.toFixed(2)}</span>
            </p>
          </div>

          <div className="bg-white p-2 rounded-xl">
            <Image
              src="/qr-code-manual.jpeg"
              alt="QR Code PIX Manual"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          <span id="fd51c49b-1c84-423b-9071-898b109cb33e" className="block text-center mt-2 text-sm text-gray-600">fd51c49b-1c84-423b-9071-898b109cb33e</span>
        </>
      )}

      {showVerification && !showProcessing && !showSuccess && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl font-semibold text-center">Pague com PIX</p>
          
          <div className="bg-white p-2 rounded-xl">
            {qrCodeDataUrl ? (
              <Image 
                src={qrCodeDataUrl}
                alt="QR Code PIX"
                width={200}
                height={200}
                className="mx-auto"
                unoptimized
              />
            ) : (
              <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="w-full space-y-3">
            <div>
              <Label htmlFor="pix-code">Código PIX (Copia e Cola)</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="pix-code"
                  value={pixKey}
                  readOnly
                  className="font-mono text-xs"
                />
                <Button 
                  size="icon" 
                  variant="outline"
                  onClick={() => copyToClipboard(pixKey)}
                >
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {ticketUrl && (
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => window.open(ticketUrl, '_blank')}
              >
                Abrir página de pagamento
              </Button>
            )}
          </div>

          <div className="text-center mt-4">
            <Button 
              variant="default" 
              className="w-full"
              onClick={handleStartProcessing}
            >
              Já fiz o pagamento PIX
            </Button>
          </div>
        </div>
      )}

      <Dialog open={showProcessing} onOpenChange={setShowProcessing}>
        <PaymentProcessing 
          paymentMethod="PIX"
          paymentId={paymentId}
          externalReference={orderId}
          onSuccess={handlePaymentSuccess}
        />
      </Dialog>

      <Dialog open={showSuccess} onOpenChange={handleClose}>
        <PaymentSuccess onClose={handleClose} />
      </Dialog>

      <Dialog open={showWhatsAppModal} onOpenChange={setShowWhatsAppModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Envie seu comprovante pelo WhatsApp</DialogTitle>
            <DialogDescription>
              Assim que realizar o pagamento, envie o comprovante para o nosso WhatsApp para agilizar a liberação do seu produto.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center my-4">
            <Image
              src="/qr-code-manual.jpeg"
              alt="QR Code PIX Manual"
              width={150}
              height={150}
              className="rounded-md"
            />
          </div>
          <DialogFooter>
            <Button 
              onClick={() => window.open("https://api.whatsapp.com/send/?phone=5581987479236&text=Olá!+Gostaria+de+enviar+o+comprovante+do+meu+pagamento+via+PIX.&type=phone_number&app_absent=0", "_blank")}
              className="w-full"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Enviar comprovante pelo WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
