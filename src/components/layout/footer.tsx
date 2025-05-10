"use client"

import Link from "next/link"
import { useState } from "react"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Shield, Lock, CreditCard, Award, CheckCircle2, Clock, Wallet, Building2, MessageSquare, Layers, ShoppingBag, Search, Heart, MessageCircle, Store, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Image from 'next/image'
import { FiltrosLoja } from "../filtros-loja"
import { useRouter } from "next/navigation"

export function Footer() {
  const [filtrosModalOpen, setFiltrosModalOpen] = useState(false)
  const router = useRouter()
  
  return (
    <footer className="bg-white dark:bg-gray-950 border-t">
      {/* Seção de Newsletter */}
      <div className="border-b">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#097bff] mb-4">
              Fique por dentro das novidades
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Inscreva-se para receber as melhores ofertas e novidades do mercado de contas.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="flex-1"
              />
              <Button className="bg-[#097bff] hover:bg-[#097bff]/90">
                Inscrever
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Selos de Confiança */}
      <div className="border-b bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-950 rounded-lg shadow-sm">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <Shield className="w-6 h-6 text-[#097bff]" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Compra Segura</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Proteção total na sua compra</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-950 rounded-lg shadow-sm">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <Clock className="w-6 h-6 text-[#097bff]" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Entrega Imediata</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receba em até 5 minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-950 rounded-lg shadow-sm">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <Wallet className="w-6 h-6 text-[#097bff]" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Pagamento Seguro</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ambiente protegido</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-950 rounded-lg shadow-sm">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-[#097bff]" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Garantia de Satisfação</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">7 dias de garantia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal do Rodapé */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16">
          {/* Coluna 1 - Informações da Empresa */}
          <div className="md:col-span-4">
            <h3 className="text-2xl font-bold text-[#097bff] mb-6">Mercado de Contas</h3>
            <div className="space-y-4 text-gray-400">
              <p className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#097bff]" />
                CNPJ º58.565.696/0001-83
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#097bff]" />
                São Paulo, SP. CEP: 04551-060
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#097bff]" />
                sac@mercadodecontas.com.br
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#097bff]" />
                Atendimento via chat 24/7
              </p>
            </div>
            
            {/* Certificações */}
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">Certificações</h4>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Shield className="w-6 h-6 text-[#097bff]" />
                </div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <Lock className="w-6 h-6 text-[#097bff]" />
                </div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <Award className="w-6 h-6 text-[#097bff]" />
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold text-[#097bff] mb-6">Links Rápidos</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-[#097bff] transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="text-gray-400 hover:text-[#097bff] transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/afiliados" className="text-gray-400 hover:text-[#097bff] transition-colors">
                  Programa de Afiliados
                </Link>
              </li>
              <li>
                <Link href="/ajuda" className="text-gray-400 hover:text-[#097bff] transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-[#097bff] transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Políticas */}
          <div className="md:col-span-3">
            <h4 className="text-lg font-semibold text-[#097bff] mb-6">Políticas</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/politicas/privacidade" className="text-gray-400 hover:text-[#097bff] transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/politicas/cookies" className="text-gray-400 hover:text-[#097bff] transition-colors">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="/politicas/cancelamento" className="text-gray-400 hover:text-[#097bff] transition-colors">
                  Política de Cancelamento
                </Link>
              </li>
              <li>
                <Link href="/politicas/lojistas" className="text-gray-400 hover:text-[#097bff] transition-colors">
                  Políticas para Lojistas
                </Link>
              </li>
              <li>
                <Link href="/politicas/termos" className="text-gray-400 hover:text-[#097bff] transition-colors">
                  Termos e Condições
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4 - Formas de Pagamento */}
          <div className="md:col-span-3">
            <h4 className="text-lg font-semibold text-[#097bff] mb-6">Formas de Pagamento</h4>
            <div className="grid grid-cols-4 bg-white/5 backdrop-blur-md rounded-xl">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div 
                  key={num} 
                  className="relative group overflow-hidden flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm" />
                  <Image
                    src={`/${num}.png`}
                    alt={`Método de pagamento ${num}`}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-contain transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
                  />
                </div>
              ))}
            </div>
            
            {/* Download Apps */}
            <div className="mt-8">
              <div className="flex items-center gap-4">
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="/badge-app-store.webp"
                    alt="Download na App Store"
                    width={140}
                    height={42}
                    className="h-10 w-auto"
                  />
                </Link>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="/badge-google-play.webp"
                    alt="Download no Google Play"
                    width={140}
                    height={42}
                    className="h-10 w-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Texto Legal */}
        <div className="border-t border-gray-800/30">
          <div className="container mx-auto px-0">
            <p className="text-sm leading-relaxed text-gray-400 text-justify py-8">
              A Mercado de Contas, inscrita no CNPJ sob o nº 58.565.696/0001-83, atua como intermediária na disponibilização de contas, licenças digitais e contas para redes sociais. Não nos responsabilizamos por quaisquer danos ou perdas decorrentes do uso inadequado, suspensão, bloqueio ou encerramento das contas e licenças adquiridas através de nossa plataforma, sendo estes de inteira responsabilidade dos respectivos provedores ou plataformas de origem (ex: Facebook, Instagram, etc.). Esclarecemos que a aquisição e utilização de tais produtos digitais estão sujeitas aos Termos de Serviço e Políticas de Privacidade de cada plataforma, os quais devem ser lidos e compreendidos pelos usuários antes da aquisição. A Mercado de Contas emprega as melhores práticas de segurança para proteger as informações fornecidas por seus usuários, as quais são utilizadas exclusivamente para a intermediação dos serviços oferecidos, em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018). Ressaltamos que não armazenamos informações financeiras ou de pagamento, sendo estas processadas por gateways de pagamento terceirizados e seguros. Toda comunicação online está sujeita a interrupções ou atrasos, alheios ao nosso controle. Em caso de dúvidas, entre em contato conosco através dos nossos canais de atendimento.
            </p>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="border-t border-gray-800/30">
          <div className="container mx-auto px-0">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 py-6">
              <p className="text-gray-400 text-sm">
                {new Date().getFullYear()} Mercado de Contas. Todos os direitos reservados.
              </p>
              <div className="flex space-x-6">
                <Link href="/politicas/termos" className="text-sm text-gray-400 hover:text-[#097bff] transition-colors">
                  Termos de Uso
                </Link>
                <Link href="/politicas/privacidade" className="text-sm text-gray-400 hover:text-[#097bff] transition-colors">
                  Política de Privacidade
                </Link>
                <Link href="/politicas/cookies" className="text-sm text-gray-400 hover:text-[#097bff] transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Navegação Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-top border-t border-gray-100 dark:border-gray-800 py-2 px-6 md:hidden z-40">
        <div className="flex justify-between items-center">
          <button 
            className="flex flex-col items-center"
            onClick={() => setFiltrosModalOpen(true)}
          >
            <Layers className="w-6 h-6 text-[#097bff]" />
            <span className="text-xs text-[#097bff] mt-1">Categorias</span>
          </button>

          <button 
            className="flex flex-col items-center"
            onClick={() => router.push('/loja')}
          >
            <Store className="w-6 h-6 text-[#097bff]" />
            <span className="text-xs text-[#097bff] mt-1">Loja</span>
          </button>

         

          <button 
            className="flex flex-col items-center -mt-2"
            onClick={() => setFiltrosModalOpen(true)}
          >
            <div className="p-4 rounded-full bg-gradient-to-r from-[#097bff] to-blue-600">
              <Search className="w-5 h-5 text-white" />
            </div>
          </button>

          <button 
            className="flex flex-col items-center"
            onClick={() => router.push('/meu-perfil?tab=pedidos')}
          >
            <ShoppingBag className="w-6 h-6 text-[#097bff]" />
            <span className="text-xs text-[#097bff] mt-1">Pedidos</span>
          </button>

          <button 
            className="flex flex-col items-center"
            onClick={() => router.push('/anunciar')}
          >
            <PlusCircle className="w-6 h-6 text-[#097bff]" />
            <span className="text-xs text-[#097bff] mt-1">Anunciar</span>
          </button>

          
        </div>
      </div>
      
      {/* Modal de Filtros */}
      <FiltrosLoja open={filtrosModalOpen} onOpenChange={setFiltrosModalOpen} />
    </footer>
  )
}
