import { Metadata } from "next"
import { getPostBySlug } from "@/lib/prisma"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { notFound } from "next/navigation"
import { Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post não encontrado - Mercado de Contas',
      description: 'O post que você procura não foi encontrado.'
    }
  }

  return {
    title: `${post.title} - Blog Mercado de Contas`,
    description: post.shortDescription,
    openGraph: {
      title: post.title,
      description: post.shortDescription,
      type: 'article',
      url: `https://mercadodecontas.com.br/blog/${post.slug}`,
      images: [
        {
          url: post.thumbnail || '/blog/default.jpg',
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    }
  }
}

export default async function BlogPostPage({ params }: any) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const formattedDate = format(new Date(post.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
        <img 
          src={post.thumbnail || '/blog/default.jpg'} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((category) => (
                  <Badge 
                    key={category.id}
                    className="bg-blue-500 hover:bg-blue-600 text-white border-none text-sm"
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-poppins">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{post.readTime} min de leitura</span>
                </div>
                <span>•</span>
                <time dateTime={post.createdAt}>{formattedDate}</time>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto prose prose-lg prose-headings:font-poppins">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </article>
  )
}
