import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Verificar se o usuário está autenticado
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Verificar se o usuário é um lojista
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      include: { Lojista: true }
    })

    if (!user?.Lojista) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 })
    }

    // Buscar os impulsionamentos do lojista
    const impulsionamentos = await prisma.impulsionamento.findMany({
      where: { lojistaId: user.Lojista.id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            images: true,
            price: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(impulsionamentos)
  } catch (error) {
    console.error("Erro ao buscar impulsionamentos:", error)
    return NextResponse.json(
      { error: "Erro ao buscar impulsionamentos" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    // Verificar se o usuário está autenticado
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Verificar se o usuário é um lojista
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      include: { Lojista: true }
    })

    if (!user?.Lojista) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 })
    }

    // Obter os dados do impulsionamento
    const { tipo, alcance, dias, valorTotal, productId, paymentMethod } = await request.json()

    // Criar o impulsionamento
    const impulsionamento = await prisma.impulsionamento.create({
      data: {
        tipo,
        alcance,
        dias,
        valorTotal,
        status: "PENDING",
        paymentMethod,
        lojista: { connect: { id: user.Lojista.id } },
        product: { connect: { id: productId } }
      }
    })

    return NextResponse.json(impulsionamento)
  } catch (error) {
    console.error("Erro ao criar impulsionamento:", error)
    return NextResponse.json(
      { error: "Erro ao criar impulsionamento" },
      { status: 500 }
    )
  }
}
