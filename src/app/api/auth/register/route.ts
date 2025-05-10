import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { role = "CLIENTE" } = data

    // Verifica se o email já existe (tanto em lojista quanto em cliente)
    const existingUserLojista = await prisma.lojista.findUnique({
      where: { email: data.email },
    })

    const existingUserCliente = await prisma.cliente.findUnique({
      where: { email: data.email },
    })

    if (existingUserLojista || existingUserCliente) {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 400 }
      )
    }

    // Hash da senha
    const hashedPassword = await hash(data.password, 10)

    if (role === "LOJISTA") {
      const {
        username,
        email,
        password,
        corporateName,
        cpfCnpj,
        phone,
        businessType,
        businessCategory,
        description,
        address,
        number,
        neighborhood,
        city,
        state,
      } = data

      // Verifica se o CNPJ já existe
      const existingCNPJ = await prisma.lojista.findFirst({
        where: { cpfCnpj },
      })

      if (existingCNPJ) {
        return NextResponse.json(
          { error: "CNPJ já cadastrado" },
          { status: 400 }
        )
      }

      // Cria o lojista
      const lojista = await prisma.lojista.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: "LOJISTA",
          corporateName,
          cpfCnpj,
          address,
          number,
          neighborhood,
          city,
          state,
          description,
          status: "pending",
          lojistaCommission: 0,
          photo: null,
          banner: null,
          gallery: [],
          workingHours: [],
          facebook: null,
          instagram: null,
          youtube: null,
          linkedin: null,
          tiktok: null,
          x: null,
          telegram: null,
        },
      })

      return NextResponse.json(
        {
          message: "Conta de lojista criada com sucesso",
          user: {
            id: lojista.id,
            email: lojista.email,
            username: lojista.username,
            role: lojista.role,
          }
        },
        { status: 201 }
      )
    } else {
      // Cria o cliente
      const { username, email } = data
      
      const cliente = await prisma.cliente.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: "CLIENTE",
          status: "active",
          wpUsername: username,
          wpEmail: email,
          wpRole: "customer",
          wpFirstName: username,
          wpLastName: "",
          wpUserId: null,
          wpBillingAddress: null,
          wpShippingAddress: null,
          wpMetadata: null,
        },
      })

      return NextResponse.json(
        {
          message: "Conta de cliente criada com sucesso",
          user: {
            id: cliente.id,
            email: cliente.email,
            username: cliente.username,
            role: cliente.role,
          }
        },
        { status: 201 }
      )
    }
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error)
    return NextResponse.json(
      { error: "Erro ao criar conta: " + error.message },
      { status: 500 }
    )
  }
}
