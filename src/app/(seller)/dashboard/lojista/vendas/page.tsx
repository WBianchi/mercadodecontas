"use client"

import { useQuery, useMutation } from "@tanstack/react-query"
import { formatDate, formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CircleDollarSign,
  Ban,
  CheckCircle2,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  MapPin,
  ShoppingCart,
  FileText,
  Eye,
  MoreVertical,
  Copy,
  Mail,
  Clock,
  XCircle,
  AlertCircle,
  Pencil,
  Bot,
  Filter
} from "lucide-react"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { toast } from "sonner"

// Funções de API
async function fetchPedidos() {
  const response = await fetch("/api/lojista/pedidos")
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Não autorizado")
    }
    throw new Error("Falha ao carregar pedidos")
  }
  return response.json()
}

async function updatePedidoStatus(pedidoId: number, status: string) {
  const response = await fetch(`/api/lojista/pedidos/${pedidoId}/status`, {
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
    queryKey: ["pedidos-lojista"],
    queryFn: fetchPedidos,
    retry: false,
  })

  const pedidosPagos = pedidos.filter(
    (pedido) => pedido.status === "PAGO" || pedido.status === "CONCLUIDO"
  )

  const pedidosCancelados = pedidos.filter(
    (pedido) => pedido.status === "CANCELADO" || pedido.status === "REEMBOLSADO"
  )

  const lucroTotal = pedidosPagos.reduce((total, pedido) => {
    return total + pedido.lojistaProfit
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

  const statusMap = {
    concluido: { label: "Concluído", color: "bg-green-500" },
    pendente: { label: "Pendente", color: "bg-yellow-500" },
    reembolsado: { label: "Reembolsado", color: "bg-red-500" },
    disputa: { label: "Em Disputa", color: "bg-orange-500" },
  }

  const statusIcon = {
    concluido: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    pendente: <Clock className="h-4 w-4 text-yellow-500" />,
    reembolsado: <XCircle className="h-4 w-4 text-red-500" />,
    disputa: <AlertCircle className="h-4 w-4 text-orange-500" />,
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Vendas</h1>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Lucro Total
              </CardTitle>
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(lucroTotal)}</div>
              <p className="text-xs text-muted-foreground">
                Total de {pedidosPagos.length} vendas concluídas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Vendas Concluídas
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pedidosPagos.length}</div>
              <p className="text-xs text-muted-foreground">
                Pedidos pagos ou entregues
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cancelamentos
              </CardTitle>
              <Ban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pedidosCancelados.length}</div>
              <p className="text-xs text-muted-foreground">
                Pedidos cancelados ou reembolsados
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID, produto ou cliente..."
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <Skeleton className="h-4 w-12" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-12" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-12" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-12" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-12" />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Vendas</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lucro Total
            </CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(lucroTotal)}</div>
            <p className="text-xs text-muted-foreground">
              Total de {pedidosPagos.length} vendas concluídas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Vendas Concluídas
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pedidosPagos.length}</div>
            <p className="text-xs text-muted-foreground">
              Pedidos pagos ou entregues
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Cancelamentos
            </CardTitle>
            <Ban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pedidosCancelados.length}</div>
            <p className="text-xs text-muted-foreground">
              Pedidos cancelados ou reembolsados
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por produto ou cliente..."
              className="pl-9"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="AGUARDANDO">Em processamento</SelectItem>
              <SelectItem value="PAGO">Entregue</SelectItem>
              <SelectItem value="CONCLUIDO">Concluído</SelectItem>
              <SelectItem value="REEMBOLSADO">Reembolsado</SelectItem>
              <SelectItem value="CANCELADO">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidosPaginados.map((pedido) => (
                <TableRow key={pedido.id}>
                  <TableCell className="font-medium">#{pedido.id}</TableCell>
                  <TableCell>
                    {pedido.OrderItem.map(item => item.productName).join(", ")}
                  </TableCell>
                  <TableCell>{pedido.Cliente.wpFirstName} {pedido.Cliente.wpLastName}</TableCell>
                  <TableCell>{formatPrice(pedido.OrderItem.reduce((total, item) => total + item.value, 0))}</TableCell>
                  <TableCell>{formatDate(pedido.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {statusIcon[pedido.status as keyof typeof statusIcon]}
                      <Badge
                        className={`${
                          statusMap[pedido.status as keyof typeof statusMap].color
                        } text-white`}
                      >
                        {statusMap[pedido.status as keyof typeof statusMap].label}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="flex items-center"
                          onClick={() => setPedidoSelecionado(pedido)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="flex items-center"
                          onClick={() => navigator.clipboard.writeText(String(pedido.id))}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copiar ID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center"
                          onClick={() => window.location.href = `mailto:${pedido.Cliente.wpEmail}`}
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar Email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Mostrando {pedidosPaginados.length} de {pedidosFiltrados.length} pedidos
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagina(pagina - 1)}
              disabled={pagina === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagina(pagina + 1)}
              disabled={pagina === totalPaginas}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal de Detalhes do Pedido */}
      <Dialog open={!!pedidoSelecionado} onOpenChange={() => setPedidoSelecionado(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido #{pedidoSelecionado?.id}</DialogTitle>
            <DialogDescription>
              Informações completas do pedido
            </DialogDescription>
          </DialogHeader>

          {pedidoSelecionado && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Dados do Cliente
                  </h3>
                  <div className="text-sm text-muted-foreground mt-2 space-y-1">
                    <p>Nome: {pedidoSelecionado.Cliente.wpFirstName} {pedidoSelecionado.Cliente.wpLastName}</p>
                    <p>Email: {pedidoSelecionado.Cliente.wpEmail}</p>
                    <p>CPF/CNPJ: {pedidoSelecionado.cpfCnpj}</p>
                    <p>Telefone: {pedidoSelecionado.clientPhone}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Endereço de Entrega
                  </h3>
                  <div className="text-sm text-muted-foreground mt-2 space-y-1">
                    <p>{pedidoSelecionado.address}</p>
                    <p>{pedidoSelecionado.neighborhood}</p>
                    <p>{pedidoSelecionado.city}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <ShoppingCart className="h-4 w-4" />
                  Itens do Pedido
                </h3>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Valor Unitário</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pedidoSelecionado.OrderItem.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{formatPrice(item.value / item.quantity)}</TableCell>
                          <TableCell>{formatPrice(item.value)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div>
                <h3 className="font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Informações do Pagamento
                </h3>
                <div className="text-sm text-muted-foreground mt-2 space-y-1">
                  <p>Método: {pedidoSelecionado.paymentMethod}</p>
                  {pedidoSelecionado.installments && (
                    <p>Parcelas: {pedidoSelecionado.installments}x</p>
                  )}
                  <p>Comissão: {formatPrice(pedidoSelecionado.lojistaCommission)}</p>
                  <p>Lucro: {formatPrice(pedidoSelecionado.lojistaProfit)}</p>
                  <p>Data: {formatDate(pedidoSelecionado.createdAt)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
