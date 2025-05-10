import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Página não encontrada | Mercado de Contas",
  description: "Desculpe, não conseguimos encontrar o que você está procurando."
}

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20">
        <div className="container flex flex-col items-center max-w-md text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center scale-[2] opacity-10">
              <div className="w-64 h-64 border-8 rounded-full border-[#097bff]"></div>
            </div>
            <div className="relative text-9xl font-bold text-[#097bff]">404</div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Página não encontrada</h1>
          
          <p className="text-muted-foreground mb-8">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>
          
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para a página inicial
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/loja">Ver todos os produtos</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
