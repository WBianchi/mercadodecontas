/**
 * Formata um valor numérico como moeda brasileira (R$)
 * 
 * @param value Valor a ser formatado
 * @param options Opções de formatação
 * @returns String formatada (ex: R$ 1.234,56)
 */
export function formatCurrency(
  value: number, 
  options: { currency?: string; locale?: string } = {}
): string {
  const { 
    currency = 'BRL', 
    locale = 'pt-BR' 
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

/**
 * Formata um número grande para exibição mais amigável (ex: 1.2K, 1.5M)
 * 
 * @param value Valor numérico para formatar
 * @returns String formatada
 */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(value);
}

/**
 * Formata uma data para exibição em formato brasileiro
 * 
 * @param date Data para formatar
 * @param includeTime Se deve incluir o horário na formatação
 * @returns String com a data formatada
 */
export function formatDate(date: Date | string, includeTime = false): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...(includeTime && {
      hour: '2-digit',
      minute: '2-digit'
    })
  };
  
  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

/**
 * Formata uma string para URL (slug)
 * Remove caracteres especiais, acentos, espaços e converte para minúsculas
 * 
 * @param text Texto para formatar como slug
 * @returns Slug formatado
 */
export function formatSlug(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
