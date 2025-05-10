export interface WordPressPost {
  id: number
  date: string
  modified: string
  slug: string
  status: string
  type: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  excerpt: {
    rendered: string
  }
  author: number
  featured_media: number
  categories: number[]
  tags: number[]
  yoast_head_json: {
    title: string
    description: string
    robots: {
      index: string
      follow: string
      "max-snippet": string
      "max-image-preview": string
      "max-video-preview": string
    }
    canonical: string
    og_locale: string
    og_type: string
    og_title: string
    og_description: string
    og_url: string
    og_site_name: string
    article_published_time: string
    article_modified_time: string
    twitter_card: string
    twitter_misc: {
      "Written by": string
      "Est. reading time": string
    }
  }
}

export interface WordPressCategory {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: string
  parent: number
  meta: any[]
  yoast_head_json: {
    title: string
    description: string
    robots: {
      index: string
      follow: string
    }
    canonical: string
  }
}

export interface WordPressTag {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: string
  meta: any[]
  yoast_head_json: {
    title: string
    description: string
    robots: {
      index: string
      follow: string
    }
    canonical: string
  }
}
