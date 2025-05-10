"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Store } from "lucide-react"

interface SellerAvatarProps {
  name: string
  src?: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16"
}

export function SellerAvatar({ name, src, size = "md" }: SellerAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        {src ? <Store className="w-6 h-6" /> : initials}
      </AvatarFallback>
    </Avatar>
  )
}
