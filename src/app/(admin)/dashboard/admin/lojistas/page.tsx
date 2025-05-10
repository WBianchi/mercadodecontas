"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Ban,
  CheckCircle2,
  Users,
} from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface Lojista {
  id: number
  username: string
  email: string
  corporateName: string
  cpfCnpj: string
  status: string
  createdAt: string
  address: string
  city: string
  state: string
  description: string | null
  photo: string | null
  banner: string | null
  gallery: string[]
  facebook: string | null
  instagram: string | null
  youtube: string | null
  linkedin: string | null
  tiktok: string | null
  x: string | null
  telegram: string | null
}

export default function LojistasPage() {
  const [lojistas, setLojistas] = useState<Lojista[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLojista, setSelectedLojista] = useState<Lojista | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchLojistas()
  }, [])

  const fetchLojistas = async () => {
    try {
      const response = await fetch("/api/admin/lojistas")
      const data = await response.json()
      setLojistas(data)
    } catch (error) {
      toast.error("Erro ao carregar lojistas")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch("/api/admin/lojistas", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      })

      if (!response.ok) throw new Error()

      setLojistas(lojistas.map(lojista => 
        lojista.id === id ? { ...lojista, status: newStatus } : lojista
      ))

      toast.success(`Status do lojista atualizado para ${newStatus}`)
    } catch (error) {
      toast.error("Erro ao atualizar status do lojista")
    }
  }

  const handleViewDetails = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/lojistas/${id}`)
      const data = await response.json()
      setSelectedLojista(data)
      setShowModal(true)
    } catch (error) {
      toast.error("Erro ao carregar detalhes do lojista")
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Ativo", color: "bg-green-500", icon: CheckCircle },
      pending: { label: "Pendente", color: "bg-yellow-500", icon: AlertCircle },
      inactive: { label: "Inativo", color: "bg-red-500", icon: XCircle },
    }[status] || { label: status, color: "bg-gray-500", icon: AlertCircle }

    const Icon = statusConfig.icon

    return (
      <Badge className={`${statusConfig.color} text-white gap-1`}>
        <Icon className="w-3 h-3" />
        {statusConfig.label}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 bg-green-50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500 rounded-full">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Lojistas Ativos</p>
              <h3 className="text-2xl font-bold">
                {lojistas.filter(l => l.status === "active").length}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-yellow-50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500 rounded-full">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pendentes</p>
              <h3 className="text-2xl font-bold">
                {lojistas.filter(l => l.status === "pending").length}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-red-50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500 rounded-full">
              <XCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Inativos</p>
              <h3 className="text-2xl font-bold">
                {lojistas.filter(l => l.status === "inactive").length}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-blue-50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500 rounded-full">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <h3 className="text-2xl font-bold">{lojistas.length}</h3>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lojista</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cadastro</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lojistas.map((lojista) => (
                <TableRow key={lojista.id}>
                  <TableCell className="font-medium">
                    {lojista.corporateName}
                  </TableCell>
                  <TableCell>{lojista.email}</TableCell>
                  <TableCell>{lojista.cpfCnpj}</TableCell>
                  <TableCell>{getStatusBadge(lojista.status)}</TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(lojista.createdAt), {
                      locale: ptBR,
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(lojista.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      {lojista.status === "pending" && (
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleStatusChange(lojista.id, "active")}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                      )}

                      {lojista.status === "active" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleStatusChange(lojista.id, "inactive")}
                        >
                          <Ban className="w-4 h-4" />
                        </Button>
                      )}

                      {lojista.status === "inactive" && (
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleStatusChange(lojista.id, "active")}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Lojista</DialogTitle>
            <DialogDescription>
              Informações completas do lojista
            </DialogDescription>
          </DialogHeader>

          {selectedLojista && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Informações Básicas</h3>
                  <p><strong>Nome:</strong> {selectedLojista.username}</p>
                  <p><strong>Email:</strong> {selectedLojista.email}</p>
                  <p><strong>Razão Social:</strong> {selectedLojista.corporateName}</p>
                  <p><strong>CNPJ:</strong> {selectedLojista.cpfCnpj}</p>
                  <p><strong>Status:</strong> {getStatusBadge(selectedLojista.status)}</p>
                </div>

                <div>
                  <h3 className="font-semibold">Endereço</h3>
                  <p>{selectedLojista.address}</p>
                  <p>{selectedLojista.city} - {selectedLojista.state}</p>
                </div>

                {selectedLojista.description && (
                  <div>
                    <h3 className="font-semibold">Descrição</h3>
                    <p>{selectedLojista.description}</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Redes Sociais</h3>
                  {selectedLojista.facebook && <p><strong>Facebook:</strong> {selectedLojista.facebook}</p>}
                  {selectedLojista.instagram && <p><strong>Instagram:</strong> {selectedLojista.instagram}</p>}
                  {selectedLojista.youtube && <p><strong>YouTube:</strong> {selectedLojista.youtube}</p>}
                  {selectedLojista.linkedin && <p><strong>LinkedIn:</strong> {selectedLojista.linkedin}</p>}
                  {selectedLojista.tiktok && <p><strong>TikTok:</strong> {selectedLojista.tiktok}</p>}
                  {selectedLojista.x && <p><strong>X (Twitter):</strong> {selectedLojista.x}</p>}
                  {selectedLojista.telegram && <p><strong>Telegram:</strong> {selectedLojista.telegram}</p>}
                </div>

                {selectedLojista.photo && (
                  <div>
                    <h3 className="font-semibold">Foto do Perfil</h3>
                    <img 
                      src={selectedLojista.photo} 
                      alt="Foto do Perfil"
                      className="w-32 h-32 object-cover rounded-lg" 
                    />
                  </div>
                )}

                {selectedLojista.banner && (
                  <div>
                    <h3 className="font-semibold">Banner</h3>
                    <img 
                      src={selectedLojista.banner} 
                      alt="Banner"
                      className="w-full h-32 object-cover rounded-lg" 
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
