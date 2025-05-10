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
  Copy,
  Trash2,
  Settings2,
  Package,
  PackageCheck,
  PackageX
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { DeleteConfirmDialog } from "@/components/modals/delete-confirm-dialog"
import { toast } from "sonner"

interface Product {
  id: number
  name: string
  description: string
  shortDescription: string
  price: number
  discountPrice?: number
  pixPrice?: number
  productPhoto: string
  sku: string
  inStock: boolean
  stockQuantity?: number
  Category: {
    name: string
  }[]
  seoScore: number
}

async function fetchProdutos() {
  const response = await fetch("/api/lojista/produtos")
  if (!response.ok) {
    throw new Error("Falha ao carregar produtos")
  }
  return response.json()
}

export default function AnunciosPage() {
  const [pagina, setPagina] = useState(1)
  const [busca, setBusca] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [produtoParaExcluir, setProdutoParaExcluir] = useState<Product | null>(null)
  const itensPorPagina = 7
  const queryClient = useQueryClient()

  const { data: produtos = [], isLoading, refetch } = useQuery<Product[]>({
    queryKey: ["produtos-lojista"],
    queryFn: fetchProdutos,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  })

  // Filtra produtos pela busca
  const produtosFiltrados = produtos.filter(produto =>
    produto.name.toLowerCase().includes(busca.toLowerCase()) ||
    produto.sku.toLowerCase().includes(busca.toLowerCase())
  )

  // Calcula total de páginas
  const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina)

  // Pega apenas os produtos da página atual
  const produtosPaginados = produtosFiltrados.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  )

  // Calcular estatísticas
  const totalProdutos = produtos.length
  const emEstoque = produtos.filter(p => p.inStock).length
  const foraEstoque = totalProdutos - emEstoque

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "Category",
      header: "Categoria",
      cell: ({ row }) => {
        const categories = row.getValue("Category") as { name: string }[]
        return (
          <div className="flex flex-wrap gap-1">
            {categories.map((cat, i) => (
              <Badge 
                key={i} 
                variant="secondary"
                className="bg-[#097bff] text-white hover:bg-[#097bff]/90"
              >
                {cat.name}
              </Badge>
            ))}
          </div>
        )
      },
    },
    {
      accessorKey: "price",
      header: "Preço",
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"))
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price)
        return formatted
      },
    },
    {
      accessorKey: "seoScore",
      header: "SEO",
      cell: ({ row }) => {
        const score = row.getValue("seoScore") as number
        const getBorderColor = (score: number) => {
          if (score >= 80) return "border-green-500"
          if (score >= 60) return "border-yellow-500"
          return "border-red-500"
        }
        
        return (
          <Badge 
            variant="outline"
            className={`border-2 ${getBorderColor(score)}`}
          >
            {score}%
          </Badge>
        )
      },
    },
    {
      accessorKey: "inStock",
      header: "Status",
      cell: ({ row }) => {
        const inStock = row.getValue("inStock")
        return (
          <Badge variant={inStock ? "success" : "destructive"}>
            {inStock ? "Em estoque" : "Sem estoque"}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const produto = row.original
        return (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigator.clipboard.writeText(produto.id.toString())}
              className="h-8 w-8"
              title="Copiar ID"
            >
              <Copy className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="Editar produto"
            >
              <Pencil className="h-4 w-4 text-blue-500" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="Excluir produto"
              onClick={() => handleExcluir(produto)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        )
      },
    },
  ]

  const excluirProduto = async (produto: Product) => {
    try {
      const response = await fetch(`/api/produtos/${produto.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erro ao excluir produto")
      }

      // Atualizar cache do TanStack Query
      queryClient.setQueryData(["produtos-lojista"], (old: Product[] | undefined) => 
        old?.filter(p => p.id !== produto.id) || []
      )

      toast.success("Produto excluído com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao excluir produto. Tente novamente.")
    }
  }

  const handleExcluir = (produto: Product) => {
    setProdutoParaExcluir(produto)
    setShowDeleteDialog(true)
  }

  const handleConfirmarExclusao = async () => {
    if (produtoParaExcluir) {
      await excluirProduto(produtoParaExcluir)
      setShowDeleteDialog(false)
      setProdutoParaExcluir(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProdutos}</div>
            <p className="text-xs text-muted-foreground">
              Produtos cadastrados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Estoque</CardTitle>
            <PackageCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emEstoque}</div>
            <p className="text-xs text-muted-foreground">
              Produtos disponíveis
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fora de Estoque</CardTitle>
            <PackageX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{foraEstoque}</div>
            <p className="text-xs text-muted-foreground">
              Produtos indisponíveis
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meus Anúncios</h1>
        <Button asChild>
          <Link href="/anunciar">
            <Plus className="mr-2 h-4 w-4" />
            Novo Anúncio
          </Link>
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome do produto ou SKU..."
              className="pl-9"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-lg border">
          <Table columns={columns}>
            <TableHeader>
              <TableRow key="header">
                {columns.map((column) => (
                  <TableHead key={column.accessorKey || column.id}>{column.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow key="loading">
                  <TableCell colSpan={columns.length} className="text-center py-6">
                    Carregando produtos...
                  </TableCell>
                </TableRow>
              ) : produtosFiltrados.length === 0 ? (
                <TableRow key="empty">
                  <TableCell colSpan={columns.length} className="text-center py-6">
                    Nenhum produto encontrado
                  </TableCell>
                </TableRow>
              ) : (
                produtosPaginados.map((produto) => (
                  <TableRow key={produto.id}>
                    {columns.map((column) => (
                      <TableCell key={column.accessorKey || column.id}>
                        {column.cell ? 
                          column.cell({ 
                            row: { 
                              original: produto, 
                              getValue: (key: string) => produto[key as keyof Product] 
                            } 
                          }) : 
                          produto[column.accessorKey as keyof Product]
                        }
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPaginas > 1 && (
          <div className="flex justify-end gap-2 mt-4">
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
              onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
              disabled={pagina === totalPaginas}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Card>
      <DeleteConfirmDialog 
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleConfirmarExclusao}
      />
    </div>
  )
}
