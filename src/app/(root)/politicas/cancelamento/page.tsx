'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Ban,
  Clock,
  ArrowLeft,
  MessageCircle,
  RefreshCcw,
  AlertCircle,
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  ShieldAlert
} from "lucide-react"
import Link from "next/link"

const prazos = [
  {
    periodo: "Até 24 horas",
    descricao: "Após a compra, sem uso da conta",
    reembolso: "100% do valor",
    status: "Automático",
    icone: Clock
  },
  {
    periodo: "2-7 dias",
    descricao: "Com problemas técnicos comprovados",
    reembolso: "100% do valor",
    status: "Análise necessária",
    icone: Calendar
  },
  {
    periodo: "8-30 dias",
    descricao: "Casos especiais com justificativa",
    reembolso: "Valor proporcional",
    status: "Análise detalhada",
    icone: ShieldAlert
  }
]

const motivos = [
  {
    titulo: "Aceitos para Cancelamento",
    items: [
      "Problemas técnicos na conta",
      "Dados incorretos ou incompletos",
      "Serviço não corresponde ao anunciado",
      "Falha na entrega dos dados",
      "Violação dos termos de uso pelo vendedor"
    ],
    icone: CheckCircle,
    cor: "text-green-600"
  },
  {
    titulo: "Não Aceitos para Cancelamento",
    items: [
      "Arrependimento após uso da conta",
      "Falta de conhecimento técnico",
      "Mudança de ideia sem justificativa",
      "Violação dos termos pelo comprador",
      "Tentativa de fraude"
    ],
    icone: XCircle,
    cor: "text-red-600"
  }
]

const passos = [
  {
    numero: "01",
    titulo: "Solicitar Cancelamento",
    descricao: "Acesse 'Minhas Compras' e selecione o pedido que deseja cancelar",
    icone: Ban
  },
  {
    numero: "02",
    titulo: "Informar Motivo",
    descricao: "Escolha o motivo do cancelamento e forneça detalhes adicionais",
    icone: AlertCircle
  },
  {
    numero: "03",
    titulo: "Aguardar Análise",
    descricao: "Nossa equipe analisará sua solicitação em até 24 horas",
    icone: Clock
  },
  {
    numero: "04",
    titulo: "Reembolso",
    descricao: "Se aprovado, o reembolso será processado conforme o prazo",
    icone: DollarSign
  }
]

export default function CancelamentoPage() {
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
              Política de{" "}
              <span className="text-[#097bff]">Cancelamento</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Entenda nosso processo de cancelamento e reembolso
            </p>
          </motion.div>
        </div>
      </div>

      {/* Prazos de Cancelamento */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Prazos</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Prazos para Cancelamento
          </h2>
          <p className="text-lg text-gray-600">
            Os prazos e condições variam de acordo com o momento da solicitação
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {prazos.map((prazo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full bg-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-[#097bff]/10 flex items-center justify-center mb-6">
                  {<prazo.icone className="w-6 h-6 text-[#097bff]" />}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{prazo.periodo}</h3>
                <p className="text-gray-600 mb-4">{prazo.descricao}</p>
                <div className="space-y-2">
                  <div className="text-[#097bff] font-semibold">{prazo.reembolso}</div>
                  <div className="text-sm text-gray-500">{prazo.status}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Motivos */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Motivos</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Motivos para Cancelamento
            </h2>
            <p className="text-lg text-gray-600">
              Conheça as situações em que o cancelamento é aceito ou não
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {motivos.map((motivo, index) => (
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
                      {<motivo.icone className={`w-6 h-6 ${motivo.cor}`} />}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{motivo.titulo}</h3>
                      <ul className="space-y-2">
                        {motivo.items.map((item, idx) => (
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
      </div>

      {/* Como Cancelar */}
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
            Como Solicitar o Cancelamento
          </h2>
          <p className="text-lg text-gray-600">
            Siga estes passos para solicitar o cancelamento de sua compra
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {passos.map((passo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full bg-white hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 text-8xl font-bold text-gray-100 -mr-4 -mt-4">
                  {passo.numero}
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-[#097bff]/10 flex items-center justify-center mb-4">
                    {<passo.icone className="w-6 h-6 text-[#097bff]" />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{passo.titulo}</h3>
                  <p className="text-gray-600">{passo.descricao}</p>
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
              Precisa Cancelar uma Compra?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Nossa equipe está pronta para ajudar com seu cancelamento
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#097bff] hover:bg-[#097bff]/90 text-lg px-8 text-white">
                Solicitar Cancelamento
                <RefreshCcw className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 text-lg px-8">
                Falar com Suporte
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
