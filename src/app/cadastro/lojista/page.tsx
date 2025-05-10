"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import { toast } from "sonner"

import { ProgressSteps } from "@/components/forms/progress-steps"
import { UserForm } from "@/components/forms/user-form"
import { BusinessForm } from "@/components/forms/business-form"
import { AddressForm } from "@/components/forms/address-form"
import { DocumentsForm } from "@/components/forms/documents-form"
import type {
  UserFormData,
  BusinessFormData,
  AddressFormData,
  DocumentsFormData,
} from "./schemas"

export default function LojistaRegistrationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    user: {} as UserFormData,
    business: {} as BusinessFormData,
    address: {} as AddressFormData,
    documents: {} as DocumentsFormData,
  })

  const handleUserSubmit = async (data: UserFormData) => {
    setFormData((prev) => ({ ...prev, user: data }))
    setStep(2)
  }

  const handleBusinessSubmit = async (data: BusinessFormData) => {
    setFormData((prev) => ({ ...prev, business: data }))
    setStep(3)
  }

  const handleAddressSubmit = async (data: AddressFormData) => {
    setFormData((prev) => ({ ...prev, address: data }))
    setStep(4)
  }

  const handleDocumentsSubmit = async (data: DocumentsFormData) => {
    setFormData((prev) => ({ ...prev, documents: data }))

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData.user,
          ...formData.business,
          ...formData.address,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Erro ao criar conta")
      }

      toast.success("Conta criada com sucesso! Você será redirecionado para o login.")
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-8">
          <ProgressSteps currentStep={step} />

          <div className="mt-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <UserForm
                  key="user"
                  onSubmit={handleUserSubmit}
                  defaultValues={formData.user}
                />
              )}
              {step === 2 && (
                <BusinessForm
                  key="business"
                  onSubmit={handleBusinessSubmit}
                  onBack={() => setStep(1)}
                  defaultValues={formData.business}
                />
              )}
              {step === 3 && (
                <AddressForm
                  key="address"
                  onSubmit={handleAddressSubmit}
                  onBack={() => setStep(2)}
                  defaultValues={formData.address}
                />
              )}
              {step === 4 && (
                <DocumentsForm
                  key="documents"
                  onSubmit={handleDocumentsSubmit}
                  onBack={() => setStep(3)}
                  defaultValues={formData.documents}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
