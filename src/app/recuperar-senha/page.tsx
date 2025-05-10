"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function RecuperarSenhaPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error("Por favor, informe seu email.")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/recuperar-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setEnviado(true)
        toast.success("Email enviado com instruções para redefinir sua senha.")
      } else {
        toast.error(data.error || "Erro ao enviar email. Tente novamente.")
      }
    } catch (error) {
      console.error("Erro ao solicitar recuperação de senha:", error)
      toast.error("Erro ao enviar email. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  if (enviado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <div className="text-center">
            <Image
              src="/logo-mercadodecontas.svg"
              alt="Logo"
              width={100}
              height={60}
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-green-600 mb-4">Email enviado!</h1>
            <p className="text-gray-600 mb-6">
              Enviamos um link de recuperação para seu email.
              Verifique sua caixa de entrada e spam.
            </p>
            <Button
              onClick={() => router.push("/login")}
              className="w-full bg-gradient-to-r from-[#097bff] to-blue-600"
            >
              Voltar para o login
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-xl bg-white/90 p-8 rounded-2xl shadow-xl max-w-md w-full"
      >
        <div className="text-center mb-8">
          <Image
            src="/logo-mercadodecontas.svg"
            alt="Logo"
            width={100}
            height={60}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#097bff] to-blue-600 bg-clip-text text-transparent">
            Recuperar Senha
          </h1>
          <p className="text-gray-600">Digite seu email para receber instruções de recuperação</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-blue-500"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#097bff] to-blue-600 text-white"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" />
                <span>Enviando...</span>
              </div>
            ) : (
              "Enviar instruções"
            )}
          </Button>

          <div className="mt-4 text-center">
            <Button
              type="button"
              variant="link"
              className="text-blue-600"
              onClick={() => router.push("/login")}
            >
              Voltar para o login
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
