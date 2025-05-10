export function maskCPF(value: string) {
  return value
    .replace(/\D/g, "") // Remove tudo o que não é dígito
    .replace(/(\d{3})(\d)/, "$1.$2") // Coloca um ponto entre o terceiro e o quarto dígitos
    .replace(/(\d{3})(\d)/, "$1.$2") // Coloca um ponto entre o terceiro e o quarto dígitos
    // de novo (para o segundo bloco de números)
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2") // Coloca um hífen entre o terceiro e o quarto dígitos
    .substring(0, 14) // Limita o tamanho
}

export function maskPhone(value: string) {
  return value
    .replace(/\D/g, "") // Remove tudo o que não é dígito
    .replace(/(\d{2})(\d)/, "($1) $2") // Coloca parênteses em volta dos dois primeiros dígitos
    .replace(/(\d{5})(\d)/, "$1-$2") // Coloca hífen entre o quinto e o sexto dígitos
    .substring(0, 15) // Limita o tamanho
}

export function maskCreditCard(value: string) {
  return value
    .replace(/\D/g, "") // Remove tudo o que não é dígito
    .replace(/(\d{4})(\d)/, "$1 $2") // Coloca espaço a cada 4 dígitos
    .replace(/(\d{4})(\d)/, "$1 $2")
    .replace(/(\d{4})(\d)/, "$1 $2")
    .replace(/(\d{4})\d+?$/, "$1") // Limita em 16 dígitos
}

export function maskExpiry(value: string) {
  return value
    .replace(/\D/g, "") // Remove tudo o que não é dígito
    .replace(/(\d{2})(\d)/, "$1/$2") // Coloca / entre mês e ano
    .replace(/(\d{2}\/\d{2})\d+?$/, "$1") // Limita em 4 dígitos
}

export function maskCVV(value: string) {
  return value
    .replace(/\D/g, "") // Remove tudo o que não é dígito
    .substring(0, 3) // Limita em 3 dígitos
}
