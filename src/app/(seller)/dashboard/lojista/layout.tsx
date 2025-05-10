"use client"

import { TopbarLojista } from "@/components/seller/topbar-lojista"
import { LeftbarLojista } from "@/components/seller/leftbar-lojista"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen bg-background">
          <TopbarLojista />
          <div className="flex h-[calc(100vh-64px)]">
            <LeftbarLojista />
            <main className="flex-1 overflow-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
