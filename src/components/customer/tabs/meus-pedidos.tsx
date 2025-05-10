"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  ShoppingCart,
  AlertCircle,
  CheckCircle2,
  Download,
  Link as LinkIcon,
  Eye,
  Copy,
  RefreshCcw,
  AlertTriangle
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { formatPrice } from "@/lib/utils"

interface OrderItem {
  id: string
  productName: string
  quantity: number
  value: number
  product: {
    id: string
    name: string
    price: number
    discountPrice: number | null
    fileLink: string | null
    productPhoto: string | null
  } | null
}

interface Order {
  id: string
  status: "AGUARDANDO" | "PAGO" | "CONCLUIDO" | "REEMBOLSADO" | "CANCELADO"
  createdAt: string
  OrderItem: OrderItem[]
  Lojista: {
    username: string
    email: string
  }
}

function getStatusBadge(status: Order["status"]) {
  switch (status) {
    case "PAGO":
    case "CONCLUIDO":
      return {
        variant: "default" as const,
        label: "Entregue"
      }
    case "AGUARDANDO":
      return {
        variant: "secondary" as const,
        label: "Em processamento"
      }
    case "REEMBOLSADO":
      return {
        variant: "destructive" as const,
        label: "Reembolsado"
      }
    case "CANCELADO":
      return {
        variant: "destructive" as const,
        label: "Cancelado"
      }
    default:
      return {
        variant: "secondary" as const,
        label: "Em processamento"
      }
  }
}

export function MeusPedidos() {
  const { data: session } = useSession()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/customer/orders")
        if (!response.ok) throw new Error("Erro ao carregar pedidos")
        
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        setError("Não foi possível carregar seus pedidos")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (session?.user) {
      fetchOrders()
    }
  }, [session])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCcw className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!session?.user) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>Faça login para ver seus pedidos</AlertDescription>
      </Alert>
    )
  }

  if (orders.length === 0) {
    return (
      <Alert>
        <ShoppingCart className="h-4 w-4" />
        <AlertDescription>Você ainda não tem pedidos</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-6">
            {order.OrderItem.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-medium">{item.productName}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Pedido #{order.id}</span>
                    <span>•</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Vendedor: {order.Lojista.username}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">
                      {formatPrice(item.value)}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-sm text-muted-foreground">
                        {item.quantity}x {formatPrice(item.value / item.quantity)}
                      </div>
                    )}
                  </div>
                  <Badge
                    variant={getStatusBadge(order.status).variant}
                    className="capitalize"
                  >
                    {getStatusBadge(order.status).label}
                  </Badge>
                </div>
              </div>
            ))}
            {(order.status === "PAGO" || order.status === "CONCLUIDO") && order.OrderItem.some(item => item.product?.fileLink) && (
              <div className="mt-6 flex flex-wrap gap-2">
                {order.OrderItem.map((item) => (
                  item.product?.fileLink && (
                    <TooltipProvider key={item.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="sm" variant="outline">
                            <LinkIcon className="h-4 w-4 mr-2" />
                            Acessar {item.productName}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Acessar produto</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
