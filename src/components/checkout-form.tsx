"use client"

import { useState } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { maskCPF, maskPhone } from "@/lib/masks"
import { z } from "zod"

const checkoutFormSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(11, "Telefone inválido").max(15, "Telefone inválido"),
  cpfCnpj: z.string().min(11, "CPF/CNPJ inválido").max(14, "CPF/CNPJ inválido"),
  address: z.string().min(5, "O endereço deve ter pelo menos 5 caracteres"),
  city: z.string().min(3, "A cidade deve ter pelo menos 3 caracteres"),
  neighborhood: z.string().min(3, "O bairro deve ter pelo menos 3 caracteres"),
})

type CheckoutFormData = z.infer<typeof checkoutFormSchema>

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void
  defaultValues?: Partial<CheckoutFormData>
}

export function CheckoutForm({ onSubmit, defaultValues }: CheckoutFormProps) {
  const [formData, setFormData] = useState<Partial<CheckoutFormData>>({
    name: "",
    email: "",
    phone: "",
    cpfCnpj: "",
    address: "",
    city: "",
    neighborhood: "",
    ...defaultValues,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({})

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    let formattedValue = value

    if (field === "phone") {
      formattedValue = maskPhone(value)
    } else if (field === "cpfCnpj") {
      formattedValue = maskCPF(value)
    }

    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }))

    // Limpar erro do campo quando ele é alterado
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const validatedData = checkoutFormSchema.parse(formData)
      onSubmit(validatedData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {}
        error.errors.forEach(err => {
          if (err.path[0]) {
            formattedErrors[err.path[0]] = err.message
          }
        })
        setErrors(formattedErrors)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={e => handleChange("name", e.target.value)}
            placeholder="Seu nome completo"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={e => handleChange("email", e.target.value)}
            placeholder="seu@email.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={e => handleChange("phone", e.target.value)}
            placeholder="(11) 99999-9999"
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <span className="text-sm text-red-500">{errors.phone}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
          <Input
            id="cpfCnpj"
            value={formData.cpfCnpj}
            onChange={e => handleChange("cpfCnpj", e.target.value)}
            placeholder="123.456.789-00"
            className={errors.cpfCnpj ? "border-red-500" : ""}
          />
          {errors.cpfCnpj && (
            <span className="text-sm text-red-500">{errors.cpfCnpj}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Endereço</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={e => handleChange("address", e.target.value)}
            placeholder="Rua, número"
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && (
            <span className="text-sm text-red-500">{errors.address}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={e => handleChange("city", e.target.value)}
            placeholder="Sua cidade"
            className={errors.city ? "border-red-500" : ""}
          />
          {errors.city && (
            <span className="text-sm text-red-500">{errors.city}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input
            id="neighborhood"
            value={formData.neighborhood}
            onChange={e => handleChange("neighborhood", e.target.value)}
            placeholder="Seu bairro"
            className={errors.neighborhood ? "border-red-500" : ""}
          />
          {errors.neighborhood && (
            <span className="text-sm text-red-500">{errors.neighborhood}</span>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full">
        Continuar para pagamento
      </Button>
    </form>
  )
}
