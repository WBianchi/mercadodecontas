import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Não autorizado", { status: 401 })
    }

    const { user } = session

    if (user.role !== "ADMIN" && user.role !== "LOJISTA") {
      return new NextResponse("Não autorizado", { status: 403 })
    }

    const data = await req.json()

    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        shortDescription: data.shortDescription,
        sku: data.sku,
        price: data.price,
        discountPrice: data.discountPrice || null,
        inStock: true,
        userId: user.id,
        productPhoto: data.productPhoto,
        deliveryTime: data.deliveryTime,
        fileLink: data.productLink || null,
        Category: {
          connect: data.categoryId.map((id: string) => ({ id: parseInt(id) })),
        },
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("[PRODUCTS_POST]", error)
    return new NextResponse("Erro interno", { status: 500 })
  }
}
