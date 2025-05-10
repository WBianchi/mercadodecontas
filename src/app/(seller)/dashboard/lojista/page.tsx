"use client"

import { VisaoGeral } from "@/components/seller/visao-geral"

export default function SellerDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <VisaoGeral />
    </div>
  )
}
