export interface Category {
  id: number
  name: string
  description: string
  icon: string
  image: string
  slug: string
  createdAt?: Date
  updatedAt?: Date
}

export type CategoryIcon = "Zap" | "Star" | "ShieldCheck"

export const categories: Category[] = [
  {
    id: 1,
    name: "Streaming",
    slug: "streaming",
    icon: "Play",
    image: "/categories/streaming.jpg"
  },
  {
    id: 2,
    name: "Redes Sociais",
    slug: "redes-sociais",
    icon: "Share2",
    image: "/categories/social-media.jpg"
  },
  {
    id: 3,
    name: "Jogos",
    slug: "jogos",
    icon: "Gamepad2",
    image: "/categories/games.jpg"
  },
  {
    id: 4,
    name: "Produtividade",
    slug: "produtividade",
    icon: "Laptop",
    image: "/categories/productivity.jpg"
  },
  {
    id: 5,
    name: "Design",
    slug: "design",
    icon: "Palette",
    image: "/categories/design.jpg"
  },
  {
    id: 6,
    name: "Educação",
    slug: "educacao",
    icon: "GraduationCap",
    image: "/categories/education.jpg"
  },
  {
    id: 7,
    name: "Marketing",
    slug: "marketing",
    icon: "Target",
    image: "/categories/marketing.jpg"
  },
  {
    id: 8,
    name: "Desenvolvimento",
    slug: "desenvolvimento",
    icon: "Code2",
    image: "/categories/development.jpg"
  },
  {
    id: 9,
    name: "Segurança",
    slug: "seguranca",
    icon: "Shield",
    image: "/categories/security.jpg"
  },
  {
    id: 10,
    name: "Inteligência Artificial",
    slug: "inteligencia-artificial",
    icon: "Brain",
    image: "/categories/ai.jpg"
  }
]
