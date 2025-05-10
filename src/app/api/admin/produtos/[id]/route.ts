import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Não autorizado", { status: 401 })
    }

    const data = await request.json()
    const id = parseInt(params.id)

    const produto = await prisma.product.update({
      where: { id },
      data,
    })

    return NextResponse.json(produto)
  } catch (error) {
    console.error("[ADMIN_PRODUTO_UPDATE]", error)
    return new NextResponse("Erro interno do servidor", { status: 500 })
  }
}
