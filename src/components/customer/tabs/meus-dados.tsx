"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, MapPin, Lock } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface UserProfile {
  id: string
  username: string
  email: string
  role: string
  createdAt: string
}

export function MeusDados() {
  const { data: session } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/customer/profile")
        if (!response.ok) throw new Error("Erro ao carregar perfil")
        
        const data = await response.json()
        setProfile(data)
      } catch (error) {
        console.error(error)
        toast.error("Erro ao carregar dados do perfil")
      } finally {
        setLoading(false)
      }
    }

    if (session?.user) {
      fetchProfile()
    }
  }, [session])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" className="text-blue-600" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Erro ao carregar dados do perfil</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <User className="h-5 w-5 text-[#097bff]" />
          Dados Pessoais
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input id="nome" defaultValue={profile.username} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={profile.email} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input id="cpf" defaultValue="***.***.***-**" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input id="telefone" defaultValue="(**) *****-****" disabled />
          </div>
          <Button className="w-full" disabled>Dados não editáveis</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Lock className="h-5 w-5 text-[#097bff]" />
          Alterar Senha
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="senha-atual">Senha Atual</Label>
            <Input id="senha-atual" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nova-senha">Nova Senha</Label>
            <Input id="nova-senha" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
            <Input id="confirmar-senha" type="password" />
          </div>
          <Button className="w-full" disabled={isSaving}>
            {isSaving ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                <span>Alterando...</span>
              </div>
            ) : (
              "Alterar Senha"
            )}
          </Button>
        </div>
      </Card>

      <Card className="p-6 md:col-span-2">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-[#097bff]" />
          Endereço Principal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cep">CEP</Label>
            <Input id="cep" defaultValue="*****-***" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estado">Estado</Label>
            <Input id="estado" defaultValue="*****" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cidade">Cidade</Label>
            <Input id="cidade" defaultValue="*****" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bairro">Bairro</Label>
            <Input id="bairro" defaultValue="*****" disabled />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="endereco">Endereço</Label>
            <Input id="endereco" defaultValue="*****" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="numero">Número</Label>
            <Input id="numero" defaultValue="*****" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="complemento">Complemento</Label>
            <Input id="complemento" defaultValue="*****" disabled />
          </div>
          <Button className="md:col-span-2" disabled>Dados não editáveis</Button>
        </div>
      </Card>
    </div>
  )
}
