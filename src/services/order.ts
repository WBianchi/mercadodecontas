import { prisma } from "@/lib/prisma"
import { PaymentMethod, OrderStatus } from "@prisma/client"
import { randomBytes } from "crypto"

interface CreateOrderProps {
  clienteId?: number
  lojistaId?: number
  paymentMethod: PaymentMethod
  products: {
    productId: number
    quantity: number
    value: number
    name: string
  }[]
  clientName: string
  clientEmail: string
  clientPhone: string
  cpfCnpj: string
  address: string
  city: string
  neighborhood: string
}

export const orderService = {
  async create({
    clienteId,
    lojistaId,
    paymentMethod,
    products,
    clientName,
    clientEmail,
    clientPhone,
    cpfCnpj,
    address,
    city,
    neighborhood
  }: CreateOrderProps) {
    try {
      // Calcular as comissões
      const lojistaCommission = lojistaId ? 0.85 : 1 // Se não tem lojista, 100% para o admin
      const adminCommission = lojistaId ? 0.15 : 0 // Se não tem lojista, 0% para o lojista

      const total = products.reduce((acc, product) => acc + product.value * product.quantity, 0)
      const lojistaProfit = total * lojistaCommission
      const adminProfit = total * adminCommission

      const now = new Date()

      // Gerar username a partir do email
      const username = clientEmail.split("@")[0].toLowerCase()

      // Gerar senha aleatória
      const password = randomBytes(16).toString("hex")

      // Se não tiver lojista, usa o admin como lojista (id 1)
      const effectiveLojistaId = lojistaId || 1

      // Converter o método de pagamento
      const prismaPaymentMethod = paymentMethod === "CREDIT_CARD" ? "CARTAO" : paymentMethod

      // Criar o pedido
      const order = await prisma.pedido.create({
        data: {
          paymentMethod: prismaPaymentMethod,
          status: OrderStatus.AGUARDANDO,
          lojistaCommission,
          adminCommission,
          lojistaProfit,
          adminProfit,
          clientName,
          clientEmail,
          clientPhone,
          cpfCnpj,
          address,
          city,
          neighborhood,
          clientIp: "",
          updatedAt: now,
          createdAt: now,
          purchaseTime: now,
          installments: 1,
          orderSummary: products.map(p => `${p.quantity}x ${p.name}`).join(", "),
          OrderItem: {
            create: products.map(product => ({
              productId: product.productId,
              productName: product.name,
              quantity: product.quantity,
              value: product.value
            }))
          },
          Cliente: clienteId ? {
            connect: {
              id: clienteId
            }
          } : {
            connectOrCreate: {
              where: {
                email: clientEmail
              },
              create: {
                wpFirstName: clientName,
                wpLastName: "",
                wpEmail: clientEmail,
                email: clientEmail,
                wpBillingAddress: JSON.stringify({
                  address,
                  city,
                  neighborhood
                }),
                wpShippingAddress: JSON.stringify({
                  address,
                  city,
                  neighborhood
                }),
                wpRole: "customer",
                wpUsername: username,
                role: "CLIENTE",
                username: username,
                password: password,
                status: "active"
              }
            }
          },
          Lojista: {
            connect: {
              id: effectiveLojistaId
            }
          }
        }
      })

      return order
    } catch (error) {
      console.error("Erro ao criar pedido:", error)
      throw error
    }
  },

  async getById(id: number) {
    return prisma.pedido.findUnique({
      where: { id },
      include: {
        OrderItem: true,
        Cliente: true,
        Lojista: true,
        Admin: true
      }
    })
  },

  async updateStatus(id: number, status: OrderStatus) {
    return prisma.pedido.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date()
      }
    })
  }
}
