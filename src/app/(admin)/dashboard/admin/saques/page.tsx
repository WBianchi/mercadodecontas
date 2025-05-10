"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Search,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowUpDown,
  Eye,
  Ban,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Dados de exemplo - Resumo
const resumo = {
  totalSaques: 156790.50,
  saquesAprovados: 145670.80,
  saquesPendentes: 11119.70,
  saquesRecusados: 2450.00,
  quantidadePendente: 8,
  quantidadeHoje: 23
}

// Dados de exemplo - Saques
const saques = [
  {
    id: "1",
    lojista: "Game Shop Brasil",
    valor: 2890.50,
    status: "Aprovado",
    data: "17/02/2024",
    conta: "Banco do Brasil",
    pix: "12.345.678/0001-90"
  },
  {
    id: "2",
    lojista: "Digital Store",
    valor: 5670.30,
    status: "Pendente",
    data: "17/02/2024",
    conta: "Nubank",
    pix: "98.765.432/0001-10"
  },
  {
    id: "3",
    lojista: "Premium Games",
    valor: 1450.00,
    status: "Recusado",
    data: "16/02/2024",
    conta: "Itaú",
    pix: "11.222.333/0001-44",
    motivoRecusa: "Dados bancários inválidos"
  },
  {
    id: "4",
    lojista: "Mega Contas",
    valor: 3560.90,
    status: "Aprovado",
    data: "16/02/2024",
    conta: "Bradesco",
    pix: "44.555.666/0001-77"
  }
]

export default function SaquesPage() {
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [pagina, setPagina] = useState(1)
  const itensPorPagina = 10

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Saques</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total em Saques</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {resumo.totalSaques.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              {resumo.quantidadeHoje} saques hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saques Aprovados</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {resumo.saquesAprovados.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Total aprovado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saques Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              R$ {resumo.saquesPendentes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              {resumo.quantidadePendente} aguardando aprovação
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saques Recusados</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {resumo.saquesRecusados.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Total recusado
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar saques..."
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
            <SelectItem value="aprovado">Aprovado</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="recusado">Recusado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Lojista</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Conta</TableHead>
              <TableHead>PIX</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {saques.map((saque) => (
              <TableRow key={saque.id}>
                <TableCell className="font-medium">{saque.lojista}</TableCell>
                <TableCell className="text-right">
                  R$ {saque.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${saque.status === 'Aprovado' ? 'bg-green-100 text-green-800' : ''}
                    ${saque.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${saque.status === 'Recusado' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {saque.status === 'Aprovado' && <CheckCircle2 className="h-3 w-3" />}
                    {saque.status === 'Pendente' && <Clock className="h-3 w-3" />}
                    {saque.status === 'Recusado' && <XCircle className="h-3 w-3" />}
                    {saque.status}
                  </div>
                </TableCell>
                <TableCell>{saque.data}</TableCell>
                <TableCell>{saque.conta}</TableCell>
                <TableCell>{saque.pix}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => console.log('Ver saque', saque.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {saque.status === 'Pendente' && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-50"
                          onClick={() => console.log('Aprovar saque', saque.id)}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => console.log('Recusar saque', saque.id)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {(pagina - 1) * itensPorPagina + 1} a {Math.min(pagina * itensPorPagina, saques.length)} de {saques.length} resultados
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
            disabled={pagina * itensPorPagina >= saques.length}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
