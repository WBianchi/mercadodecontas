"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image";
import { useTheme } from "next-themes"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MiniCart } from "../mini-cart"
import { MegaModal } from "../mega-modal"
import { FiltrosLoja } from "@/components/filtros-loja"
import { 
  Menu, 
  Search, 
  ShoppingCart, 
  Sun, 
  Moon,
  User,
  LogIn,
  UserCircle,
  ShoppingBag,
  Heart,
  LogOut,
  TrendingUp,
  Search as SearchIcon,
  Percent,
  Tag,
  Users,
  Newspaper,
  MessageCircle,
  Headphones,
  HelpCircle,
  ChevronRight,
  UserPlus,
  UserX,
  Store,
  Package,
  Ticket,
  BarChart2,
  LayoutDashboard,
  DollarSign,
  FileText,
  Loader2,
  ChevronDown,
  Crown,
  Globe,
  Key,
  PlusCircle,
} from "lucide-react"
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const menuItems = [
  { name: "Contas online", href: "/contas", icon: <Globe className="w-4 h-4" /> },
  { name: "Licenças digitais", href: "/licencas", icon: <Key className="w-4 h-4" /> },
  { name: "Mais vendidos", href: "/mais-vendidos", icon: <TrendingUp className="w-4 h-4" /> },
  { name: "Mais pesquisados", href: "/mais-pesquisados", icon: <SearchIcon className="w-4 h-4" /> },
  { name: "Promoções", href: "/promocoes", icon: <Percent className="w-4 h-4" /> },
  { name: "Ofertas", href: "/ofertas", icon: <Tag className="w-4 h-4" /> },
  { name: "Quem somos", href: "/sobre", icon: <Users className="w-4 h-4" /> },
  { name: "Nosso Blog", href: "/blog", icon: <Newspaper className="w-4 h-4" /> },
  { name: "Como funciona", href: "/como-funciona", icon: <MessageCircle className="w-4 h-4" /> },
  { name: "Atendimento", href: "/contato", icon: <Headphones className="w-4 h-4" /> },
  { name: "Dúvidas frequentes", href: "/ajuda", icon: <HelpCircle className="w-4 h-4" /> },
  { name: "Anunciar", href: "/anunciar", icon: <PlusCircle className="w-4 h-4" /> },
]

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filtrosModalOpen, setFiltrosModalOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { data: session, status } = useSession()
  const router = useRouter()

  // Determina o role do usuário
  const getUserRole = () => {
    if (!session?.user) return "guest"
    
    // Verifica o role do usuário
    const userRole = session.user.role?.toLowerCase()
    
    if (userRole === "admin") return "admin"
    if (userRole === "seller" || userRole === "lojista") return "seller"
    return "user"
  }

  const menuItemsDropdown = {
    guest: [
      {
        icon: <LogIn className="mr-2 h-4 w-4" />,
        label: "Entrar",
        href: "/login",
      },
      {
        icon: <UserPlus className="mr-2 h-4 w-4" />,
        label: "Criar Conta",
        href: "/cadastro",
      },
    ],
    user: [
      {
        icon: <UserCircle className="mr-2 h-4 w-4" />,
        label: "Meu Perfil",
        href: "/meu-perfil?tab=profile",
      },
      {
        icon: <ShoppingBag className="mr-2 h-4 w-4" />,
        label: "Meus Pedidos",
        href: "/meu-perfil?tab=orders",
      },
      {
        icon: <Heart className="mr-2 h-4 w-4" />,
        label: "Meus Favoritos",
        href: "/meu-perfil?tab=favorites",
      },
      {
        icon: <Ticket className="mr-2 h-4 w-4" />,
        label: "Meus Cupons",
        href: "/meu-perfil?tab=coupons",
      },
    ],
    seller: [
      {
        icon: <Store className="mr-2 h-4 w-4" />,
        label: "Minhas vendas",
        href: "/dashboard/lojista/vendas",
      },
      {
        icon: <Package className="mr-2 h-4 w-4" />,
        label: "Meus anúncios",
        href: "/dashboard/lojista/anuncios",
      },
      {
        icon: <Users className="mr-2 h-4 w-4" />,
        label: "Clientes",
        href: "/dashboard/lojista/clientes",
      },
      {
        icon: <Ticket className="mr-2 h-4 w-4" />,
        label: "Cupons",
        href: "/dashboard/lojista/cupons",
      },
      {
        icon: <BarChart2 className="mr-2 h-4 w-4" />,
        label: "Relatórios",
        href: "/dashboard/lojista/relatorios",
      },
    ],
    admin: [
      {
        icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
        label: "Visão Geral",
        href: "/dashboard/admin",
      },
      {
        icon: <DollarSign className="mr-2 h-4 w-4" />,
        label: "Vendas",
        href: "/dashboard/admin/vendas",
      },
      {
        icon: <Store className="mr-2 h-4 w-4" />,
        label: "Lojistas",
        href: "/dashboard/admin/lojistas",
      },
      {
        icon: <Users className="mr-2 h-4 w-4" />,
        label: "Clientes",
        href: "/dashboard/admin/clientes",
      },
      {
        icon: <BarChart2 className="mr-2 h-4 w-4" />,
        label: "Relatórios",
        href: "/dashboard/admin/relatorios",
      },
      {
        icon: <FileText className="mr-2 h-4 w-4" />,
        label: "Logs",
        href: "/dashboard/admin/logs",
      },
    ],
  }

  const userRole = getUserRole()
  const currentMenuItems = menuItemsDropdown[userRole]

  console.log('Session:', session)
  console.log('User Role:', userRole)
  console.log('Current Menu Items:', currentMenuItems)

  // Função para verificar se deve abrir o modal de filtros
  const handleSearchInput = (value: string) => {
    setSearchTerm(value)
    
    // Abre o modal de filtros se o usuário digitar pelo menos 4 caracteres
    if (value.length >= 4 && !filtrosModalOpen) {
      setFiltrosModalOpen(true)
    }
  }
  
  // Função para enviar a busca
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/busca?q=${encodeURIComponent(searchTerm)}`)
      setFiltrosModalOpen(true)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Menu, Logo & Search */}
          <div className="flex items-center gap-4 flex-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <div className="bg-gradient-to-b from-blue-50/50 to-white/50 h-full">
                  <div className="p-6 border-b border-blue-100/50">
                    <SheetTitle className="text-xl font-semibold text-blue-950 flex items-center gap-2">
                      <Image
                        src="/logo-mercadodecontas.svg"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="rounded"
                      />
                      Menu Principal
                    </SheetTitle>
                  </div>

                  <div className="py-6 px-3">
                    <div className="space-y-1">
                      {menuItems.map((item, index) => (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-950 hover:bg-blue-100/50 hover:text-blue-600 transition-all group relative"
                          >
                            <span className="bg-blue-500/10 p-2 rounded-lg text-blue-600 group-hover:scale-110 transition-transform duration-300">
                              {item.icon}
                            </span>
                            <span>{item.name}</span>
                            <ChevronRight className="w-4 h-4 text-blue-300 absolute right-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-blue-100/50 bg-gradient-to-t from-blue-50/50 to-transparent">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="text-blue-600 border-blue-100"
                      >
                        {theme === "dark" ? (
                          <Sun className="h-4 w-4" />
                        ) : (
                          <Moon className="h-4 w-4" />
                        )}
                        <span className="ml-2 text-xs">{theme === "dark" ? "Modo Claro" : "Modo Escuro"}</span>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-blue-600 border-blue-100"
                      >
                        <Link href="/ajuda">
                          <HelpCircle className="h-4 w-4" />
                          <span className="ml-2 text-xs">Ajuda</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className="text-xl font-bold text-[#097bff] shrink-0">
  <Image 
    src="/logo-mercadodecontas.svg" 
    alt="Mercado de Contas"
    width={70} 
    height={70}
    className="mb-1.3"
  />
</Link>

            {/* Search Bar */}
            <div className="hidden sm:flex relative flex-1 max-w-xl mx-4">
              <form onSubmit={handleSearchSubmit} className="w-full">
                <Input
                  type="search"
                  placeholder="Pesquisar..."
                  className="w-full"
                  prefix={<Search className="h-4 w-4 text-gray-400" />}
                  value={searchTerm}
                  onChange={(e) => handleSearchInput(e.target.value)}
                />
              </form>
            </div>
          </div>

          {/* Right Section - Nav, Theme, Wishlist, Cart, Profile */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              <MegaModal />
              <div className="bg-blue-50 dark:bg-slate-900 rounded-lg px-4 py-2 flex items-center gap-4">
                <Link 
                  href="/licencas" 
                  className="group text-sm font-medium text-[#097bff] dark:text-blue-400 hover:text-white hover:bg-[#097bff] transition-all px-3 py-1.5 rounded-md flex items-center gap-2"
                >
                  <Key className="w-4 h-4 text-[#097bff] dark:text-blue-400 group-hover:text-white transition-colors" />
                  Licenças Digitais
                </Link>
                <div className="w-px h-4 bg-blue-200 dark:bg-slate-700" />
                <Link 
                  href="/contas" 
                  className="group text-sm font-medium text-[#097bff] dark:text-blue-400 hover:text-white hover:bg-[#097bff] transition-all px-3 py-1.5 rounded-md flex items-center gap-2"
                >
                  <Crown className="w-4 h-4 text-[#097bff] dark:text-blue-400 group-hover:text-white transition-colors" />
                  Contas Premium
                </Link>
              </div>
              
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <DropdownMenu open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
                  <Heart className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Você ainda não adicionou favoritos
                  </p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <MiniCart />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                {status === "loading" ? (
                  <div className="p-4 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : !session ? (
                  <div className="p-4">
                    <div className="flex flex-col items-center text-center gap-3">
                      <UserX className="h-8 w-8 text-muted-foreground" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Você está desconectado</p>
                        <p className="text-xs text-muted-foreground">Entre para acessar sua conta</p>
                      </div>
                      <div className="flex gap-2 w-full">
                        <Button asChild className="w-full" size="sm">
                          <Link href="/login">Entrar</Link>
                        </Button>
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <Link href="/cadastro">Criar Conta</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-3 border-b">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full shrink-0">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-medium truncate">{session.user?.name}</span>
                          <span className="text-xs text-muted-foreground truncate">{session.user?.email}</span>
                          <span className="text-xs text-blue-600 capitalize">{userRole}</span>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      {currentMenuItems.map((item) => (
                        <DropdownMenuItem key={item.href} asChild className="px-3 py-2">
                          <Link href={item.href} className="w-full flex items-center gap-2">
                            <div className="shrink-0">{item.icon}</div>
                            <span className="truncate">{item.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <div className="border-t py-1">
                      <DropdownMenuItem 
                        className="text-red-600 dark:text-red-400 cursor-pointer px-3 py-2"
                        onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        <div className="shrink-0">
                          <LogOut className="mr-2 h-4 w-4" />
                        </div>
                        <span>Sair</span>
                      </DropdownMenuItem>
                    </div>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              className="hidden sm:flex rounded-full font-poppins bg-gradient-to-r from-[#097bff] to-blue-600 text-white hover:opacity-90 transition-all duration-200"
            >
              <Link href="/anunciar" className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                Anunciar
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden py-2">
          <form onSubmit={handleSearchSubmit}>
            <Input
              type="search"
              placeholder="Pesquisar..."
              className="w-full"
              prefix={<Search className="h-4 w-4 text-gray-400" />}
              value={searchTerm}
              onChange={(e) => handleSearchInput(e.target.value)}
            />
          </form>
        </div>
      </div>
      
      {/* Modal de Filtros */}
      <FiltrosLoja 
        open={filtrosModalOpen} 
        onOpenChange={setFiltrosModalOpen} 
        initialSearchTerm={searchTerm}
      />
    </header>
  )
}
