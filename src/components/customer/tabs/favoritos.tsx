"use client"

import { Card } from "@/components/ui/card"
import { Construction } from "lucide-react"
import { motion } from "framer-motion"

export function Favoritos() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
          <Construction className="h-8 w-8 text-amber-600" />
        </div>
        <h3 className="text-xl font-bold mb-2">Página em Construção</h3>
        <p className="text-gray-500 max-w-md mb-4">
          Estamos trabalhando para trazer seus produtos favoritos aqui.
          Em breve você poderá adicionar e gerenciar seus produtos favoritos nesta área.
        </p>
        <p className="text-sm text-gray-400">
          Volte em breve para conferir as novidades!
        </p>
      </Card>
    </motion.div>
  )
}
