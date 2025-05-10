import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    const adminPassword = await hash("admin123", 12)

    const admin = await prisma.admin.upsert({
      where: { email: "admin@mercadodecontas.com" },
      update: {},
      create: {
        email: "admin@mercadodecontas.com",
        username: "admin",
        password: adminPassword,
        role: "ADMIN",
        status: "ACTIVE",
        adminCommission: 10.0,
      },
    })

    console.log("Admin criado com sucesso:", admin)
  } catch (error) {
    console.error("Erro ao criar admin:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
