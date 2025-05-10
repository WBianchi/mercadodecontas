"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DollarSign,
  ShoppingBag,
  Users,
  Store,
  UserCheck,
  RefreshCcw,
  ArrowUpDown,
  Eye,
  MousePointer,
  Download,
  Calendar,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Dados de exemplo - Métricas
const metricas = {
  vendas: {
    total: 567890.50,
    crescimento: 23.5,
    quantidade: 1234
  },
  reembolsos: {
    total: 12450.30,
    quantidade: 45,
    percentual: 2.2
  },
  saques: {
    total: 489670.80,
    quantidade: 156,
    pendentes: 8
  },
  usuarios: {
    clientes: 3456,
    lojistas: 245,
    afiliados: 89
  },
  engajamento: {
    cliques: 45678,
    visualizacoes: 234567,
    taxaConversao: 3.2
  }
}

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState("30")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <div className="flex items-center gap-4">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="15">Últimos 15 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
              <SelectItem value="365">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Período Personalizado
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar Dados
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-violet-500 to-violet-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-white">Total de Vendas</CardTitle>
            <DollarSign className="h-5 w-5 text-white" />
          </CardHeader>
          <CardContent className="text-white">
            <div className="text-3xl font-bold">
              R$ {metricas.vendas.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span>{metricas.vendas.quantidade} pedidos</span>
              <span>+{metricas.vendas.crescimento}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-red-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-white">Reembolsos</CardTitle>
            <RefreshCcw className="h-5 w-5 text-white" />
          </CardHeader>
          <CardContent className="text-white">
            <div className="text-3xl font-bold">
              R$ {metricas.reembolsos.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span>{metricas.reembolsos.quantidade} reembolsos</span>
              <span>{metricas.reembolsos.percentual}% do total</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-white">Saques</CardTitle>
            <ArrowUpDown className="h-5 w-5 text-white" />
          </CardHeader>
          <CardContent className="text-white">
            <div className="text-3xl font-bold">
              R$ {metricas.saques.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span>{metricas.saques.quantidade} saques</span>
              <span>{metricas.saques.pendentes} pendentes</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-white">Clientes</CardTitle>
            <Users className="h-5 w-5 text-white" />
          </CardHeader>
          <CardContent className="text-white">
            <div className="text-3xl font-bold">{metricas.usuarios.clientes}</div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col">
                <span className="text-white/70">Ativos</span>
                <span className="text-xl font-semibold">{Math.round(metricas.usuarios.clientes * 0.85)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/70">Novos</span>
                <span className="text-xl font-semibold">{Math.round(metricas.usuarios.clientes * 0.15)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500 to-amber-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-white">Lojistas</CardTitle>
            <Store className="h-5 w-5 text-white" />
          </CardHeader>
          <CardContent className="text-white">
            <div className="text-3xl font-bold">{metricas.usuarios.lojistas}</div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col">
                <span className="text-white/70">Ativos</span>
                <span className="text-xl font-semibold">{Math.round(metricas.usuarios.lojistas * 0.8)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/70">Pendentes</span>
                <span className="text-xl font-semibold">{Math.round(metricas.usuarios.lojistas * 0.2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-500 to-pink-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-white">Afiliados</CardTitle>
            <UserCheck className="h-5 w-5 text-white" />
          </CardHeader>
          <CardContent className="text-white">
            <div className="text-3xl font-bold">{metricas.usuarios.afiliados}</div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col">
                <span className="text-white/70">Ativos</span>
                <span className="text-xl font-semibold">{Math.round(metricas.usuarios.afiliados * 0.75)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/70">Top 10</span>
                <span className="text-xl font-semibold">10</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 bg-gradient-to-br from-indigo-500 to-indigo-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-white">Engajamento</CardTitle>
            <Eye className="h-5 w-5 text-white" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
              <div className="space-y-1">
                <div className="text-3xl font-bold">{metricas.engajamento.visualizacoes.toLocaleString()}</div>
                <div className="text-sm text-white/70">Visualizações</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold">{metricas.engajamento.cliques.toLocaleString()}</div>
                <div className="text-sm text-white/70">Cliques</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold">{metricas.engajamento.taxaConversao}%</div>
                <div className="text-sm text-white/70">Taxa de Conversão</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
