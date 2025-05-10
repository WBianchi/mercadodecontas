import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const searchTerm = searchParams.get("q") || ""
    const categoria = searchParams.get("categoria")
    const precoString = searchParams.get("preco")
    const ordem = searchParams.get("ordem")

    // Preparar o filtro
    const where: any = {
      inStock: true,
    }

    // Adicionar termo de busca
    if (searchTerm) {
      where.OR = [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
        { shortDescription: { contains: searchTerm, mode: "insensitive" } },
      ]
    }

    // Adicionar filtro por categoria
    if (categoria) {
      const categoriaIds = categoria.split(",").map(id => id.trim());
      if (categoriaIds.length > 0) {
        where.Category = {
          some: {
            id: {
              in: categoriaIds.map(Number)
            }
          }
        }
      }
    }

    // Adicionar filtro por preço
    if (precoString) {
      const [min, max] = precoString.split(",").map(Number)
      where.price = {
        gte: min,
        lte: max,
      }
    }

    // Preparar ordenação
    let orderBy: any = { createdAt: "desc" }

    if (ordem) {
      switch (ordem) {
        case "menor-preco":
          orderBy = { price: "asc" }
          break
        case "maior-preco":
          orderBy = { price: "desc" }
          break
        case "mais-recentes":
          orderBy = { createdAt: "desc" }
          break
        case "melhor-avaliados":
          orderBy = [
            {
              reviews: {
                _avg: {
                  rating: "desc",
                },
              },
            },
            { createdAt: "desc" },
          ]
          break
        // Caso mais-vendidos precisaria de uma lógica adicional
        default:
          orderBy = { createdAt: "desc" }
      }
    }

    // Buscar produtos
    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        Category: true,
        tags: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    })

    // Calcular média de avaliações
    const productsWithRating = products.map((product) => {
      const ratings = product.reviews.map((review) => review.rating)
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0

      return {
        ...product,
        averageRating,
      }
    })

    return NextResponse.json(productsWithRating)
  } catch (error) {
    console.error("Erro ao buscar produtos:", error)
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    )
  }
}
