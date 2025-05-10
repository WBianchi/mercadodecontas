"use client"

import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { 
  Search,
  Plus,
  Eye,
  Pencil,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Megaphone,
  ArrowUp,
  AreaChart,
  Target,
  Clock,
  Star,
  Calendar,
  AlertCircle,
} from "lucide-react"
import { ModalImpulsionar } from "@/components/seller/modal-impulsionar"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { motion } from "framer-motion"

interface Impulsionamento {
  id: number
  tipo: "DESTAQUE" | "PREMIUM" | "PESQUISADOS"
  alcance: number
  dias: number
  valorTotal: number
  dataInicio: string | null
  dataFim: string | null
  status: "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELLED" | "FAILED"
  paymentMethod: "PIX" | "CREDIT_CARD"
  createdAt: string
  produto: {
    id: number
    name: string
    images: string[]
    price: number
  }
}

async function fetchImpulsionamentos() {
  const response = await fetch("/api/lojista/impulsionamentos")
  if (!response.ok) {
    throw new Error("Falha ao carregar impulsionamentos")
  }
  return response.json()
}

function getTipoLabel(tipo: string) {
  switch (tipo) {
    case "DESTAQUE":
      return "Destaque"
    case "PREMIUM":
      return "Premium"
    case "PESQUISADOS":
      return "Pesquisados"
    default:
      return tipo
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "PENDING":
      return "Aguardando Pagamento"
    case "ACTIVE":
      return "Ativo"
    case "COMPLETED":
      return "Concluído"
    case "CANCELLED":
      return "Cancelado"
    case "FAILED":
      return "Falhou"
    default:
      return status
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "ACTIVE":
      return "bg-green-100 text-green-800 border-green-200"
    case "COMPLETED":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "CANCELLED":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "FAILED":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ImpulsionamentosPage() {
  const [pagina, setPagina] = useState(1)
  const [busca, setBusca] = useState("")
  const itensPorPagina = 6
  const queryClient = useQueryClient()

  const { data: impulsionamentos = [], isLoading, refetch } = useQuery<Impulsionamento[]>({
    queryKey: ["impulsionamentos-lojista"],
    queryFn: fetchImpulsionamentos,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  })

  // Mock data for development
  const mockImpulsionamentos: Impulsionamento[] = [
    {
      id: 1,
      tipo: "DESTAQUE",
      alcance: 5000,
      dias: 7,
      valorTotal: 149.90,
      dataInicio: new Date().toISOString(),
      dataFim: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "ACTIVE",
      paymentMethod: "PIX",
      createdAt: new Date().toISOString(),
      produto: {
        id: 1,
        name: "Conta Netflix Premium 4K",
        images: ["/placeholder-product.jpg"],
        price: 29.90
      }
    },
    {
      id: 2,
      tipo: "PREMIUM",
      alcance: 10000,
      dias: 15,
      valorTotal: 299.90,
      dataInicio: new Date().toISOString(),
      dataFim: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      status: "ACTIVE",
      paymentMethod: "CREDIT_CARD",
      createdAt: new Date().toISOString(),
      produto: {
        id: 2,
        name: "Spotify Premium Anual",
        images: ["/placeholder-product.jpg"],
        price: 59.90
      }
    },
    {
      id: 3,
      tipo: "PESQUISADOS",
      alcance: 3000,
      dias: 5,
      valorTotal: 99.90,
      dataInicio: null,
      dataFim: null,
      status: "PENDING",
      paymentMethod: "PIX",
      createdAt: new Date().toISOString(),
      produto: {
        id: 3,
        name: "Disney+ Premium",
        images: ["/placeholder-product.jpg"],
        price: 19.90
      }
    },
    {
      id: 4,
      tipo: "DESTAQUE",
      alcance: 2000,
      dias: 3,
      valorTotal: 79.90,
      dataInicio: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      dataFim: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "COMPLETED",
      paymentMethod: "CREDIT_CARD",
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      produto: {
        id: 4,
        name: "Game Pass Ultimate",
        images: ["/placeholder-product.jpg"],
        price: 44.90
      }
    },
    {
      id: 5,
      tipo: "PREMIUM",
      alcance: 8000,
      dias: 10,
      valorTotal: 199.90,
      dataInicio: null,
      dataFim: null,
      status: "FAILED",
      paymentMethod: "CREDIT_CARD",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      produto: {
        id: 5,
        name: "Amazon Prime Video",
        images: ["/placeholder-product.jpg"],
        price: 14.90
      }
    }
  ]

  // Use mock data for now
  const allImpulsionamentos = mockImpulsionamentos

  // Filtra impulsionamentos pela busca
  const impulsionamentosFiltrados = allImpulsionamentos.filter(imp =>
    imp.produto.name.toLowerCase().includes(busca.toLowerCase()) ||
    getTipoLabel(imp.tipo).toLowerCase().includes(busca.toLowerCase())
  )

  // Calcula total de páginas
  const totalPaginas = Math.ceil(impulsionamentosFiltrados.length / itensPorPagina)

  // Pega apenas os impulsionamentos da página atual
  const impulsionamentosPaginados = impulsionamentosFiltrados.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  )

  // Calcular estatísticas
  const totalImpulsionamentos = allImpulsionamentos.length
  const impulsionamentosAtivos = allImpulsionamentos.filter(imp => imp.status === "ACTIVE").length
  const impulsionamentosPendentes = allImpulsionamentos.filter(imp => imp.status === "PENDING").length
  const alcanceTotal = allImpulsionamentos.reduce((total, imp) => total + imp.alcance, 0)

  // Formatar para exibir números
  const formatNumber = (num: number) => new Intl.NumberFormat('pt-BR').format(num)
  const formatCurrency = (num: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num)

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Impulsionamentos</h1>
        <ModalImpulsionar>
          <Button className="ml-auto">
            <Megaphone className="mr-2 h-4 w-4" />
            Criar Impulsionamento
          </Button>
        </ModalImpulsionar>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Impulsionamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{totalImpulsionamentos}</div>
              <div className="rounded-full bg-primary/10 p-2">
                <Megaphone className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Impulsionamentos Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{impulsionamentosAtivos}</div>
              <div className="rounded-full bg-green-100 p-2">
                <ArrowUp className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Alcance Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatNumber(alcanceTotal)}</div>
              <div className="rounded-full bg-blue-100 p-2">
                <AreaChart className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Aguardando Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{impulsionamentosPendentes}</div>
              <div className="rounded-full bg-yellow-100 p-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar impulsionamentos..."
              className="pl-8 w-full"
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Alcance</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    Carregando impulsionamentos...
                  </TableCell>
                </TableRow>
              ) : impulsionamentosPaginados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    Nenhum impulsionamento encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                impulsionamentosPaginados.map(impulsionamento => (
                  <TableRow key={impulsionamento.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-md">
                          <Image
                            src={impulsionamento.produto.images[0] || "/placeholder-product.jpg"}
                            alt={impulsionamento.produto.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="max-w-[180px] truncate">
                          {impulsionamento.produto.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {getTipoLabel(impulsionamento.tipo)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        {formatNumber(impulsionamento.alcance)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {impulsionamento.dias} dias
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatCurrency(impulsionamento.valorTotal)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getStatusColor(impulsionamento.status)}`}>
                        {getStatusLabel(impulsionamento.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {format(new Date(impulsionamento.createdAt), "dd/MM/yyyy", {locale: ptBR})}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem 
                            onClick={() => toast.info(`Visualizando detalhes do impulsionamento ${impulsionamento.id}`)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          {impulsionamento.status === "PENDING" && (
                            <DropdownMenuItem 
                              onClick={() => toast.info(`Completar pagamento do impulsionamento ${impulsionamento.id}`)}
                            >
                              <ArrowUp className="mr-2 h-4 w-4" />
                              Completar pagamento
                            </DropdownMenuItem>
                          )}
                          {impulsionamento.status === "ACTIVE" && (
                            <DropdownMenuItem 
                              onClick={() => toast.info(`Cancelar impulsionamento ${impulsionamento.id}`)}
                              className="text-red-600"
                            >
                              <AlertCircle className="mr-2 h-4 w-4" />
                              Cancelar
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Paginação */}
        {totalPaginas > 1 && (
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagina(p => Math.max(p - 1, 1))}
              disabled={pagina === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagina(p => Math.min(p + 1, totalPaginas))}
              disabled={pagina === totalPaginas}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
