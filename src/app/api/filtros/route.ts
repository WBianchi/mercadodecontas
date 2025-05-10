import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Buscar categorias com contagem de produtos
    const categorias = await prisma.category.findMany({
      include: {
        _count: {
          select: { Product: true }
        }
      }
    })

    // Buscar faixa de preços
    const precos = await prisma.product.aggregate({
      _min: { price: true },
      _max: { price: true }
    })

    // Filtrar apenas categorias que têm produtos
    const categoriasComProdutos = categorias.filter(cat => cat._count.Product > 0);

    return NextResponse.json({
      categorias: categoriasComProdutos.map(cat => ({
        id: cat.id,
        name: cat.name,
        _count: {
          Product: cat._count.Product
        }
      })),
      precos: {
        min: precos._min.price || 0,
        max: precos._max.price || 1000
      }
    })
  } catch (error) {
    console.error("Erro ao buscar filtros:", error)
    return NextResponse.json(
      { error: "Erro ao buscar filtros" },
      { status: 500 }
    )
  }
}
