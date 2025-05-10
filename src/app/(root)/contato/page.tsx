'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  ArrowLeft,
  Bot,
  Sparkles,
  Clock,
  Building2,
  Mail,
  MessageCircle,
  ShieldCheck,
  Zap,
  Brain,
  Users,
  Star,
  ArrowRight,
  Cpu
} from "lucide-react"
import Link from "next/link"

const canaisAtendimento = [
  {
    titulo: "Chat IA 24/7",
    descricao: "Atendimento instantâneo com nossa IA avançada",
    disponibilidade: "24 horas por dia",
    icone: Bot,
    cor: "bg-purple-500",
    recursos: [
      "Respostas instantâneas",
      "Suporte multilíngue",
      "Aprendizado contínuo",
      "Resolução inteligente"
    ]
  },
  {
    titulo: "Chat Humano",
    descricao: "Equipe especializada para casos complexos",
    disponibilidade: "24 horas por dia",
    icone: Users,
    cor: "bg-blue-500",
    recursos: [
      "Atendimento personalizado",
      "Resolução avançada",
      "Suporte especializado",
      "Casos prioritários"
    ]
  }
]

const beneficios = [
  {
    titulo: "Resposta Imediata",
    descricao: "Sem filas ou espera, atendimento instantâneo 24/7",
    icone: Zap
  },
  {
    titulo: "IA Avançada",
    descricao: "Tecnologia de ponta para resolver suas questões",
    icone: Brain
  },
  {
    titulo: "Segurança Total",
    descricao: "Suas informações protegidas com criptografia",
    icone: ShieldCheck
  },
  {
    titulo: "Multilíngue",
    descricao: "Atendimento em diversos idiomas",
    icone: MessageCircle
  }
]

const estatisticas = [
  {
    numero: "< 1min",
    texto: "Tempo médio de resposta"
  },
  {
    numero: "98%",
    texto: "Taxa de resolução"
  },
  {
    numero: "24/7",
    texto: "Disponibilidade"
  },
  {
    numero: "5.0",
    texto: "Avaliação média"
  }
]

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative -mt-[64px] pt-[64px] overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-white">
        <div className="absolute inset-0 bg-[url('/contato/grid-pattern.svg')] bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/90 to-white" />
        
        <div className="relative container mx-auto px-4 pt-24 pb-32">
          <Link 
            href="/"
            className="inline-flex items-center text-white hover:text-[#097bff] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="inline-flex mb-6 bg-[#097bff]/20 text-[#097bff] uppercase tracking-wider">
              Suporte 24/7
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Atendimento{" "}
              <span className="text-[#097bff]">Inteligente</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Suporte guiado por IA, disponível 24 horas por dia, 7 dias por semana
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#097bff] hover:bg-[#097bff]/90 text-lg px-8 text-white">
                Iniciar Chat
                <MessageSquare className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 text-lg px-8">
                Central de Ajuda
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Canais de Atendimento */}
      <div className="container mx-auto px-4 -mt-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {canaisAtendimento.map((canal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 bg-white hover:shadow-xl transition-all duration-300 border-t-4 border-[#097bff]">
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl ${canal.cor} flex items-center justify-center`}>
                    {<canal.icone className="w-8 h-8 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{canal.titulo}</h3>
                    <p className="text-gray-600 mb-4">{canal.descricao}</p>
                    <div className="flex items-center gap-2 text-[#097bff] mb-6">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{canal.disponibilidade}</span>
                    </div>
                    <div className="space-y-3">
                      {canal.recursos.map((recurso, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#097bff]" />
                          {recurso}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-6 bg-gray-900 hover:bg-gray-800">
                      Acessar {canal.titulo}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Estatísticas */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {estatisticas.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#097bff] mb-2">
                {stat.numero}
              </div>
              <div className="text-gray-600">{stat.texto}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefícios */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Benefícios</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Por que Nosso Atendimento é Único
            </h2>
            <p className="text-lg text-gray-600">
              Combinamos tecnologia avançada com excelência em atendimento
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {beneficios.map((beneficio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-[#097bff]/10 flex items-center justify-center mx-auto mb-4">
                    {<beneficio.icone className="w-6 h-6 text-[#097bff]" />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{beneficio.titulo}</h3>
                  <p className="text-gray-600">{beneficio.descricao}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Informações da Empresa */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Sobre Nós</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Mercado de Contas
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Especialistas em venda de contas e licenças digitais, oferecendo uma 
                plataforma segura e confiável para suas transações.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Building2 className="w-5 h-5 text-[#097bff]" />
                  <span>CNPJ: 58.565.696/0001-83</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5 text-[#097bff]" />
                  <span>São Paulo, SP. CEP: 04551-060</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Bot className="w-5 h-5 text-[#097bff]" />
                  <span>Atendimento IA 24/7</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#097bff] to-purple-600 rounded-3xl transform rotate-3 opacity-10"></div>
              <Card className="p-8 relative bg-white/50 backdrop-blur-sm border-2 border-[#097bff]/20">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-[#097bff]/10 flex items-center justify-center mx-auto mb-4">
                    <Cpu className="w-8 h-8 text-[#097bff]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Atendimento Inteligente</h3>
                  <p className="text-gray-600">
                    Nossa IA está pronta para ajudar você 24 horas por dia, 7 dias por semana
                  </p>
                </div>
                <Button className="w-full bg-[#097bff] hover:bg-[#097bff]/90">
                  Iniciar Conversa
                  <Sparkles className="ml-2 w-4 h-4" />
                </Button>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Final */}
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
              Pronto para Começar?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Nossa equipe está pronta para atender você
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#097bff] hover:bg-[#097bff]/90 text-lg px-8 text-white">
                Iniciar Chat
                <Bot className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 text-lg px-8">
                Ver FAQ
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
