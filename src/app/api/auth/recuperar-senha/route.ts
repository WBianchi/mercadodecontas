import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"
import { sendEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      )
    }

    // Verificar se o usuário existe
    const user = await findUserByEmail(email)

    if (!user) {
      // Por segurança, não revelamos se o email existe ou não
      return NextResponse.json(
        { success: true, message: "Se o email estiver cadastrado, enviaremos instruções para redefinir sua senha." },
        { status: 200 }
      )
    }

    // Gerar token de recuperação
    const token = crypto.randomBytes(32).toString("hex")
    const expiry = new Date()
    expiry.setHours(expiry.getHours() + 1) // Token válido por 1 hora

    // Salvar o token no banco de dados
    await saveResetToken(user.model, user.id, token, expiry)

    // Montar a URL de recuperação
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/redefinir-senha?token=${token}`

    // Enviar email
    await sendEmail({
      to: email,
      subject: "Recuperação de senha - Mercado de Contas",
      text: `Clique no link a seguir para redefinir sua senha: ${resetUrl}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #097bff;">Recuperação de Senha</h2>
          <p>Olá,</p>
          <p>Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para prosseguir:</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #097bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Redefinir Senha
            </a>
          </p>
          <p>Se você não solicitou esta alteração, ignore este email.</p>
          <p>Este link é válido por 1 hora.</p>
          <p>Atenciosamente,<br>Equipe Mercado de Contas</p>
        </div>
      `
    })

    return NextResponse.json(
      { success: true, message: "Email enviado com instruções para redefinir sua senha." },
      { status: 200 }
    )

  } catch (error) {
    console.error("Erro ao processar recuperação de senha:", error)
    return NextResponse.json(
      { error: "Erro ao processar sua solicitação" },
      { status: 500 }
    )
  }
}

// Função auxiliar para encontrar usuário por email
async function findUserByEmail(email: string) {
  // Verificar em Admin
  const admin = await prisma.admin.findFirst({
    where: { email }
  })
  if (admin) return { model: "admin", id: admin.id }

  // Verificar em Lojista
  const lojista = await prisma.lojista.findFirst({
    where: { email }
  })
  if (lojista) return { model: "lojista", id: lojista.id }

  // Verificar em Cliente
  const cliente = await prisma.cliente.findFirst({
    where: { email }
  })
  if (cliente) return { model: "cliente", id: cliente.id }

  return null
}

// Função auxiliar para salvar token de recuperação
async function saveResetToken(model: string, userId: number, token: string, expiry: Date) {
  // Criar ou atualizar o token de recuperação
  await prisma.passwordReset.upsert({
    where: {
      userType_userId: {
        userType: model.toUpperCase(),
        userId
      }
    },
    update: {
      token,
      expiry
    },
    create: {
      userType: model.toUpperCase(),
      userId,
      token,
      expiry
    }
  })
}
