import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  if (!date) return ""
  
  const dateObj = typeof date === "string" ? new Date(date) : date
  
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj)
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price)
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

/**
 * Função para criar um slug limpo a partir de uma string
 * Remove caracteres especiais, emojis e espaços extras
 */
export function createCleanSlug(text: string): string {
  if (!text) return '';
  
  // Remove emojis e caracteres especiais
  const cleanText = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Remove emojis de emoticons
    .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Remove emojis de símbolos e pictogramas
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Remove emojis de transporte e mapas
    .replace(/[\u{1F700}-\u{1F77F}]/gu, '') // Remove emojis de caracteres alquímicos
    .replace(/[\u{1F780}-\u{1F7FF}]/gu, '') // Remove emojis de símbolos geométricos
    .replace(/[\u{1F800}-\u{1F8FF}]/gu, '') // Remove emojis de setas suplementares
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') // Remove emojis suplementares e pictogramas
    .replace(/[\u{1FA00}-\u{1FA6F}]/gu, '') // Remove emojis de símbolos de xadrez
    .replace(/[\u{1FA70}-\u{1FAFF}]/gu, '') // Remove outros emojis
    .replace(/[^\w\s-]/g, '') // Remove caracteres que não são letras, números, traços ou espaços
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .toLowerCase();
    
  return cleanText;
}
