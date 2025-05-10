'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Trophy, Building2, ArrowRight, Heart, Shield, TrendingUp } from "lucide-react"

const estatisticas = [
  { numero: "50mil+", texto: "Usuários Ativos" },
  { numero: "100mil+", texto: "Transações Realizadas" },
  { numero: "98%", texto: "Satisfação" },
  { numero: "24/7", texto: "Suporte" },
]

const valores = [
  {
    icone: Shield,
    titulo: "Segurança",
    descricao: "Garantimos transações seguras e protegidas para todos os usuários."
  },
  {
    icone: Heart,
    titulo: "Confiança",
    descricao: "Construímos relacionamentos duradouros baseados em transparência."
  },
  {
    icone: Users,
    titulo: "Comunidade",
    descricao: "Fomentamos uma comunidade ativa e colaborativa."
  },
  {
    icone: TrendingUp,
    titulo: "Inovação",
    descricao: "Sempre buscando as melhores soluções para nossos usuários."
  },
]

const time = [
  {
    nome: "Ricardo Santos",
    cargo: "CEO & Fundador",
    foto: "/team/ricardo.jpg",
    bio: "10+ anos de experiência em marketplaces digitais"
  },
  {
    nome: "Ana Paula Silva",
    cargo: "COO",
    foto: "/team/ana.jpg",
    bio: "Especialista em operações e crescimento de startups"
  },
  {
    nome: "Marcos Oliveira",
    cargo: "CTO",
    foto: "/team/marcos.jpg",
    bio: "Desenvolvedor full-stack com foco em segurança"
  },
]

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative -mt-[64px] pt-[64px] overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-white">
        <div className="absolute inset-0 bg-[url('/sobre/pattern.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/90 to-white" />
        
        <div className="relative container mx-auto px-4 pt-24 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="inline-flex mb-6 bg-[#097bff]/20 text-[#097bff] uppercase tracking-wider">
              Sobre o Mercado de Contas
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transformando o Mercado Digital{" "}
              <span className="text-[#097bff]">Com Segurança e Inovação</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Somos a maior plataforma de compra e venda de contas digitais do Brasil, 
              conectando pessoas e criando oportunidades desde 2020.
            </p>
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
                <div className="text-3xl font-bold text-white mb-2">{stat.numero}</div>
                <div className="text-gray-400">{stat.texto}</div>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Nossa História */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Nossa História</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Uma Jornada de Inovação e Crescimento
          </h2>
          <p className="text-lg text-gray-600">
            Nascemos da necessidade de criar um ambiente seguro e confiável para 
            transações de contas digitais. Nossa missão é democratizar o acesso a 
            este mercado, garantindo segurança e transparência em cada negociação.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute left-1/2 transform -translate-x-px h-full w-[2px] bg-gradient-to-b from-[#097bff] to-gray-200" />
            
            <div className="space-y-12">
              <div className="relative flex items-center justify-between">
                <div className="w-5/12 pr-8 text-right">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2020</h3>
                  <p className="text-gray-600">Fundação da empresa e lançamento da plataforma beta</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#097bff] flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="w-5/12 pl-8" />
              </div>

              <div className="relative flex items-center justify-between">
                <div className="w-5/12 pr-8" />
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#097bff] flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="w-5/12 pl-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2022</h3>
                  <p className="text-gray-600">Alcançamos 10.000 usuários ativos e expandimos a equipe</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between">
                <div className="w-5/12 pr-8 text-right">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2024</h3>
                  <p className="text-gray-600">Liderança no mercado e lançamento de novos serviços</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#097bff] flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="w-5/12 pl-8" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Nossos Valores */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Nossos Valores</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Princípios que nos Guiam
            </h2>
            <p className="text-lg text-gray-600">
              Nossos valores são a base de tudo que fazemos, guiando nossas decisões 
              e moldando nossa cultura organizacional.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full bg-white hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-[#097bff]/10 flex items-center justify-center mx-auto mb-4">
                    {<valor.icone className="w-6 h-6 text-[#097bff]" />}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{valor.titulo}</h3>
                  <p className="text-gray-600">{valor.descricao}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Nossa Equipe */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Nossa Equipe</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Conheça Quem Faz Acontecer
          </h2>
          <p className="text-lg text-gray-600">
            Uma equipe apaixonada por tecnologia e inovação, trabalhando para 
            transformar o mercado digital.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {time.map((membro, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group">
                <div className="relative aspect-[4/3]">
                  <img
                    src={membro.foto}
                    alt={membro.nome}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{membro.nome}</h3>
                  <p className="text-[#097bff] font-medium mb-2">{membro.cargo}</p>
                  <p className="text-gray-600">{membro.bio}</p>
                </div>
              </Card>
            </motion.div>
          ))}
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
              Pronto para Fazer Parte dessa História?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Junte-se a milhares de usuários que já confiam em nossa plataforma
            </p>
            <Button size="lg" className="bg-[#097bff] hover:bg-[#097bff]/90 text-lg px-8">
              Começar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
