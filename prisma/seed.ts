import { PrismaClient } from '@prisma/client'
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  const categories = [
    // Streaming e Entretenimento
    {
      name: "Netflix",
      slug: "netflix",
      description: "Acesso premium à maior plataforma de streaming de filmes e séries",
      icon: "Play",
      image: "/categories/netflix.jpg"
    },
    {
      name: "Amazon Prime",
      slug: "amazon-prime",
      description: "Streaming de vídeo, música e benefícios exclusivos da Amazon",
      icon: "MonitorPlay",
      image: "/categories/amazon-prime.jpg"
    },
    {
      name: "Disney+",
      slug: "disney-plus",
      description: "Conteúdo exclusivo Disney, Marvel, Star Wars e National Geographic",
      icon: "Play",
      image: "/categories/disney-plus.jpg"
    },
    {
      name: "HBO Max",
      slug: "hbo-max",
      description: "Séries premiadas e conteúdo exclusivo da HBO",
      icon: "Play",
      image: "/categories/hbo-max.jpg"
    },
    {
      name: "Spotify Premium",
      slug: "spotify-premium",
      description: "Música sem anúncios, offline e em alta qualidade",
      icon: "Music",
      image: "/categories/spotify.jpg"
    },
    {
      name: "Apple Music",
      slug: "apple-music",
      description: "Streaming de música da Apple com milhões de músicas",
      icon: "Music",
      image: "/categories/apple-music.jpg"
    },

    // Redes Sociais
    {
      name: "Instagram",
      slug: "instagram",
      description: "Contas e serviços premium para Instagram",
      icon: "Instagram",
      image: "/categories/instagram.jpg"
    },
    {
      name: "Facebook",
      slug: "facebook",
      description: "Contas e serviços para Facebook",
      icon: "Facebook",
      image: "/categories/facebook.jpg"
    },
    {
      name: "TikTok",
      slug: "tiktok",
      description: "Contas e serviços para TikTok",
      icon: "Video",
      image: "/categories/tiktok.jpg"
    },
    {
      name: "YouTube",
      slug: "youtube",
      description: "YouTube Premium e serviços relacionados",
      icon: "Youtube",
      image: "/categories/youtube.jpg"
    },
    {
      name: "WhatsApp",
      slug: "whatsapp",
      description: "Serviços e recursos premium para WhatsApp",
      icon: "MessageCircle",
      image: "/categories/whatsapp.jpg"
    },
    {
      name: "Kwai",
      slug: "kwai",
      description: "Contas e serviços para Kwai",
      icon: "Video",
      image: "/categories/kwai.jpg"
    },

    // Software e Sistemas
    {
      name: "Windows",
      slug: "windows",
      description: "Licenças originais do Windows",
      icon: "Monitor",
      image: "/categories/windows.jpg"
    },
    {
      name: "Office 365",
      slug: "office-365",
      description: "Pacote completo Microsoft Office com recursos premium",
      icon: "FileText",
      image: "/categories/office.jpg"
    },
    {
      name: "Adobe Creative Cloud",
      slug: "adobe-creative-cloud",
      description: "Suite completa de aplicativos Adobe para criação",
      icon: "Palette",
      image: "/categories/adobe.jpg"
    },
    {
      name: "Sistemas Operacionais",
      slug: "sistemas-operacionais",
      description: "Diversos sistemas operacionais e licenças",
      icon: "Laptop",
      image: "/categories/os.jpg"
    },
    {
      name: "Licenças Digitais",
      slug: "licencas-digitais",
      description: "Licenças originais para diversos softwares",
      icon: "Key",
      image: "/categories/licenses.jpg"
    },
    {
      name: "VPNs e Segurança",
      slug: "vpns-seguranca",
      description: "Serviços de VPN e proteção digital",
      icon: "Lock",
      image: "/categories/vpn.jpg"
    },

    // Design e Criação
    {
      name: "Canva PRO",
      slug: "canva-pro",
      description: "Ferramenta profissional de design gráfico online",
      icon: "Brush",
      image: "/categories/canva.jpg"
    },
    {
      name: "Filmora",
      slug: "filmora",
      description: "Editor de vídeo profissional",
      icon: "Video",
      image: "/categories/filmora.jpg"
    },
    {
      name: "After Effects",
      slug: "after-effects",
      description: "Software profissional para efeitos visuais e motion graphics",
      icon: "PenTool",
      image: "/categories/after-effects.jpg"
    },
    {
      name: "Final Cut Pro",
      slug: "final-cut-pro",
      description: "Editor de vídeo profissional da Apple",
      icon: "Video",
      image: "/categories/final-cut.jpg"
    },
    {
      name: "CorelDRAW",
      slug: "coreldraw",
      description: "Software profissional de design vetorial",
      icon: "PenTool",
      image: "/categories/corel.jpg"
    },
    {
      name: "AutoCAD",
      slug: "autocad",
      description: "Software profissional para design e engenharia",
      icon: "Boxes",
      image: "/categories/autocad.jpg"
    },

    // Games e Entretenimento
    {
      name: "Xbox Game Pass",
      slug: "xbox-game-pass",
      description: "Assinatura de jogos para Xbox e PC",
      icon: "Gamepad2",
      image: "/categories/xbox.jpg"
    },
    {
      name: "PlayStation Plus",
      slug: "playstation-plus",
      description: "Assinatura premium para PlayStation",
      icon: "Gamepad2",
      image: "/categories/playstation.jpg"
    },
    {
      name: "Steam Gift Cards",
      slug: "steam-gift-cards",
      description: "Cartões presente para a plataforma Steam",
      icon: "Gamepad2",
      image: "/categories/steam.jpg"
    },
    {
      name: "Epic Games",
      slug: "epic-games",
      description: "Contas e produtos da Epic Games Store",
      icon: "Gamepad2",
      image: "/categories/epic.jpg"
    },
    {
      name: "Free Fire",
      slug: "free-fire",
      description: "Diamantes e itens para Free Fire",
      icon: "Gamepad2",
      image: "/categories/free-fire.jpg"
    },
    {
      name: "IMVU",
      slug: "imvu",
      description: "Créditos e itens para IMVU",
      icon: "Gamepad2",
      image: "/categories/imvu.jpg"
    },

    // Educação e Produtividade
    {
      name: "Cursos Online",
      slug: "cursos-online",
      description: "Acesso a plataformas de ensino online",
      icon: "BookOpen",
      image: "/categories/courses.jpg"
    },
    {
      name: "Notion PRO",
      slug: "notion-pro",
      description: "Ferramenta premium de produtividade e organização",
      icon: "FileText",
      image: "/categories/notion.jpg"
    },
    {
      name: "Google Drive Ilimitado",
      slug: "google-drive",
      description: "Armazenamento ilimitado no Google Drive",
      icon: "Cloud",
      image: "/categories/gdrive.jpg"
    },
    {
      name: "E-books e Audiobooks",
      slug: "ebooks-audiobooks",
      description: "Livros digitais e audiolivros",
      icon: "BookOpen",
      image: "/categories/ebooks.jpg"
    },
    {
      name: "Udemy",
      slug: "udemy",
      description: "Cursos profissionalizantes da Udemy",
      icon: "BookOpen",
      image: "/categories/udemy.jpg"
    },
    {
      name: "LinkedIn Learning",
      slug: "linkedin-learning",
      description: "Cursos profissionais do LinkedIn",
      icon: "BookOpen",
      image: "/categories/linkedin.jpg"
    },

    // Marketing e Negócios
    {
      name: "Facebook ADS",
      slug: "facebook-ads",
      description: "Ferramentas e contas para publicidade no Facebook",
      icon: "ShoppingCart",
      image: "/categories/fb-ads.jpg"
    },
    {
      name: "Ferramentas de SEO",
      slug: "ferramentas-seo",
      description: "Ferramentas para otimização de sites",
      icon: "Globe",
      image: "/categories/seo.jpg"
    },
    {
      name: "Automação de Marketing",
      slug: "automacao-marketing",
      description: "Ferramentas para automação de marketing",
      icon: "Bot",
      image: "/categories/marketing-auto.jpg"
    },
    {
      name: "PLR",
      slug: "plr",
      description: "Produtos com direitos de revenda",
      icon: "FileText",
      image: "/categories/plr.jpg"
    },
    {
      name: "Domínios e Hospedagem",
      slug: "dominios-hospedagem",
      description: "Serviços de hospedagem e domínios",
      icon: "Globe",
      image: "/categories/hosting.jpg"
    },
    {
      name: "WordPress Premium",
      slug: "wordpress-premium",
      description: "Temas e plugins premium para WordPress",
      icon: "Code",
      image: "/categories/wordpress.jpg"
    },

    // IA e Automação
    {
      name: "GPT e Automação",
      slug: "gpt-automacao",
      description: "Ferramentas de IA para automação",
      icon: "Bot",
      image: "/categories/gpt.jpg"
    },
    {
      name: "Chatbots",
      slug: "chatbots",
      description: "Soluções de chatbots inteligentes",
      icon: "MessageCircle",
      image: "/categories/chatbots.jpg"
    },
    {
      name: "Ferramentas de IA",
      slug: "ferramentas-ia",
      description: "Diversas ferramentas baseadas em IA",
      icon: "Lightbulb",
      image: "/categories/ai-tools.jpg"
    },
    {
      name: "Automação de Textos",
      slug: "automacao-textos",
      description: "Ferramentas para automação de conteúdo",
      icon: "FileText",
      image: "/categories/text-auto.jpg"
    },
    {
      name: "Criptomoedas",
      slug: "criptomoedas",
      description: "Ferramentas e serviços para criptomoedas",
      icon: "Database",
      image: "/categories/crypto.jpg"
    }
  ]

  console.log('Iniciando seed...')

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    })
  }

  const adminPassword = await hash("admin123", 12)

  const admin = await prisma.user.upsert({
    where: { email: "admin@mercadodecontas.com" },
    update: {},
    create: {
      email: "admin@mercadodecontas.com",
      name: "Admin",
      password: adminPassword,
      role: "ADMIN",
      active: true,
    },
  })

  console.log({ admin })

  console.log('Seed concluído!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })