import { prisma } from "@/lib/prisma"

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        icon: true,
        image: true,
        slug: true,
        Product: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    })

    // Filtra apenas categorias que têm pelo menos um produto associado
    const categoriesWithProducts = categories
      .filter(category => category.Product.length > 0)
      .map(({ Product, ...rest }) => rest) // Remove o campo Product do resultado

    return categoriesWithProducts
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}
