"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DocumentsFormData, documentsSchema } from "@/app/cadastro/lojista/schemas"

interface DocumentsFormProps {
  onSubmit: (data: DocumentsFormData) => void
  onBack: () => void
  defaultValues?: Partial<DocumentsFormData>
}

export function DocumentsForm({ onSubmit, onBack, defaultValues }: DocumentsFormProps) {
  const form = useForm<DocumentsFormData>({
    resolver: zodResolver(documentsSchema),
    defaultValues: {
      acceptedTerms: false,
      ...defaultValues,
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-[#097bff] bg-clip-text text-transparent">
          Termos e Condições
        </h2>
        <p className="text-gray-500">
          Leia e aceite os termos para concluir seu cadastro
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 bg-white/50 p-6 rounded-lg border">
            <h3 className="font-semibold text-lg">Termos de Uso</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                Ao aceitar os termos, você concorda em:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Fornecer informações verdadeiras e precisas</li>
                <li>Manter suas informações atualizadas</li>
                <li>Seguir as políticas e diretrizes da plataforma</li>
                <li>Respeitar os direitos dos consumidores</li>
                <li>Cumprir com as obrigações fiscais e legais</li>
              </ul>
            </div>
          </div>

          <FormField
            control={form.control}
            name="acceptedTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Li e aceito os termos de uso e políticas da plataforma
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="w-full"
            >
              Voltar
            </Button>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#097bff] to-blue-600"
            >
              Concluir Cadastro
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  )
}
