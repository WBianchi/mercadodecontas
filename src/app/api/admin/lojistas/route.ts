import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET - Lista todos os lojistas
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const lojistas = await prisma.lojista.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(lojistas)
  } catch (error) {
    console.error("Erro ao buscar lojistas:", error)
    return NextResponse.json(
      { error: "Erro ao buscar lojistas" },
      { status: 500 }
    )
  }
}

// PATCH - Atualiza o status do lojista
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const data = await req.json()
    const { id, status } = data

    const lojista = await prisma.lojista.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json(lojista)
  } catch (error) {
    console.error("Erro ao atualizar lojista:", error)
    return NextResponse.json(
      { error: "Erro ao atualizar lojista" },
      { status: 500 }
    )
  }
}
