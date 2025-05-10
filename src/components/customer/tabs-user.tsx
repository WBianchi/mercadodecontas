"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MeusPedidos } from "./tabs/meus-pedidos"
import { Favoritos } from "./tabs/favoritos"
import { Cashback } from "./tabs/cashback"
import { MeusDados } from "./tabs/meus-dados"
import { MeusCupons } from "./tabs/meus-cupons"
import { ShoppingBag, Heart, Wallet, User, Ticket } from "lucide-react"

interface TabsUserProps {
  defaultValue: string
}

export function TabsUser({ defaultValue }: TabsUserProps) {
  return (
    <Tabs defaultValue={defaultValue} className="space-y-6">
      <div className="overflow-x-auto pb-2 md:pb-0 -mx-4 md:mx-0 px-4 md:px-0">
        <TabsList className="bg-background border h-14 grid grid-cols-5 gap-2 md:gap-4 w-full min-w-max">
          <TabsTrigger value="orders" className="text-base">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <span className="hidden sm:inline">Meus Pedidos</span>
              <span className="sm:hidden">Pedidos</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="favorites" className="text-base">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <span className="hidden sm:inline">Favoritos</span>
              <span className="sm:hidden">Favoritos</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="cashback" className="text-base">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              <span className="hidden sm:inline">Cashback</span>
              <span className="sm:hidden">Cashback</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="coupons" className="text-base">
            <div className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              <span className="hidden sm:inline">Meus Cupons</span>
              <span className="sm:hidden">Cupons</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="profile" className="text-base">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Meus Dados</span>
              <span className="sm:hidden">Dados</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="orders" className="mt-4 md:mt-6">
        <MeusPedidos />
      </TabsContent>

      <TabsContent value="favorites" className="mt-4 md:mt-6">
        <Favoritos />
      </TabsContent>

      <TabsContent value="cashback" className="mt-4 md:mt-6">
        <Cashback />
      </TabsContent>

      <TabsContent value="coupons" className="mt-4 md:mt-6">
        <MeusCupons />
      </TabsContent>

      <TabsContent value="profile" className="mt-4 md:mt-6">
        <MeusDados />
      </TabsContent>
    </Tabs>
  )
}
