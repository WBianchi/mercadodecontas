"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"
import { TopbarAdmin } from "@/components/admin/topbar-admin"
import { LeftbarAdmin } from "@/components/admin/leftbar-admin"

const queryClient = new QueryClient()

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <TopbarAdmin />
        <div className="flex">
          <div className="w-64 hidden md:block">
            <LeftbarAdmin />
          </div>
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
        <Toaster richColors position="top-right" />
      </div>
    </QueryClientProvider>
  )
}
