"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleDollarSign, Ban, CheckCircle2, Download, Search, ChevronLeft, ChevronRight, User, MapPin, ShoppingCart, FileText, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { PedidosTable } from "@/components/admin/pedidos-table"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

// Funções de API
async function fetchPedidos() {
  const response = await fetch("/api/admin/pedidos")
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Não autorizado")
    }
    throw new Error("Falha ao carregar pedidos")
  }
  return response.json()
}

async function updatePedidoStatus(pedidoId: number, status: string) {
  const response = await fetch(`/api/admin/pedidos/${pedidoId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  })
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Não autorizado")
    }
    throw new Error("Falha ao atualizar status")
  }
  return response.json()
}

interface Product {
  id: number
  name: string
  description: string
  price: number
}

interface OrderItem {
  id: number
  productName: string
  quantity: number
  value: number
  createdAt: string
  product?: Product
}

interface Pedido {
  id: number
  paymentMethod: string
  installments?: number
  address: string
  city: string
  neighborhood: string
  clientIp?: string
  cpfCnpj: string
  clientEmail: string
  clientName: string
  clientPhone: string
  orderSummary?: string
  purchaseTime: string
  status: string
  lojistaCommission: number
  adminCommission: number
  adminProfit: number
  lojistaProfit: number
  createdAt: string
  updatedAt: string
  OrderItem: OrderItem[]
  Cliente: {
    id: number
    wpFirstName: string
    wpLastName: string
    wpEmail: string
    username: string
  }
  Lojista: {
    id: number
    username: string
    email: string
  }
  Admin?: {
    id: number
    username: string
    email: string
  }
}

export default function VendasPage() {
  const { data: session, status } = useSession()
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [busca, setBusca] = useState("")
  const [pagina, setPagina] = useState(1)
  const [pedidoSelecionado, setPedidoSelecionado] = useState<Pedido | null>(null)
  const itensPorPagina = 10

  const { data: pedidos = [], isLoading, error } = useQuery<Pedido[]>({
    queryKey: ["pedidos"],
    queryFn: fetchPedidos,
    retry: false,
  })

  const pedidosPagos = pedidos.filter(
    (pedido) => pedido.status === "PAGO" || pedido.status === "CONCLUIDO"
  )

  const pedidosCancelados = pedidos.filter(
    (pedido) => pedido.status === "CANCELADO" || pedido.status === "REEMBOLSADO"
  )

  // Cálculo do lucro total baseado no total de vendas do ano
  const vendaTotal = pedidosPagos.reduce((total, pedido) => {
    // Soma o valor total das vendas, não apenas o lucro admin
    return total + pedido.OrderItem.reduce((sum, item) => sum + item.value, 0)
  }, 0)

  // Cálculo de vendas diárias
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const vendasHoje = pedidosPagos.filter(pedido => {
    const dataPedido = new Date(pedido.purchaseTime)
    dataPedido.setHours(0, 0, 0, 0)
    return dataPedido.getTime() === hoje.getTime()
  }).reduce((total, pedido) => {
    return total + pedido.OrderItem.reduce((sum, item) => sum + item.value, 0)
  }, 0)

  // Cálculo de vendas mensais
  const mesAtual = hoje.getMonth()
  const anoAtual = hoje.getFullYear()
  const vendasMes = pedidosPagos.filter(pedido => {
    const dataPedido = new Date(pedido.purchaseTime)
    return dataPedido.getMonth() === mesAtual && dataPedido.getFullYear() === anoAtual
  }).reduce((total, pedido) => {
    return total + pedido.OrderItem.reduce((sum, item) => sum + item.value, 0)
  }, 0)

  const updateStatusMutation = useMutation({
    mutationFn: ({ pedidoId, status }: { pedidoId: number; status: string }) =>
      updatePedidoStatus(pedidoId, status),
    onSuccess: () => {
      toast.success("Status atualizado com sucesso")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Erro ao atualizar status")
    },
  })

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-lg">Você precisa estar logado para acessar esta página</p>
        <Button onClick={() => window.location.href = "/login"}>
          Fazer Login
        </Button>
      </div>
    )
  }

  // Filtragem
  const pedidosFiltrados = pedidos.filter((pedido: Pedido) => {
    const matchBusca =
      busca === "" ||
      pedido.Cliente.wpFirstName.toLowerCase().includes(busca.toLowerCase()) ||
      pedido.Cliente.wpLastName.toLowerCase().includes(busca.toLowerCase()) ||
      pedido.Cliente.wpEmail.toLowerCase().includes(busca.toLowerCase()) ||
      pedido.clientPhone.toLowerCase().includes(busca.toLowerCase()) ||
      pedido.OrderItem.some((item: OrderItem) =>
        item.productName.toLowerCase().includes(busca.toLowerCase())
      )

    const matchStatus =
      filtroStatus === "todos" || pedido.status === filtroStatus.toUpperCase()

    return matchBusca && matchStatus
  })

  // Paginação
  const totalPaginas = Math.ceil(pedidosFiltrados.length / itensPorPagina)
  const pedidosPaginados = pedidosFiltrados.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  )

  const handleExportar = () => {
    // Implementar exportação para CSV
    toast.info("Funcionalidade de exportação em desenvolvimento")
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-lg text-red-500">
          {error instanceof Error ? error.message : "Erro ao carregar pedidos"}
        </p>
        <Button onClick={() => window.location.reload()}>
          Tentar Novamente
        </Button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Vendas</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <Skeleton className="h-4 w-[100px]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[120px]" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="rounded-md border">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Vendas</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold text-blue-600">
              Pedidos Pagos
            </CardTitle>
            <div className="rounded-full bg-blue-100 p-3">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{pedidosPagos.length}</div>
            <p className="text-sm text-muted-foreground">pedidos concluídos</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold text-blue-600">
              Pedidos Cancelados
            </CardTitle>
            <div className="rounded-full bg-blue-100 p-3">
              <Ban className="h-6 w-6 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{pedidosCancelados.length}</div>
            <p className="text-sm text-muted-foreground">pedidos cancelados</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold text-blue-600">
              Venda Diária
            </CardTitle>
            <div className="rounded-full bg-blue-100 p-3">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(vendasHoje)}
            </div>
            <p className="text-sm text-muted-foreground">vendas de hoje</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold text-blue-600">
              Venda Mensal
            </CardTitle>
            <div className="rounded-full bg-blue-100 p-3">
              <CircleDollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(vendasMes)}
            </div>
            <p className="text-sm text-muted-foreground">vendas do mês atual</p>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-blue-600">Lista de Pedidos</h3>
          <Button onClick={handleExportar} className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente, email ou produto..."
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
              <SelectItem value="aguardando">Aguardando</SelectItem>
              <SelectItem value="pago">Pago</SelectItem>
              <SelectItem value="concluido">Concluído</SelectItem>
              <SelectItem value="reembolsado">Reembolsado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-white/5">
              <TableHead className="p-4 font-semibold">Pedido</TableHead>
              <TableHead className="p-4 font-semibold">Data</TableHead>
              <TableHead className="p-4 font-semibold">Cliente</TableHead>
              <TableHead className="p-4 font-semibold">Produtos</TableHead>
              <TableHead className="p-4 font-semibold">Valor</TableHead>
              <TableHead className="p-4 font-semibold">Status</TableHead>
              <TableHead className="p-4 font-semibold">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pedidosPaginados.slice(0, 10).map((pedido) => (
              <TableRow key={pedido.id} className="hover:bg-white/10">
                <TableCell className="p-4">#{pedido.id}</TableCell>
                <TableCell className="p-4">{formatDate(pedido.purchaseTime)}</TableCell>
                <TableCell className="p-4">
                  <div className="text-sm">
                    <div className="font-medium">{pedido.Cliente.wpFirstName} {pedido.Cliente.wpLastName}</div>
                    <div className="text-muted-foreground">{pedido.Cliente.wpEmail}</div>
                    <div className="text-muted-foreground">{pedido.clientPhone}</div>
                  </div>
                </TableCell>
                <TableCell className="p-4">
                  {pedido.OrderItem.map((item) => (
                    <div key={item.id} className="text-sm">
                      <span className="font-medium">{item.quantity}x</span> {item.productName}
                      {item.product && (
                        <span className="text-muted-foreground"> - {item.product.name}</span>
                      )}
                    </div>
                  ))}
                </TableCell>
                <TableCell className="p-4 font-medium">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(
                    pedido.OrderItem.reduce(
                      (total, item) => total + item.quantity * item.value,
                      0
                    )
                  )}
                </TableCell>
                <TableCell className="p-4">
                  <Badge
                    variant={
                      pedido.status === "AGUARDANDO"
                        ? "secondary"
                        : pedido.status === "PAGO"
                        ? "default"
                        : pedido.status === "CONCLUIDO"
                        ? "success"
                        : "destructive"
                    }
                    className="font-medium"
                  >
                    {pedido.status === "AGUARDANDO"
                      ? "Aguardando"
                      : pedido.status === "PAGO"
                      ? "Pago"
                      : pedido.status === "CONCLUIDO"
                      ? "Concluído"
                      : pedido.status === "REEMBOLSADO"
                      ? "Reembolsado"
                      : "Cancelado"}
                  </Badge>
                </TableCell>
                <TableCell className="p-4">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPedidoSelecionado(pedido)}
                      className="bg-white/5 border-white/20 hover:bg-white/10"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4 border-t flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {(pagina - 1) * itensPorPagina + 1} a{" "}
            {Math.min(pagina * itensPorPagina, pedidosFiltrados.length)} de{" "}
            {pedidosFiltrados.length} resultados
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
              disabled={pagina === 1}
              className="bg-white/5 border-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagina((p) => p + 1)}
              disabled={pagina * itensPorPagina >= pedidosFiltrados.length}
              className="bg-white/5 border-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={!!pedidoSelecionado} onOpenChange={() => setPedidoSelecionado(null)}>
        <DialogContent className="max-w-4xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-600">
              Pedido #{pedidoSelecionado?.id}
            </DialogTitle>
            <DialogDescription>
              Detalhes completos do pedido
            </DialogDescription>
          </DialogHeader>

          {pedidoSelecionado && (
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-gray-50 border-gray-100">
                  <CardHeader>
                    <CardTitle className="text-blue-600">
                      <User className="h-5 w-5 inline-block mr-2" />
                      Informações do Cliente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <span className="font-medium">Nome:</span>{" "}
                      {pedidoSelecionado.Cliente.wpFirstName} {pedidoSelecionado.Cliente.wpLastName}
                    </div>
   <div>
                      <span className="font-medium">Telefone:</span>{" "}
                      {pedidoSelecionado.clientPhone}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span>{" "}
                      {pedidoSelecionado.Cliente.wpEmail}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 border-gray-100">
                  <CardHeader>
                    <CardTitle className="text-blue-600">
                      <MapPin className="h-5 w-5 inline-block mr-2" />
                      Endereço de Entrega
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>{pedidoSelecionado.address}</div>
                    <div>{pedidoSelecionado.city}</div>
                    <div>{pedidoSelecionado.neighborhood}</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-50 border-gray-100">
                <CardHeader>
                  <CardTitle className="text-blue-600">
                    <ShoppingCart className="h-5 w-5 inline-block mr-2" />
                    Produtos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pedidoSelecionado.OrderItem.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 rounded-lg bg-white border border-gray-100">
                        <div>
                          <span className="font-medium">{item.quantity}x</span>{" "}
                          {item.productName}
                          {item.product && (
                            <span className="text-muted-foreground"> - {item.product.name}</span>
                          )}
                        </div>
                        <div className="font-medium">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(item.value * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-gray-50 border-gray-100">
                  <CardHeader>
                    <CardTitle className="text-blue-600">
                      <FileText className="h-5 w-5 inline-block mr-2" />
                      Informações do Pedido
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <span className="font-medium">Status:</span>{" "}
                      <Badge
                        variant={
                          pedidoSelecionado.status === "AGUARDANDO"
                            ? "secondary"
                            : pedidoSelecionado.status === "PAGO"
                            ? "default"
                            : pedidoSelecionado.status === "CONCLUIDO"
                            ? "success"
                            : "destructive"
                        }
                      >
                        {pedidoSelecionado.status === "AGUARDANDO"
                          ? "Aguardando"
                          : pedidoSelecionado.status === "PAGO"
                          ? "Pago"
                          : pedidoSelecionado.status === "CONCLUIDO"
                          ? "Concluído"
                          : pedidoSelecionado.status === "REEMBOLSADO"
                          ? "Reembolsado"
                          : "Cancelado"}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Data:</span>{" "}
                      {formatDate(pedidoSelecionado.purchaseTime)}
                    </div>
                    <div>
                      <span className="font-medium">Método de Pagamento:</span>{" "}
                      {pedidoSelecionado.paymentMethod}
                    </div>
                    {pedidoSelecionado.installments && (
                      <div>
                        <span className="font-medium">Parcelas:</span>{" "}
                        {pedidoSelecionado.installments}x
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 border-gray-100">
                  <CardHeader>
                    <CardTitle className="text-blue-600">
                      <CircleDollarSign className="h-5 w-5 inline-block mr-2" />
                      Informações Financeiras
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <span className="font-medium">Valor Total:</span>{" "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(
                        pedidoSelecionado.OrderItem.reduce(
                          (total, item) => total + item.quantity * item.value,
                          0
                        )
                      )}
                    </div>
                    <div>
                      <span className="font-medium">Comissão do Lojista:</span>{" "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(pedidoSelecionado.lojistaCommission)}
                    </div>
                    <div>
                      <span className="font-medium">Comissão do Admin:</span>{" "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(pedidoSelecionado.adminCommission)}
                    </div>
                    <div>
                      <span className="font-medium">Lucro do Lojista:</span>{" "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(pedidoSelecionado.lojistaProfit)}
                    </div>
                    <div>
                      <span className="font-medium">Lucro do Admin:</span>{" "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(pedidoSelecionado.adminProfit)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
