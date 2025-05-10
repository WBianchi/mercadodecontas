import { NextResponse } from "next/server"
import { prisma, Prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryIds = searchParams.get("ids")?.split(",").map(Number) || []
    const limit = parseInt(searchParams.get("limit") || "6")

    console.log("Buscando produtos das categorias:", categoryIds)

    if (!categoryIds.length) {
      return new NextResponse("Categorias não especificadas", { status: 400 })
    }

    // Pegar os slugs das categorias permitidas para licenças
    const categoriasLicencas = await prisma.category.findMany({
      where: {
        OR: [
          { slug: { startsWith: "licenc" } },  // Pega "licenca" e "licencas"
          { slug: { contains: "windows" } },   // Pega categorias relacionadas a Windows
          { slug: { contains: "software" } }   // Pega categorias de software
        ],
        // Excluir explicitamente categorias que não queremos
        NOT: [
          { slug: { contains: "conta" } },
          { slug: { contains: "premium" } },
          { slug: { contains: "assinatura" } }
        ]
      },
      select: {
        id: true,
        name: true,
        slug: true
      }
    });

    const categoriaPermitidaIds = categoriasLicencas.map(cat => cat.id);
    console.log("Categorias de licenças encontradas:", categoriasLicencas.map(c => `${c.id}: ${c.name} (${c.slug})`));

    // Buscar produtos que estejam apenas nas categorias permitidas
    const produtosFiltrados = await prisma.product.findMany({
      where: {
        // Excluir produtos com nomes de contas
        NOT: {
          name: {
            contains: "conta",
            mode: "insensitive"
          }
        },
        Category: {
          // Garantir que o produto está em pelo menos uma categoria permitida
          some: {
            id: {
              in: categoriaPermitidaIds
            }
          },
          // Garantir que o produto não está em categorias não permitidas
          every: {
            id: {
              in: categoriaPermitidaIds
            }
          }
        },
        inStock: true
      },
      include: {
        Category: true,
        lojista: {
          select: {
            username: true,
            photo: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    
    console.log(`Produtos filtrados (apenas licenças): ${produtosFiltrados.length}`);
    
    if (produtosFiltrados.length > 0) {
      console.log("Exemplo de produto:", {
        id: produtosFiltrados[0].id,
        name: produtosFiltrados[0].name,
        categorias: produtosFiltrados[0].Category.map(c => ({id: c.id, name: c.name, slug: c.slug}))
      });
    }

    // Embaralhar os produtos antes de retornar
    const shuffledProdutos = [...produtosFiltrados]
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);

    console.log("Produtos retornados (após filtro e limite):", shuffledProdutos.length);
    
    return NextResponse.json(shuffledProdutos)
  } catch (error) {
    console.error("[PRODUTOS_CATEGORIAS_GET]", error)
    return new NextResponse("Erro interno do servidor", { status: 500 })
  }
}
