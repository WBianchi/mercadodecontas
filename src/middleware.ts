import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || 
                      req.nextUrl.pathname.startsWith("/cadastro")
    
    if (isAuthPage) {
      if (isAuth) {
        // Redireciona para a página correta baseado no role
        if (token?.role === "ADMIN") {
          return NextResponse.redirect(new URL("/dashboard/admin", req.url))
        } else if (token?.role === "LOJISTA") {
          return NextResponse.redirect(new URL("/dashboard/lojista", req.url))
        } else {
          return NextResponse.redirect(new URL("/meu-perfil", req.url))
        }
      }
      return null
    }

    // Rotas protegidas por role
    const isAdminPage = req.nextUrl.pathname.startsWith("/dashboard/admin")
    const isLojistaPage = req.nextUrl.pathname.startsWith("/dashboard/lojista")
    const isUserAdmin = token?.role === "ADMIN"
    const isUserLojista = token?.role === "LOJISTA"

    if (isAdminPage && !isUserAdmin) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    if (isLojistaPage && !isUserLojista) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
)

// Configurar quais paths precisam de autenticação
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/meu-perfil",
    "/anunciar",
  ],
}
