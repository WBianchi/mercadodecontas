"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  DollarSign,
  Users,
  ShoppingCart,
  Star,
  TrendingUp,
  Activity,
} from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { formatPrice as formatCurrency } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

async function getDashboardData() {
  const response = await fetch("/api/lojista/dashboard")
  if (!response.ok) {
    throw new Error("Erro ao carregar dados do dashboard")
  }
  return response.json()
}

export function VisaoGeral() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
    refetchInterval: 60000 // Atualiza a cada minuto
  })

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Erro ao carregar dados. Por favor, tente novamente.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Cards principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Vendas de Hoje
              </p>
              {isLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <p className="text-2xl font-bold">
                  {formatCurrency(data?.vendasHoje.valor)}
                </p>
              )}
            </div>
            <div className="p-2 bg-green-100 rounded-full text-green-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            {isLoading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <>
                <div className={`flex items-center gap-1 ${data?.vendasHoje.variacao >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {data?.vendasHoje.variacao >= 0 ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                  {Math.abs(data?.vendasHoje.variacao)}%
                </div>
                <span className="text-muted-foreground">comparado a ontem</span>
              </>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Vendas do Mês
              </p>
              {isLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <p className="text-2xl font-bold">
                  {formatCurrency(data?.vendasMes.valor)}
                </p>
              )}
            </div>
            <div className="p-2 bg-blue-100 rounded-full text-blue-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            {isLoading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <>
                <div className={`flex items-center gap-1 ${data?.vendasMes.variacao >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {data?.vendasMes.variacao >= 0 ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                  {Math.abs(data?.vendasMes.variacao)}%
                </div>
                <span className="text-muted-foreground">comparado ao mês anterior</span>
              </>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Novos Clientes
              </p>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-2xl font-bold">
                  {data?.novosClientes.quantidade}
                </p>
              )}
            </div>
            <div className="p-2 bg-purple-100 rounded-full text-purple-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            {isLoading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <>
                <div className={`flex items-center gap-1 ${data?.novosClientes.variacao >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {data?.novosClientes.variacao >= 0 ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                  {Math.abs(data?.novosClientes.variacao)}%
                </div>
                <span className="text-muted-foreground">comparado a ontem</span>
              </>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Avaliação Média
              </p>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-2xl font-bold">{data?.avaliacoes.media}</p>
              )}
            </div>
            <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
              <Star className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            {isLoading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <>
                <div className={`flex items-center gap-1 ${data?.avaliacoes.variacao >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {data?.avaliacoes.variacao >= 0 ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                  {Math.abs(data?.avaliacoes.variacao)}
                </div>
                <span className="text-muted-foreground">últimos 7 dias</span>
              </>
            )}
          </div>
        </Card>
      </div>

      {/* Seção de Atividade Recente */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="p-6 lg:col-span-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Vendas Recentes</h3>
            <Button variant="outline" size="sm">
              Ver todas
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {isLoading ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              data?.vendasRecentes.map((venda, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <ShoppingCart className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{venda.produto}</p>
                      <p className="text-sm text-muted-foreground">{venda.tempo}</p>
                    </div>
                  </div>
                  <p className="font-medium">{formatCurrency(venda.valor)}</p>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Atividade da Loja</h3>
            <Button variant="outline" size="sm">
              Ver tudo
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {isLoading ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              data?.atividadesLoja.map((atividade, i) => (
                <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Activity className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{atividade.acao}</p>
                    <p className="text-sm text-muted-foreground">{atividade.tempo}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
