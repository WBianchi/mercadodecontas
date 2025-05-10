import { NextResponse } from "next/server"
import { prisma, getProductCategories } from "@/lib/prisma"

export async function GET() {
  try {
    const categories = await getProductCategories()
    return NextResponse.json(categories)
  } catch (error) {
    console.error("[CATEGORIES_GET]", error)
    return NextResponse.json(
      { error: "Erro ao buscar categorias" }, 
      { status: 500 }
    )
  }
}
