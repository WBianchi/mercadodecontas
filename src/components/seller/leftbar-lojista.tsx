"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  ShoppingBag,
  LayoutDashboard,
  Store,
  PackageSearch,
  FileText,
  Settings,
  LogOut,
  DollarSign,
  LineChart,
  MessageSquare,
  Star,
  Bell,
  Percent,
  Share2,
  Megaphone,
  Ticket,
  Users,
  Plug,
  RotateCcw,
  MessageCircle
} from "lucide-react"
import { signOut } from "next-auth/react"

export function LeftbarLojista() {
  return (
    <div className="pb-12 min-h-screen border-r w-64">
      <ScrollArea className="h-full px-3 py-2">
        <div className="flex flex-col justify-between min-h-[calc(100vh-120px)]">
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Principal</h2>
              <Link href="/dashboard/lojista">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </div>

            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Gestão</h2>
              <Link href="/dashboard/lojista/vendas">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Vendas
                  <Badge variant="secondary" className="ml-auto">Novo</Badge>
                </Button>
              </Link>

              <Link href="/dashboard/lojista/anuncios">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Megaphone className="mr-2 h-4 w-4" />
                  Anúncios
                </Button>
              </Link>
            </div>

            <Separator />

            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Clientes</h2>
              <Link href="/dashboard/lojista/clientes">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Users className="mr-2 h-4 w-4" />
                  Clientes
                </Button>
              </Link>

              <Link href="/dashboard/lojista/avaliacoes">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Star className="mr-2 h-4 w-4" />
                  Avaliações
                </Button>
              </Link>

              <Link href="/dashboard/lojista/mensagens">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Mensagens
                  <Badge variant="secondary" className="ml-auto">2</Badge>
                </Button>
              </Link>
            </div>

            <Separator />

            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Marketing</h2>
              <Link href="/dashboard/lojista/afiliados">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Share2 className="mr-2 h-4 w-4" />
                  Programa de Afiliados
                </Button>
              </Link>
              
              <Link href="/dashboard/lojista/impulsionamentos">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Megaphone className="mr-2 h-4 w-4" />
                  Impulsionamentos
                </Button>
              </Link>

              <Link href="/dashboard/lojista/cupons">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Ticket className="mr-2 h-4 w-4" />
                  Cupons de Desconto
                </Button>
              </Link>
            </div>

            <Separator />

            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Financeiro</h2>
              <Link href="/dashboard/lojista/relatorios">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <LineChart className="mr-2 h-4 w-4" />
                  Relatórios
                </Button>
              </Link>

              <Link href="/dashboard/lojista/reembolsos">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reembolsos
                </Button>
              </Link>
            </div>

            <Separator />

            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Sistema</h2>
              <Link href="/dashboard/lojista/integracoes">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Plug className="mr-2 h-4 w-4" />
                  Integrações
                </Button>
              </Link>

              <Link href="/dashboard/lojista/configuracoes">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <Separator />
            <Button variant="ghost" className="w-full justify-start hover:bg-destructive/10 hover:text-destructive" onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
