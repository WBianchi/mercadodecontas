import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcrypt"

export async function POST(request: NextRequest) {
  try {
    const { token, novaSenha } = await request.json()

    if (!token || !novaSenha) {
      return NextResponse.json(
        { error: "Token e nova senha são obrigatórios" },
        { status: 400 }
      )
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
      return NextResponse.json(
        { error: "Token inválido ou expirado" },
        { status: 400 }
      )
    }

    // Criptografar a nova senha
    const hashedPassword = await hash(novaSenha, 10)

    // Atualizar a senha do usuário com base no tipo
    switch (passwordReset.userType) {
      case "ADMIN":
        await prisma.admin.update({
          where: { id: passwordReset.userId },
          data: { password: hashedPassword }
        })
        break
      
      case "LOJISTA":
        await prisma.lojista.update({
          where: { id: passwordReset.userId },
          data: { password: hashedPassword }
        })
        break
      
      case "CLIENTE":
        await prisma.cliente.update({
          where: { id: passwordReset.userId },
          data: { password: hashedPassword }
        })
        break
      
      default:
        return NextResponse.json(
          { error: "Tipo de usuário não reconhecido" },
          { status: 400 }
        )
    }

    // Remover o token usado
    await prisma.passwordReset.delete({
      where: {
        id: passwordReset.id
      }
    })

    return NextResponse.json(
      { success: true, message: "Senha redefinida com sucesso" },
      { status: 200 }
    )

  } catch (error) {
    console.error("Erro ao redefinir senha:", error)
    return NextResponse.json(
      { error: "Erro ao processar sua solicitação" },
      { status: 500 }
    )
  }
}
