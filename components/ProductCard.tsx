import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from './ui/card'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produtos/${product.id}`}>
      <Card className="overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-square">
          <Image
            src={product.productPhoto}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-poppins font-semibold text-lg line-clamp-2 mb-2">
            {product.name}
          </h3>
          <div className="space-y-1">
            {product.discountPrice ? (
              <>
                <p className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </p>
                <p className="text-lg font-bold text-primary">
                  {formatPrice(product.discountPrice)}
                </p>
              </>
            ) : (
              <p className="text-lg font-bold text-primary">
                {formatPrice(product.price)}
              </p>
            )}
            {product.pixPrice && product.pixPrice < (product.discountPrice || product.price) && (
              <p className="text-sm font-medium text-green-600">
                {formatPrice(product.pixPrice)} no PIX
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
