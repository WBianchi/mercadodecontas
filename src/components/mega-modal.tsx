"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  Play, 
  Instagram, 
  Facebook, 
  Youtube, 
  Gamepad2,
  MonitorPlay,
  Music,
  BookOpen,
  ShoppingCart,
  Code,
  Laptop,
  Video,
  MessageCircle,
  Chrome,
  Monitor,
  Key,
  FileText,
  Cloud,
  Palette,
  Bot,
  Database,
  Globe,
  Lock,
  Boxes,
  Brush,
  PenTool,
  Lightbulb
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Streaming e Entretenimento",
    items: [
      { name: "Netflix", href: "/categoria/netflix", icon: <Play /> },
      { name: "Amazon Prime", href: "/categoria/amazon-prime", icon: <MonitorPlay /> },
      { name: "Disney+", href: "/categoria/disney-plus", icon: <Play /> },
      { name: "HBO Max", href: "/categoria/hbo-max", icon: <Play /> },
      { name: "Spotify Premium", href: "/categoria/spotify-premium", icon: <Music /> },
      { name: "Apple Music", href: "/categoria/apple-music", icon: <Music /> }
    ]
  },
  {
    title: "Redes Sociais",
    items: [
      { name: "Instagram", href: "/categoria/instagram", icon: <Instagram /> },
      { name: "Facebook", href: "/categoria/facebook", icon: <Facebook /> },
      { name: "TikTok", href: "/categoria/tiktok", icon: <Video /> },
      { name: "YouTube", href: "/categoria/youtube", icon: <Youtube /> },
      { name: "WhatsApp", href: "/categoria/whatsapp", icon: <MessageCircle /> },
      { name: "Kwai", href: "/categoria/kwai", icon: <Video /> }
    ]
  },
  {
    title: "Software e Sistemas",
    items: [
      { name: "Windows", href: "/categoria/windows", icon: <Monitor /> },
      { name: "Office 365", href: "/categoria/office-365", icon: <FileText /> },
      { name: "Adobe Creative Cloud", href: "/categoria/adobe-creative-cloud", icon: <Palette /> },
      { name: "Sistemas Operacionais", href: "/categoria/sistemas-operacionais", icon: <Laptop /> },
      { name: "Licenças Digitais", href: "/categoria/licencas-digitais", icon: <Key /> },
      { name: "VPNs e Segurança", href: "/categoria/vpns-seguranca", icon: <Lock /> }
    ]
  },
  {
    title: "Design e Criação",
    items: [
      { name: "Canva PRO", href: "/categoria/canva-pro", icon: <Brush /> },
      { name: "Filmora", href: "/categoria/filmora", icon: <Video /> },
      { name: "After Effects", href: "/categoria/after-effects", icon: <PenTool /> },
      { name: "Final Cut Pro", href: "/categoria/final-cut-pro", icon: <Video /> },
      { name: "CorelDRAW", href: "/categoria/coreldraw", icon: <PenTool /> },
      { name: "AutoCAD", href: "/categoria/autocad", icon: <Boxes /> }
    ]
  },
  {
    title: "Games e Entretenimento",
    items: [
      { name: "Xbox Game Pass", href: "/categoria/xbox-game-pass", icon: <Gamepad2 /> },
      { name: "PlayStation Plus", href: "/categoria/playstation-plus", icon: <Gamepad2 /> },
      { name: "Steam Gift Cards", href: "/categoria/steam-gift-cards", icon: <Gamepad2 /> },
      { name: "Epic Games", href: "/categoria/epic-games", icon: <Gamepad2 /> },
      { name: "Free Fire", href: "/categoria/free-fire", icon: <Gamepad2 /> },
      { name: "IMVU", href: "/categoria/imvu", icon: <Gamepad2 /> }
    ]
  },
  {
    title: "Educação e Produtividade",
    items: [
      { name: "Cursos Online", href: "/categoria/cursos-online", icon: <BookOpen /> },
      { name: "Notion PRO", href: "/categoria/notion-pro", icon: <FileText /> },
      { name: "Google Drive Ilimitado", href: "/categoria/google-drive", icon: <Cloud /> },
      { name: "E-books e Audiobooks", href: "/categoria/ebooks-audiobooks", icon: <BookOpen /> },
      { name: "Udemy", href: "/categoria/udemy", icon: <BookOpen /> },
      { name: "LinkedIn Learning", href: "/categoria/linkedin-learning", icon: <BookOpen /> }
    ]
  },
  {
    title: "Marketing e Negócios",
    items: [
      { name: "Facebook ADS", href: "/categoria/facebook-ads", icon: <ShoppingCart /> },
      { name: "Ferramentas de SEO", href: "/categoria/ferramentas-seo", icon: <Globe /> },
      { name: "Automação de Marketing", href: "/categoria/automacao-marketing", icon: <Bot /> },
      { name: "PLR", href: "/categoria/plr", icon: <FileText /> },
      { name: "Domínios e Hospedagem", href: "/categoria/dominios-hospedagem", icon: <Globe /> },
      { name: "WordPress Premium", href: "/categoria/wordpress-premium", icon: <Code /> }
    ]
  },
  {
    title: "IA e Automação",
    items: [
      { name: "GPT e Automação", href: "/categoria/gpt-automacao", icon: <Bot /> },
      { name: "Chatbots", href: "/categoria/chatbots", icon: <MessageCircle /> },
      { name: "Ferramentas de IA", href: "/categoria/ferramentas-ia", icon: <Lightbulb /> },
      { name: "Automação de Textos", href: "/categoria/automacao-textos", icon: <FileText /> },
      { name: "Criptomoedas", href: "/categoria/criptomoedas", icon: <Database /> }
    ]
  }
];

export function MegaModal() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          Categorias
          <ChevronDown className="w-4 h-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="top" className="w-full h-[85vh] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-none">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Explore Nossas Categorias
          </SheetTitle>
        </SheetHeader>

        <div className="container mx-auto grid grid-cols-4 gap-8 overflow-y-auto max-h-[calc(85vh-120px)]">
          {categories.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                {section.title}
              </h3>

              <div className="grid gap-3">
                {section.items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  >
                    <Link href={item.href}>
                      <div className="group flex items-center gap-3 p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-300">
                        <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <span className="font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
