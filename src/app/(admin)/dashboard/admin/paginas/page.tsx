"use client"

import { useState } from "react"
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
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Globe,
  Lock,
} from "lucide-react"

// Dados de exemplo
const paginas = [
  {
    id: "1",
    titulo: "Página Inicial",
    slug: "/",
    autor: "Admin",
    status: "Publicada",
    visibilidade: "Pública",
    atualizadaEm: "17/02/2024"
  },
  {
    id: "2",
    titulo: "Sobre Nós",
    slug: "/sobre",
    autor: "Admin",
    status: "Publicada",
    visibilidade: "Pública",
    atualizadaEm: "16/02/2024"
  },
  {
    id: "3",
    titulo: "Termos de Uso",
    slug: "/termos",
    autor: "Admin",
    status: "Rascunho",
    visibilidade: "Privada",
    atualizadaEm: "15/02/2024"
  },
  {
    id: "4",
    titulo: "Política de Privacidade",
    slug: "/privacidade",
    autor: "Admin",
    status: "Publicada",
    visibilidade: "Pública",
    atualizadaEm: "14/02/2024"
  },
  {
    id: "5",
    titulo: "FAQ",
    slug: "/faq",
    autor: "Admin",
    status: "Rascunho",
    visibilidade: "Privada",
    atualizadaEm: "13/02/2024"
  }
]

export default function PaginasPage() {
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [filtroVisibilidade, setFiltroVisibilidade] = useState("todos")
  const [busca, setBusca] = useState("")
  const [pagina, setPagina] = useState(1)
  const itensPorPagina = 10

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Páginas</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Página
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar páginas..."
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
            <SelectItem value="publicada">Publicada</SelectItem>
            <SelectItem value="rascunho">Rascunho</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filtroVisibilidade} onValueChange={setFiltroVisibilidade}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Visibilidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas</SelectItem>
            <SelectItem value="publica">Pública</SelectItem>
            <SelectItem value="privada">Privada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Título</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Visibilidade</TableHead>
              <TableHead>Atualizada em</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginas.map((pagina) => (
              <TableRow key={pagina.id}>
                <TableCell className="font-medium">{pagina.titulo}</TableCell>
                <TableCell className="font-mono text-sm">{pagina.slug}</TableCell>
                <TableCell>{pagina.autor}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${pagina.status === 'Publicada' ? 'bg-green-100 text-green-800' : ''}
                    ${pagina.status === 'Rascunho' ? 'bg-yellow-100 text-yellow-800' : ''}
                  `}>
                    {pagina.status}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    {pagina.visibilidade === 'Pública' ? (
                      <>
                        <Globe className="h-3 w-3" />
                        Pública
                      </>
                    ) : (
                      <>
                        <Lock className="h-3 w-3" />
                        Privada
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>{pagina.atualizadaEm}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => console.log('Ver página', pagina.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => console.log('Editar página', pagina.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => console.log('Excluir página', pagina.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {(pagina - 1) * itensPorPagina + 1} a {Math.min(pagina * itensPorPagina, paginas.length)} de {paginas.length} resultados
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
            disabled={pagina * itensPorPagina >= paginas.length}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
