'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface PostCardProps {
  post: {
    id: string
    title: string
    description: string
    image: string
    categoria: string
    tempoLeitura: string
    data: string
    slug: string
  }
  index: number
}

export function PostCard({ post, index }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500">
          <CardHeader className="p-0">
            <div className="relative h-[280px] overflow-hidden">
              <motion.div
                initial={false}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className="mb-4 bg-blue-500 hover:bg-blue-600 text-white border-none">
                  {post.categoria}
                </Badge>
                <h3 className="text-2xl font-bold text-white mb-2 font-poppins line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-3 text-sm text-white/90">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.tempoLeitura}
                  </div>
                  <span>•</span>
                  <span>{post.data}</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <CardDescription className="text-gray-600 line-clamp-3 text-base">
              {post.description}
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
