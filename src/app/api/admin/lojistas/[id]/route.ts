import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET - Busca detalhes de um lojista específico
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const url = new URL(request.url)
    const id = url.pathname.split("/").pop()
    
    if (!id) {
      return NextResponse.json({ error: "ID não fornecido" }, { status: 400 })
    }

    const lojista = await prisma.lojista.findUnique({
      where: { id: parseInt(id) }
    })

    if (!lojista) {
      return NextResponse.json(
        { error: "Lojista não encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(lojista)
  } catch (error) {
    console.error("Erro ao buscar lojista:", error)
    return NextResponse.json(
      { error: "Erro ao buscar lojista" },
      { status: 500 }
    )
  }
}
