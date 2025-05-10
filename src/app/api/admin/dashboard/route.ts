import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Não autorizado", { status: 401 })
    }

    // Obtém a data de hoje
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    // Obtém a data de ontem
    const ontem = new Date(hoje)
    ontem.setDate(ontem.getDate() - 1)

    // Vendas de hoje
    const vendasHoje = await prisma.order.aggregate({
      where: {
        createdAt: {
          gte: hoje,
        },
      },
      _sum: {
        total: true,
      },
    })

    // Vendas de ontem
    const vendasOntem = await prisma.order.aggregate({
      where: {
        createdAt: {
          gte: ontem,
          lt: hoje,
        },
      },
      _sum: {
        total: true,
      },
    })

    // Pedidos de hoje
    const pedidosHoje = await prisma.order.count({
      where: {
        createdAt: {
          gte: hoje,
        },
      },
    })

    // Pedidos de ontem
    const pedidosOntem = await prisma.order.count({
      where: {
        createdAt: {
          gte: ontem,
          lt: hoje,
        },
      },
    })

    // Produtos ativos
    const produtosAtivos = await prisma.product.count({
      where: {
        active: true,
      },
    })

    // Novos produtos nas últimas 24h
    const novosProdutos = await prisma.product.count({
      where: {
        createdAt: {
          gte: ontem,
        },
      },
    })

    // Usuários ativos
    const usuariosAtivos = await prisma.user.count({
      where: {
        active: true,
      },
    })

    // Novos usuários nas últimas 24h
    const novosUsuarios = await prisma.user.count({
      where: {
        createdAt: {
          gte: ontem,
        },
      },
    })

    // Calcula o crescimento das vendas
    const crescimentoVendas = vendasOntem._sum.total
      ? ((vendasHoje._sum.total || 0) - vendasOntem._sum.total) /
        vendasOntem._sum.total *
        100
      : 0

    // Calcula o crescimento dos pedidos
    const crescimentoPedidos = pedidosOntem
      ? ((pedidosHoje - pedidosOntem) / pedidosOntem) * 100
      : 0

    return NextResponse.json({
      vendasHoje: vendasHoje._sum.total || 0,
      crescimentoVendas: Math.round(crescimentoVendas * 100) / 100,
      pedidosHoje,
      crescimentoPedidos: Math.round(crescimentoPedidos * 100) / 100,
      produtosAtivos,
      novosProdutos,
      usuariosAtivos,
      novosUsuarios,
    })
  } catch (error) {
    console.error("[DASHBOARD_GET]", error)
    return new NextResponse("Erro interno do servidor", { status: 500 })
  }
}
