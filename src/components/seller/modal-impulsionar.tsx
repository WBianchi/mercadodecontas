"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { 
  Rocket,
  Target,
  Users,
  Clock,
  TrendingUp,
  Star,
  Search,
  DollarSign,
  ArrowLeft,
  Loader2,
  Zap,
  Award,
  TrendingUp as TrendingUpIcon,
  Eye,
  HeartPulse
} from "lucide-react"
import { QRCodeSVG } from 'qrcode.react'
import { PixPayment } from "@/components/pix-payment"
import { CreditCardPayment } from "@/components/credit-card-payment"
import { useQuery } from "@tanstack/react-query"

interface Product {
  id: number
  name: string
  image?: string
  price: number
  status: string
}

async function fetchProdutosLojista() {
  const response = await fetch("/api/lojista/produtos")
  if (!response.ok) {
    throw new Error("Falha ao carregar produtos")
  }
  return response.json()
}

export function ModalImpulsionar({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1)
  const [anuncio, setAnuncio] = useState("")
  const [dias, setDias] = useState(7)
  const [alcance, setAlcance] = useState(1000)
  const [tipo, setTipo] = useState("destaque")
  const [metodoPagamento, setMetodoPagamento] = useState("")
  const [valorTotal, setValorTotal] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [feedbackDias, setFeedbackDias] = useState("")
  const [feedbackAlcance, setFeedbackAlcance] = useState("")
  const [intensidadeDias, setIntensidadeDias] = useState(1)
  const [intensidadeAlcance, setIntensidadeAlcance] = useState(1)

  const { data: produtos = [], isLoading } = useQuery<Product[]>({
    queryKey: ["produtos-lojista"],
    queryFn: fetchProdutosLojista,
    enabled: modalOpen, // Só carrega os produtos quando o modal estiver aberto
  })

  const calcularValor = () => {
    let valor = 0
    
    // No Facebook, o custo é geralmente calculado por impressões (CPM - custo por mil impressões)
    // CPM médio no Brasil está entre R$5-R$15
    const cpmBase = 12 // R$12 por mil impressões (CPM médio)
    
    // Cálculo baseado no alcance (número de pessoas)
    valor = (alcance / 1000) * cpmBase
    
    // Ajuste pelo número de dias (multiplicador de exposição)
    // Mais dias significa mais impressões por pessoa
    const multiplicadorDias = Math.min(dias / 7, 3) + 0.7 // Limita o crescimento em campanhas muito longas
    valor *= multiplicadorDias
    
    // Valor mínimo da campanha
    const valorMinimoCampanha = 50
    valor = Math.max(valor, valorMinimoCampanha)
    
    // Tipo de impulsionamento afeta o custo (segmentação, posicionamento premium)
    switch (tipo) {
      case "destaque":
        valor *= 1.2 // Posicionamento básico
        break
      case "premium":
        valor *= 1.7 // Posicionamento premium em toda plataforma
        break
      case "pesquisados":
        valor *= 1.4 // Posicionamento em busca (similar ao Search Ads)
        break
    }
    
    // Arredonda para 2 casas decimais e depois para o inteiro mais próximo
    valor = Math.round(valor)
    
    setValorTotal(valor)
  }

  useEffect(() => {
    if (step === 2) {
      calcularValor()
    }
  }, [dias, alcance, tipo, step])

  useEffect(() => {
    if (dias <= 5) {
      setFeedbackDias("Uma campanha curta, ideal para testar")
      setIntensidadeDias(1)
    } else if (dias <= 10) {
      setFeedbackDias("Tempo bom para ver resultados iniciais")
      setIntensidadeDias(2)
    } else if (dias <= 15) {
      setFeedbackDias("Uma campanha com ótima duração!")
      setIntensidadeDias(3)
    } else if (dias <= 22) {
      setFeedbackDias("Impacto de longo prazo! Seu anúncio será visto por semanas!")
      setIntensidadeDias(4)
    } else {
      setFeedbackDias("Campanha de impacto máximo! Prepare-se para o sucesso!")
      setIntensidadeDias(5)
    }
  }, [dias])

  useEffect(() => {
    if (alcance <= 5000) {
      setFeedbackAlcance("Um bom começo para seu anúncio")
      setIntensidadeAlcance(1)
    } else if (alcance <= 15000) {
      setFeedbackAlcance("Seu anúncio vai ganhar visibilidade!")
      setIntensidadeAlcance(2)
    } else if (alcance <= 25000) {
      setFeedbackAlcance("Uau! Muita gente verá seu produto!")
      setIntensidadeAlcance(3)
    } else if (alcance <= 40000) {
      setFeedbackAlcance("Isso sim é exposição! Prepare-se para vendas!")
      setIntensidadeAlcance(4)
    } else {
      setFeedbackAlcance("MEGA exposição! Seu produto será visto por TODOS!")
      setIntensidadeAlcance(5)
    }
  }, [alcance])

  const handleCreateOrder = async (data: any) => {
    // Aqui você implementaria a lógica para criar o pedido de impulsionamento
    console.log("Criando pedido de impulsionamento:", { 
      anuncioId: anuncio,
      dias,
      alcance,
      tipo,
      valorTotal,
      ...data 
    })
    
    // Simulando um sucesso após 2 segundos
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: "IMP" + Math.floor(Math.random() * 10000),
          success: true,
          paymentId: "PAY" + Math.floor(Math.random() * 10000),
          qrCodeUrl: data.paymentMethod === "pix" ? "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913Mercado Contas6008Sao Paulo62070503***63041234" : null,
          pixCopiaECola: data.paymentMethod === "pix" ? "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913Mercado Contas6008Sao Paulo62070503***63041234" : null
        })
      }, 2000)
    })
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Impulsionar Anúncio</DialogTitle>
          <DialogDescription>
            Aumente a visibilidade do seu anúncio e alcance mais clientes
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="anuncio">Selecione o Anúncio</Label>
              <Select value={anuncio} onValueChange={setAnuncio}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um anúncio" />
                </SelectTrigger>
                <SelectContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Carregando anúncios...
                    </div>
                  ) : produtos.length > 0 ? (
                    produtos.map((produto) => (
                      <SelectItem key={produto.id} value={String(produto.id)}>
                        {produto.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-center text-sm text-muted-foreground">
                      Nenhum anúncio encontrado
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipo de Impulsionamento</Label>
              <RadioGroup value={tipo} onValueChange={setTipo} className="grid grid-cols-3 gap-4">
                <label 
                  className="flex flex-col items-center p-4 border rounded-lg cursor-pointer data-[state=checked]:border-[#097bff] data-[state=checked]:bg-[#097bff]/10" 
                  data-state={tipo === "destaque" ? "checked" : "unchecked"}
                  onClick={() => setTipo("destaque")}
                >
                  <Star className="h-8 w-8 mb-2 text-[#097bff]" />
                  <RadioGroupItem value="destaque" id="destaque" className="sr-only" />
                  <Label htmlFor="destaque" className="font-medium">Destaque</Label>
                  <p className="text-xs text-center text-muted-foreground mt-1">Apareça no topo da página inicial</p>
                </label>
                <label 
                  className="flex flex-col items-center p-4 border rounded-lg cursor-pointer data-[state=checked]:border-[#097bff] data-[state=checked]:bg-[#097bff]/10" 
                  data-state={tipo === "premium" ? "checked" : "unchecked"}
                  onClick={() => setTipo("premium")}
                >
                  <Rocket className="h-8 w-8 mb-2 text-[#097bff]" />
                  <RadioGroupItem value="premium" id="premium" className="sr-only" />
                  <Label htmlFor="premium" className="font-medium">Premium</Label>
                  <p className="text-xs text-center text-muted-foreground mt-1">Destaque em toda a plataforma</p>
                </label>
                <label 
                  className="flex flex-col items-center p-4 border rounded-lg cursor-pointer data-[state=checked]:border-[#097bff] data-[state=checked]:bg-[#097bff]/10" 
                  data-state={tipo === "pesquisados" ? "checked" : "unchecked"}
                  onClick={() => setTipo("pesquisados")}
                >
                  <Search className="h-8 w-8 mb-2 text-[#097bff]" />
                  <RadioGroupItem value="pesquisados" id="pesquisados" className="sr-only" />
                  <Label htmlFor="pesquisados" className="font-medium">Pesquisados</Label>
                  <p className="text-xs text-center text-muted-foreground mt-1">Apareça nos mais pesquisados</p>
                </label>
              </RadioGroup>
            </div>

            <Button 
              className="w-full" 
              onClick={() => setStep(2)}
              disabled={!anuncio}
            >
              <Rocket className="mr-2 h-4 w-4" />
              Configurar Impulsionamento
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 py-4">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(1)}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h4 className="font-medium">Configurações</h4>
                <p className="text-sm text-muted-foreground">
                  Personalize seu impulsionamento
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="days">Duração da Campanha</Label>
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.3 }}
                    key={dias}
                  >
                    <Badge 
                      variant={intensidadeDias >= 4 ? "outline" : "secondary"}
                      className={`px-3 ${intensidadeDias >= 4 ? 'border-[#097bff] text-[#097bff] font-bold' : ''}`}
                    >
                      {dias} dias
                    </Badge>
                  </motion.div>
                </div>
                <Slider
                  id="days"
                  value={[dias]}
                  onValueChange={(value) => {
                    setDias(value[0])
                    calcularValor()
                  }}
                  max={30}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 dia</span>
                  <span>30 dias</span>
                </div>
                <motion.div 
                  className="mt-2 rounded-lg border p-2 transition-all"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    borderColor: intensidadeDias >= 4 ? "#097bff" : "#e2e8f0",
                    backgroundColor: intensidadeDias >= 4 ? "rgba(9, 123, 255, 0.05)" : "transparent"
                  }}
                  key={`dias-${intensidadeDias}`}
                >
                  <div className="flex items-center gap-2">
                    {intensidadeDias === 1 && <Clock className="h-4 w-4 text-gray-500" />}
                    {intensidadeDias === 2 && <Clock className="h-4 w-4 text-blue-400" />}
                    {intensidadeDias === 3 && <TrendingUpIcon className="h-4 w-4 text-green-500" />}
                    {intensidadeDias === 4 && <Zap className="h-4 w-4 text-[#097bff]" />}
                    {intensidadeDias === 5 && <Award className="h-4 w-4 text-amber-500" />}
                    <p className="text-sm font-medium">
                      {feedbackDias}
                    </p>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                    <motion.div 
                      className="h-1.5 rounded-full" 
                      style={{ 
                        width: `${(intensidadeDias / 5) * 100}%`,
                        background: intensidadeDias <= 2 
                          ? "linear-gradient(to right, #60a5fa, #3b82f6)" 
                          : intensidadeDias <= 4 
                            ? "linear-gradient(to right, #3b82f6, #097bff)" 
                            : "linear-gradient(to right, #097bff, #ff6b00)"
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(intensidadeDias / 5) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="reach">Alcance Estimado</Label>
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.3 }}
                    key={alcance}
                  >
                    <Badge 
                      variant={intensidadeAlcance >= 4 ? "outline" : "secondary"}
                      className={`px-3 ${intensidadeAlcance >= 4 ? 'border-[#097bff] text-[#097bff] font-bold' : ''}`}
                    >
                      {alcance.toLocaleString()} pessoas
                    </Badge>
                  </motion.div>
                </div>
                <Slider
                  id="reach"
                  value={[alcance]}
                  onValueChange={(value) => {
                    setAlcance(value[0])
                    calcularValor()
                  }}
                  max={50000}
                  min={1000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1.000</span>
                  <span>50.000</span>
                </div>
                <motion.div 
                  className="mt-2 rounded-lg border p-2 transition-all"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    borderColor: intensidadeAlcance >= 4 ? "#097bff" : "#e2e8f0",
                    backgroundColor: intensidadeAlcance >= 4 ? "rgba(9, 123, 255, 0.05)" : "transparent"
                  }}
                  key={`alcance-${intensidadeAlcance}`}
                >
                  <div className="flex items-center gap-2">
                    {intensidadeAlcance === 1 && <Eye className="h-4 w-4 text-gray-500" />}
                    {intensidadeAlcance === 2 && <Users className="h-4 w-4 text-blue-400" />}
                    {intensidadeAlcance === 3 && <Target className="h-4 w-4 text-green-500" />}
                    {intensidadeAlcance === 4 && <HeartPulse className="h-4 w-4 text-[#097bff]" />}
                    {intensidadeAlcance === 5 && <Rocket className="h-4 w-4 text-amber-500" />}
                    <p className="text-sm font-medium">
                      {feedbackAlcance}
                    </p>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                    <motion.div 
                      className="h-1.5 rounded-full" 
                      style={{ 
                        width: `${(intensidadeAlcance / 5) * 100}%`,
                        background: intensidadeAlcance <= 2 
                          ? "linear-gradient(to right, #60a5fa, #3b82f6)" 
                          : intensidadeAlcance <= 4 
                            ? "linear-gradient(to right, #3b82f6, #097bff)" 
                            : "linear-gradient(to right, #097bff, #ff6b00)"
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(intensidadeAlcance / 5) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Resumo do Impulsionamento</h4>
                  <p className="text-sm text-muted-foreground">
                    Estimativa baseada nas suas configurações
                  </p>
                </div>
                <motion.div 
                  className="text-right"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5 }}
                  key={valorTotal}
                >
                  <p className="text-2xl font-bold text-[#097bff]">
                    R$ {valorTotal.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-end text-sm text-muted-foreground gap-1">
                    <Clock className="h-3 w-3" />
                    <p>{dias} dias de campanha</p>
                  </div>
                  <div className="flex items-center justify-end text-sm text-muted-foreground gap-1">
                    <Users className="h-3 w-3" />
                    <p>até {alcance.toLocaleString()} pessoas</p>
                  </div>
                </motion.div>
              </div>

              <Button 
                className="w-full" 
                onClick={() => setStep(3)}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Ir para Pagamento
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 py-4">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(2)}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h4 className="font-medium">Forma de Pagamento</h4>
                <p className="text-sm text-muted-foreground">
                  Escolha como deseja pagar
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <RadioGroup 
                value={metodoPagamento} 
                onValueChange={setMetodoPagamento}
                className="grid gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label htmlFor="pix" className="flex items-center gap-2">
                    PIX
                    <Badge variant="secondary">Aprovação Instantânea</Badge>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cartao" id="cartao" />
                  <Label htmlFor="cartao" className="flex items-center gap-2">
                    Cartão de Crédito
                    <Badge variant="secondary">Em até 12x</Badge>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Total a Pagar</h4>
                  <p className="text-sm text-muted-foreground">
                    Pagamento único
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    R$ {valorTotal.toFixed(2)}
                  </p>
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={() => {
                  if (metodoPagamento === "pix") {
                    setStep(4)
                  } else if (metodoPagamento === "cartao") {
                    setStep(5)
                  }
                }}
                disabled={!metodoPagamento}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Continuar
              </Button>
            </div>
          </div>
        )}

        {step === 4 && metodoPagamento === 'pix' && (
          <div className="pt-2">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(3)}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h4 className="font-medium">Pagamento via PIX</h4>
                <p className="text-sm text-muted-foreground">
                  Escaneie o QR Code para pagar
                </p>
              </div>
            </div>
            <PixPayment 
              value={valorTotal} 
              onCreateOrder={(data) => handleCreateOrder({ 
                ...data, 
                paymentMethod: "pix" 
              })} 
            />
          </div>
        )}

        {step === 5 && metodoPagamento === 'cartao' && (
          <div className="pt-2">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(3)}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h4 className="font-medium">Pagamento com Cartão</h4>
                <p className="text-sm text-muted-foreground">
                  Preencha os dados do seu cartão
                </p>
              </div>
            </div>
            <CreditCardPayment 
              value={valorTotal} 
              onCreateOrder={(data) => handleCreateOrder({ 
                ...data, 
                paymentMethod: "card" 
              })} 
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
