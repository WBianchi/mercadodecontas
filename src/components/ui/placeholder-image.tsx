import Image from 'next/image'

interface PlaceholderImageProps {
  className?: string
  width?: number
  height?: number
  alt?: string
}

export function PlaceholderImage({ className, width = 400, height = 400, alt = 'Placeholder' }: PlaceholderImageProps) {
  return (
    <div className={`relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden ${className}`}>
      <Image
        src="/images/placeholder.jpg"
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E`;
        }}
      />
    </div>
  )
}
