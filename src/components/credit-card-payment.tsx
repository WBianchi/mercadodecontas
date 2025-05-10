"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { PaymentSuccess } from "./payment-success"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Dialog } from "./ui/dialog"
import { PaymentProcessing } from "./payment-processing"

interface CreditCardPaymentProps {
  value: number
  onCreateOrder: (data: any) => Promise<any>
  disabled?: boolean
  onboard?: any
  cpfCnpj?: string
}

export function CreditCardPayment({ value, onCreateOrder, disabled, onboard, cpfCnpj }: CreditCardPaymentProps) {
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showProcessing, setShowProcessing] = useState(false)
  const [paymentId, setPaymentId] = useState("")
  const [orderId, setOrderId] = useState("")
  const [installments, setInstallments] = useState("1")
  
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    cardExpiry: "",
    cardCvv: ""
  })

  const [cardBrand, setCardBrand] = useState<string | null>(null)

  const identifyCardBrand = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\D/g, '')
    
    if (!cleaned) {
      setCardBrand(null)
      return
    }
    
    // Visa: começa com 4
    if (/^4/.test(cleaned)) {
      setCardBrand('visa')
      return
    }
    
    // Mastercard: começa com 5 (51-55) ou alguns intervalos específicos que começam com 2
    if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) {
      setCardBrand('mastercard')
      return
    }
    
    // Amex: começa com 34 ou 37
    if (/^3[47]/.test(cleaned)) {
      setCardBrand('amex')
      return
    }
    
    // Elo: vários padrões específicos
    if (/^(401178|401179|431274|438935|451416|457393|457631|457632|504175|627780|636297|636368|636369|655000|655001|651652|651653|651654|651655|651656|651657|651658|651659|655002|655003|655004|655005|655006|655007|655008|506699|504175|438935|431274|427562|427561|427569)/.test(cleaned) ||
        /^(506699|5067|509|6516|6550)/.test(cleaned)) {
      setCardBrand('elo')
      return
    }
    
    // Hipercard: começa com 606282
    if (/^(606282|384100|384140|384160|606274|637095)/.test(cleaned)) {
      setCardBrand('hipercard')
      return
    }
    
    setCardBrand(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Formatar cartão
    if (name === "cardNumber") {
      // Limita a entrada a 19 caracteres (16 dígitos + 3 espaços)
      const cleaned = value.replace(/\D/g, "").substring(0, 16)
      
      // Formatação com espaço a cada 4 dígitos
      let formatted = ""
      for (let i = 0; i < cleaned.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formatted += " "
        }
        formatted += cleaned[i]
      }
      
      setCardData(prev => ({
        ...prev,
        [name]: formatted
      }))
      identifyCardBrand(formatted)
      return
    }

    // Formatar data de validade
    if (name === "cardExpiry") {
      const cleaned = value.replace(/\D/g, "")
      let formatted = cleaned
      
      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
      }
      
      setCardData(prev => ({
        ...prev,
        [name]: formatted
      }))
      return
    }

    // Formatar CVV
    if (name === "cardCvv") {
      const formatted = value.replace(/\D/g, "").slice(0, 4)
      setCardData(prev => ({
        ...prev,
        [name]: formatted
      }))
      return
    }

    // Outras entradas
    setCardData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInstallmentsChange = (value: string) => {
    setInstallments(value)
  }

  const validateCardData = () => {
    const { cardNumber, cardHolder, cardExpiry, cardCvv } = cardData
    
    // Validação do número do cartão
    const cleanedCardNumber = cardNumber.replace(/\s/g, "")
    if (!cleanedCardNumber || cleanedCardNumber.length < 16) {
      toast.error("Número do cartão inválido. Deve ter 16 dígitos.")
      return false
    }
    
    // Validação do nome do titular
    if (!cardHolder || cardHolder.trim().length < 3) {
      toast.error("Nome do titular do cartão é obrigatório")
      return false
    }
    
    // Validação da data de validade
    if (!cardExpiry || cardExpiry.length < 5) {
      toast.error("Data de validade inválida. Use o formato MM/AA")
      return false
    }
    
    // Verificação se o cartão está expirado
    try {
      const [month, year] = cardExpiry.split('/');
      const expiryMonth = parseInt(month, 10);
      const expiryYear = parseInt(`20${year}`, 10);
      
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // getMonth() é 0-indexed
      const currentYear = currentDate.getFullYear();
      
      if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
        toast.error("Cartão expirado. Por favor, use um cartão válido.")
        return false;
      }
    } catch (error) {
      toast.error("Formato de data inválido. Use MM/AA")
      return false;
    }
    
    // Validação do CVV
    if (!cardCvv || cardCvv.length < 3) {
      toast.error("Código de segurança inválido. Deve ter 3 ou 4 dígitos.")
      return false
    }
    
    return true
  }

  const handleProcessPayment = async () => {
    if (!validateCardData()) return
    
    try {
      setLoading(true)
      console.log("Iniciando processamento do pagamento com cartão...");
      
      // Obter dados do cliente do contexto ou props
      const clientData = onboard || {};
      
      const formattedData = {
        paymentMethod: "CREDIT_CARD",
        cardNumber: cardData.cardNumber.replace(/\D/g, ''),
        cardHolder: cardData.cardHolder,
        cardExpiry: cardData.cardExpiry.replace(/\D/g, ''),
        cardCvv: cardData.cardCvv,
        installments: Number(installments),
        // Incluir documento do cliente para tokenização correta
        cpfCnpj: clientData.cpfCnpj || cpfCnpj || ""
      }
      
      console.log("Dados do cartão formatados (número mascarado):", {
        ...formattedData,
        cardNumber: `${formattedData.cardNumber.slice(0, 4)}****${formattedData.cardNumber.slice(-4)}`,
        cardCvv: "***"
      });
      
      // Mostrar um feedback para o usuário
      toast.info("Processando pagamento, não feche a página...");
      
      const response = await onCreateOrder(formattedData)
      console.log("Resposta do processamento:", JSON.stringify(response, null, 2));
      
      // Verificar se temos um ID de pagamento na resposta
      if (response && response.paymentId) {
        setPaymentId(response.paymentId)
        setOrderId(response.orderId?.toString() || "")
        
        // Verificar o status do pagamento
        if (response.status === 'approved') {
          console.log("Pagamento aprovado imediatamente!");
          toast.success("Pagamento aprovado com sucesso!");
          setShowSuccess(true)
        } else {
          // Para status pendentes ou outros, mostrar tela de processamento
          console.log("Pagamento em processamento. Status:", response.status);
          toast.info("Verificando status do pagamento...");
          setShowProcessing(true)
        }
      } else {
        console.error("Resposta não contém paymentId ou está em formato inesperado:", response);
        toast.error("Erro ao processar pagamento. Tente novamente mais tarde.")
      }
      
      setLoading(false)
      
    } catch (error: any) {
      console.error("Erro ao processar pagamento:", error)
      toast.error(error.message || "Erro ao processar pagamento")
      setLoading(false)
    }
  }

  // Resetar estados
  const handleClose = () => {
    setShowSuccess(false)
    setShowProcessing(false)
    setPaymentId("")
    setOrderId("")
  }
  
  const handlePaymentSuccess = () => {
    setShowProcessing(false)
    setShowSuccess(true)
  }

  // Calcula valor da parcela
  const getInstallmentValue = (installments: number) => {
    // Valor mínimo por parcela (definido pelo MP - geralmente R$ 5,00)
    const minInstallmentValue = 5.00;
    
    // Taxa de juros (se aplicável)
    // Até 6x geralmente é sem juros, depois pode ter juros
    const hasInterest = installments > 6;
    const interestRate = hasInterest ? 0.0199 : 0; // 1.99% ao mês (exemplo)
    
    // Se tiver juros, calcular valor com juros compostos
    let installmentValue;
    if (hasInterest) {
      // Fórmula de juros compostos: pmt = (pv * (1 + r)^n * r) / ((1 + r)^n - 1)
      const rate = interestRate;
      const pv = value;
      const n = installments;
      
      installmentValue = (pv * Math.pow(1 + rate, n) * rate) / (Math.pow(1 + rate, n) - 1);
    } else {
      // Sem juros
      installmentValue = value / installments;
    }
    
    // Verificar se atende ao valor mínimo por parcela
    if (installmentValue < minInstallmentValue && installments > 1) {
      return {
        value: "Indisponível",
        hasInterest: false,
        invalid: true
      };
    }
    
    return {
      value: installmentValue.toFixed(2),
      hasInterest,
      invalid: false
    };
  }
  
  // Determinar as parcelas disponíveis
  const getAvailableInstallments = () => {
    return [...Array(12)].map((_, index) => {
      const num = index + 1;
      const installmentInfo = getInstallmentValue(num);
      
      return {
        value: num,
        label: `${num}x de R$ ${installmentInfo.value}${installmentInfo.hasInterest ? ' com juros' : ' sem juros'}`,
        available: !installmentInfo.invalid
      };
    });
  }

  return (
    <div className="flex flex-col gap-5">
      {!showProcessing && !showSuccess && (
        <>
          <div className="text-center">
            <p className="text-xl font-semibold">Pagamento com Cartão</p>
            <p className="text-sm text-muted-foreground mt-1">
              Pague com cartão de crédito em até 12x
            </p>
          </div>

          <div className="border-t border-b py-3 my-2">
            <p className="text-center text-sm font-medium">
              Total a pagar <span className="font-bold text-base">R$ {value.toFixed(2)}</span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Número do Cartão</Label>
              <div className="flex items-center relative">
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  value={cardData.cardNumber}
                  onChange={handleInputChange}
                  className="font-mono pr-12"
                />
                {cardBrand && (
                  <div className="absolute right-3 flex items-center">
                    <span className="text-xs font-medium text-muted-foreground capitalize bg-muted px-2 py-1 rounded">
                      {cardBrand}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardHolder">Nome do Titular</Label>
              <Input
                id="cardHolder"
                name="cardHolder"
                placeholder="NOME COMO ESTÁ NO CARTÃO"
                value={cardData.cardHolder}
                onChange={handleInputChange}
                className="uppercase"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardExpiry">Validade (MM/AA)</Label>
                <Input
                  id="cardExpiry"
                  name="cardExpiry"
                  placeholder="MM/AA"
                  value={cardData.cardExpiry}
                  onChange={handleInputChange}
                  className="font-mono"
                  maxLength={5}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardCvv">CVV</Label>
                <Input
                  id="cardCvv"
                  name="cardCvv"
                  placeholder="000"
                  value={cardData.cardCvv}
                  onChange={handleInputChange}
                  className="font-mono"
                  maxLength={4}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="installments">Parcelas</Label>
              <div className="space-y-2">
                <Select
                  value={installments} 
                  onValueChange={handleInstallmentsChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione as parcelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableInstallments().map((installment) => (
                      <SelectItem key={installment.value} value={installment.value.toString()} disabled={!installment.available}>
                        {installment.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="text-xs text-muted-foreground">
                  <p className="mt-1">• Parcelas em até 6x sem juros</p>
                  <p>• A partir de 7x com juros de 1.99% ao mês</p>
                  <p>• Valor mínimo por parcela: R$ 5,00</p>
                </div>
              </div>
            </div>
          </div>

          <Button
            disabled={disabled || loading}
            onClick={handleProcessPayment}
            className="w-full mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              "Finalizar Pagamento"
            )}
          </Button>
        </>
      )}

      <Dialog open={showProcessing} onOpenChange={setShowProcessing}>
        <PaymentProcessing 
          paymentMethod="CREDIT_CARD"
          paymentId={paymentId}
          externalReference={orderId}
          onSuccess={handlePaymentSuccess}
        />
      </Dialog>

      <Dialog open={showSuccess} onOpenChange={handleClose}>
        <PaymentSuccess onClose={handleClose} />
      </Dialog>
    </div>
  )
}
