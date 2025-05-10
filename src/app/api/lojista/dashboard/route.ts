import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { endOfDay, startOfDay, startOfMonth, endOfMonth, subDays, subMonths } from "date-fns"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return new NextResponse("Não autorizado", { status: 401 })
    }

    const userId = session.user.id
    const hoje = new Date()
    const ontem = subDays(hoje, 1)
    const mesAtual = {
      inicio: startOfMonth(hoje),
      fim: endOfMonth(hoje)
    }
    const mesAnterior = {
      inicio: startOfMonth(subMonths(hoje, 1)),
      fim: endOfMonth(subMonths(hoje, 1))
    }

    // Dados mockados enquanto não temos as tabelas
    return NextResponse.json({
      vendasHoje: {
        valor: 0,
        variacao: 0
      },
      vendasMes: {
        valor: 0,
        variacao: 0
      },
      novosClientes: {
        quantidade: 0,
        variacao: 0
      },
      avaliacoes: {
        media: 0,
        variacao: 0
      },
      vendasRecentes: [
        {
          produto: "Nenhuma venda ainda",
          tempo: "Agora",
          valor: 0
        }
      ],
      atividadesLoja: [
        {
          acao: "Loja criada com sucesso",
          tempo: "Agora"
        }
      ]
    })

  } catch (error) {
    console.error("[DASHBOARD_GET]", error)
    return new NextResponse("Erro interno", { status: 500 })
  }
}
