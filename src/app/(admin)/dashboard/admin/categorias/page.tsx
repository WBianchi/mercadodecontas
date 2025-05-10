"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ChevronRight,
  ChevronDown,
  Search,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
  Check,
  AlertCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

type Category = {
  id: number
  name: string
  slug: string
  description: string
  icon: string
  image: string
  productsCount: number
}

interface CategoriaProps {
  categoria: Category
  selecionadas: number[]
  onToggleSelect: (id: number) => void
  onEdit: (categoria: Category) => void
  onDelete: (categoria: Category) => void
}

function Categoria({ categoria, selecionadas, onToggleSelect, onEdit, onDelete }: CategoriaProps) {
  const isSelecionada = selecionadas.includes(categoria.id)

  return (
    <div className="flex items-center gap-2 p-3 hover:bg-accent/50 border-b last:border-b-0">
      <Checkbox
        checked={isSelecionada}
        onCheckedChange={() => onToggleSelect(categoria.id)}
      />
      <div className="flex-1 ml-2">
        <div className="font-medium">{categoria.name}</div>
        <div className="text-sm text-muted-foreground">{categoria.description}</div>
        <div className="text-xs text-muted-foreground mt-1">
          <span className="font-medium">{categoria.productsCount}</span> {categoria.productsCount === 1 ? 'produto' : 'produtos'}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onEdit(categoria)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => onDelete(categoria)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Category[]>([])
  const [selecionadas, setSelecionadas] = useState<number[]>([])
  const [busca, setBusca] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Estados para o modal de adicionar/editar categoria
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    description: "",
    icon: "category", // Valor padrão
    image: "", // Valor padrão
  })
  const [isEditing, setIsEditing] = useState(false)
  
  // Estado para o modal de confirmação de exclusão
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    category: null as Category | null,
  })

  // Buscar categorias
  const fetchCategorias = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/categories")
      if (!response.ok) {
        throw new Error("Falha ao carregar categorias")
      }
      const data = await response.json()
      setCategorias(data)
    } catch (err) {
      setError("Erro ao carregar categorias. Por favor, tente novamente.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategorias()
  }, [])

  // Filtrar categorias com base na busca
  const categoriasFiltradas = categorias.filter(cat => 
    cat.name.toLowerCase().includes(busca.toLowerCase()) || 
    cat.description.toLowerCase().includes(busca.toLowerCase())
  )

  // Alternar seleção de categoria
  const toggleSelect = (id: number) => {
    setSelecionadas(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    )
  }

  // Abrir modal para adicionar nova categoria
  const handleAddNew = () => {
    setFormData({
      id: 0,
      name: "",
      description: "",
      icon: "category",
      image: "",
    })
    setIsEditing(false)
    setIsModalOpen(true)
  }

  // Abrir modal para editar categoria
  const handleEdit = (categoria: Category) => {
    setFormData({
      id: categoria.id,
      name: categoria.name,
      description: categoria.description,
      icon: categoria.icon,
      image: categoria.image,
    })
    setIsEditing(true)
    setIsModalOpen(true)
  }

  // Abrir modal para confirmar exclusão
  const handleDelete = (categoria: Category) => {
    setDeleteModal({
      open: true,
      category: categoria,
    })
  }

  // Excluir categorias selecionadas
  const handleDeleteSelected = () => {
    if (selecionadas.length === 0) return

    const categoriasParaExcluir = categorias.filter(cat => selecionadas.includes(cat.id))
    const comProdutos = categoriasParaExcluir.some(cat => cat.productsCount > 0)

    if (comProdutos) {
      toast.error(
        "Algumas categorias selecionadas possuem produtos associados e não podem ser excluídas.",
        { duration: 5000 }
      )
      return
    }

    // Confirmação para exclusão em massa
    if (confirm(`Tem certeza que deseja excluir ${selecionadas.length} categorias?`)) {
      // Excluir cada categoria selecionada
      Promise.all(
        selecionadas.map(id => 
          fetch(`/api/admin/categories/${id}`, { method: "DELETE" })
        )
      )
      .then(responses => {
        const temErro = responses.some(res => !res.ok)
        if (temErro) {
          toast.error("Erro ao excluir algumas categorias")
        } else {
          toast.success(`${selecionadas.length} categorias excluídas com sucesso`)
          setSelecionadas([])
          fetchCategorias()
        }
      })
      .catch(err => {
        console.error(err)
        toast.error("Erro ao excluir categorias")
      })
    }
  }

  // Salvar (criar ou atualizar) categoria
  const handleSaveCategory = async () => {
    // Validar dados
    if (!formData.name || !formData.description) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    setIsSubmitting(true)
    
    try {
      let response
      
      if (isEditing) {
        // Atualizar categoria existente
        response = await fetch(`/api/admin/categories/${formData.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      } else {
        // Criar nova categoria
        response = await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      }

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Erro ao salvar categoria")
      }

      toast.success(isEditing ? "Categoria atualizada com sucesso" : "Categoria criada com sucesso")
      setIsModalOpen(false)
      fetchCategorias()
    } catch (err: any) {
      toast.error(err.message || "Erro ao salvar categoria")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Confirmar exclusão de categoria
  const confirmDelete = async () => {
    if (!deleteModal.category) return

    try {
      const response = await fetch(`/api/admin/categories/${deleteModal.category.id}`, {
        method: "DELETE",
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(
          data.error || 
          "Erro ao excluir categoria"
        )
      }

      toast.success("Categoria excluída com sucesso")
      setDeleteModal({ open: false, category: null })
      fetchCategorias()
    } catch (err: any) {
      toast.error(err.message || "Erro ao excluir categoria")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Categoria
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar categorias..."
            className="pl-10"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="border rounded-lg">
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : categoriasFiltradas.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            {busca ? "Nenhuma categoria encontrada com este termo" : "Nenhuma categoria cadastrada"}
          </div>
        ) : (
          categoriasFiltradas.map((categoria) => (
            <Categoria
              key={categoria.id}
              categoria={categoria}
              selecionadas={selecionadas}
              onToggleSelect={toggleSelect}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {selecionadas.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {selecionadas.length} {selecionadas.length === 1 ? 'categoria selecionada' : 'categorias selecionadas'}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleDeleteSelected}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir Selecionadas
          </Button>
        </div>
      )}

      {/* Modal de Adicionar/Editar Categoria */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar Categoria" : "Nova Categoria"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados da categoria abaixo.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Categoria*</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Streaming"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição*</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Ex: Serviços de streaming de vídeo"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Ícone</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="Nome do ícone (ex: category)"
              />
              <p className="text-xs text-muted-foreground">
                Utilize nomes de ícones do Lucide React ou deixe em branco para usar o padrão.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL da Imagem</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-muted-foreground">
                Opcional. Deixe em branco para usar a imagem padrão.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveCategory}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Salvar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ ...deleteModal, open })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-500">Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta categoria?
            </DialogDescription>
          </DialogHeader>

          {deleteModal.category && deleteModal.category.productsCount > 0 && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Atenção!</AlertTitle>
              <AlertDescription>
                Esta categoria possui {deleteModal.category.productsCount} produto(s) associado(s) e não pode ser excluída.
              </AlertDescription>
            </Alert>
          )}

          {deleteModal.category && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="font-medium">{deleteModal.category.name}</p>
              <p className="text-sm text-muted-foreground">{deleteModal.category.description}</p>
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteModal({ open: false, category: null })}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteModal.category?.productsCount ? deleteModal.category.productsCount > 0 : false}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
