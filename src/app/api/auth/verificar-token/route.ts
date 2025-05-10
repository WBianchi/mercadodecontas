import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ valid: false }, { status: 400 })
    }

    // Buscar token no banco de dados
    const passwordReset = await prisma.passwordReset.findFirst({
      where: {
        token,
        expiry: {
          gt: new Date() // Token não expirado
        }
      }
    })

    if (!passwordReset) {
      return NextResponse.json({ valid: false }, { status: 200 })
    }

    return NextResponse.json({ valid: true }, { status: 200 })
  } catch (error) {
    console.error("Erro ao verificar token:", error)
    return NextResponse.json(
      { valid: false, error: "Erro ao verificar token" },
      { status: 500 }
    )
  }
}
