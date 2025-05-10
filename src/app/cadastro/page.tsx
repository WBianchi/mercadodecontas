"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Store, Users, Crown } from "lucide-react"

const FloatingBubble = ({ className }: { className?: string }) => {
  return (
    <motion.div
      className={`absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 20, 0],
        y: [0, 30, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  )
}

const accountTypes = [
  {
    title: "Comprar",
    subtitle: "Área do Cliente",
    icon: Users,
    href: "/cadastro/cliente",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "Vender",
    subtitle: "Área do Lojista",
    icon: Store,
    href: "/cadastro/lojista",
    gradient: "from-blue-600 to-blue-700",
  },
  {
    title: "Assinar",
    subtitle: "Área Premium",
    icon: Crown,
    href: "/cadastro/assinante",
    gradient: "from-blue-700 to-blue-800",
  },
]

export default function CadastroPage() {
  const router = useRouter()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Padrão de Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Gradiente de Fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white" />

      {/* Bolhas Animadas */}
      <FloatingBubble className="w-64 h-64 bg-blue-500/60 top-20 -left-20" />
      <FloatingBubble className="w-72 h-72 bg-blue-400/60 bottom-20 -right-20" />
      <FloatingBubble className="w-96 h-96 bg-blue-300/60 -bottom-40 -left-40" />
      <FloatingBubble className="w-80 h-80 bg-blue-600/60 -top-20 right-20" />

      {/* Conteúdo Principal */}
      <div className="container relative z-10 px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold leading-tight mb-6"
            >
              <span className="bg-gradient-to-r from-[#097bff] to-blue-600 bg-clip-text text-transparent">
                O que você deseja
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-[#097bff] bg-clip-text text-transparent">
                fazer hoje?
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Escolha uma opção abaixo para começar sua jornada na maior plataforma de marketplace do Brasil
            </motion.p>

            {/* Stats Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex justify-center gap-8 mt-8 text-sm text-gray-600"
            >
              <div>
                <span className="block text-2xl font-bold text-[#097bff]">50mil+</span>
                <span>Clientes Ativos</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-[#097bff]">100mil+</span>
                <span>Produtos Vendidos</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-[#097bff]">4.9/5</span>
                <span>Avaliação Média</span>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {accountTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(type.href)}
                className="cursor-pointer"
              >
                <div className="relative group">
                  {/* Card Background com Glassmorphism */}
                  <div className="absolute inset-0 bg-white/30 backdrop-blur-xl rounded-xl border border-white/50 shadow-lg transition-all duration-300 group-hover:bg-white/40" />
                  
                  {/* Gradient Border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl opacity-20 group-hover:opacity-40 blur transition-all duration-300" />
                  
                  {/* Content */}
                  <div className="relative flex items-center gap-4 p-4 text-left rounded-xl">
                    {/* Icon com Gradient Background */}
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${type.gradient}`}>
                      <type.icon className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Textos */}
                    <div>
                      <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-[#097bff] bg-clip-text text-transparent">
                        {type.title}
                      </h2>
                      <p className="text-sm text-gray-600">{type.subtitle}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => router.push("/login")}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-lg"
            >
              Já tem uma conta? Faça login
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
