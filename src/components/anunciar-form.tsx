"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"
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
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ImagePlus, 
  Loader2, 
  X, 
  Sparkles, 
  Clock, 
  Package, 
  CreditCard, 
  Link as LinkIcon, 
  File, 
  Tag, 
  HelpCircle, 
  Bot,
  Play,
  MessageCircle,
  Monitor,
  Brush,
  Gamepad2,
  BookOpen,
  TrendingUp
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  informacoes_basicas: z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    descricao: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
    sku: z.string().min(1, "SKU é obrigatório"),
    quantidade: z.number().min(1, "Quantidade deve ser maior que 0"),
    valor: z.string().min(1, "O valor é obrigatório"),
    tempo_entrega: z.string().min(1, "Tempo de entrega é obrigatório"),
  }),
  categoria: z.object({
    categoria_pai: z.string().min(1, "Categoria pai é obrigatória"),
    categoria_filho: z.string().min(1, "Categoria filho é obrigatória"),
  }),
  entrega: z.object({
    tipo: z.enum(["link", "arquivo"]),
    link: z.string().optional(),
    arquivo: z.string().optional(),
  }),
  pagamento: z.object({
    metodos: z.array(z.string()).min(1, "Selecione pelo menos um método de pagamento"),
  }),
})

const categorias = {
  "Streaming e Entretenimento": {
    icon: <Play className="h-4 w-4" />,
    subcategorias: [
      "Netflix",
      "Disney+",
      "Amazon Prime",
      "HBO Max",
      "Spotify",
      "YouTube Premium",
    ]
  },
  "Redes Sociais": {
    icon: <MessageCircle className="h-4 w-4" />,
    subcategorias: [
      "Instagram",
      "Facebook",
      "Twitter",
      "TikTok",
      "LinkedIn",
      "Pinterest",
    ]
  },
  "Software e Sistemas": {
    icon: <Monitor className="h-4 w-4" />,
    subcategorias: [
      "Windows",
      "Office 365",
      "Adobe Creative Cloud",
      "Antivírus",
      "VPN",
      "Cloud Storage",
    ]
  },
  "Design e Criação": {
    icon: <Brush className="h-4 w-4" />,
    subcategorias: [
      "Photoshop",
      "Illustrator",
      "Premiere",
      "After Effects",
      "Figma",
      "Canva Pro",
    ]
  },
  "Games e Entretenimento": {
    icon: <Gamepad2 className="h-4 w-4" />,
    subcategorias: [
      "Steam",
      "PlayStation Plus",
      "Xbox Game Pass",
      "Nintendo Online",
      "EA Play",
      "Ubisoft+",
    ]
  },
  "Educação e Produtividade": {
    icon: <BookOpen className="h-4 w-4" />,
    subcategorias: [
      "Coursera",
      "Udemy",
      "Duolingo",
      "Notion",
      "Evernote",
      "Google Workspace",
    ]
  },
  "Marketing e Negócios": {
    icon: <TrendingUp className="h-4 w-4" />,
    subcategorias: [
      "Mailchimp",
      "SEMrush",
      "Ahrefs",
      "Hootsuite",
      "Buffer",
      "Monday.com",
    ]
  },
  "IA e Automação": {
    icon: <Bot className="h-4 w-4" />,
    subcategorias: [
      "ChatGPT Plus",
      "Midjourney",
      "Copilot",
      "AutoGPT",
      "Claude",
      "Zapier",
    ]
  },
}

export function AnunciarForm() {
  const [activeTab, setActiveTab] = useState("produto")
  const [images, setImages] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      informacoes_basicas: {
        nome: "",
        descricao: "",
        sku: "",
        quantidade: 1,
        valor: "",
        tempo_entrega: "",
      },
      categoria: {
        categoria_pai: "",
        categoria_filho: "",
      },
      entrega: {
        tipo: "link",
      },
      pagamento: {
        metodos: [],
      },
    },
  })

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="produto" className="space-x-2">
            <Package className="w-4 h-4" />
            <span>Produto</span>
          </TabsTrigger>
          <TabsTrigger value="categoria" className="space-x-2">
            <Tag className="w-4 h-4" />
            <span>Categoria</span>
          </TabsTrigger>
          <TabsTrigger value="midia" className="space-x-2">
            <ImagePlus className="w-4 h-4" />
            <span>Mídia</span>
          </TabsTrigger>
          <TabsTrigger value="entrega" className="space-x-2">
            <Clock className="w-4 h-4" />
            <span>Entrega</span>
          </TabsTrigger>
        </TabsList>

        <Card className="p-6">
          <TabsContent value="produto">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Informações do Produto</h3>
                <Badge variant="secondary" className="font-normal">
                  Etapa 1 de 4
                </Badge>
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground mb-6">
                Preencha as informações básicas do seu produto
              </p>

              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                    control={form.control}
                    name="informacoes_basicas.nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do anúncio</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Conta Netflix Premium 4K - 1 Ano" {...field} />
                        </FormControl>
                        <FormDescription>
                          Nome que aparecerá na listagem de produtos
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="relative">
                    <FormField
                      control={form.control}
                      name="informacoes_basicas.descricao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Descrição do anúncio
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-4 w-4"
                                    type="button"
                                  >
                                    <Bot className="h-4 w-4 text-muted-foreground" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Gerar descrição com IA</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descreva seu produto detalhadamente..." 
                              className="min-h-[150px] resize-none"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Uma boa descrição aumenta suas chances de venda
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="informacoes_basicas.sku"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            SKU
                            <HoverCard>
                              <HoverCardTrigger>
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </HoverCardTrigger>
                              <HoverCardContent>
                                <p className="text-sm">
                                  Código único para identificar seu produto
                                </p>
                              </HoverCardContent>
                            </HoverCard>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: NFLX-4K-12M" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="informacoes_basicas.quantidade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantidade em estoque</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1"
                              placeholder="Ex: 10" 
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="informacoes_basicas.valor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="R$ 0,00"
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "")
                                const formatted = new Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(Number(value) / 100)
                                field.onChange(formatted)
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="informacoes_basicas.tempo_entrega"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tempo de entrega</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Entrega imediata" {...field} />
                          </FormControl>
                          <FormDescription>
                            Tempo estimado para entregar o produto
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </div>
          </TabsContent>

          <TabsContent value="categoria">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Categoria</h3>
                <Badge variant="secondary" className="font-normal">
                  Etapa 2 de 4
                </Badge>
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground mb-6">
                Escolha a categoria do seu produto para melhor visibilidade
              </p>

              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                    control={form.control}
                    name="categoria"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Accordion type="single" collapsible className="w-full">
                            {Object.entries(categorias).map(([categoria, { icon, subcategorias }]) => (
                              <AccordionItem value={categoria} key={categoria}>
                                <AccordionTrigger className="hover:no-underline">
                                  <div className="flex items-center gap-2">
                                    {icon}
                                    <span>{categoria}</span>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <RadioGroup
                                    onValueChange={(value) => {
                                      field.onChange({
                                        categoria_pai: categoria,
                                        categoria_filho: value
                                      })
                                    }}
                                    value={field.value?.categoria_filho}
                                    className="grid grid-cols-2 gap-4 p-2"
                                  >
                                    {subcategorias.map((subcategoria) => (
                                      <div key={subcategoria} className="flex items-center space-x-2">
                                        <RadioGroupItem 
                                          value={subcategoria} 
                                          id={subcategoria}
                                          className="border-[#097bff]"
                                        />
                                        <label
                                          htmlFor={subcategoria}
                                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                          {subcategoria}
                                        </label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </FormControl>
                        <FormDescription>
                          {field.value?.categoria_pai && field.value?.categoria_filho && (
                            <span className="flex items-center gap-2 mt-2">
                              Categoria selecionada: 
                              <Badge variant="secondary">
                                {field.value.categoria_pai}
                              </Badge>
                              <span>→</span>
                              <Badge variant="default" className="bg-[#097bff]">
                                {field.value.categoria_filho}
                              </Badge>
                            </span>
                          )}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </TabsContent>

          <TabsContent value="midia">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Mídia</h3>
                <Badge variant="secondary" className="font-normal">
                  Etapa 3 de 4
                </Badge>
              </div>
              <Separator />
              
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <ImagePlus className="h-4 w-4 text-[#097bff]" />
                    Dicas para foto perfeita
                  </h4>
                  <div className="grid gap-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <span className="bg-[#097bff] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">1</span>
                      <p>Use imagem na proporção <strong>4:3</strong> (1200 x 900 pixels) para melhor visualização nos cards</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-[#097bff] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">2</span>
                      <p>Escolha uma imagem chamativa e profissional!</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-[#097bff] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">3</span>
                      <p>Fotos com fundo branco ou neutro chamam mais atenção</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-[#097bff] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">4</span>
                      <p>Tamanho máximo: 5MB, formatos: JPG, PNG</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                  {images.length > 0 ? (
                    <div className="relative group">
                      <div className="aspect-[4/3] rounded-lg overflow-hidden border bg-muted">
                        <img
                          src={images[0]}
                          alt="Foto do produto"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-white hover:bg-white/90"
                          onClick={() => setImages([])}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[4/3]">
                      <label className="h-full border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#097bff] hover:bg-muted/50 transition-colors">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              setIsUploading(true)
                              // Simular upload
                              setTimeout(() => {
                                setImages([URL.createObjectURL(file)])
                                setIsUploading(false)
                              }, 1000)
                            }
                          }}
                          disabled={isUploading}
                        />
                        {isUploading ? (
                          <Loader2 className="h-8 w-8 text-[#097bff] animate-spin" />
                        ) : (
                          <>
                            <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Arraste ou clique para adicionar
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="entrega">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Entrega</h3>
                <Badge variant="secondary" className="font-normal">
                  Etapa 4 de 4
                </Badge>
              </div>
              <Separator />
              
              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                    control={form.control}
                    name="entrega.tipo"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel>Método de entrega</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          >
                            <div>
                              <RadioGroupItem
                                value="link"
                                id="link"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="link"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted peer-data-[state=checked]:border-[#097bff] peer-data-[state=checked]:bg-[#097bff]/5 cursor-pointer"
                              >
                                <LinkIcon className="mb-3 h-6 w-6" />
                                <div className="text-center">
                                  <p className="font-medium">Link</p>
                                  <p className="text-sm text-muted-foreground">
                                    Entrega via link direto
                                  </p>
                                </div>
                              </Label>
                            </div>

                            <div>
                              <RadioGroupItem
                                value="arquivo"
                                id="arquivo"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="arquivo"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted peer-data-[state=checked]:border-[#097bff] peer-data-[state=checked]:bg-[#097bff]/5 cursor-pointer"
                              >
                                <File className="mb-3 h-6 w-6" />
                                <div className="text-center">
                                  <p className="font-medium">Arquivo</p>
                                  <p className="text-sm text-muted-foreground">
                                    Entrega via download
                                  </p>
                                </div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {form.watch("entrega.tipo") === "link" && (
                    <FormField
                      control={form.control}
                      name="entrega.link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link de entrega</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://" 
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Link direto para o produto (Google Drive, Dropbox, etc)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {form.watch("entrega.tipo") === "arquivo" && (
                    <FormField
                      control={form.control}
                      name="entrega.arquivo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Arquivo para entrega</FormLabel>
                          <FormControl>
                            <div className="flex items-center justify-center w-full">
                              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  {isUploading ? (
                                    <Loader2 className="h-8 w-8 text-[#097bff] animate-spin" />
                                  ) : (
                                    <>
                                      <File className="w-8 h-8 mb-2 text-muted-foreground" />
                                      <p className="mb-2 text-sm text-muted-foreground">
                                        Clique para fazer upload
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        ZIP, RAR até 100MB
                                      </p>
                                    </>
                                  )}
                                </div>
                                <input 
                                  type="file"
                                  className="hidden"
                                  accept=".zip,.rar"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                      setIsUploading(true)
                                      // Simular upload
                                      setTimeout(() => {
                                        field.onChange(file.name)
                                        setIsUploading(false)
                                      }, 1000)
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="flex justify-end">
                    <Button type="submit" className="bg-[#097bff] hover:bg-[#097bff]/90">
                      Publicar anúncio
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </TabsContent>
        </Card>
      </Tabs>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            const currentIndex = ["produto", "categoria", "midia", "entrega"].indexOf(activeTab)
            if (currentIndex > 0) {
              setActiveTab(["produto", "categoria", "midia", "entrega"][currentIndex - 1])
            }
          }}
          disabled={activeTab === "produto"}
        >
          Voltar
        </Button>
        <Button
          onClick={() => {
            const currentIndex = ["produto", "categoria", "midia", "entrega"].indexOf(activeTab)
            if (currentIndex < 3) {
              setActiveTab(["produto", "categoria", "midia", "entrega"][currentIndex + 1])
            }
          }}
          disabled={activeTab === "entrega"}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
