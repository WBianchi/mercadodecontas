'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  ShieldCheck,
  FileText,
  MessageCircle,
  Users,
  Cookie,
  ArrowRight,
  ChevronRight,
  HelpCircle,
  AlertCircle,
  Lock,
  Store,
  Ban,
  Mail
} from "lucide-react"
import Link from "next/link"

const categorias = [
  {
    icone: ShieldCheck,
    titulo: "Políticas de Privacidade",
    descricao: "Como protegemos seus dados",
    link: "/politicas/privacidade"
  },
  {
    icone: Ban,
    titulo: "Políticas de Cancelamento",
    descricao: "Processo de cancelamento e reembolso",
    link: "/politicas/cancelamento"
  },
  {
    icone: Store,
    titulo: "Políticas para Lojistas",
    descricao: "Regras e diretrizes para vendedores",
    link: "/politicas/lojistas"
  },
  {
    icone: Cookie,
    titulo: "Políticas de Cookies",
    descricao: "Como usamos cookies",
    link: "/politicas/cookies"
  },
  {
    icone: FileText,
    titulo: "Termos e Condições",
    descricao: "Termos gerais de uso",
    link: "/politicas/termos"
  },
  {
    icone: MessageCircle,
    titulo: "Fale Conosco",
    descricao: "Entre em contato",
    link: "/contato"
  }
]

const duvidasFrequentes = [
  {
    categoria: "Conta e Acesso",
    duvidas: [
      {
        pergunta: "Como criar uma conta?",
        resposta: "Para criar uma conta, clique em 'Criar Conta' no topo da página e siga as instruções. Você precisará fornecer um email válido e criar uma senha segura."
      },
      {
        pergunta: "Esqueci minha senha, e agora?",
        resposta: "Clique em 'Esqueci minha senha' na tela de login. Enviaremos um link de redefinição para seu email cadastrado."
      },
      {
        pergunta: "Como alterar meus dados cadastrais?",
        resposta: "Acesse seu perfil através do menu superior direito e clique em 'Editar Perfil'. Lá você poderá atualizar suas informações."
      }
    ]
  },
  {
    categoria: "Compras",
    duvidas: [
      {
        pergunta: "Quais formas de pagamento são aceitas?",
        resposta: "Aceitamos cartões de crédito, PIX, boleto bancário e saldo em conta."
      },
      {
        pergunta: "Quanto tempo leva para receber minha conta após a compra?",
        resposta: "A entrega é instantânea após a confirmação do pagamento. Em caso de PIX ou cartão, é imediato. Para boleto, após a compensação."
      },
      {
        pergunta: "Como solicitar reembolso?",
        resposta: "Acesse 'Minhas Compras', selecione o pedido e clique em 'Solicitar Reembolso'. O prazo é de até 7 dias após a compra."
      }
    ]
  },
  {
    categoria: "Vendas",
    duvidas: [
      {
        pergunta: "Como começar a vender?",
        resposta: "Cadastre-se como lojista, verifique sua conta e comece a anunciar suas contas seguindo nossas políticas."
      },
      {
        pergunta: "Quando recebo meus pagamentos?",
        resposta: "Os pagamentos são liberados 14 dias após a venda, desde que não haja disputas abertas."
      },
      {
        pergunta: "Quais são as taxas cobradas?",
        resposta: "Cobramos uma taxa de 10% por venda realizada. Não há taxas de cadastro ou mensalidade."
      }
    ]
  }
]

export default function AjudaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative -mt-[64px] pt-[64px] overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-white">
        <div className="absolute inset-0 bg-[url('/ajuda/pattern.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/90 to-white" />
        
        <div className="relative container mx-auto px-4 pt-24 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="inline-flex mb-6 bg-[#097bff]/20 text-[#097bff] uppercase tracking-wider">
              Central de Ajuda
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Como Podemos{" "}
              <span className="text-[#097bff]">Ajudar?</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Encontre respostas para suas dúvidas e saiba mais sobre nossas políticas
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Busque sua dúvida aqui..."
                  className="w-full h-14 pl-14 pr-4 rounded-lg bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categorias */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Políticas e Suporte</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Escolha uma Categoria
          </h2>
          <p className="text-lg text-gray-600">
            Selecione o tópico que melhor se relaciona com sua dúvida
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categorias.map((categoria, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={categoria.link}>
                <Card className="p-6 h-full bg-white hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#097bff]/10 flex items-center justify-center">
                      {<categoria.icone className="w-6 h-6 text-[#097bff]" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#097bff] transition-colors">
                        {categoria.titulo}
                      </h3>
                      <p className="text-gray-600">{categoria.descricao}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#097bff] transition-colors" />
                  </div>
                </Card>
              </Link>
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
              Encontre respostas rápidas para as perguntas mais comuns
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {duvidasFrequentes.map((categoria, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-12 last:mb-0"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {categoria.categoria}
                </h3>
                <div className="space-y-4">
                  {categoria.duvidas.map((duvida, idx) => (
                    <Card key={idx} className="p-6 hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <HelpCircle className="w-6 h-6 text-[#097bff]" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {duvida.pergunta}
                          </h4>
                          <p className="text-gray-600">{duvida.resposta}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Não Encontrou o que Procurava?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Nossa equipe está pronta para ajudar você
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-[#097bff] hover:bg-[#097bff]/90 text-lg px-8 text-white">
              Fale Conosco
              <Mail className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-[#097bff] border-[#097bff] hover:bg-[#097bff]/10 text-lg px-8">
              Chat Online
              <MessageCircle className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
