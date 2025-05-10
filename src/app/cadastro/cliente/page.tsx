"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

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

export default function CadastroClientePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          role: "CLIENTE",
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao criar conta")
      }

      toast.success("Conta criada com sucesso!")
      router.push("/login")
    } catch (error) {
      toast.error("Erro ao criar conta. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fafafa]">
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
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="backdrop-blur-xl bg-white/80 p-8 rounded-2xl shadow-2xl border border-white/50">
            <div className="flex flex-col items-center space-y-2 mb-8">
              <Image
                src="/logo-mercadodecontas.svg"
                alt="Logo"
                width={100}
                height={60}
                className="mb-4"
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#097bff] to-blue-600 bg-clip-text text-transparent">
                Criar Conta Cliente
              </h1>
              <p className="text-gray-600">Preencha seus dados para começar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-medium">
                  Nome de usuário
                </Label>
                <Input
                  id="username"
                  placeholder="Seu nome de usuário"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Seu e-mail"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                  Confirmar Senha
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#097bff] to-blue-600 text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-blue-500/25"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <LoadingSpinner size="sm" />
                      <span>Criando conta...</span>
                    </div>
                  ) : (
                    "Criar conta"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                  onClick={() => router.push("/login")}
                >
                  Voltar para login
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
