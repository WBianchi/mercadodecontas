import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const email = session.user?.email

    // Buscar usuário em todas as tabelas possíveis
    const admin = await prisma.admin.findUnique({
      where: { email: email as string },
      select: { role: true },
    })

    if (admin) {
      return NextResponse.json({ role: admin.role })
    }

    const lojista = await prisma.lojista.findUnique({
      where: { email: email as string },
      select: { role: true },
    })

    if (lojista) {
      return NextResponse.json({ role: lojista.role })
    }

    const cliente = await prisma.cliente.findUnique({
      where: { email: email as string },
      select: { role: true },
    })

    if (cliente) {
      return NextResponse.json({ role: cliente.role })
    }

    // Se não encontrar em nenhuma tabela, retorna CLIENTE como padrão
    return NextResponse.json({ role: "CLIENTE" })
  } catch (error) {
    console.error("[ME_GET]", error)
    return NextResponse.json(
      { error: "Erro ao buscar dados do usuário" },
      { status: 500 }
    )
  }
}
