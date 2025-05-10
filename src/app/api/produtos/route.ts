import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import slugify from 'slugify'
import { createCleanSlug } from "@/lib/utils"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return new NextResponse("Não autorizado", { status: 401 })
    }

    const userId = session.user.id
    const userRole = session.user.role
    console.log("Usuário:", session.user)
    console.log("Role:", userRole)
    const formData = await req.formData()
    
    // Extrair dados do formData
    const name = formData.get("name") as string
    const shortDescription = formData.get("shortDescription") as string
    const description = formData.get("description") as string
    const sku = formData.get("sku") as string || ""
    const stockQuantity = parseInt(formData.get("stockQuantity") as string || "0")
    const price = parseFloat(formData.get("price") as string || "0")
    const discountPrice = parseFloat(formData.get("discountPrice") as string || "0")
    const deliveryType = formData.get("deliveryType") as string || "link"
    const deliveryTime = formData.get("deliveryTime") as string || "24h"
    const refundTime = formData.get("refundTime") as string || "7d"
    const fileLink = formData.get("fileLink") as string || ""
    const seoScore = parseInt(formData.get("seoScore") as string || "0")
    const productPhoto = formData.get("productPhoto") as string || ""
    const categoryId = formData.get("categoryId") as string
    const tags = formData.get("tags") as string
    
    let slug = name ? createCleanSlug(name) : "";
    
    // Se já existe um produto com esse slug, adicione um sufixo aleatório
    if (slug) {
      const existingProduct = await prisma.product.findFirst({
        where: { slug }
      });

      if (existingProduct) {
        // Adiciona um sufixo aleatório ao slug
        const randomSuffix = Math.floor(Math.random() * 1000);
        slug = `${slug}-${randomSuffix}`;
      }
    }
    
    // Verificar se o usuário é admin ou lojista
    if (userRole === "ADMIN") {
      // Se for admin, seguir com o primeiro lojista disponível
      console.log("Admin criando produto")
      const primeiroLojista = await prisma.lojista.findFirst({
        orderBy: { id: 'asc' }
      })
      
      if (!primeiroLojista) {
        return new NextResponse("Nenhum lojista encontrado no sistema", { status: 404 })
      }
      
      // Criar produto com o primeiro lojista disponível
      const produto = await prisma.product.create({
        data: {
          name,
          slug,
          shortDescription,
          description,
          sku,
          stockQuantity,
          price,
          discountPrice,
          fileLink,
          seoScore,
          productPhoto,
          lojistaId: primeiroLojista.id,
          inStock: true,
          productGallery: [],
          deliveryType,
          deliveryTime,
          refundTime
        }
      })

      // Associar categorias se fornecidas
      if (categoryId) {
        await prisma.product.update({
          where: { id: produto.id },
          data: {
            Category: {
              connect: { id: parseInt(categoryId) }
            }
          }
        })
      }

      // Associar tags se fornecidas
      if (tags) {
        const tagArray = JSON.parse(tags) as string[]
        if (tagArray.length > 0) {
          // Para cada tag, verificar se já existe ou criar nova
          for (const tagName of tagArray) {
            let tag = await prisma.tag.findFirst({
              where: { name: tagName }
            })
            
            // Se a tag não existir, criar
            if (!tag) {
              tag = await prisma.tag.create({
                data: {
                  name: tagName
                }
              })
            }
            
            // Associar tag ao produto
            await prisma.product.update({
              where: { id: produto.id },
              data: {
                tags: {
                  connect: { id: tag.id }
                }
              }
            })
          }
        }
      }

      return NextResponse.json(produto)
    } else {
      // Se for lojista, buscar o lojista pelo email
      const lojista = await prisma.lojista.findFirst({
        where: {
          OR: [
            { email: session.user.email },
            { wpMetadata: { path: ['email'], equals: session.user.email } }
          ]
        }
      })
      
      if (!lojista) {
        return new NextResponse("Lojista não encontrado", { status: 404 })
      }
      
      console.log("Criando produto para o lojista:", lojista.email)
      
      // Criar produto
      const produto = await prisma.product.create({
        data: {
          name,
          slug,
          shortDescription,
          description,
          sku,
          stockQuantity,
          price,
          discountPrice,
          fileLink,
          seoScore,
          productPhoto,
          lojistaId: lojista.id,
          inStock: true,
          productGallery: [],
          deliveryType,
          deliveryTime,
          refundTime
        }
      })

      // Associar categorias se fornecidas
      if (categoryId) {
        await prisma.product.update({
          where: { id: produto.id },
          data: {
            Category: {
              connect: { id: parseInt(categoryId) }
            }
          }
        })
      }

      // Associar tags se fornecidas
      if (tags) {
        const tagArray = JSON.parse(tags) as string[]
        if (tagArray.length > 0) {
          // Para cada tag, verificar se já existe ou criar nova
          for (const tagName of tagArray) {
            let tag = await prisma.tag.findFirst({
              where: { name: tagName }
            })
            
            // Se a tag não existir, criar
            if (!tag) {
              tag = await prisma.tag.create({
                data: {
                  name: tagName
                }
              })
            }
            
            // Associar tag ao produto
            await prisma.product.update({
              where: { id: produto.id },
              data: {
                tags: {
                  connect: { id: tag.id }
                }
              }
            })
          }
        }
      }

      return NextResponse.json(produto)
    }
  } catch (error) {
    console.error("[PRODUTOS_POST]", error)
    return new NextResponse("Erro interno do servidor", { status: 500 })
  }
}
