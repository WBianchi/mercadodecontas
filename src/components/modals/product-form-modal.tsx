"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProductForm } from "@/components/forms/product-form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ProductFormModalProps {
  children: React.ReactNode
}

export function ProductFormModal({ children }: ProductFormModalProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  // Verifica se o usuário é admin ou lojista
  const isAuthorized = session?.user?.role === "ADMIN" || session?.user?.role === "LOJISTA"

  console.log("ProductFormModal - Session:", session)
  console.log("ProductFormModal - Status:", status)
  console.log("ProductFormModal - Is Authorized:", isAuthorized)
  console.log("ProductFormModal - Modal Open:", open)

  const handleOpenChange = (newOpen: boolean) => {
    console.log("ProductFormModal - Dialog open change:", newOpen)
    setOpen(newOpen)
  }

  const handleTriggerClick = () => {
    console.log("ProductFormModal - Trigger clicked")
    handleOpenChange(true)
  }

  if (status === "loading") {
    return children
  }

  if (!session) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild onClick={handleTriggerClick}>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Faça login para continuar</DialogTitle>
            <DialogDescription>
              Você precisa estar logado como lojista ou administrador para criar produtos.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Link href="/login" className="w-full">
              <Button className="w-full" variant="default" onClick={() => handleOpenChange(false)}>
                Fazer Login
              </Button>
            </Link>
            <Link href="/cadastro" className="w-full">
              <Button className="w-full" variant="outline" onClick={() => handleOpenChange(false)}>
                Criar Conta
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!isAuthorized) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild onClick={handleTriggerClick}>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Acesso Restrito</DialogTitle>
            <DialogDescription>
              Apenas lojistas e administradores podem criar produtos. Entre em contato conosco para se tornar um lojista.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end py-4">
            <Link href="/contato">
              <Button variant="default" onClick={() => handleOpenChange(false)}>
                Entrar em Contato
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild onClick={handleTriggerClick}>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Produto</DialogTitle>
          <DialogDescription>
            Preencha todos os campos necessários para criar um novo produto.
          </DialogDescription>
        </DialogHeader>
        <ProductForm />
      </DialogContent>
    </Dialog>
  )
}
