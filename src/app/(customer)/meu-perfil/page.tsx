"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { HeaderUser } from "@/components/customer/header-user"
import { TabsUser } from "@/components/customer/tabs-user"

function ProfileContent() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "orders"

  return (
    <div className="space-y-8">
      <HeaderUser />
      <TabsUser defaultValue={tab} />
    </div>
  )
}

export default function CustomerProfile() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ProfileContent />
    </Suspense>
  )
}
