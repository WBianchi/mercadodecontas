"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'

interface CategoryItemProps {
  name: string
  slug: string
  imageUrl?: string
}

export function CategoryItem({ name, slug, imageUrl }: CategoryItemProps) {
  return (
    <Link href={`/categoria/${slug}`}>
      <Card className="group relative overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src={imageUrl || '/images/placeholder-category.jpg'}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23374151' font-size='24'%3E${name}%3C/text%3E%3C/svg%3E`;
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
        </div>
      </Card>
    </Link>
  )
}
