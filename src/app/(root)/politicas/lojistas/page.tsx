'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Store,
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  AlertTriangle,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Users,
  Star,
  Award,
  Ban,
  Percent
} from "lucide-react"
import Link from "next/link"

const regras = [
  {
    titulo: "Requisitos para Venda",
    items: [
      "Documentação válida e atualizada",
      "Conta verificada em duas etapas",
      "Histórico limpo de fraudes",
      "Idade mínima de 18 anos",
      "Dados bancários próprios"
    ],
    icone: ShieldCheck,
    tipo: "obrigatorio"
  },
  {
    titulo: "Práticas Proibidas",
    items: [
      "Venda de contas fraudulentas",
      "Múltiplas contas por usuário",
      "Propaganda enganosa",
      "Manipulação de preços",
      "Assédio a compradores"
    ],
    icone: Ban,
    tipo: "proibido"
  }
]

const taxas = [
  {
    nome: "Iniciante",
    taxa: "15%",
    volume: "Até R$ 5.000/mês",
    beneficios: [
      "Exposição básica",
      "Suporte por email",
      "Pagamento em 14 dias"
    ]
  },
  {
    nome: "Profissional",
    taxa: "12%",
    volume: "R$ 5.001 a R$ 20.000/mês",
    beneficios: [
      "Exposição destacada",
      "Suporte prioritário",
      "Pagamento em 7 dias",
      "Selo de vendedor pro"
    ],
    destaque: true
  },
  {
    nome: "Elite",
    taxa: "10%",
    volume: "Acima de R$ 20.000/mês",
    beneficios: [
      "Exposição premium",
      "Suporte dedicado 24/7",
      "Pagamento em 3 dias",
      "Selo elite",
      "Benefícios exclusivos"
    ]
  }
]

const niveis = [
  {
    nivel: "Bronze",
    requisitos: "Mínimo de 10 vendas/mês",
    avaliacao: "4.0+",
    beneficios: [
      "Selo Bronze",
      "Exposição básica",
      "Taxa padrão"
    ],
    icone: Award
  },
  {
    nivel: "Prata",
    requisitos: "Mínimo de 30 vendas/mês",
    avaliacao: "4.5+",
    beneficios: [
      "Selo Prata",
      "Exposição aumentada",
      "Redução de 1% na taxa",
      "Suporte prioritário"
    ],
    icone: Award
  },
  {
    nivel: "Ouro",
    requisitos: "Mínimo de 50 vendas/mês",
    avaliacao: "4.8+",
    beneficios: [
      "Selo Ouro",
      "Exposição premium",
      "Redução de 2% na taxa",
      "Suporte VIP",
      "Pagamentos mais rápidos"
    ],
    icone: Award
  }
]

const penalidades = [
  {
    violacao: "Atraso na Entrega",
    penalidade: "Advertência + Multa de 5%",
    reincidencia: "Suspensão temporária"
  },
  {
    violacao: "Dados Incorretos",
    penalidade: "Advertência + Reembolso",
    reincidencia: "Suspensão de 15 dias"
  },
  {
    violacao: "Propaganda Enganosa",
    penalidade: "Suspensão imediata",
    reincidencia: "Banimento permanente"
  },
  {
    violacao: "Fraude Comprovada",
    penalidade: "Banimento permanente",
    reincidencia: "Ação legal"
  }
]

export default function LojistasPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative -mt-[64px] pt-[64px] overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-white">
        <div className="absolute inset-0 bg-[url('/politicas/pattern.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/90 to-white" />
        
        <div className="relative container mx-auto px-4 pt-24 pb-32">
          <Link 
            href="/ajuda"
            className="inline-flex items-center text-white hover:text-[#097bff] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Central de Ajuda
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="inline-flex mb-6 bg-[#097bff]/20 text-[#097bff] uppercase tracking-wider">
              Atualizado em 15/02/2025
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Políticas para{" "}
              <span className="text-[#097bff]">Lojistas</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Diretrizes e regras para vendedores em nossa plataforma
            </p>
          </motion.div>
        </div>
      </div>

      {/* Regras Principais */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Regras</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Regras Principais
          </h2>
          <p className="text-lg text-gray-600">
            Requisitos e práticas para manter um ambiente seguro
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {regras.map((regra, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#097bff]/10 flex items-center justify-center">
                    {<regra.icone className={`w-6 h-6 ${regra.tipo === 'proibido' ? 'text-red-600' : 'text-[#097bff]'}`} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{regra.titulo}</h3>
                    <ul className="space-y-2">
                      {regra.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#097bff] mt-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Taxas e Comissões */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Taxas</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Taxas e Comissões
            </h2>
            <p className="text-lg text-gray-600">
              Conheça nossas taxas baseadas em volume de vendas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {taxas.map((plano, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {plano.destaque && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                      Mais Popular
                    </Badge>
                  </div>
                )}
                <Card className={`p-8 h-full ${plano.destaque ? 'bg-[#097bff] text-white shadow-xl scale-105' : 'bg-white'}`}>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plano.nome}</h3>
                    <div className="text-4xl font-bold mb-2">{plano.taxa}</div>
                    <div className={`text-sm ${plano.destaque ? 'text-white/80' : 'text-gray-600'}`}>
                      {plano.volume}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {plano.beneficios.map((beneficio, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{beneficio}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Níveis de Vendedor */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Níveis</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Níveis de Vendedor
          </h2>
          <p className="text-lg text-gray-600">
            Evolua seu perfil e desbloqueie benefícios exclusivos
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
            >
              <Card className="p-8 h-full bg-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-[#097bff]/10 flex items-center justify-center mb-6">
                  {<nivel.icone className="w-6 h-6 text-[#097bff]" />}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{nivel.nivel}</h3>
                <div className="text-sm text-gray-600 mb-4">
                  <div>{nivel.requisitos}</div>
                  <div>Avaliação: {nivel.avaliacao}</div>
                </div>
                <div className="space-y-2">
                  {nivel.beneficios.map((beneficio, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#097bff] mt-2" />
                      {beneficio}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Penalidades */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Penalidades</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Sistema de Penalidades
            </h2>
            <p className="text-lg text-gray-600">
              Consequências para violações das políticas
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {penalidades.map((penalidade, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 mb-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{penalidade.violacao}</h3>
                        <Badge variant="destructive">{penalidade.penalidade}</Badge>
                      </div>
                      <p className="text-gray-600">
                        Reincidência: <span className="font-medium">{penalidade.reincidencia}</span>
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
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
              Pronto para Começar a Vender?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Junte-se aos milhares de lojistas que já fazem sucesso em nossa plataforma
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#097bff] hover:bg-[#097bff]/90 text-lg px-8 text-white">
                Criar Loja
                <Store className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 text-lg px-8">
                Falar com Consultor
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
