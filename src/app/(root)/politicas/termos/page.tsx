'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  AlertTriangle,
  Scale,
  User,
  Lock,
  CreditCard,
  MessageSquare,
  Ban,
  HelpCircle
} from "lucide-react"
import Link from "next/link"

const secoes = [
  {
    titulo: "Termos Gerais",
    conteudo: [
      "Aceitação dos termos",
      "Definições importantes",
      "Alterações nos termos",
      "Legislação aplicável",
      "Foro de eleição"
    ],
    icone: FileText
  },
  {
    titulo: "Conta e Registro",
    conteudo: [
      "Requisitos de idade",
      "Dados cadastrais",
      "Responsabilidades",
      "Segurança da conta",
      "Verificação em duas etapas"
    ],
    icone: User
  },
  {
    titulo: "Privacidade e Dados",
    conteudo: [
      "Coleta de informações",
      "Uso dos dados",
      "Compartilhamento",
      "Direitos do usuário",
      "Período de retenção"
    ],
    icone: Lock
  },
  {
    titulo: "Pagamentos",
    conteudo: [
      "Formas de pagamento",
      "Processamento",
      "Reembolsos",
      "Taxas e comissões",
      "Moedas aceitas"
    ],
    icone: CreditCard
  }
]

const responsabilidades = [
  {
    parte: "Usuário",
    items: [
      "Fornecer informações verdadeiras",
      "Manter a segurança da conta",
      "Respeitar outros usuários",
      "Cumprir prazos estabelecidos",
      "Reportar violações"
    ]
  },
  {
    parte: "Plataforma",
    items: [
      "Manter a plataforma operacional",
      "Proteger dados dos usuários",
      "Mediar conflitos",
      "Aplicar as políticas",
      "Fornecer suporte"
    ]
  }
]

const restricoes = [
  {
    titulo: "Conteúdo Proibido",
    items: [
      "Material ilegal ou fraudulento",
      "Conteúdo difamatório",
      "Spam ou propaganda enganosa",
      "Malware ou vírus",
      "Violação de direitos autorais"
    ]
  },
  {
    titulo: "Comportamentos Proibidos",
    items: [
      "Assédio ou intimidação",
      "Manipulação de preços",
      "Criação de contas falsas",
      "Uso de bots ou automação",
      "Evasão de taxas"
    ]
  }
]

const duvidas = [
  {
    pergunta: "Como alterar meus dados cadastrais?",
    resposta: "Acesse suas configurações de conta e selecione 'Editar Perfil'."
  },
  {
    pergunta: "Posso ter mais de uma conta?",
    resposta: "Não, cada usuário pode ter apenas uma conta ativa."
  },
  {
    pergunta: "Como reportar uma violação?",
    resposta: "Use o botão 'Denunciar' ou contate nosso suporte."
  },
  {
    pergunta: "Os termos podem mudar?",
    resposta: "Sim, com notificação prévia aos usuários."
  }
]

export default function TermosPage() {
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
              Termos e{" "}
              <span className="text-[#097bff]">Condições</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Regras e diretrizes para uso da plataforma
            </p>
          </motion.div>
        </div>
      </div>

      {/* Seções Principais */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Seções</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Principais Seções
          </h2>
          <p className="text-lg text-gray-600">
            Entenda os pontos mais importantes dos nossos termos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {secoes.map((secao, index) => (
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
                    {<secao.icone className="w-6 h-6 text-[#097bff]" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{secao.titulo}</h3>
                    <ul className="space-y-2">
                      {secao.conteudo.map((item, idx) => (
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

      {/* Responsabilidades */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Responsabilidades</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Direitos e Deveres
            </h2>
            <p className="text-lg text-gray-600">
              Entenda as responsabilidades de cada parte
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {responsabilidades.map((resp, index) => (
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
                      <Scale className="w-6 h-6 text-[#097bff]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{resp.parte}</h3>
                      <ul className="space-y-2">
                        {resp.items.map((item, idx) => (
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

      {/* Restrições */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Restrições</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Restrições e Proibições
          </h2>
          <p className="text-lg text-gray-600">
            Atividades e conteúdos não permitidos na plataforma
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {restricoes.map((restricao, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
                    <Ban className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{restricao.titulo}</h3>
                    <ul className="space-y-2">
                      {restricao.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2" />
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

      {/* Dúvidas Frequentes */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">FAQ</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Dúvidas Frequentes
            </h2>
            <p className="text-lg text-gray-600">
              Respostas para as perguntas mais comuns
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {duvidas.map((duvida, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 mb-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#097bff]/10 flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-[#097bff]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{duvida.pergunta}</h3>
                      <p className="text-gray-600">{duvida.resposta}</p>
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
              Ainda tem Dúvidas?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Nossa equipe jurídica está pronta para ajudar
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#097bff] hover:bg-[#097bff]/90 text-lg px-8 text-white">
                Ler Versão Completa
                <FileText className="ml-2 h-5 w-5" />
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
