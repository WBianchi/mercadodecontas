"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, MessageSquare, Calculator, HelpCircle, X, Sparkles, Phone, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

export function IAAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  
  const openWhatsapp = () => {
    const phone = "5581987479236"
    const message = "Olá! Gostaria de mais informações sobre os produtos da Mercado de Contas."
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const options = [
    {
      title: "Atendimento Guiado",
      description: "Assistente virtual para te ajudar com suas dúvidas",
      icon: MessageSquare,
      onClick: () => {
        router.push('/ia-mdc')
        setIsOpen(false)
      },
    },
    {
      title: "Orçamento Simulado",
      description: "Simule valores e encontre o melhor plano",
      icon: Calculator,
      onClick: () => {
        router.push('/orcamento')
        setIsOpen(false)
      },
    },
    {
      title: "Dúvidas Frequentes",
      description: "Respostas rápidas para suas perguntas",
      icon: HelpCircle,
      onClick: () => {
        router.push('/ajuda')
        setIsOpen(false)
      },
    },
  ]

  return (
    <>
      {/* Botão Flutuante */}
      <motion.button
        className="fixed bottom-16 right-4 z-50 bg-gradient-to-r from-blue-600/90 to-blue-700/95 backdrop-blur-2xl text-white p-4 rounded-full shadow-[0_8px_32px_rgba(9,123,255,0.4)] border border-blue-400/30 hover:shadow-[0_10px_50px_rgba(9,123,255,0.5)] transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Bot className="w-6 h-6 drop-shadow-lg" />
          <motion.span 
            className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"
            animate={{ 
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.button>

      {/* Modal de Opções */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[95vw] max-w-[95vw] mx-auto sm:max-w-[480px] md:max-w-[520px] p-0 gap-0 overflow-hidden bg-blue-600/10 backdrop-blur-3xl border border-blue-300/20 shadow-[0_20px_80px_rgba(9,123,255,0.25)] rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-blue-600/5 to-blue-700/5 pointer-events-none" />
          
          {/* Efeito de brilho decorativo */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-300/10 rounded-full blur-3xl" />
          
          <div className="absolute top-4 right-4 z-50">
            <DialogClose className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition-colors text-white backdrop-blur-md border border-white/10">
              <X className="w-4 h-4" />
            </DialogClose>
          </div>
          
          <div className="relative z-10">
            {/* Linha decorativa superior */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
            
            <DialogHeader className="pt-8 sm:pt-10 pb-5 sm:pb-6 px-6 sm:px-8 text-center">
              <DialogTitle className="flex flex-col items-center gap-5 sm:gap-6 mb-2 sm:mb-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-blue-500/20 to-blue-600/30 backdrop-blur-xl p-4 sm:p-5 rounded-full border border-blue-300/30 shadow-[0_0_20px_rgba(9,123,255,0.2)]">
                    <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md" />
                  </div>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <h2 className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent text-2xl sm:text-3xl font-extralight tracking-wider">
                    Assistente Virtual
                  </h2>
                  <div className="flex items-center justify-center gap-1.5 text-xs font-light text-blue-100/80 tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Inteligência Artificial</span>
                  </div>
                </div>
              </DialogTitle>
              <p className="text-xs sm:text-sm text-blue-100/70 font-light tracking-wide px-4 sm:px-6">
                Como podemos ajudar você hoje?
              </p>
            </DialogHeader>

            <div className="px-4 sm:px-8 pb-6 sm:pb-8 space-y-3 sm:space-y-3.5">
              {options.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.15 }}
                >
                  <button
                    onClick={option.onClick}
                    className="w-full p-4 sm:p-5 flex items-center gap-3 sm:gap-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 hover:border-white/30 transition-all duration-300 group text-left shadow-sm"
                  >
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/30 p-3 sm:p-3.5 rounded-xl text-white border border-white/20 backdrop-blur-xl shadow-inner group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-all duration-300">
                      <option.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white tracking-wide">
                        {option.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-blue-100/70 truncate">
                        {option.description}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-blue-100/50 group-hover:text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                  </button>
                </motion.div>
              ))}
              
              {/* WhatsApp Option */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: options.length * 0.15 }}
              >
                <button
                  onClick={openWhatsapp}
                  className="w-full p-4 sm:p-5 flex items-center gap-3 sm:gap-4 rounded-2xl bg-green-500/20 hover:bg-green-500/30 backdrop-blur-xl border border-green-300/30 hover:border-green-300/40 transition-all duration-300 group text-left shadow-sm mt-4"
                >
                  <div className="bg-gradient-to-br from-green-500/30 to-green-600/40 p-3 sm:p-3.5 rounded-xl text-white border border-white/20 backdrop-blur-xl shadow-inner group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-all duration-300">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white tracking-wide">
                      Contato por WhatsApp
                    </h3>
                    <p className="text-[10px] sm:text-xs text-blue-100/80 font-medium">
                      (81) 8747-9236
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-100/50 group-hover:text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>
            
            {/* Elemento decorativo inferior */}
            <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
