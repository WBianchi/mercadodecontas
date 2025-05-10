import { BlogPost, BlogCategory, BlogTag } from '@prisma/client'

export interface BlogPostWithRelations extends BlogPost {
  categories: BlogCategory[]
  tags: BlogTag[]
}

export interface BlogCategoryWithCount extends BlogCategory {
  _count: {
    posts: number
  }
}

export interface BlogTagWithCount extends BlogTag {
  _count: {
    posts: number
  }
}
