"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Zap, DollarSign, ShoppingCart, Sparkles } from "lucide-react"
import { ProductFormModal } from "@/components/modals/product-form-modal"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AnunciarPage() {
  const { data: session } = useSession()
  const isAuthorized = session?.user?.role === "ADMIN" || session?.user?.role === "LOJISTA"

  console.log("Página Anunciar - Session:", session)
  console.log("Página Anunciar - isAuthorized:", isAuthorized)

  return (
    <main className="min-h-screen pt-14">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-poppins text-4xl md:text-6xl font-bold tracking-tight text-[#097bff] mb-6">
            {session ? (
              isAuthorized ? (
                "Área do Vendedor"
              ) : (
                "Torne-se um Vendedor"
              )
            ) : (
              "O Maior Marketplace de Contas Premium"
            )}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16">
            {session ? (
              isAuthorized ? (
                "Gerencie seus produtos e acompanhe suas vendas em um só lugar"
              ) : (
                "Entre em contato conosco para se tornar um vendedor autorizado"
              )
            ) : (
              <>
                Encontre as melhores ofertas com total <span className="text-[#097bff]">segurança</span> e{" "}
                <span className="text-[#097bff]">garantia</span>.
              </>
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm flex flex-col items-center">
              <Shield className="w-8 h-8 text-[#097bff] mb-3" />
              <span className="font-medium">Compra Segura</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm flex flex-col items-center">
              <Lock className="w-8 h-8 text-[#097bff] mb-3" />
              <span className="font-medium">Garantia Total</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm flex flex-col items-center">
              <Zap className="w-8 h-8 text-[#097bff] mb-3" />
              <span className="font-medium">Entrega Imediata</span>
            </div>
          </div>

          <ProductFormModal>
            <Button 
              size="lg"
              variant="default"
              className="px-12 py-6 rounded-[32px] font-poppins font-bold text-lg mb-16 bg-[#097bff] hover:bg-[#097bff]/90"
              onClick={() => {
                console.log("Botão clicado")
                console.log("Session no clique:", session)
                console.log("isAuthorized no clique:", isAuthorized)
              }}
            >
              {session ? (
                isAuthorized ? (
                  "Criar Novo Produto"
                ) : (
                  "Quero Ser Vendedor"
                )
              ) : (
                "Começar a Vender"
              )}
            </Button>
          </ProductFormModal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
            <div>
              <div className="text-3xl font-bold text-[#097bff] mb-1">50mil+</div>
              <div className="text-gray-600 dark:text-gray-300">Clientes Satisfeitos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#097bff] mb-1">100mil+</div>
              <div className="text-gray-600 dark:text-gray-300">Produtos Vendidos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#097bff] mb-1">4.9/5</div>
              <div className="text-gray-600 dark:text-gray-300">Avaliação Média</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-[#097bff]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Ganhe Dinheiro</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Venda seus produtos digitais e receba pagamentos de forma segura
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-[#097bff]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Gestão Simples</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Gerencie seus produtos e vendas em um só lugar
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-[#097bff]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Destaque-se</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Alcance mais clientes e aumente suas vendas
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
