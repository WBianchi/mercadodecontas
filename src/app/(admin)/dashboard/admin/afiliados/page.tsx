"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Users,
  ArrowUpDown,
  DollarSign,
  ShoppingCart,
  Percent,
  UserCheck,
  Ban,
  Eye,
  Mail,
} from "lucide-react"

// Dados de exemplo
const afiliados = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao.silva@email.com",
    status: "Ativo",
    vendas: 156,
    comissoes: 7890.50,
    taxa: 10,
    cadastro: "15/01/2024"
  },
  {
    id: "2",
    nome: "Maria Santos",
    email: "maria.santos@email.com",
    status: "Ativo",
    vendas: 98,
    comissoes: 4567.80,
    taxa: 10,
    cadastro: "20/01/2024"
  },
  {
    id: "3",
    nome: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    status: "Pendente",
    vendas: 0,
    comissoes: 0,
    taxa: 8,
    cadastro: "01/02/2024"
  },
  {
    id: "4",
    nome: "Ana Costa",
    email: "ana.costa@email.com",
    status: "Bloqueado",
    vendas: 45,
    comissoes: 2345.60,
    taxa: 10,
    cadastro: "10/12/2023"
  }
]

const resumo = {
  totalAfiliados: 127,
  afiliadosAtivos: 98,
  vendasMes: 1234,
  comissoesMes: 45678.90
}

export default function AfiliadosPage() {
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [ordenacao, setOrdenacao] = useState<"nome" | "vendas" | "comissoes">("vendas")
  const [pagina, setPagina] = useState(1)
  const itensPorPagina = 10

  const afiliadosOrdenados = [...afiliados].sort((a, b) => {
    if (ordenacao === "nome") return a.nome.localeCompare(b.nome)
    if (ordenacao === "vendas") return b.vendas - a.vendas
    return b.comissoes - a.comissoes
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Afiliados</h1>
        <Button>
          <Mail className="mr-2 h-4 w-4" />
          Convidar Afiliado
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Afiliados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumo.totalAfiliados}</div>
            <p className="text-xs text-muted-foreground">
              {resumo.afiliadosAtivos} ativos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas do Mês</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumo.vendasMes}</div>
            <p className="text-xs text-muted-foreground">
              Por afiliados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comissões do Mês</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {resumo.comissoesMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              A pagar
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa Média</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10%</div>
            <p className="text-xs text-muted-foreground">
              De comissão
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar afiliados..."
            className="pl-10"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        <Select value={filtroStatus} onValueChange={setFiltroStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Status</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="bloqueado">Bloqueado</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => setOrdenacao(prev => {
            if (prev === "nome") return "vendas"
            if (prev === "vendas") return "comissoes"
            return "nome"
          })}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Ordenar por {
            ordenacao === "nome" ? "Vendas" :
            ordenacao === "vendas" ? "Comissões" : "Nome"
          }
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Vendas</TableHead>
              <TableHead className="text-right">Comissões</TableHead>
              <TableHead className="text-right">Taxa</TableHead>
              <TableHead>Cadastro</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {afiliadosOrdenados.map((afiliado) => (
              <TableRow key={afiliado.id}>
                <TableCell className="font-medium">{afiliado.nome}</TableCell>
                <TableCell>{afiliado.email}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${afiliado.status === 'Ativo' ? 'bg-green-100 text-green-800' : ''}
                    ${afiliado.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${afiliado.status === 'Bloqueado' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {afiliado.status === 'Ativo' && <UserCheck className="h-3 w-3" />}
                    {afiliado.status === 'Pendente' && <Users className="h-3 w-3" />}
                    {afiliado.status === 'Bloqueado' && <Ban className="h-3 w-3" />}
                    {afiliado.status}
                  </div>
                </TableCell>
                <TableCell className="text-right">{afiliado.vendas}</TableCell>
                <TableCell className="text-right">
                  R$ {afiliado.comissoes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-right">{afiliado.taxa}%</TableCell>
                <TableCell>{afiliado.cadastro}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => console.log('Ver afiliado', afiliado.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {afiliado.status === 'Ativo' ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => console.log('Bloquear afiliado', afiliado.id)}
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                    ) : afiliado.status === 'Bloqueado' ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-50"
                        onClick={() => console.log('Ativar afiliado', afiliado.id)}
                      >
                        <UserCheck className="h-4 w-4" />
                      </Button>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {(pagina - 1) * itensPorPagina + 1} a {Math.min(pagina * itensPorPagina, afiliados.length)} de {afiliados.length} resultados
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagina(p => Math.max(1, p - 1))}
            disabled={pagina === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagina(p => p + 1)}
            disabled={pagina * itensPorPagina >= afiliados.length}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
