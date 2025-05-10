"use client"

import { motion } from "framer-motion"
import { Check, X, Zap, Shield, Star, ArrowRight, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Link from 'next/link'

const plans = [
  {
    name: "Iniciante",
    description: "Para quem está começando no mercado digital",
    price: "Grátis",
    period: "para sempre",
    features: [
      { name: "Até 3 anúncios ativos", included: true },
      { name: "Suporte via email", included: true },
      { name: "Estatísticas básicas", included: true },
      { name: "Proteção do comprador", included: true },
      { name: "Chat com vendedor", included: true },
      { name: "Destaque nos resultados", included: false },
      { name: "Selo de vendedor verificado", included: false },
      { name: "Suporte prioritário", included: false },
    ],
    icon: Zap,
    color: "blue",
  },
  {
    name: "Profissional",
    description: "Ideal para vendedores regulares",
    price: "R$ 49,90",
    period: "por mês",
    popular: true,
    features: [
      { name: "Até 20 anúncios ativos", included: true },
      { name: "Suporte via email e chat", included: true },
      { name: "Estatísticas avançadas", included: true },
      { name: "Proteção do comprador", included: true },
      { name: "Chat com vendedor", included: true },
      { name: "Destaque nos resultados", included: true },
      { name: "Selo de vendedor verificado", included: true },
      { name: "Suporte prioritário", included: false },
    ],
    icon: Shield,
    color: "purple",
  },
  {
    name: "Enterprise",
    description: "Para vendedores de alto volume",
    price: "R$ 99,90",
    period: "por mês",
    features: [
      { name: "Anúncios ilimitados", included: true },
      { name: "Suporte via email, chat e telefone", included: true },
      { name: "Estatísticas em tempo real", included: true },
      { name: "Proteção do comprador", included: true },
      { name: "Chat com vendedor", included: true },
      { name: "Destaque nos resultados", included: true },
      { name: "Selo de vendedor verificado", included: true },
      { name: "Suporte prioritário", included: true },
    ],
    icon: Crown,
    color: "gold",
  },
]

export default function PlanosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
            {/* Animated Circles */}
            <motion.div
              className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-96 h-96 bg-[#097bff]/10 rounded-full mix-blend-multiply filter blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                x: [0, -30, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full mix-blend-multiply filter blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * 100 - 50, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="font-poppins text-5xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-[#097bff] to-blue-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Escolha o Plano Ideal para Seu Negócio
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-poppins"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Comece gratuitamente e evolua conforme seu crescimento. Temos o plano perfeito
                para cada fase do seu negócio.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-24">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-[#097bff] text-white text-sm font-medium px-3 py-1 rounded-full">
                        Mais Popular
                      </span>
                    </div>
                  )}

                  <div className={`
                    h-full p-8 rounded-2xl border-2 transition-all duration-300
                    ${plan.popular 
                      ? "border-[#097bff] dark:border-[#097bff] shadow-[0_8px_30px_rgb(9,123,255,0.15)]" 
                      : "border-gray-200 dark:border-gray-800 hover:border-[#097bff] dark:hover:border-[#097bff]"
                    }
                  `}>
                    <div className="space-y-6">
                      {/* Plano Header */}
                      <div className="space-y-4">
                        <div className={`
                          w-12 h-12 rounded-lg flex items-center justify-center
                          ${plan.popular ? "bg-[#097bff] text-white" : "bg-blue-100 dark:bg-blue-900/50 text-[#097bff]"}
                        `}>
                          <plan.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold font-poppins">{plan.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {plan.description}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-end gap-1">
                            <span className="text-3xl font-bold font-poppins">{plan.price}</span>
                            <span className="text-gray-500 dark:text-gray-400 mb-1">
                              {plan.period}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="space-y-3">
                        {plan.features.map((feature) => (
                          <div
                            key={feature.name}
                            className="flex items-center gap-3 text-sm"
                          >
                            <div className={`
                              w-5 h-5 rounded-full flex items-center justify-center
                              ${feature.included 
                                ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" 
                                : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                              }
                            `}>
                              {feature.included ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <X className="w-3 h-3" />
                              )}
                            </div>
                            <span className={feature.included ? "text-gray-700 dark:text-gray-300" : "text-gray-500"}>
                              {feature.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Link
                        href="/loja"
                        className={`
                          inline-flex items-center justify-center rounded-[32px] bg-gradient-to-br from-[#097bff] to-[#0042ff] px-12 py-6 font-poppins font-bold text-lg text-white transition-colors hover:bg-[#097bff]/90 focus:outline-none focus:ring-2 focus:ring-[#097bff] focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50
                          ${plan.popular ? "w-full" : ""}
                        `}
                      >
                        <span className="flex items-center gap-2">
                          Ver anúncios digitais
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                            initial={false}
                            animate={{ x: 0 }}
                            whileHover={{ x: 3 }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.div>
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-poppins mb-4">
                  Perguntas Frequentes
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Tire suas dúvidas sobre nossos planos
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Posso mudar de plano a qualquer momento?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Sim, você pode fazer upgrade ou downgrade do seu plano quando quiser. 
                    As alterações serão refletidas na sua próxima cobrança.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Como funciona o período gratuito?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    O plano Iniciante é totalmente gratuito e sem limitação de tempo. 
                    Você só paga quando decidir fazer upgrade para recursos avançados.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Qual a forma de pagamento?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Aceitamos todas as principais formas de pagamento: cartão de crédito, 
                    boleto, PIX e transferência bancária.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
