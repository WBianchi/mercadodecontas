"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { ArrowRight, CreditCard, Barcode, QrCode, Info, CheckCircle2, ArrowLeft } from "lucide-react"

const steps = ["Método de Pagamento", "Informações", "Confirmação"]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleFinishPayment = async () => {
    setLoading(true)
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
    handleNextStep()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-24">
      <div className="container max-w-3xl mx-auto px-4">
        {/* Progresso */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${
                  index === steps.length - 1 ? "" : "flex-1"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full font-medium transition-colors ${
                    currentStep >= index
                      ? "bg-[#097bff] text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                  }`}
                >
                  {currentStep > index ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index !== steps.length - 1 && (
                  <div className="flex-1 h-1 mx-4">
                    <Progress
                      value={currentStep > index ? 100 : 0}
                      className="h-1"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`${
                  currentStep >= index
                    ? "text-[#097bff]"
                    : "text-gray-500"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">
                  Escolha como quer pagar
                </h2>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <div>
                    <RadioGroupItem
                      value="pix"
                      id="pix"
                      className="peer hidden"
                    />
                    <Label
                      htmlFor="pix"
                      className="flex items-center justify-between p-4 border rounded-lg cursor-pointer peer-checked:border-[#097bff] peer-checked:bg-blue-50 dark:peer-checked:bg-blue-950 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                          <QrCode className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <div className="font-medium">PIX</div>
                          <div className="text-sm text-gray-500">
                            Aprovação imediata
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="font-medium">
                          10% OFF
                        </Badge>
                      </div>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem
                      value="credit"
                      id="credit"
                      className="peer hidden"
                    />
                    <Label
                      htmlFor="credit"
                      className="flex items-center justify-between p-4 border rounded-lg cursor-pointer peer-checked:border-[#097bff] peer-checked:bg-blue-50 dark:peer-checked:bg-blue-950 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium">Cartão de Crédito</div>
                          <div className="text-sm text-gray-500">
                            Até 12x sem juros
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem
                      value="boleto"
                      id="boleto"
                      className="peer hidden"
                    />
                    <Label
                      htmlFor="boleto"
                      className="flex items-center justify-between p-4 border rounded-lg cursor-pointer peer-checked:border-[#097bff] peer-checked:bg-blue-50 dark:peer-checked:bg-blue-950 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <Barcode className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <div className="font-medium">Boleto Bancário</div>
                          <div className="text-sm text-gray-500">
                            Aprovação em até 3 dias úteis
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">
                  Informações para entrega digital
                </h2>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium mb-2">
                      E-mail para receber a licença
                    </Label>
                    <div className="relative">
                      <Input
                        type="email"
                        id="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pr-10"
                      />
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                          >
                            <Info className="w-4 h-4 text-gray-400" />
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-medium">Entrega Digital</h4>
                            <p className="text-sm text-gray-500">
                              Você receberá as instruções de acesso e a licença
                              digital neste e-mail após a confirmação do pagamento.
                            </p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <div className="flex flex-col items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Pedido Confirmado!</h2>
                  <p className="text-gray-500">
                    Enviamos as instruções para seu e-mail
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Método de Pagamento</span>
                      <span className="font-medium">
                        {paymentMethod === "pix"
                          ? "PIX"
                          : paymentMethod === "credit"
                          ? "Cartão de Crédito"
                          : "Boleto Bancário"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">E-mail</span>
                      <span className="font-medium">{email}</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => window.location.href = "/"}
                >
                  Voltar para a Loja
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botões de Navegação */}
          {currentStep < 2 && (
            <div className="flex items-center justify-between mt-8">
              {currentStep > 0 ? (
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
              ) : (
                <div />
              )}
              <Button
                onClick={
                  currentStep === 1 ? handleFinishPayment : handleNextStep
                }
                disabled={
                  (currentStep === 0 && !paymentMethod) ||
                  (currentStep === 1 && !email) ||
                  loading
                }
                className="flex items-center gap-2"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processando...
                  </div>
                ) : (
                  <>
                    {currentStep === 1 ? "Finalizar Pedido" : "Continuar"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
