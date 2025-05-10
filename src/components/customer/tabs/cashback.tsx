"use client"

import { Card } from "@/components/ui/card"
import { Wallet } from "lucide-react"
import { motion } from "framer-motion"

export function Cashback() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <Wallet className="h-8 w-8 text-[#097bff]" />
        </div>
        <h3 className="text-xl font-bold mb-2">Sistema de Cashback em Desenvolvimento</h3>
        <p className="text-gray-500 max-w-md mb-4">
          Estamos preparando um sistema de recompensas especial para você!
          Em breve você poderá acumular e resgatar cashback em suas compras.
        </p>
        <p className="text-sm text-gray-400">
          Aguarde as novidades!
        </p>
      </Card>
    </motion.div>
  )
}
