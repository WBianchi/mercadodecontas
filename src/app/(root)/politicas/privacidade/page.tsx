'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Lock,
  Eye,
  Server,
  Key,
  UserCheck,
  ArrowLeft,
  MessageCircle
} from "lucide-react"
import Link from "next/link"

const topicos = [
  {
    icone: Lock,
    titulo: "Coleta de Dados",
    conteudo: [
      "Informações de cadastro (nome, email, telefone)",
      "Dados de pagamento (processados de forma segura)",
      "Histórico de transações",
      "Dados de uso da plataforma",
      "Informações do dispositivo"
    ]
  },
  {
    icone: Eye,
    titulo: "Uso das Informações",
    conteudo: [
      "Processamento de transações",
      "Melhorias na plataforma",
      "Comunicações importantes",
      "Suporte ao cliente",
      "Prevenção de fraudes"
    ]
  },
  {
    icone: Server,
    titulo: "Armazenamento",
    conteudo: [
      "Dados armazenados em servidores seguros",
      "Criptografia de ponta a ponta",
      "Backups regulares",
      "Retenção conforme legislação",
      "Exclusão segura quando solicitado"
    ]
  },
  {
    icone: Key,
    titulo: "Seus Direitos",
    conteudo: [
      "Acesso aos seus dados",
      "Correção de informações",
      "Exclusão de dados",
      "Portabilidade",
      "Revogação de consentimento"
    ]
  }
]

const atualizacoes = [
  {
    data: "15/02/2025",
    alteracoes: [
      "Atualização da política de retenção de dados",
      "Inclusão de novas medidas de segurança",
      "Esclarecimentos sobre uso de cookies"
    ]
  },
  {
    data: "10/01/2025",
    alteracoes: [
      "Adequação à nova legislação de proteção de dados",
      "Revisão dos termos de compartilhamento",
      "Atualização dos direitos dos usuários"
    ]
  }
]

export default function PrivacidadePage() {
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
              <span className="text-[#097bff]">Privacidade</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Entenda como coletamos, usamos e protegemos seus dados pessoais
            </p>
          </motion.div>
        </div>
      </div>

      {/* Introdução */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto prose prose-lg"
        >
          <p>
            O Mercado de Contas está comprometido com a proteção de seus dados pessoais. 
            Esta Política de Privacidade explica como coletamos, usamos, armazenamos e 
            protegemos suas informações ao utilizar nossa plataforma.
          </p>
          <p>
            Ao utilizar nossos serviços, você concorda com as práticas descritas nesta 
            política. Recomendamos a leitura completa deste documento para entender 
            nossos procedimentos em relação aos seus dados pessoais.
          </p>
        </motion.div>
      </div>

      {/* Tópicos Principais */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Detalhes</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Como Tratamos seus Dados
            </h2>
            <p className="text-lg text-gray-600">
              Conheça os principais aspectos do tratamento de dados em nossa plataforma
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {topicos.map((topico, index) => (
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
                      {<topico.icone className="w-6 h-6 text-[#097bff]" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{topico.titulo}</h3>
                      <ul className="space-y-2">
                        {topico.conteudo.map((item, idx) => (
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

      {/* Histórico de Atualizações */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Atualizações</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Histórico de Mudanças
            </h2>
            <p className="text-lg text-gray-600">
              Acompanhe as alterações mais recentes em nossa política
            </p>
          </div>

          <div className="space-y-8">
            {atualizacoes.map((atualizacao, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#097bff]/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-[#097bff]" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">{atualizacao.data}</div>
                    <ul className="space-y-2">
                      {atualizacao.alteracoes.map((alteracao, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#097bff] mt-2" />
                          {alteracao}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
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
              Nossa equipe está pronta para esclarecer qualquer questão sobre privacidade
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#097bff] hover:bg-[#097bff]/90 text-lg px-8 text-white">
                Fale com o DPO
                <UserCheck className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 text-lg px-8">
                Chat de Suporte
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
