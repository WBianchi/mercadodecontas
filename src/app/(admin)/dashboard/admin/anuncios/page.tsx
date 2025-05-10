"use client"

import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Eye, Pencil, Trash, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { EditProductDialog } from "./components/edit-product-dialog"
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
  lojista: {
    username: string
    corporateName: string
  }
}

async function fetchProdutos() {
  const response = await fetch("/api/admin/produtos")
  if (!response.ok) {
    throw new Error("Falha ao carregar produtos")
  }
  return response.json()
}

export default function AnunciosPage() {
  const [pagina, setPagina] = useState(1)
  const [busca, setBusca] = useState("")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [produtoParaExcluir, setProdutoParaExcluir] = useState<Product | null>(null)
  const itensPorPagina = 7
  const queryClient = useQueryClient()

  const { data: produtos = [], isLoading } = useQuery<Product[]>({
    queryKey: ["produtos-admin"],
    queryFn: fetchProdutos
  })

  // Filtra produtos pela busca
  const produtosFiltrados = produtos.filter(produto =>
    produto.name.toLowerCase().includes(busca.toLowerCase()) ||
    produto.lojista.username.toLowerCase().includes(busca.toLowerCase()) ||
    produto.lojista.corporateName.toLowerCase().includes(busca.toLowerCase())
  )

  // Calcula total de páginas
  const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina)

  // Pega apenas os produtos da página atual
  const produtosPaginados = produtosFiltrados.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  )

  async function handleSaveProduct(data: Omit<Product, "id" | "Category" | "lojista">) {
    try {
      const response = await fetch(`/api/admin/produtos/${editingProduct?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Falha ao salvar produto")
      }
    } catch (error) {
      console.error("Erro ao salvar produto:", error)
      throw error
    }
  }

  const excluirProduto = async (produto: Product) => {
    try {
      const response = await fetch(`/api/produtos/${produto.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erro ao excluir produto")
      }

      // Atualizar cache do TanStack Query
      queryClient.setQueryData(["produtos-admin"], (old: Product[] | undefined) => 
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Anúncios</h1>
        <Button asChild>
          <Link href="/dashboard/admin/anuncios/novo">
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
              placeholder="Buscar por nome do produto ou lojista..."
              className="pl-9"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Lojista</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Categorias</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    Carregando produtos...
                  </TableCell>
                </TableRow>
              ) : produtosPaginados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    Nenhum produto encontrado
                  </TableCell>
                </TableRow>
              ) : (
                produtosPaginados.map((produto) => (
                  <TableRow key={produto.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                          <Image
                            src={produto.productPhoto || "https://placehold.co/150x150"}
                            alt={produto.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{produto.name}</div>
                          <div className="text-sm text-muted-foreground">SKU: {produto.sku}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{produto.lojista.username}</div>
                        <div className="text-sm text-muted-foreground">{produto.lojista.corporateName}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        {produto.pixPrice && (
                          <div className="text-sm text-muted-foreground">PIX: R$ {produto.pixPrice.toFixed(2)}</div>
                        )}
                        <div className="font-medium">R$ {produto.price.toFixed(2)}</div>
                        {produto.discountPrice && (
                          <div className="text-sm text-green-600">Desconto: R$ {produto.discountPrice.toFixed(2)}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-2 ${!produto.inStock ? 'text-red-500' : ''}`}>
                        {produto.stockQuantity || 0}
                        {!produto.inStock && <span>(Fora de Estoque)</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {produto.Category.map((cat, i) => (
                          <div key={i} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                            {cat.name}
                          </div>
                        ))}
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
                          <DropdownMenuItem asChild>
                            <Link href={`/produto/${produto.id}`} className="flex items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Anúncio
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setEditingProduct(produto)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center text-red-500" onClick={() => handleExcluir(produto)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
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
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            Mostrando {produtosPaginados.length} de {produtosFiltrados.length} produtos
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPagina(pagina - 1)}
                disabled={pagina === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1">
                <div className="text-sm font-medium">Página</div>
                <div className="text-sm font-medium">{pagina}</div>
                <div className="text-sm font-medium">de</div>
                <div className="text-sm font-medium">{totalPaginas}</div>
              </div>
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
        </div>
      </Card>

      {editingProduct && (
        <EditProductDialog
          product={editingProduct}
          open={!!editingProduct}
          onOpenChange={(open) => !open && setEditingProduct(null)}
          onSave={handleSaveProduct}
        />
      )}

      <DeleteConfirmDialog 
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleConfirmarExclusao}
      />
    </div>
  )
}
