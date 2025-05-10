"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

const RedefinirSenhaForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [loading, setLoading] = useState(false)
  const [tokenValido, setTokenValido] = useState(true)
  const [formData, setFormData] = useState({
    novaSenha: "",
    confirmarSenha: "",
  })

  useEffect(() => {
    // Verificar se o token é válido
    const verificarToken = async () => {
      if (!token) {
        setTokenValido(false)
        toast.error("Token inválido ou expirado.")
        return
      }

      try {
        const response = await fetch(`/api/auth/verificar-token?token=${token}`)
        const data = await response.json()

        if (!data.valid) {
          setTokenValido(false)
          toast.error("Token inválido ou expirado.")
        }
      } catch (error) {
        console.error("Erro ao verificar token:", error)
        setTokenValido(false)
        toast.error("Erro ao verificar token. Tente novamente.")
      }
    }

    verificarToken()
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.novaSenha !== formData.confirmarSenha) {
      toast.error("As senhas não coincidem.")
      return
    }

    if (formData.novaSenha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/redefinir-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          novaSenha: formData.novaSenha,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Senha redefinida com sucesso!")
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        toast.error(data.error || "Erro ao redefinir senha. Tente novamente.")
      }
    } catch (error) {
      console.error("Erro ao redefinir senha:", error)
      toast.error("Erro ao redefinir senha. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  if (!tokenValido) {
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
            <h1 className="text-2xl font-bold text-red-600 mb-4">Link inválido</h1>
            <p className="text-gray-600 mb-6">
              Este link de recuperação de senha é inválido ou expirou.
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
            Crie uma nova senha
          </h1>
          <p className="text-gray-600">Digite sua nova senha para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="novaSenha" className="text-gray-700 font-medium">
              Nova Senha
            </Label>
            <Input
              id="novaSenha"
              type="password"
              placeholder="Digite sua nova senha"
              value={formData.novaSenha}
              onChange={(e) =>
                setFormData({ ...formData, novaSenha: e.target.value })
              }
              className="bg-white/50 border-gray-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmarSenha" className="text-gray-700 font-medium">
              Confirmar Senha
            </Label>
            <Input
              id="confirmarSenha"
              type="password"
              placeholder="Confirme sua nova senha"
              value={formData.confirmarSenha}
              onChange={(e) =>
                setFormData({ ...formData, confirmarSenha: e.target.value })
              }
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
                <span>Processando...</span>
              </div>
            ) : (
              "Redefinir Senha"
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

export default function RedefinirSenhaPage() {
  return (
    <Suspense fallback={<div className="text-center p-4">Carregando...</div>}>
      <RedefinirSenhaForm />
    </Suspense>
  )
}
