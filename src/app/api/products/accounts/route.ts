import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        inStock: true,
        Category: {
          some: {
            id: {
              in: [7, 8, 9, 10, 12, 146, 143, 144]
            }
          }
        }
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
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("[PRODUCTS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
