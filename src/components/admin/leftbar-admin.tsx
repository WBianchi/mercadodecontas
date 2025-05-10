"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Users,
  LayoutDashboard,
  ShoppingBag,
  Users2,
  FileText,
  Settings,
  Plug,
  Heart,
  LogOut,
  Megaphone,
  Rocket,
  LayoutTemplate,
  Tags,
  Hash,
  DollarSign
} from "lucide-react"
import { signOut } from "next-auth/react"

export function LeftbarAdmin() {
  return (
    <div className="pb-12 min-h-screen border-r">
      <ScrollArea className="h-full px-3 py-2">
        <div className="flex flex-col justify-between min-h-[calc(100vh-120px)]">
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Principal</h2>
              <Link href="/dashboard/admin">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </div>

            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Gestão</h2>
              <Link href="/dashboard/admin/vendas">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Vendas
                  <Badge variant="secondary" className="ml-auto">Novo</Badge>
                </Button>
              </Link>

              <Link href="/dashboard/admin/anuncios">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Megaphone className="mr-2 h-4 w-4" />
                  Anúncios
                </Button>
              </Link>

              <Link href="/dashboard/admin/impulsionamentos">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Rocket className="mr-2 h-4 w-4" />
                  Impulsionamentos
                </Button>
              </Link>
            </div>

            <Separator />

            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Conteúdo</h2>
              <Link href="/dashboard/admin/paginas">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <LayoutTemplate className="mr-2 h-4 w-4" />
                  Páginas
                </Button>
              </Link>

              <Link href="/dashboard/admin/categorias">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Tags className="mr-2 h-4 w-4" />
                  Categorias
                </Button>
              </Link>

              <Link href="/dashboard/admin/tags">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Hash className="mr-2 h-4 w-4" />
                  Tags
                </Button>
              </Link>
            </div>

            <Separator />

            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Usuários</h2>
              <Link href="/dashboard/admin/lojistas">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Users className="mr-2 h-4 w-4" />
                  Lojistas
                </Button>
              </Link>

              <Link href="/dashboard/admin/afiliados">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Users2 className="mr-2 h-4 w-4" />
                  Afiliados
                </Button>
              </Link>

              <Link href="/dashboard/admin/favoritos">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Heart className="mr-2 h-4 w-4" />
                  Favoritos
                </Button>
              </Link>
            </div>

            <Separator />

            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Financeiro</h2>
              <Link href="/dashboard/admin/saques">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Saques
                </Button>
              </Link>

              <Link href="/dashboard/admin/relatorios">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <FileText className="mr-2 h-4 w-4" />
                  Relatórios
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 mt-4">
            <Separator />
            <div className="space-y-1">
              <Link href="/dashboard/admin/integracoes">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Plug className="mr-2 h-4 w-4" />
                  Integrações
                </Button>
              </Link>

              <Link href="/dashboard/admin/configuracoes">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </Button>
              </Link>

              <Button 
                variant="ghost" 
                className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
