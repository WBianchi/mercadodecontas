"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
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
  Download,
  Eye,
  Check,
  X,
  Megaphone,
  ArrowUp,
  Calendar,
  Target,
  Clock,
  AreaChart,
  AlertCircle,
} from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Dados de impulsionamentos reais
const impulsionamentos = [
  {
    id: "1",
    anuncio: "Netflix Premium 4K",
    vendedor: "Maria Streaming",
    vendedorId: 45,
    tipo: "DESTAQUE",
    alcance: 15000,
    dias: 7,
    inicio: "2024-03-01T10:00:00Z",
    fim: "2024-03-08T10:00:00Z",
    valor: 149.90,
    status: "ACTIVE",
    paymentMethod: "PIX",
    createdAt: "2024-02-28T15:30:00Z"
  },
  {
    id: "2",
    anuncio: "Disney+ Anual",
    vendedor: "Maria Streaming",
    vendedorId: 45,
    tipo: "PREMIUM",
    alcance: 25000,
    dias: 15,
    inicio: "2024-03-02T08:00:00Z",
    fim: "2024-03-17T08:00:00Z",
    valor: 299.90,
    status: "ACTIVE",
    paymentMethod: "CREDIT_CARD",
    createdAt: "2024-03-01T19:45:00Z"
  },
  {
    id: "3",
    anuncio: "HBO Max",
    vendedor: "Carlos Contas",
    vendedorId: 23,
    tipo: "PESQUISADOS",
    alcance: 10000,
    dias: 5,
    inicio: "2024-02-27T14:00:00Z",
    fim: "2024-03-04T14:00:00Z",
    valor: 99.90,
    status: "COMPLETED",
    paymentMethod: "PIX",
    createdAt: "2024-02-26T11:20:00Z"
  },
  {
    id: "4",
    anuncio: "Prime Video Premium",
    vendedor: "Gabriel Streaming",
    vendedorId: 31,
    tipo: "DESTAQUE",
    alcance: 8000,
    dias: 10,
    inicio: null,
    fim: null,
    valor: 129.90,
    status: "PENDING",
    paymentMethod: "PIX",
    createdAt: "2024-03-02T09:15:00Z"
  },
  {
    id: "5",
    anuncio: "Xbox Game Pass Ultimate",
    vendedor: "Games Shop",
    vendedorId: 18,
    tipo: "PREMIUM",
    alcance: 30000,
    dias: 30,
    inicio: "2024-03-01T00:00:00Z",
    fim: "2024-03-31T00:00:00Z",
    valor: 499.90,
    status: "ACTIVE",
    paymentMethod: "CREDIT_CARD",
    createdAt: "2024-02-29T14:30:00Z"
  },
  {
    id: "6",
    anuncio: "Spotify Premium Anual",
    vendedor: "Music Store",
    vendedorId: 27,
    tipo: "PESQUISADOS",
    alcance: 12000,
    dias: 7,
    inicio: null,
    fim: null,
    valor: 119.90,
    status: "FAILED",
    paymentMethod: "CREDIT_CARD",
    createdAt: "2024-03-02T17:40:00Z"
  },
  {
    id: "7",
    anuncio: "YouTube Premium",
    vendedor: "Video Express",
    vendedorId: 39,
    tipo: "DESTAQUE",
    alcance: 20000,
    dias: 14,
    inicio: "2024-02-25T00:00:00Z",
    fim: "2024-03-10T00:00:00Z",
    valor: 249.90,
    status: "ACTIVE",
    paymentMethod: "PIX",
    createdAt: "2024-02-24T10:10:00Z"
  }
]

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
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [busca, setBusca] = useState("")
  const [pagina, setPagina] = useState(1)
  const itensPorPagina = 10

  // Filtrando impulsionamentos
  const impulsionamentosFiltrados = impulsionamentos.filter(imp => {
    // Filtro de busca
    const matchBusca = busca === "" || 
      imp.anuncio.toLowerCase().includes(busca.toLowerCase()) ||
      imp.vendedor.toLowerCase().includes(busca.toLowerCase());
    
    // Filtro de status
    const matchStatus = filtroStatus === "todos" || filtroStatus === imp.status;
    
    // Filtro de tipo
    const matchTipo = filtroTipo === "todos" || filtroTipo === imp.tipo;
    
    return matchBusca && matchStatus && matchTipo;
  });

  // Paginação
  const totalPaginas = Math.ceil(impulsionamentosFiltrados.length / itensPorPagina);
  const itensExibidos = impulsionamentosFiltrados.slice(
    (pagina - 1) * itensPorPagina, 
    pagina * itensPorPagina
  );

  // Estatísticas
  const totalImpulsionamentos = impulsionamentos.length;
  const impulsionamentosAtivos = impulsionamentos.filter(imp => imp.status === "ACTIVE").length;
  const impulsionamentosPendentes = impulsionamentos.filter(imp => imp.status === "PENDING" || imp.status === "FAILED").length;
  const valorTotal = impulsionamentos
    .filter(imp => imp.status === "ACTIVE" || imp.status === "COMPLETED")
    .reduce((total, imp) => total + imp.valor, 0);
  
  // Formatação
  const formatNumber = (num: number) => new Intl.NumberFormat('pt-BR').format(num);
  const formatCurrency = (num: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    return format(new Date(dateStr), "dd 'de' MMMM", {locale: ptBR});
  };

  return (
    <div className="space-y-6 px-6 py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Impulsionamentos</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      {/* Dashboards/Cards */}
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
              Campanhas Ativas
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
              Faturamento Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(valorTotal)}</div>
              <div className="rounded-full bg-blue-100 p-2">
                <AreaChart className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Aguardando Processamento
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

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por anúncio ou vendedor..."
            className="pl-10"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        <Select value={filtroTipo} onValueChange={setFiltroTipo}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Tipos</SelectItem>
            <SelectItem value="DESTAQUE">Destaque</SelectItem>
            <SelectItem value="PREMIUM">Premium</SelectItem>
            <SelectItem value="PESQUISADOS">Pesquisados</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filtroStatus} onValueChange={setFiltroStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Status</SelectItem>
            <SelectItem value="ACTIVE">Ativos</SelectItem>
            <SelectItem value="PENDING">Aguardando</SelectItem>
            <SelectItem value="COMPLETED">Concluídos</SelectItem>
            <SelectItem value="FAILED">Falhou</SelectItem>
            <SelectItem value="CANCELLED">Cancelados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Anúncio</TableHead>
              <TableHead>Vendedor</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Alcance</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itensExibidos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                  Nenhum impulsionamento encontrado com os filtros selecionados.
                </TableCell>
              </TableRow>
            ) : (
              itensExibidos.map((imp) => (
                <TableRow key={imp.id}>
                  <TableCell className="font-medium">{imp.id}</TableCell>
                  <TableCell>{imp.anuncio}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span>{imp.vendedor}</span>
                      <span className="text-xs text-muted-foreground">#{imp.vendedorId}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {getTipoLabel(imp.tipo)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      {formatNumber(imp.alcance)}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({imp.dias} dias)
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>{formatDate(imp.inicio)}</span>
                      </div>
                      {imp.fim && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <span className="text-xs">até</span>
                          <span className="text-xs">{formatDate(imp.fim)}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(imp.valor)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusColor(imp.status)}`}>
                      {getStatusLabel(imp.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => window.alert(`Ver detalhes do impulsionamento ${imp.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {imp.status === "PENDING" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-green-600"
                          onClick={() => window.alert(`Aprovar impulsionamento ${imp.id}`)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      {imp.status === "ACTIVE" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-600"
                          onClick={() => window.alert(`Suspender impulsionamento ${imp.id}`)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      {totalPaginas > 1 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Mostrando {(pagina - 1) * itensPorPagina + 1} a {Math.min(pagina * itensPorPagina, impulsionamentosFiltrados.length)} de {impulsionamentosFiltrados.length} impulsionamentos
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPagina(p => Math.max(p - 1, 1))}
              disabled={pagina === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPagina(p => Math.min(p + 1, totalPaginas))}
              disabled={pagina === totalPaginas}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
