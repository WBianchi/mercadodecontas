import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Não autorizado", { status: 401 })
    }

    const productId = parseInt(params.id)
    if (isNaN(productId)) {
      return new NextResponse("ID inválido", { status: 400 })
    }

    // Verificar se o produto existe
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { lojista: true }
    })

    if (!product) {
      return new NextResponse("Produto não encontrado", { status: 404 })
    }

    // Se for lojista, verificar se o produto pertence a ele
    if (session.user.role === "LOJISTA") {
      const lojista = await prisma.lojista.findFirst({
        where: {
          OR: [
            { email: session.user.email },
            { wpMetadata: { path: ['email'], equals: session.user.email } }
          ]
        }
      })

      if (!lojista || product.lojistaId !== lojista.id) {
        return new NextResponse("Não autorizado", { status: 401 })
      }
    }

    // Excluir o produto
    await prisma.product.delete({
      where: { id: productId }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[PRODUTO_DELETE]", error)
    return new NextResponse("Erro interno do servidor", { status: 500 })
  }
}
