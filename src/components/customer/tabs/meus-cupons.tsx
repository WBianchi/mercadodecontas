"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ticket, Copy, Clock } from "lucide-react"

export function MeusCupons() {
  const cupons = [
    {
      id: "1",
      codigo: "BEMVINDO20",
      desconto: "20% OFF",
      validade: "28/02/2024",
      descricao: "Cupom de boas-vindas para primeira compra",
      status: "active",
    },
    {
      id: "2",
      codigo: "NETFLIX30",
      desconto: "R$ 30,00",
      validade: "20/02/2024",
      descricao: "Desconto exclusivo para contas Netflix",
      status: "active",
    },
    {
      id: "3",
      codigo: "SPOTIFY15",
      desconto: "15% OFF",
      validade: "15/02/2024",
      descricao: "Desconto para Spotify Premium",
      status: "expired",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cupons.map((cupom) => (
        <Card key={cupom.id} className={cupom.status === "expired" ? "opacity-60" : ""}>
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Ticket className="h-6 w-6 text-[#097bff]" />
              </div>
              {cupom.status === "active" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-[#097bff]"
                  onClick={() => navigator.clipboard.writeText(cupom.codigo)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-[#097bff]">{cupom.desconto}</h3>
                <p className="text-sm text-gray-500">{cupom.descricao}</p>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Código:</p>
                    <p className="text-lg font-bold">{cupom.codigo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium flex items-center gap-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      Válido até:
                    </p>
                    <p className={`text-sm ${
                      cupom.status === "expired" ? "text-red-500" : "text-gray-600"
                    }`}>
                      {cupom.validade}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
