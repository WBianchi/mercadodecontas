"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ExclusaoDadosPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error("Por favor, informe seu e-mail")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/exclusao-dados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || "Erro ao processar solicitação")
      }
      
      toast.success("Solicitação recebida! Entraremos em contato em breve.")
      router.push("/")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao processar solicitação")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Exclusão de Dados
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Solicite a exclusão dos seus dados pessoais da nossa plataforma
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <Card>
          <CardHeader>
            <CardTitle>Solicitar exclusão de dados</CardTitle>
            <CardDescription>
              Em conformidade com a LGPD e o GDPR, você pode solicitar a exclusão dos seus dados pessoais.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <div className="mt-1">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu-email@exemplo.com"
                    required
                    className="block w-full"
                  />
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p>Ao solicitar a exclusão dos seus dados:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Todos os seus dados pessoais serão removidos permanentemente</li>
                  <li>Você receberá uma confirmação por e-mail quando o processo for concluído</li>
                  <li>O processo pode levar até 30 dias para ser finalizado</li>
                </ul>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/")}>
              Voltar
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoadingSpinner className="mr-2 h-4 w-4" />
                  Enviando...
                </>
              ) : (
                "Solicitar exclusão"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
