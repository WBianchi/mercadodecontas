"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: number
  name: string
  shortDescription: string
  price: number
  discountPrice?: number | null
  pixPrice?: number | null
  productPhoto: string
  inStock: boolean
  Category: {
    name: string
  }[]
}

export function ProductCard({
  id,
  name,
  shortDescription,
  price,
  discountPrice,
  pixPrice,
  productPhoto,
  inStock,
  Category,
}: ProductCardProps) {
  return (
    <Link href={`/produto/${name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`}>
      <Card className="group overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <Image
              src={productPhoto || "https://placehold.co/400x400"}
              alt={name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            {!inStock && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <Badge variant="destructive" className="text-base">
                  Fora de Estoque
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <div className="space-y-1">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {shortDescription}
            </p>
          </div>
          <div className="space-y-1">
            {pixPrice && (
              <div className="text-sm text-muted-foreground">
                PIX: R$ {pixPrice.toFixed(2)}
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="font-semibold">
                R$ {price.toFixed(2)}
              </div>
              {discountPrice && (
                <div className="text-sm text-green-600">
                  R$ {discountPrice.toFixed(2)}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {Category.map((cat, i) => (
              <Badge key={i} variant="secondary">
                {cat.name}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
