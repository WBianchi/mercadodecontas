"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Bell,
  Settings,
  LogOut,
  Menu,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LeftbarAdmin } from "./leftbar-admin"
import { useSession } from "next-auth/react"

export function TopbarAdmin() {
  const { data: session } = useSession()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <LeftbarAdmin />
          </SheetContent>
        </Sheet>

        <div className="text-lg font-semibold">
          <Link href="/" className="text-xl font-bold text-[#097bff] shrink-0">
            <Image 
              src="/logo-mercadodecontas.svg" 
              alt="Mercado de Contas"
              width={70} 
              height={32}
              className="mb-1.3"
              priority
            />
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full bg-[#097bff] p-0 text-xs text-white">
              3
            </Badge>
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {session?.user?.name}
            </span>
          </div>

          <ModeToggle />

          <Link href="/dashboard/admin/configuracoes">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
