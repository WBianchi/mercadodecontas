"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function SiteMap() {
  const siteMapData = [
    {
      title: "Licenças",
      description: "Software, sistemas operacionais e chaves de ativação originais",
      href: "/licencas",
      icon: "💻"
    },
    {
      title: "Contas",
      description: "Contas verificadas para redes sociais e plataformas digitais",
      href: "/contas",
      icon: "👤"
    },
    {
      title: "Anúncios",
      description: "Encontre ofertas especiais e produtos em destaque",
      href: "/anuncios",
      icon: "🔥"
    },
    {
      title: "Blog",
      description: "Dicas, tutoriais e notícias sobre o mundo digital",
      href: "/blog",
      icon: "📝"
    },
    {
      title: "Como Funciona",
      description: "Saiba como comprar com segurança em nossa plataforma",
      href: "/como-funciona",
      icon: "🛡️"
    }
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 font-poppins">Navegue pelo Mercado de Contas</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            O maior marketplace brasileiro de contas de redes sociais, licenças digitais e assinaturas de streaming,
            com garantia de funcionamento e suporte dedicado.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteMapData.map((item) => (
            <Link 
              key={item.title}
              href={item.href}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700 group"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 font-poppins text-[#0a7afd] group-hover:text-[#0961c3] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                {item.description}
              </p>
              <div className="flex items-center text-[#0a7afd] font-medium group-hover:text-[#0961c3] transition-colors duration-300">
                <span>Explorar</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
