import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Primeiro buscamos todos os produtos em estoque
    const allProducts = await prisma.product.findMany({
      where: {
        inStock: true,
      },
      select: {
        id: true,
        name: true,
        sku: true,
        productPhoto: true,
        price: true,
        discountPrice: true,
        inStock: true,
        Category: {
          select: {
            name: true,
          },
        },
      },
    })

    // Depois embaralhamos a ordem usando o algoritmo Fisher-Yates
    const shuffleArray = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    
    // Embaralha os produtos e pega apenas os primeiros 12 (aleatórios)
    const randomProducts = shuffleArray([...allProducts]).slice(0, 12);

    return NextResponse.json(randomProducts)
  } catch (error) {
    console.error("[PRODUCTS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
