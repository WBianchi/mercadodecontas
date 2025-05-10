import { Metadata } from "next"
import { getPosts } from "@/lib/prisma"
import { PostCard } from "@/components/blog/post-card"
import { Pagination } from "@/components/pagination"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { HeroSection } from "@/components/blog/hero-section"

export const metadata: Metadata = {
  title: "Blog - Mercado de Contas",
  description: "Leia nossos artigos sobre contas digitais, bancos, finanças e muito mais.",
}

export default async function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
  const posts = await getPosts()

  // Configuração da paginação
  const postsPerPage = 9
  const currentPage = Number(searchParams?.page) || 1
  const totalPages = Math.ceil(posts.length / postsPerPage)
  
  // Calcular posts da página atual
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const displayPosts = posts.slice(startIndex, endIndex).map(post => ({
    id: post.id,
    title: post.title,
    description: post.shortDescription,
    image: post.thumbnail || '/blog/default.jpg',
    categoria: post.categories[0]?.name || 'Geral',
    tempoLeitura: `${post.readTime} min`,
    data: new Date(post.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    slug: post.slug
  }))

  // Função para gerar array de páginas visíveis
  const getVisiblePages = (current: number, total: number) => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
    
    if (current <= 3) return [1, 2, 3, 4, 5]
    if (current >= total - 2) return [total - 4, total - 3, total - 2, total - 1, total]
    
    return [current - 2, current - 1, current, current + 1, current + 2]
  }

  const visiblePages = getVisiblePages(currentPage, totalPages)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-2 flex-wrap px-4">
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300 border-2"
                disabled={currentPage === 1}
                asChild
              >
                <a href={`/blog?page=${currentPage - 1}`}>
                  <ChevronLeft className="h-4 w-4" />
                </a>
              </Button>

              {visiblePages.map((page, index) => {
                if (index > 0 && page - visiblePages[index - 1] > 1) {
                  return (
                    <span key={`ellipsis-${page}`} className="px-2">...</span>
                  )
                }
                return (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    asChild
                    className={`
                      w-10 h-10 rounded-full font-medium text-base transition-all duration-300 border-2
                      ${page === currentPage 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white border-transparent hover:shadow-lg hover:shadow-blue-200/50 scale-110'
                        : 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                      }
                    `}
                  >
                    <a href={`/blog?page=${page}`}>
                      {page}
                    </a>
                  </Button>
                )
              })}

              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300 border-2"
                disabled={currentPage === totalPages}
                asChild
              >
                <a href={`/blog?page=${currentPage + 1}`}>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
