"use client"

import { useState, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Chrome, Facebook } from "lucide-react"

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

export default function LoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  })

  useEffect(() => {
    if (status === "loading") return

    if (session?.user) {
      const userRole = session.user.role as string
      const roleRedirects: { [key: string]: string } = {
        ADMIN: "/dashboard/admin",
        LOJISTA: "/dashboard/lojista",
        CLIENTE: "/meu-perfil",
        ASSINANTE: "/dashboard/assinante",
        EDITOR: "/dashboard/editor",
        AUTOR: "/dashboard/redator",
      }

      const redirectPath = roleRedirects[userRole] || "/meu-perfil"
      router.push(redirectPath)
    }
  }, [session, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.senha,
        redirect: false,
      })

      if (result?.error) {
        toast.error(result.error)
        return
      }

      const userResponse = await fetch("/api/auth/me")
      const userData = await userResponse.json()

      const roleRedirects: { [key: string]: string } = {
        ADMIN: "/dashboard/admin",
        LOJISTA: "/dashboard/lojista",
        CLIENTE: "/meu-perfil",
        ASSINANTE: "/dashboard/assinante",
        EDITOR: "/dashboard/editor",
        AUTOR: "/dashboard/redator",
      }

      const redirectPath = roleRedirects[userData.role] || "/meu-perfil"
      router.push(redirectPath)
      toast.success("Login realizado com sucesso!")
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    signIn(provider)
  }

  // Se estiver carregando a sessão, mostra um loading
  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" className="text-blue-600" />
      </div>
    )
  }

  // Se já estiver autenticado, não renderiza nada (useEffect cuidará do redirecionamento)
  if (session?.user) return null

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
                Bem-vindo de volta!
              </h1>
              <p className="text-gray-600">Faça login para continuar</p>
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
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha" className="text-gray-700 font-medium">
                  Senha
                </Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="Sua senha"
                  value={formData.senha}
                  onChange={(e) =>
                    setFormData({ ...formData, senha: e.target.value })
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
                      <span>Entrando...</span>
                    </div>
                  ) : (
                    "Entrar"
                  )}
                </Button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-gray-500 bg-white">ou continue com</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
                      onClick={() => handleSocialLogin("google")}
                    >
                      <Chrome className="w-4 h-4 mr-2 text-blue-600" />
                      Google
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
                      onClick={() => handleSocialLogin("facebook")}
                    >
                      <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                      Facebook
                    </Button>
                  </motion.div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300" />
                    Lembrar-me
                  </label>
                  <Button
                    variant="link"
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors p-0"
                    onClick={() => router.push("/recuperar-senha")}
                  >
                    Esqueceu a senha?
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                  onClick={() => router.push("/cadastro")}
                >
                  Criar nova conta
                </Button>
              </div>
            </form>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
