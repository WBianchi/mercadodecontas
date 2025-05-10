'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp, DollarSign, Gift, Users, ArrowRight,
  Zap, Shield, Award, Coins, ChartBar, Target,
  Rocket, Clock, CheckCircle
} from "lucide-react"

const beneficios = [
  {
    icone: DollarSign,
    titulo: "Comissões Atrativas",
    descricao: "Ganhe até 30% de comissão em cada venda realizada através do seu link."
  },
  {
    icone: Rocket,
    titulo: "Início Rápido",
    descricao: "Comece a ganhar em minutos com nosso processo simplificado de cadastro."
  },
  {
    icone: Clock,
    titulo: "Pagamento Pontual",
    descricao: "Receba suas comissões todo dia 10 de cada mês, sem atrasos."
  },
  {
    icone: Target,
    titulo: "Marketing Direcionado",
    descricao: "Acesso a materiais exclusivos para promover de forma eficiente."
  }
]

const niveis = [
  {
    nome: "Iniciante",
    comissao: "15%",
    requisitos: "0-5 vendas/mês",
    beneficios: [
      "Comissão base de 15%",
      "Material promocional básico",
      "Suporte via email"
    ],
    cor: "bg-gradient-to-br from-gray-100 to-gray-200",
    textoCor: "text-gray-900"
  },
  {
    nome: "Profissional",
    comissao: "20%",
    requisitos: "6-15 vendas/mês",
    beneficios: [
      "Comissão aumentada para 20%",
      "Material promocional premium",
      "Suporte prioritário",
      "Dashboards avançados"
    ],
    cor: "bg-gradient-to-br from-[#097bff] to-blue-600",
    textoCor: "text-white",
    destaque: true
  },
  {
    nome: "Expert",
    comissao: "30%",
    requisitos: "16+ vendas/mês",
    beneficios: [
      "Comissão máxima de 30%",
      "Material exclusivo",
      "Suporte VIP 24/7",
      "Mentoria personalizada",
      "Eventos exclusivos"
    ],
    cor: "bg-gradient-to-br from-gray-900 to-gray-800",
    textoCor: "text-white"
  }
]

const estatisticas = [
  {
    numero: "R$ 1M+",
    texto: "Comissões Pagas",
    icone: Coins
  },
  {
    numero: "5mil+",
    texto: "Afiliados Ativos",
    icone: Users
  },
  {
    numero: "98%",
    texto: "Taxa de Aprovação",
    icone: CheckCircle
  },
  {
    numero: "24/7",
    texto: "Suporte Dedicado",
    icone: Shield
  }
]

export default function AfiliadosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative -mt-[64px] pt-[64px] overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-white">
        <div className="absolute inset-0 bg-[url('/afiliados/pattern.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/90 to-white" />
        
        <div className="relative container mx-auto px-4 pt-24 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="inline-flex mb-6 bg-[#097bff]/20 text-[#097bff] uppercase tracking-wider">
              Programa de Afiliados
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transforme seu Alcance em{" "}
              <span className="text-[#097bff]">Renda Extra</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Junte-se ao programa de afiliados mais lucrativo do mercado de contas digitais
              e comece a ganhar comissões atrativas hoje mesmo.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#097bff] hover:bg-[#097bff]/90 text-lg px-8 text-white">
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 text-lg px-8">
                Saber Mais
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Estatísticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {estatisticas.map((stat, index) => (
              <Card key={index} className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
                <div className="w-12 h-12 rounded-lg bg-[#097bff]/10 flex items-center justify-center mx-auto mb-4">
                  {<stat.icone className="w-6 h-6 text-[#097bff]" />}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.numero}</div>
                <div className="text-gray-400">{stat.texto}</div>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Benefícios */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Benefícios</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Por que se Tornar um Afiliado?
          </h2>
          <p className="text-lg text-gray-600">
            Oferecemos as melhores condições e ferramentas para maximizar seus ganhos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {beneficios.map((beneficio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center h-full bg-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-[#097bff]/10 flex items-center justify-center mx-auto mb-4">
                  {<beneficio.icone className="w-6 h-6 text-[#097bff]" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{beneficio.titulo}</h3>
                <p className="text-gray-600">{beneficio.descricao}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Níveis de Afiliado */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Níveis</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Evolua e Ganhe Mais
            </h2>
            <p className="text-lg text-gray-600">
              Quanto mais você vende, maiores são suas comissões e benefícios.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {niveis.map((nivel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {nivel.destaque && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                      Mais Popular
                    </Badge>
                  </div>
                )}
                <Card className={`p-8 h-full ${nivel.cor} ${nivel.textoCor} ${nivel.destaque ? 'shadow-xl scale-105' : ''}`}>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{nivel.nome}</h3>
                    <div className="text-4xl font-bold mb-2">{nivel.comissao}</div>
                    <div className="text-sm opacity-80">{nivel.requisitos}</div>
                  </div>
                  <div className="space-y-3">
                    {nivel.beneficios.map((beneficio, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{beneficio}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Button 
                      className={`w-full ${nivel.destaque ? 'bg-white text-[#097bff] hover:bg-white/90' : 'bg-[#097bff] text-white hover:bg-[#097bff]/90'}`}
                    >
                      Começar Agora
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Como Funciona */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Processo</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Como Começar
          </h2>
          <p className="text-lg text-gray-600">
            Em apenas 3 passos simples você já pode começar a ganhar.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-[2px] bg-gradient-to-b from-[#097bff] to-gray-200" />
            
            <div className="space-y-12">
              <div className="relative flex items-center justify-between">
                <div className="w-5/12 pr-8 text-right">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Cadastro</h3>
                  <p className="text-gray-600">Preencha seus dados e escolha seu nível inicial</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#097bff] flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="w-5/12 pl-8" />
              </div>

              <div className="relative flex items-center justify-between">
                <div className="w-5/12 pr-8" />
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#097bff] flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div className="w-5/12 pl-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Divulgação</h3>
                  <p className="text-gray-600">Use seu link personalizado e materiais exclusivos</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between">
                <div className="w-5/12 pr-8 text-right">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ganhos</h3>
                  <p className="text-gray-600">Receba suas comissões mensalmente</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#097bff] flex items-center justify-center">
                  <ChartBar className="w-6 h-6 text-white" />
                </div>
                <div className="w-5/12 pl-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-900 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto para Começar a Ganhar?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Junte-se aos milhares de afiliados que já estão lucrando com nossa plataforma
            </p>
            <Button size="lg" className="bg-[#097bff] hover:bg-[#097bff]/90 text-lg px-8 text-white">
              Seja um Afiliado
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
