import * as z from "zod"

export const userSchema = z.object({
  username: z.string().min(3, "Usuário deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não conferem",
  path: ["confirmPassword"],
})

export const businessSchema = z.object({
  corporateName: z.string().min(3, "Razão social deve ter no mínimo 3 caracteres"),
  cpfCnpj: z.string().min(14, "CNPJ inválido").max(14, "CNPJ inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  businessType: z.enum(["MEI", "ME", "EIRELI", "LTDA", "SA"]),
  businessCategory: z.string().min(1, "Selecione uma categoria"),
  description: z.string().min(20, "Descrição deve ter no mínimo 20 caracteres"),
})

export const addressSchema = z.object({
  address: z.string().min(3, "Endereço deve ter no mínimo 3 caracteres"),
  number: z.string().min(1, "Número é obrigatório"),
  neighborhood: z.string().min(2, "Bairro deve ter no mínimo 2 caracteres"),
  city: z.string().min(2, "Cidade deve ter no mínimo 2 caracteres"),
  state: z.string().length(2, "Estado inválido"),
})

export const documentsSchema = z.object({
  acceptedTerms: z.boolean().refine((val) => val === true, {
    message: "Você precisa aceitar os termos de uso",
  }),
})

export type UserFormData = z.infer<typeof userSchema>
export type BusinessFormData = z.infer<typeof businessSchema>
export type AddressFormData = z.infer<typeof addressSchema>
export type DocumentsFormData = z.infer<typeof documentsSchema>

export const BUSINESS_CATEGORIES = [
  "Eletrônicos",
  "Roupas",
  "Acessórios",
  "Alimentos",
  "Bebidas",
  "Cosméticos",
  "Decoração",
  "Esportes",
  "Games",
  "Informática",
  "Livros",
  "Móveis",
  "Papelaria",
  "Pet Shop",
  "Saúde",
  "Serviços",
  "Outros",
] as const

export const BUSINESS_TYPES = [
  { value: "MEI", label: "Microempreendedor Individual (MEI)" },
  { value: "ME", label: "Microempresa (ME)" },
  { value: "EIRELI", label: "Empresa Individual (EIRELI)" },
  { value: "LTDA", label: "Sociedade Limitada (LTDA)" },
  { value: "SA", label: "Sociedade Anônima (S/A)" },
] as const
