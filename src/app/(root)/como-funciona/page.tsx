'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, ShoppingCart, Shield, CreditCard, CheckCircle, 
  ArrowRight, PlayCircle, UserCheck, MessageSquare, Zap,
  AlertCircle, HelpCircle, ArrowDownCircle, Store, 
  DollarSign, BarChart, Users
} from "lucide-react"

const passosCliente = [
  {
    icone: Search,
    titulo: "1. Encontre a Conta Ideal",
    descricao: "Explore nossa ampla seleção de contas verificadas e escolha a que melhor atende suas necessidades.",
    destaque: "Mais de 1000 contas disponíveis"
  },
  {
    icone: ShoppingCart,
    titulo: "2. Faça sua Compra",
    descricao: "Processo de compra simples e seguro, com diversos métodos de pagamento disponíveis.",
    destaque: "Pagamento 100% seguro"
  },
  {
    icone: Shield,
    titulo: "3. Verificação de Segurança",
    descricao: "Realizamos uma verificação completa para garantir a legitimidade da transação.",
    destaque: "Proteção garantida"
  },
  {
    icone: CreditCard,
    titulo: "4. Receba sua Conta",
    descricao: "Após a confirmação do pagamento, receba imediatamente os dados de acesso da sua conta.",
    destaque: "Entrega instantânea"
  }
]

const passosLojista = [
  {
    icone: Store,
    titulo: "1. Cadastre sua Loja",
    descricao: "Crie sua loja virtual e configure seu perfil com todas as informações necessárias.",
    destaque: "Cadastro gratuito"
  },
  {
    icone: DollarSign,
    titulo: "2. Anuncie suas Contas",
    descricao: "Cadastre suas contas com descrições detalhadas e preços competitivos.",
    destaque: "Exposição máxima"
  },
  {
    icone: BarChart,
    titulo: "3. Gerencie suas Vendas",
    descricao: "Acompanhe suas vendas, avaliações e métricas de desempenho em tempo real.",
    destaque: "Dashboard completo"
  },
  {
    icone: Users,
    titulo: "4. Atenda seus Clientes",
    descricao: "Mantenha um bom relacionamento com seus clientes através do nosso sistema de chat.",
    destaque: "Suporte integrado"
  }
]

const beneficios = [
  {
    icone: UserCheck,
    titulo: "Contas Verificadas",
    descricao: "Todas as contas são verificadas e autênticas"
  },
  {
    icone: Shield,
    titulo: "Garantia de Segurança",
    descricao: "Sistema anti-fraude e proteção ao comprador"
  },
  {
    icone: MessageSquare,
    titulo: "Suporte 24/7",
    descricao: "Atendimento rápido e eficiente a qualquer hora"
  },
  {
    icone: Zap,
    titulo: "Entrega Instantânea",
    descricao: "Receba sua conta imediatamente após o pagamento"
  }
]

const duvidas = [
  {
    pergunta: "Como garantem a segurança das transações?",
    resposta: "Utilizamos tecnologia de ponta em criptografia e sistemas anti-fraude, além de intermediar todas as transações para garantir a segurança tanto do comprador quanto do vendedor."
  },
  {
    pergunta: "Qual o prazo de entrega das contas?",
    resposta: "A entrega é instantânea após a confirmação do pagamento. Você receberá os dados de acesso imediatamente no seu email cadastrado."
  },
  {
    pergunta: "O que fazer se tiver problemas com a conta?",
    resposta: "Nosso suporte está disponível 24/7 para resolver qualquer problema. Além disso, oferecemos garantia de 30 dias em todas as transações."
  }
]

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative -mt-[64px] pt-[64px] overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-white">
        <div className="absolute inset-0 bg-[url('/como-funciona/pattern.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/90 to-white" />
        
        <div className="relative container mx-auto px-4 pt-24 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="inline-flex mb-6 bg-[#097bff]/20 text-[#097bff] uppercase tracking-wider">
              Como Funciona
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Simples, Seguro e{" "}
              <span className="text-[#097bff]">Instantâneo</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Entenda como funciona nossa plataforma e por que somos a escolha 
              número 1 para compra e venda de contas digitais.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#097bff] hover:bg-[#097bff]/90 text-lg px-8">
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 text-lg px-8">
                <PlayCircle className="mr-2 h-5 w-5" />
                Ver Tutorial
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Como Funciona - Passos */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Processo Simplificado</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Como Funciona Nossa Plataforma
          </h2>
          <p className="text-lg text-gray-600">
            Escolha seu perfil e entenda como é fácil utilizar nossa plataforma.
          </p>
        </motion.div>

        <Tabs defaultValue="cliente" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto mb-12">
            <TabsTrigger 
              value="cliente"
              className="data-[state=active]:bg-[#097bff] data-[state=active]:text-white"
            >
              Para Clientes
            </TabsTrigger>
            <TabsTrigger 
              value="lojista"
              className="data-[state=active]:bg-[#097bff] data-[state=active]:text-white"
            >
              Para Lojistas
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="cliente">
            <div className="grid md:grid-cols-2 gap-8">
              {passosCliente.map((passo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full bg-white hover:shadow-lg transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#097bff]/5 rounded-bl-full -mr-16 -mt-16 group-hover:bg-[#097bff]/10 transition-colors" />
                    
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-[#097bff]/10 flex items-center justify-center mb-6">
                        {<passo.icone className="w-7 h-7 text-[#097bff]" />}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{passo.titulo}</h3>
                      <p className="text-gray-600 mb-4">{passo.descricao}</p>
                      <Badge variant="secondary" className="bg-[#097bff]/10 text-[#097bff]">
                        {passo.destaque}
                      </Badge>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lojista">
            <div className="grid md:grid-cols-2 gap-8">
              {passosLojista.map((passo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full bg-white hover:shadow-lg transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#097bff]/5 rounded-bl-full -mr-16 -mt-16 group-hover:bg-[#097bff]/10 transition-colors" />
                    
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-[#097bff]/10 flex items-center justify-center mb-6">
                        {<passo.icone className="w-7 h-7 text-[#097bff]" />}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{passo.titulo}</h3>
                      <p className="text-gray-600 mb-4">{passo.descricao}</p>
                      <Badge variant="secondary" className="bg-[#097bff]/10 text-[#097bff]">
                        {passo.destaque}
                      </Badge>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
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
              Por que Escolher Nossa Plataforma?
            </h2>
            <p className="text-lg text-gray-600">
              Oferecemos a melhor experiência em compra e venda de contas digitais, 
              com benefícios exclusivos para nossos usuários.
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
      </div>

      {/* Dúvidas Frequentes */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-[#097bff]/20 text-[#097bff]">Dúvidas</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-600">
            Encontre respostas para as dúvidas mais comuns sobre nossa plataforma.
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
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <HelpCircle className="w-6 h-6 text-[#097bff]" />
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">Não encontrou o que procurava?</p>
          <Button variant="outline" className="text-[#097bff] border-[#097bff]">
            Ver Todas as Dúvidas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
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
              Pronto para Começar?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Junte-se a milhares de usuários que já confiam em nossa plataforma
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#097bff] hover:bg-[#097bff]/90 text-lg px-8 text-white">
                Criar Conta
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 text-lg px-8">
                Saiba Mais
                <ArrowDownCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
