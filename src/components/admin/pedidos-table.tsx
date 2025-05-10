import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye } from "lucide-react"

interface PedidosTableProps {
  pedidos: any[]
  onViewPedido: (pedido: any) => void
  onUpdateStatus: (pedidoId: number, status: string) => void
}

export function PedidosTable({
  pedidos,
  onViewPedido,
  onUpdateStatus,
}: PedidosTableProps) {
  const formatStatus = (status: string) => {
    const statusMap: Record<string, { text: string; color: string }> = {
      AGUARDANDO: { text: "Aguardando", color: "bg-yellow-100 text-yellow-800" },
      PAGO: { text: "Pago", color: "bg-green-100 text-green-800" },
      CONCLUIDO: { text: "Concluído", color: "bg-blue-100 text-blue-800" },
      REEMBOLSADO: { text: "Reembolsado", color: "bg-purple-100 text-purple-800" },
      CANCELADO: { text: "Cancelado", color: "bg-red-100 text-red-800" },
    }

    return statusMap[status] || { text: status, color: "bg-gray-100 text-gray-800" }
  }

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Cliente</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Data</th>
              <th className="py-3 px-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => {
              const status = formatStatus(pedido.status)
              return (
                <tr key={pedido.id} className="border-b">
                  <td className="py-3 px-4">#{pedido.id}</td>
                  <td className="py-3 px-4">{pedido.clientName}</td>
                  <td className="py-3 px-4">{pedido.clientEmail}</td>
                  <td className="py-3 px-4">
                    R$ {pedido.OrderItem.reduce(
                      (total: number, item: any) =>
                        total + item.value * item.quantity,
                      0
                    ).toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <Select
                      defaultValue={pedido.status.toLowerCase()}
                      onValueChange={(value) =>
                        onUpdateStatus(pedido.id, value.toUpperCase())
                      }
                    >
                      <SelectTrigger className={`w-[140px] ${status.color}`}>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aguardando">Aguardando</SelectItem>
                        <SelectItem value="pago">Pago</SelectItem>
                        <SelectItem value="concluido">Concluído</SelectItem>
                        <SelectItem value="reembolsado">Reembolsado</SelectItem>
                        <SelectItem value="cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(pedido.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewPedido(pedido)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
