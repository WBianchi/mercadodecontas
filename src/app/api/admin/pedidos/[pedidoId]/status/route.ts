import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const url = new URL(request.url)
    const pedidoId = url.pathname.split("/")[4] // /api/admin/pedidos/[pedidoId]/status
    
    if (!pedidoId) {
      return NextResponse.json({ error: "ID do pedido não fornecido" }, { status: 400 })
    }

    const data = await request.json()
    const { status } = data

    if (!status) {
      return NextResponse.json({ error: "Status não fornecido" }, { status: 400 })
    }

    const pedido = await prisma.pedido.update({
      where: { id: parseInt(pedidoId) },
      data: { status }
    })

    return NextResponse.json(pedido)
  } catch (error) {
    console.error("Erro ao atualizar status do pedido:", error)
    return NextResponse.json(
      { error: "Erro ao atualizar status do pedido" },
      { status: 500 }
    )
  }
}
