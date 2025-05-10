"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Tag,
  Hash,
  ArrowUpDown,
} from "lucide-react"

// Dados de exemplo
const tags = [
  {
    id: "1",
    nome: "Netflix",
    slug: "netflix",
    descricao: "Contas e assinaturas Netflix",
    anuncios: 156,
    cor: "#E50914"
  },
  {
    id: "2",
    nome: "Disney+",
    slug: "disney-plus",
    descricao: "Contas Disney+ e combos",
    anuncios: 89,
    cor: "#113CCF"
  },
  {
    id: "3",
    nome: "HBO Max",
    slug: "hbo-max",
    descricao: "Assinaturas HBO Max",
    anuncios: 67,
    cor: "#5822B4"
  },
  {
    id: "4",
    nome: "Prime Video",
    slug: "prime-video",
    descricao: "Amazon Prime Video",
    anuncios: 92,
    cor: "#00A8E1"
  },
  {
    id: "5",
    nome: "Spotify",
    slug: "spotify",
    descricao: "Contas Spotify Premium",
    anuncios: 124,
    cor: "#1DB954"
  },
  {
    id: "6",
    nome: "Xbox Game Pass",
    slug: "xbox-game-pass",
    descricao: "Assinaturas Xbox Game Pass",
    anuncios: 45,
    cor: "#107C10"
  }
]

export default function TagsPage() {
  const [selecionadas, setSelecionadas] = useState<string[]>([])
  const [busca, setBusca] = useState("")
  const [ordenacao, setOrdenacao] = useState<"nome" | "anuncios">("nome")

  const toggleSelect = (id: string) => {
    setSelecionadas(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    setSelecionadas(prev =>
      prev.length === tags.length ? [] : tags.map(tag => tag.id)
    )
  }

  const tagsOrdenadas = [...tags].sort((a, b) => {
    if (ordenacao === "nome") {
      return a.nome.localeCompare(b.nome)
    }
    return b.anuncios - a.anuncios
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tags</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Tag
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar tags..."
            className="pl-10"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setOrdenacao(prev => prev === "nome" ? "anuncios" : "nome")}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Ordenar por {ordenacao === "nome" ? "Anúncios" : "Nome"}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          checked={selecionadas.length === tags.length}
          onCheckedChange={toggleSelectAll}
        />
        <span className="text-sm text-muted-foreground">
          {selecionadas.length} {selecionadas.length === 1 ? 'tag selecionada' : 'tags selecionadas'}
        </span>
        {selecionadas.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 hover:text-red-600 hover:bg-red-50 ml-4"
            onClick={() => console.log('Excluir selecionadas', selecionadas)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir Selecionadas
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tagsOrdenadas.map((tag) => (
          <Card key={tag.id} className="relative group hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="absolute top-6 left-6">
                <Checkbox
                  checked={selecionadas.includes(tag.id)}
                  onCheckedChange={() => toggleSelect(tag.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="ml-8">
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${tag.cor}15` }}
                  >
                    <Hash className="h-5 w-5" style={{ color: tag.cor }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg leading-none mb-1">
                      {tag.nome}
                    </h3>
                    <div className="text-sm text-muted-foreground font-mono">
                      {tag.slug}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {tag.descricao}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <div 
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${tag.cor}15`,
                        color: tag.cor 
                      }}
                    >
                      {tag.anuncios} anúncios
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-secondary"
                      onClick={() => console.log('Editar tag', tag.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-red-50 text-red-500 hover:text-red-600"
                      onClick={() => console.log('Excluir tag', tag.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
