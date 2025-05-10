import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { prisma } from "./prisma"
import { compare } from "bcrypt"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Credenciais não fornecidas")
          throw new Error("Credenciais inválidas")
        }

        console.log("Tentando login com:", credentials.email)

        // Primeiro tenta encontrar um admin
        const admin = await prisma.admin.findFirst({
          where: {
            email: credentials.email,
            status: "ACTIVE"
          }
        })

        console.log("Admin encontrado:", admin)

        if (admin) {
          const passwordMatch = await compare(credentials.password, admin.password)
          console.log("Admin password match:", passwordMatch)
          
          if (passwordMatch) {
            return {
              id: admin.id.toString(),
              email: admin.email,
              name: admin.username,
              role: admin.role
            }
          }
        }

        // Se não for admin, tenta lojista
        const lojista = await prisma.lojista.findFirst({
          where: {
            email: credentials.email
          }
        })

        console.log("Lojista encontrado:", lojista)

        if (lojista) {
          const passwordMatch = await compare(credentials.password, lojista.password)
          console.log("Lojista password match:", passwordMatch)

          if (passwordMatch) {
            // Se o lojista estiver pendente
            if (lojista.status === "pending") {
              console.log("Lojista pendente")
              throw new Error("Sua conta está em análise. Em breve você receberá um email com a aprovação.")
            }

            // Se o lojista estiver inativo
            if (lojista.status === "inactive") {
              console.log("Lojista inativo")
              throw new Error("Sua conta está inativa. Entre em contato com o suporte.")
            }

            console.log("Login do lojista bem sucedido")
            return {
              id: String(lojista.id),
              email: lojista.email,
              name: lojista.username,
              role: lojista.role
            }
          }
        }

        // Se não for lojista, tenta cliente
        const cliente = await prisma.cliente.findFirst({
          where: {
            email: credentials.email
          }
        })

        console.log("Cliente encontrado:", cliente)

        if (cliente) {
          const passwordMatch = await compare(credentials.password, cliente.password)
          console.log("Cliente password match:", passwordMatch)

          if (passwordMatch) {
            // Se o cliente estiver inativo
            if (cliente.status === "inactive") {
              console.log("Cliente inativo")
              throw new Error("Sua conta está inativa. Entre em contato com o suporte.")
            }

            console.log("Login do cliente bem sucedido")
            return {
              id: cliente.id.toString(),
              email: cliente.email,
              name: cliente.username,
              role: cliente.role
            }
          }
        }

        console.log("Nenhum usuário encontrado ou senha incorreta")
        throw new Error("Credenciais inválidas")
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Caso o login seja por provedor social
      if (account && account.provider && user) {
        // Verificar se o email já existe
        const email = user.email as string;
        
        // Buscar usuário pelo email
        const existingUser = await findUserByEmail(email);
        
        if (existingUser) {
          // Se o usuário já existe, associamos o login social com esse usuário
          token.role = existingUser.role;
          token.id = String(existingUser.id);
        } else {
          // Se não existe, criamos um novo usuário cliente
          const newUser = await prisma.cliente.create({
            data: {
              email: email,
              username: user.name || email.split('@')[0],
              password: '', // Senha vazia para usuários de login social
              status: 'active',
              role: 'CLIENTE'
            }
          });
          
          token.role = 'CLIENTE';
          token.id = String(newUser.id);
        }
        
        return token;
      }
      
      // Caso normal de login com credenciais
      if (user) {
        return {
          ...token,
          role: user.role,
          id: user.id
        }
      }
      return token
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
          id: token.id
        }
      }
    }
  }
}

// Função auxiliar para encontrar usuário por email
async function findUserByEmail(email: string) {
  // Verificar em Admin
  const admin = await prisma.admin.findFirst({
    where: { email }
  });
  if (admin) return { model: "admin", id: admin.id, role: admin.role };

  // Verificar em Lojista
  const lojista = await prisma.lojista.findFirst({
    where: { email }
  });
  if (lojista) return { model: "lojista", id: lojista.id, role: lojista.role };

  // Verificar em Cliente
  const cliente = await prisma.cliente.findFirst({
    where: { email }
  });
  if (cliente) return { model: "cliente", id: cliente.id, role: cliente.role };

  return null;
}
