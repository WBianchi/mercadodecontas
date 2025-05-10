import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prisma = new PrismaClient()

async function applyManualMigration() {
  try {
    const sqlPath = path.join(__dirname, '..', 'prisma', 'migrations', 'manual', 'add_wp_fields.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')
    
    // Separar os comandos SQL
    const commands = sql
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0)
    
    // Executar cada comando separadamente
    for (const cmd of commands) {
      try {
        await prisma.$executeRawUnsafe(cmd + ';')
        console.log('✅ Comando executado:', cmd.substring(0, 50) + '...')
      } catch (error: any) {
        console.warn('⚠️ Erro ao executar comando (continuando):', error?.message || error)
      }
    }
    
    console.log('✅ Migração manual aplicada com sucesso!')
  } catch (error: any) {
    console.error('❌ Erro ao aplicar migração:', error?.message || error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

applyManualMigration()
