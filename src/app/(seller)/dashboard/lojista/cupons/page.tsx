"use client"

import { Card } from "@/components/ui/card"
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { 
  Search,
  Filter,
  MoreVertical,
  PlusCircle,
  Eye,
  Pencil,
  Bot,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Ticket,
  Copy,
  Percent,
  Calendar,
} from "lucide-react"

export default function CuponsPage() {
  const cupons = [
    {
      id: "CPN001",
      codigo: "PROMO20",
      desconto: "20%",
      usos: 45,
      limite: 100,
      validade: "28/02/2024",
      status: "ativo",
      tipo: "percentual"
    },
    {
      id: "CPN002",
      codigo: "BEMVINDO",
      desconto: "R$ 10,00",
      usos: 89,
      limite: 100,
      validade: "01/03/2024",
      status: "ativo",
      tipo: "fixo"
    },
    {
      id: "CPN003",
      codigo: "BLACKFRIDAY",
      desconto: "30%",
      usos: 100,
      limite: 100,
      validade: "25/11/2024",
      status: "esgotado",
      tipo: "percentual"
    },
    {
      id: "CPN004",
      codigo: "VERAO2024",
      desconto: "15%",
      usos: 0,
      limite: 50,
      validade: "15/02/2024",
      status: "expirado",
      tipo: "percentual"
    },
  ]

  const statusMap = {
    ativo: { label: "Ativo", color: "bg-green-500" },
    esgotado: { label: "Esgotado", color: "bg-orange-500" },
    expirado: { label: "Expirado", color: "bg-red-500" },
  }

  const statusIcon = {
    ativo: <CheckCircle className="h-4 w-4 text-green-500" />,
    esgotado: <XCircle className="h-4 w-4 text-orange-500" />,
    expirado: <Clock className="h-4 w-4 text-red-500" />,
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cupons</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Cupom
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-full">
              <Ticket className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de Cupons</p>
              <p className="text-2xl font-bold">4</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-full">
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Cupons Ativos</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-100 rounded-full">
              <Percent className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Desconto Médio</p>
              <p className="text-2xl font-bold">18,75%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-full">
              <Calendar className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Próximo a Expirar</p>
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por código ou ID..."
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
                <TableHead>Código</TableHead>
                <TableHead>Desconto</TableHead>
                <TableHead>Usos</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cupons.map((cupom) => (
                <TableRow key={cupom.id}>
                  <TableCell className="font-medium">{cupom.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                        {cupom.codigo}
                      </code>
                      <Badge className="bg-blue-500 text-white">
                        {cupom.tipo === "percentual" ? "%" : "R$"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{cupom.desconto}</TableCell>
                  <TableCell>{cupom.usos}/{cupom.limite}</TableCell>
                  <TableCell>{cupom.validade}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {statusIcon[cupom.status as keyof typeof statusIcon]}
                      <Badge
                        className={`${
                          statusMap[cupom.status as keyof typeof statusMap].color
                        } text-white`}
                      >
                        {statusMap[cupom.status as keyof typeof statusMap].label}
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
                          onClick={() => {}}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center"
                          onClick={() => {}}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center"
                          onClick={() => navigator.clipboard.writeText(cupom.codigo)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copiar Código
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center"
                          onClick={() => {}}
                        >
                          <Bot className="mr-2 h-4 w-4" />
                          Ajuda da IA
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="flex items-center text-red-600"
                          onClick={() => {}}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
