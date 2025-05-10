"use client"

import { User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { RefreshCcw } from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  image: string | null
  role: string
  createdAt: string
  _count: {
    Order: number
    favorites: number
  }
}

export function HeaderUser() {
  const { data: session } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/customer/profile")
        if (!response.ok) throw new Error("Erro ao carregar perfil")
        
        const data = await response.json()
        setProfile(data)
      } catch (error) {
        console.error(error)
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
      <Card className="p-6">
        <div className="flex items-center justify-center h-32">
          <RefreshCcw className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </Card>
    )
  }

  if (!profile) {
    return null
  }

  // Calcula o nível do usuário baseado no número de pedidos
  const getNivel = (pedidos: number) => {
    if (pedidos >= 50) return "Cliente Diamante"
    if (pedidos >= 30) return "Cliente Ouro"
    if (pedidos >= 10) return "Cliente Prata"
    return "Cliente Bronze"
  }

  // Calcula o progresso para o próximo nível
  const getProgressoProximoNivel = (pedidos: number) => {
    if (pedidos >= 50) return 100
    if (pedidos >= 30) return ((pedidos - 30) / 20) * 100
    if (pedidos >= 10) return ((pedidos - 10) / 20) * 100
    return (pedidos / 10) * 100
  }

  // Formata a data para "Mês YYYY"
  const formatarDataMembro = (data: string) => {
    const meses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]
    const date = new Date(data)
    return `${meses[date.getMonth()]} ${date.getFullYear()}`
  }

  const nivel = getNivel(profile._count.Order)
  const progresso = getProgressoProximoNivel(profile._count.Order)

  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profile.image || undefined} />
          <AvatarFallback>
            <User className="h-10 w-10" />
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
            <h2 className="text-xl md:text-2xl font-bold">{profile.name}</h2>
            <Badge variant="outline" className="text-[#097bff] border-[#097bff] self-center">
              {nivel}
            </Badge>
          </div>

          <div className="flex flex-col md:flex-row md:gap-6 text-gray-500">
            <div className="my-1 md:my-0">
              <p className="text-sm">Email</p>
              <p className="font-medium">{profile.email}</p>
            </div>
            <div className="my-1 md:my-0">
              <p className="text-sm">Membro desde</p>
              <p className="font-medium">{formatarDataMembro(profile.createdAt)}</p>
            </div>
            <div className="my-1 md:my-0">
              <p className="text-sm">Compras realizadas</p>
              <p className="font-medium">{profile._count.Order} compras</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4 sm:gap-6 pt-2">
            <div>
              <p className="text-sm text-gray-500">Itens Favoritos</p>
              <p className="text-lg font-bold text-[#097bff]">{profile._count.favorites}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Próximo nível</p>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <div className="h-2 w-32 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-[#097bff] rounded-full" 
                    style={{ width: `${progresso}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{Math.round(progresso)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
