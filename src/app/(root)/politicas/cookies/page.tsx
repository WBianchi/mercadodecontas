'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Cookie,
  Settings,
  Shield,
  Clock,
  ArrowLeft,
  MessageCircle,
  CheckCircle,
  XCircle
} from "lucide-react"
import Link from "next/link"

const tiposCookies = [
  {
    tipo: "Essenciais",
    descricao: "Necessários para o funcionamento básico do site",
    exemplos: [
      "Autenticação",
      "Segurança",
      "Preferências básicas"
    ],
    obrigatorio: true
  },
  {
    tipo: "Funcionais",
    descricao: "Melhoram a experiência do usuário",
    exemplos: [
      "Idioma preferido",
      "Histórico de navegação",
      "Personalização"
    ],
    obrigatorio: false
  },
  {
    tipo: "Analíticos",
    descricao: "Nos ajudam a entender como o site é usado",
    exemplos: [
      "Estatísticas de uso",
      "Padrões de navegação",
      "Áreas mais acessadas"
    ],
    obrigatorio: false
  },
  {
    tipo: "Marketing",
    descricao: "Utilizados para publicidade direcionada",
    exemplos: [
      "Anúncios personalizados",
      "Remarketing",
      "Análise de campanhas"
    ],
    obrigatorio: false
  }
]

const controles = [
  {
    titulo: "Navegador",
    descricao: "Configure as preferências de cookies diretamente no seu navegador",
    passos: [
      "Acesse as configurações do navegador",
      "Procure por 'Privacidade' ou 'Cookies'",
      "Ajuste conforme sua preferência"
    ]
  },
  {
    titulo: "Plataforma",
    descricao: "Use nosso painel de controle de privacidade",
    passos: [
      "Acesse suas configurações de conta",
      "Vá para 'Privacidade e Cookies'",
      "Personalize suas preferências"
    ]
  }
]

export default function CookiesPage() {
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
              <span className="text-[#097bff]">Cookies</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Entenda como utilizamos cookies para melhorar sua experiência
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
            Cookies são pequenos arquivos de texto que são armazenados no seu computador 
            ou dispositivo móvel quando você visita nosso site. Eles nos ajudam a 
            fornecer uma melhor experiência de uso e entender como nossos serviços 
            são utilizados.
          </p>
          <p>
            Esta política explica como utilizamos cookies, quais tipos existem e 
            como você pode controlá-los de acordo com suas preferências.
          </p>
        </motion.div>
      </div>

      {/* Tipos de Cookies */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Tipos</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Cookies que Utilizamos
            </h2>
            <p className="text-lg text-gray-600">
              Conheça os diferentes tipos de cookies presentes em nossa plataforma
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {tiposCookies.map((tipo, index) => (
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
                      <Cookie className="w-6 h-6 text-[#097bff]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{tipo.tipo}</h3>
                        {tipo.obrigatorio ? (
                          <Badge className="bg-gray-900 text-white">Obrigatório</Badge>
                        ) : (
                          <Badge variant="outline" className="border-gray-300">Opcional</Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{tipo.descricao}</p>
                      <div className="space-y-2">
                        {tipo.exemplos.map((exemplo, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#097bff] mt-2" />
                            {exemplo}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Controle de Cookies */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Controle</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Gerencie seus Cookies
            </h2>
            <p className="text-lg text-gray-600">
              Você tem o controle sobre como os cookies são usados
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {controles.map((controle, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#097bff]/10 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-[#097bff]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{controle.titulo}</h3>
                    <p className="text-gray-600 mb-4">{controle.descricao}</p>
                    <div className="space-y-2">
                      {controle.passos.map((passo, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#097bff] mt-2" />
                          {passo}
                        </div>
                      ))}
                    </div>
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
              Precisa de Ajuda?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Nossa equipe está disponível para esclarecer suas dúvidas sobre cookies
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#097bff] hover:bg-[#097bff]/90 text-lg px-8 text-white">
                Configurar Cookies
                <Settings className="ml-2 h-5 w-5" />
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
