"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"

// Dados mockados para exemplo
const favoritos = [
  {
    id: 1,
    nome: "Counter-Strike 2",
    descricao: "Conta Global Elite com mais de 1000 horas",
    data: "17/02/2025",
    status: "pendente"
  },
  {
    id: 2,
    nome: "League of Legends",
    descricao: "Conta Diamante com todas as skins raras",
    data: "16/02/2025",
    status: "pendente"
  },
  {
    id: 3,
    nome: "Fortnite",
    descricao: "Conta com passe de batalha completo",
    data: "15/02/2025",
    status: "pendente"
  },
  {
    id: 4,
    nome: "Valorant",
    descricao: "Conta Radiante com skins exclusivas",
    data: "14/02/2025",
    status: "pendente"
  }
]

export default function FavoritosPage() {
  const handleAprovar = (id: number) => {
    console.log("Aprovado:", id)
    // Implementar lógica de aprovação
  }

  const handleRejeitar = (id: number) => {
    console.log("Rejeitado:", id)
    // Implementar lógica de rejeição
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Favoritos</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Favoritos</CardTitle>
          <CardDescription>
            Aprove ou rejeite os itens marcados como favoritos pelos usuários
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {favoritos.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.nome}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell>{item.data}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleAprovar(item.id)}
                      className="hover:text-green-500 hover:bg-green-100"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRejeitar(item.id)}
                      className="hover:text-red-500 hover:bg-red-100"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
