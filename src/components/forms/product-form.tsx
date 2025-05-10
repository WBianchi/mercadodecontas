"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { CheckCircle, Loader2, XCircle } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome do produto deve ter pelo menos 2 caracteres.",
  }),
  shortDescription: z.string().min(10, {
    message: "A descrição curta deve ter pelo menos 10 caracteres.",
  }),
  description: z.string().min(50, {
    message: "A descrição completa deve ter pelo menos 50 caracteres.",
  }),
  sku: z.string().optional(),
  stockQuantity: z.coerce.number().min(1, {
    message: "A quantidade em estoque deve ser pelo menos 1.",
  }),
  price: z.coerce.number().min(0.01, {
    message: "O preço deve ser maior que zero.",
  }),
  discountPrice: z.coerce.number().min(0.01).optional(),
  productPhoto: z.string().optional(),
  categoryId: z.string().min(1, {
    message: "Selecione uma categoria.",
  }),
  tags: z.array(z.string()).min(1, {
    message: "Adicione pelo menos uma tag.",
  }),
  deliveryType: z.enum(["link", "file"], {
    required_error: "Selecione o tipo de entrega.",
  }),
  fileLink: z.string().url({ message: "Insira um URL válido." }).optional(),
  deliveryTime: z.string({
    required_error: "Selecione o tempo de entrega.",
  }),
  refundTime: z.string({
    required_error: "Selecione a política de reembolso.",
  }),
})

type ProductFormValues = z.infer<typeof formSchema>

// Função para calcular a pontuação SEO
function calculateSeoScore(values: Partial<ProductFormValues>) {
  let score = 0
  
  // Nome do produto (20 pontos)
  if (values.name) {
    if (values.name.length >= 20 && values.name.length <= 60) {
      score += 20
    } else if (values.name.length >= 10) {
      score += 10
    } else if (values.name.length > 0) {
      score += 5
    }
  }
  
  // Descrição curta (20 pontos)
  if (values.shortDescription) {
    if (values.shortDescription.length >= 120 && values.shortDescription.length <= 160) {
      score += 20
    } else if (values.shortDescription.length >= 80) {
      score += 10
    } else if (values.shortDescription.length > 0) {
      score += 5
    }
  }
  
  // Descrição completa (20 pontos)
  if (values.description) {
    if (values.description.length >= 300) {
      score += 20
    } else if (values.description.length >= 150) {
      score += 10
    } else if (values.description.length > 0) {
      score += 5
    }
  }
  
  // Tags (20 pontos)
  if (values.tags) {
    if (values.tags.length >= 3) {
      score += 20
    } else if (values.tags.length > 0) {
      score += 10 * values.tags.length
    }
  }
  
  // Categoria (10 pontos)
  if (values.categoryId) {
    score += 10
  }
  
  // Imagem (10 pontos)
  if (values.productPhoto) {
    score += 10
  }
  
  return score
}

async function getCategorias() {
  const response = await fetch("/api/categorias")
  if (!response.ok) {
    throw new Error("Erro ao carregar categorias")
  }
  return response.json()
}

export function ProductForm() {
  const [currentTab, setCurrentTab] = useState<string>("basic")
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [seoScore, setSeoScore] = useState(0)
  const [createdProductId, setCreatedProductId] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const router = useRouter()

  // Buscar categorias da API
  const { data: categorias, isLoading: loadingCategorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: async () => {
      const response = await fetch("/api/categorias")
      if (!response.ok) {
        throw new Error("Erro ao carregar categorias")
      }
      return response.json()
    },
  })

  // Buscar tags da API
  const { data: tagsDisponiveis, isLoading: loadingTags } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await fetch("/api/tags")
      if (!response.ok) {
        throw new Error("Erro ao carregar tags")
      }
      return response.json()
    },
  })

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      sku: "",
      stockQuantity: 1,
      price: 0,
      discountPrice: undefined,
      productPhoto: "",
      categoryId: "",
      tags: [],
      deliveryType: "link",
      fileLink: "",
      deliveryTime: "",
      refundTime: "",
    },
  })

  // Atualizar score SEO quando os campos mudarem
  const watchedFields = form.watch()
  useEffect(() => {
    const score = calculateSeoScore(watchedFields)
    setSeoScore(score)
  }, [watchedFields])

  const onSubmit = async (values: ProductFormValues) => {
    setIsSubmitting(true)
    try {
      // Criar FormData
      const formData = new FormData()
      
      // Adicionar campos básicos
      formData.append("name", values.name)
      formData.append("shortDescription", values.shortDescription)
      formData.append("description", values.description)
      formData.append("sku", values.sku || "")
      formData.append("stockQuantity", values.stockQuantity.toString())
      formData.append("price", values.price.toString())
      formData.append("discountPrice", values.discountPrice?.toString() || "0")
      
      // Adicionar campos de entrega
      formData.append("deliveryType", values.deliveryType)
      formData.append("deliveryTime", values.deliveryTime)
      formData.append("refundTime", values.refundTime)
      
      // Adicionar campos condicionais
      if (values.deliveryType === "link" && values.fileLink) {
        formData.append("fileLink", values.fileLink)
      }
      
      // Adicionar campos de mídia e SEO
      if (values.productPhoto) {
        formData.append("productPhoto", values.productPhoto)
      }
      
      if (values.categoryId) {
        formData.append("categoryId", values.categoryId)
      }
      
      // Adicionar tags como JSON string
      formData.append("tags", JSON.stringify(values.tags))
      
      // Adicionar SEO score
      formData.append("seoScore", seoScore.toString())
      
      // Enviar para a API
      const response = await fetch("/api/produtos", {
        method: "POST",
        body: formData
      })
      
      if (!response.ok) {
        throw new Error("Erro ao criar produto")
      }
      
      const data = await response.json()
      setCreatedProductId(data.id)
      setShowSuccessModal(true)
      
      // Mostrar mensagem de sucesso
      toast.success("Produto criado com sucesso!")
      
      // Resetar formulário
      form.reset()
      setCurrentTab("basic")
      
      // Redirecionar para a página do produto
      router.push("/dashboard/lojista/anuncios")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar produto. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Novo Produto</h2>
            <p className="text-sm text-muted-foreground">
              Crie um novo produto para sua loja virtual
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Score SEO:
              <Badge 
                variant={seoScore >= 80 ? "success" : seoScore >= 60 ? "warning" : "destructive"}
                className="ml-2"
              >
                {seoScore}%
              </Badge>
            </div>
            <Progress 
              value={seoScore} 
              className="w-[100px]"
              indicatorClassName={cn(
                seoScore >= 80 ? "bg-green-500" : 
                seoScore >= 60 ? "bg-yellow-500" : 
                "bg-red-500"
              )}
            />
          </div>
        </div>

        <Tabs defaultValue="basic" value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
            <TabsTrigger value="media">Mídia e SEO</TabsTrigger>
            <TabsTrigger value="delivery">Entrega e Preços</TabsTrigger>
          </TabsList>
          
          {/* Tab de Informações Básicas */}
          <TabsContent value="basic" className="space-y-6 py-4">
            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4">Detalhes do Produto</h3>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Produto</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Ex: Netflix Premium" 
                            className={cn(
                              "transition-all duration-200",
                              field.value && field.value.length >= 20 && field.value.length <= 60 
                                ? "border-green-500 focus-visible:ring-green-500" 
                                : ""
                            )}
                            {...field} 
                          />
                          {field.value && field.value.length >= 20 && field.value.length <= 60 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </motion.div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        {field.value ? (
                          <span className={cn(
                            "text-xs transition-colors",
                            field.value.length >= 20 && field.value.length <= 60 
                              ? "text-green-500" 
                              : "text-muted-foreground"
                          )}>
                            {field.value.length}/60 caracteres - {field.value.length >= 20 && field.value.length <= 60 
                              ? "Ótimo para SEO!" 
                              : "Ideal entre 20-60 caracteres"}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Nome do produto com primeira letra maiúscula
                          </span>
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição Curta</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Breve descrição do produto" 
                            className={cn(
                              "transition-all duration-200",
                              field.value && field.value.length >= 120 && field.value.length <= 160 
                                ? "border-green-500 focus-visible:ring-green-500" 
                                : ""
                            )}
                            {...field} 
                          />
                          {field.value && field.value.length >= 120 && field.value.length <= 160 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </motion.div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        {field.value ? (
                          <span className={cn(
                            "text-xs transition-colors",
                            field.value.length >= 120 && field.value.length <= 160 
                              ? "text-green-500" 
                              : "text-muted-foreground"
                          )}>
                            {field.value.length}/160 caracteres - {field.value.length >= 120 && field.value.length <= 160 
                              ? "Perfeito para SEO!" 
                              : "Ideal entre 120-160 caracteres"}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Uma breve descrição que aparecerá nos resultados de busca
                          </span>
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição Completa</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="Descreva seu produto detalhadamente"
                            className={cn(
                              "min-h-[150px] resize-none transition-all duration-200",
                              field.value && field.value.length >= 300 
                                ? "border-green-500 focus-visible:ring-green-500" 
                                : ""
                            )}
                            {...field}
                          />
                          {field.value && field.value.length >= 300 && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute right-2 top-4"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </motion.div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        {field.value ? (
                          <span className={cn(
                            "text-xs transition-colors",
                            field.value.length >= 300 
                              ? "text-green-500" 
                              : "text-muted-foreground"
                          )}>
                            {field.value.length} caracteres - {field.value.length >= 300 
                              ? "Excelente para SEO!" 
                              : "Recomendado pelo menos 300 caracteres"}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Descrição detalhada do seu produto
                          </span>
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4">Informações de Estoque</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="Código único do produto" {...field} />
                      </FormControl>
                      <FormDescription>
                        Código único para identificar seu produto
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stockQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estoque</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormDescription>
                        Quantidade disponível para venda
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>
          
          {/* Tab de Mídia e SEO */}
          <TabsContent value="media" className="space-y-6 py-4">
            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4">Imagem do Produto</h3>
              
              <FormField
                control={form.control}
                name="productPhoto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto Principal</FormLabel>
                    <FormControl>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              // Normalmente aqui você faria upload para um servidor
                              // e salvaria a URL, mas para simplificar vamos apenas
                              // simular isso com uma URL local
                              field.onChange(URL.createObjectURL(file))
                            }
                          }}
                        />
                        {field.value && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 rounded-md overflow-hidden border"
                          >
                            <img 
                              src={field.value} 
                              alt="Preview" 
                              className="h-40 w-full object-cover"
                            />
                          </motion.div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Imagem principal do produto. Recomendado: 800x600px
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4">Categorização</h3>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className={cn(
                            "transition-all duration-200",
                            field.value ? "border-green-500" : ""
                          )}>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {loadingCategorias ? (
                              <SelectItem value="">Carregando categorias...</SelectItem>
                            ) : (
                              categorias?.map((categoria: any) => (
                                <SelectItem key={categoria.id} value={categoria.id.toString()}>
                                  {categoria.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Selecione a categoria que melhor se encaixa para seu produto
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {field.value.map((tag, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                              >
                                <Badge 
                                  className="px-3 py-1 bg-[#097bff]"
                                  onClick={() => {
                                    const newTags = [...field.value]
                                    newTags.splice(index, 1)
                                    field.onChange(newTags)
                                  }}
                                >
                                  {tag} <XCircle className="ml-1 h-3 w-3 cursor-pointer" />
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                            <Select 
                              onValueChange={(value) => {
                                if (value && !field.value.includes(value) && field.value.length < 5) {
                                  field.onChange([...field.value, value])
                                }
                              }}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecionar tag existente" />
                              </SelectTrigger>
                              <SelectContent>
                                {loadingTags ? (
                                  <SelectItem value="">Carregando tags...</SelectItem>
                                ) : (
                                  tagsDisponiveis?.map((tag: any) => (
                                    <SelectItem 
                                      key={tag.id} 
                                      value={tag.name}
                                      disabled={field.value.includes(tag.name)}
                                    >
                                      {tag.name}
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="flex gap-2">
                            <Input
                              placeholder="Ou adicionar nova tag"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  const value = e.currentTarget.value.trim()
                                  if (value && !field.value.includes(value) && field.value.length < 5) {
                                    field.onChange([...field.value, value])
                                    e.currentTarget.value = ''
                                  }
                                }
                              }}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={(e) => {
                                const input = e.currentTarget.previousSibling as HTMLInputElement
                                const value = input.value.trim()
                                if (value && !field.value.includes(value) && field.value.length < 5) {
                                  field.onChange([...field.value, value])
                                  input.value = ''
                                }
                              }}
                            >
                              Adicionar
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription className={cn(
                        "transition-colors",
                        field.value.length >= 3 ? "text-green-500" : "text-muted-foreground"
                      )}>
                        {field.value.length}/5 tags - {field.value.length >= 3 
                          ? "Ótimo para SEO!" 
                          : "Adicione pelo menos 3 tags para melhorar seu SEO"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>
          
          {/* Tab de Entrega e Preços */}
          <TabsContent value="delivery" className="space-y-6 py-4">
            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4">Informações de Entrega</h3>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="deliveryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Entrega</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="link" id="link" />
                            <Label htmlFor="link">Link (Acesso Digital)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="file" id="file" />
                            <Label htmlFor="file">Arquivo (Download)</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        Como o produto será entregue ao cliente
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("deliveryType") === "link" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FormField
                      control={form.control}
                      name="fileLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link de Acesso</FormLabel>
                          <FormControl>
                            <Input placeholder="https://exemplo.com/acesso" {...field} />
                          </FormControl>
                          <FormDescription>
                            Link que será enviado ao cliente após a compra
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}

                <FormField
                  control={form.control}
                  name="deliveryTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempo de Entrega</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tempo de entrega" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="imediato">Imediato (Automático)</SelectItem>
                          <SelectItem value="1h">Em até 1 hora</SelectItem>
                          <SelectItem value="24h">Em até 24 horas</SelectItem>
                          <SelectItem value="48h">Em até 48 horas</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Tempo estimado para entrega após a confirmação do pagamento
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="refundTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Política de Reembolso</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a política de reembolso" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="noRefund">Sem reembolso</SelectItem>
                          <SelectItem value="24h">Até 24 horas</SelectItem>
                          <SelectItem value="48h">Até 48 horas</SelectItem>
                          <SelectItem value="7d">Até 7 dias</SelectItem>
                          <SelectItem value="15d">Até 15 dias</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Prazo máximo para solicitação de reembolso
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4">Preços</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço (R$)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            R$
                          </span>
                          <Input
                            type="text"
                            placeholder="0,00"
                            className="pl-10"
                            {...field}
                            value={field.value}
                            onChange={(e) => {
                              // Remove todos os caracteres não numéricos, exceto o ponto decimal
                              let value = e.target.value.replace(/[^\d]/g, '')
                              
                              // Converte para formato de centavos
                              const cents = parseInt(value) || 0
                              
                              // Converte centavos para reais com 2 casas decimais
                              const reais = (cents / 100).toFixed(2)
                              
                              field.onChange(reais)
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Preço do produto em reais
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discountPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço com Desconto (R$)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            R$
                          </span>
                          <Input
                            type="text"
                            placeholder="0,00"
                            className="pl-10"
                            {...field}
                            value={field.value}
                            onChange={(e) => {
                              // Remove todos os caracteres não numéricos, exceto o ponto decimal
                              let value = e.target.value.replace(/[^\d]/g, '')
                              
                              // Converte para formato de centavos
                              const cents = parseInt(value) || 0
                              
                              // Converte centavos para reais com 2 casas decimais
                              const reais = (cents / 100).toFixed(2)
                              
                              field.onChange(reais)
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Preço promocional (opcional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="rounded-lg border p-6 shadow-sm bg-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Pontuação SEO</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Baseado nas informações fornecidas
                  </p>
                </div>
                <div>
                  <Badge className={cn(
                    "text-white",
                    seoScore >= 80 ? "bg-green-500" : 
                    seoScore >= 50 ? "bg-yellow-500" : 
                    "bg-red-500"
                  )}>
                    {seoScore >= 80 ? "Excelente" : 
                     seoScore >= 50 ? "Bom" : 
                     "Precisa Melhorar"}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Pontuação</span>
                  <span>{seoScore}/100</span>
                </div>
                <Progress value={seoScore} className={cn(
                  seoScore >= 80 ? "bg-green-200" : 
                  seoScore >= 50 ? "bg-yellow-200" : 
                  "bg-red-200"
                )} />
                <p className="text-xs text-muted-foreground mt-2">
                  Dicas: Adicione uma descrição detalhada, use tags relevantes e escolha um bom título.
                </p>
              </div>
            </div>
          </TabsContent>
          
        </Tabs>

        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (currentTab === "media") setCurrentTab("basic")
              else if (currentTab === "delivery") setCurrentTab("media")
            }}
            disabled={currentTab === "basic"}
          >
            Voltar
          </Button>
          
          {currentTab !== "delivery" ? (
            <Button
              type="button"
              onClick={() => {
                if (currentTab === "basic") setCurrentTab("media")
                else if (currentTab === "media") setCurrentTab("delivery")
              }}
            >
              Próximo
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting} className="bg-[#097bff] hover:bg-[#097bff]/90">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando produto...
                </>
              ) : (
                "Criar Produto"
              )}
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
