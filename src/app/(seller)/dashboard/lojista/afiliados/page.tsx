"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { 
  Users,
  DollarSign,
  TrendingUp,
  Award,
  Info,
  ArrowUpRight,
  ArrowUp,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function AfiliadosPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Programa de Afiliados</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seus afiliados e acompanhe o desempenho do programa
          </p>
        </div>
        <Button>
          <Users className="mr-2 h-4 w-4" />
          Convidar Afiliados
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Total de Afiliados
              </p>
              <p className="text-2xl font-bold">248</p>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4">
            <Progress value={85} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              85% ativos este mês
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Comissões Pagas
              </p>
              <p className="text-2xl font-bold">R$ 12.489,00</p>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
              <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUp className="h-4 w-4" />
              32%
            </div>
            <span className="text-muted-foreground">vs. mês anterior</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Taxa de Conversão
              </p>
              <p className="text-2xl font-bold">8.5%</p>
            </div>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4">
            <Progress value={65} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Meta: 10%
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Top Afiliados
              </p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
              <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-500">Elite</Badge>
              <HoverCard>
                <HoverCardTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </HoverCardTrigger>
                <HoverCardContent>
                  Afiliados que geraram mais de R$ 5.000 em comissões
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="ranking" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ranking">Ranking</TabsTrigger>
          <TabsTrigger value="comissoes">Comissões</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="ranking" className="space-y-4">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Top Afiliados do Mês</h2>
              <Button variant="outline" size="sm">
                Ver todos
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {[
                {
                  nome: "Carlos Silva",
                  avatar: "/avatars/01.png",
                  vendas: 89,
                  comissao: "R$ 4.890,00",
                  conversao: "12.5%",
                  nivel: "Elite",
                  nivelCor: "bg-yellow-500",
                },
                {
                  nome: "Ana Costa",
                  avatar: "/avatars/02.png",
                  vendas: 76,
                  comissao: "R$ 3.980,00",
                  conversao: "10.2%",
                  nivel: "Elite",
                  nivelCor: "bg-yellow-500",
                },
                {
                  nome: "Pedro Santos",
                  avatar: "/avatars/03.png",
                  vendas: 65,
                  comissao: "R$ 2.890,00",
                  conversao: "8.9%",
                  nivel: "Prata",
                  nivelCor: "bg-gray-500",
                },
              ].map((afiliado, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-semibold">
                      {i + 1}
                    </div>
                    <img
                      src={afiliado.avatar}
                      alt={afiliado.nome}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{afiliado.nome}</p>
                      <div className="flex items-center gap-2">
                        <Badge className={afiliado.nivelCor + " text-white"}>
                          {afiliado.nivel}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {afiliado.vendas} vendas
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{afiliado.comissao}</p>
                    <p className="text-sm text-muted-foreground">
                      Conversão: {afiliado.conversao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="comissoes" className="space-y-4">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold">Desempenho das Comissões</h2>
                <p className="text-sm text-muted-foreground">
                  Últimos 30 dias
                </p>
              </div>
              <Button variant="outline" size="sm">
                Exportar Relatório
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { data: "01/02", valor: 2500 },
                    { data: "05/02", valor: 3200 },
                    { data: "10/02", valor: 4100 },
                    { data: "15/02", valor: 3800 },
                    { data: "20/02", valor: 5200 },
                    { data: "25/02", valor: 4900 },
                    { data: "28/02", valor: 6100 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="data"
                    className="text-xs"
                  />
                  <YAxis
                    className="text-xs"
                    tickFormatter={(value) => `R$ ${value}`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Data
                                </span>
                                <span className="font-bold text-muted-foreground">
                                  {payload[0].payload.data}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Valor
                                </span>
                                <span className="font-bold">
                                  R$ {payload[0].value}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="valor"
                    stroke="#0091FF"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Maior Comissão
                  </p>
                  <p className="text-lg font-bold">R$ 890,00</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Média por Afiliado
                  </p>
                  <p className="text-lg font-bold">R$ 450,00</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                  <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Afiliados Ativos
                  </p>
                  <p className="text-lg font-bold">185</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
