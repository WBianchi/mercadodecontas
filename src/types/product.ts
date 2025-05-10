export interface Seller {
  id: number
  name: string
  avatar: string
  rating: number
  totalSales: number
  verified: boolean
  description?: string
  joinedDate: string
  responseTime: string
}

export interface Review {
  id: number
  user: {
    name: string
    avatar: string
  }
  rating: number
  comment: string
  date: string
  verified: boolean
}

export interface Product {
  id: number
  title: string
  slug: string
  price: number
  originalPrice?: number
  pixDiscount: number
  installments: number
  image: string
  category: {
    id: number
    name: string
    slug: string
  }
  rating: number
  totalReviews: number
  seller: Seller
  inStock: boolean
  featured?: boolean
  shortDescription: string
  fullDescription: string
  warranty: string
  reviews: Review[]
  features: string[]
}

// Dados de exemplo atualizados
export const featuredProducts: Product[] = [
  {
    id: 1,
    title: "Conta Valorant com Katana Box",
    slug: "conta-valorant-katana-box",
    price: 200.00,
    originalPrice: 299.90,
    pixDiscount: 15,
    installments: 12,
    image: "https://placehold.co/400x300/097bff/ffffff.jpg",
    category: {
      id: 3,
      name: "Jogos",
      slug: "jogos"
    },
    rating: 4.8,
    totalReviews: 156,
    seller: {
      id: 1,
      name: "GameStore",
      avatar: "https://placehold.co/100/097bff/ffffff.jpg",
      rating: 4.9,
      totalSales: 1543,
      verified: true,
      description: "Loja especializada em contas de jogos premium. Mais de 5 anos no mercado.",
      joinedDate: "2019-01-15",
      responseTime: "< 1 hora"
    },
    inStock: true,
    featured: true,
    shortDescription: "Conta Valorant com Katana Box completa, rank Imortal e todas as skins raras do jogo.",
    fullDescription: "Conta Valorant premium com Katana Box completa, incluindo todas as skins raras e exclusivas. Rank Imortal conquistado legitimamente. Conta com email verificado e total segurança.",
    warranty: "30 dias de garantia com suporte 24/7",
    features: [
      "Katana Box Completa",
      "Rank Imortal",
      "Todas as Skins Raras",
      "Email Verificado",
      "Conta Original",
      "Suporte 24/7"
    ],
    reviews: [
      {
        id: 1,
        user: {
          name: "João Silva",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Conta excelente, exatamente como descrito. Entrega super rápida!",
        date: "2024-02-15",
        verified: true
      },
      {
        id: 2,
        user: {
          name: "Maria Santos",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Melhor vendedor! Conta perfeita e suporte muito atencioso.",
        date: "2024-02-14",
        verified: true
      }
    ]
  },
  {
    id: 2,
    title: "Conta Netflix Premium 4K",
    slug: "conta-netflix-premium-4k",
    price: 29.90,
    pixDiscount: 10,
    installments: 6,
    image: "https://placehold.co/400x300/097bff/ffffff.jpg",
    category: {
      id: 1,
      name: "Streaming",
      slug: "streaming"
    },
    rating: 4.9,
    totalReviews: 432,
    seller: {
      id: 2,
      name: "StreamKing",
      avatar: "https://placehold.co/100/097bff/ffffff.jpg",
      rating: 4.8,
      totalSales: 2156,
      verified: true,
      description: "Loja especializada em contas de streaming premium. Mais de 3 anos no mercado.",
      joinedDate: "2020-05-01",
      responseTime: "< 2 horas"
    },
    inStock: true,
    featured: true,
    shortDescription: "Conta Netflix Premium 4K com acesso a todos os conteúdos em alta definição.",
    fullDescription: "Conta Netflix Premium 4K com acesso a todos os conteúdos em alta definição, incluindo séries, filmes e documentários. Conta com email verificado e total segurança.",
    warranty: "15 dias de garantia com suporte 24/7",
    features: [
      "Acesso a todos os conteúdos em 4K",
      "Email Verificado",
      "Conta Original",
      "Suporte 24/7"
    ],
    reviews: [
      {
        id: 3,
        user: {
          name: "Pedro Oliveira",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Conta excelente, exatamente como descrito. Entrega super rápida!",
        date: "2024-02-12",
        verified: true
      },
      {
        id: 4,
        user: {
          name: "Ana Luiza",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Melhor vendedor! Conta perfeita e suporte muito atencioso.",
        date: "2024-02-11",
        verified: true
      }
    ]
  },
  {
    id: 3,
    title: "Conta Spotify Premium Vitalícia",
    slug: "conta-spotify-premium-vitalicia",
    price: 49.90,
    originalPrice: 89.90,
    pixDiscount: 20,
    installments: 12,
    image: "https://placehold.co/400x300/097bff/ffffff.jpg",
    category: {
      id: 1,
      name: "Streaming",
      slug: "streaming"
    },
    rating: 4.7,
    totalReviews: 289,
    seller: {
      id: 3,
      name: "MusicWorld",
      avatar: "https://placehold.co/100/097bff/ffffff.jpg",
      rating: 4.6,
      totalSales: 987,
      verified: true,
      description: "Loja especializada em contas de streaming de música premium. Mais de 2 anos no mercado.",
      joinedDate: "2021-01-01",
      responseTime: "< 3 horas"
    },
    inStock: true,
    featured: true,
    shortDescription: "Conta Spotify Premium vitalícia com acesso a todos os conteúdos de música.",
    fullDescription: "Conta Spotify Premium vitalícia com acesso a todos os conteúdos de música, incluindo álbuns, playlists e podcasts. Conta com email verificado e total segurança.",
    warranty: "30 dias de garantia com suporte 24/7",
    features: [
      "Acesso a todos os conteúdos de música",
      "Email Verificado",
      "Conta Original",
      "Suporte 24/7"
    ],
    reviews: [
      {
        id: 5,
        user: {
          name: "Luiz Carlos",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Conta excelente, exatamente como descrito. Entrega super rápida!",
        date: "2024-02-10",
        verified: true
      },
      {
        id: 6,
        user: {
          name: "Beatriz Silva",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Melhor vendedor! Conta perfeita e suporte muito atencioso.",
        date: "2024-02-09",
        verified: true
      }
    ]
  },
  {
    id: 4,
    title: "Conta Steam com +50 Jogos",
    slug: "conta-steam-50-jogos",
    price: 299.90,
    pixDiscount: 15,
    installments: 12,
    image: "https://placehold.co/400x300/097bff/ffffff.jpg",
    category: {
      id: 3,
      name: "Jogos",
      slug: "jogos"
    },
    rating: 4.9,
    totalReviews: 67,
    seller: {
      id: 4,
      name: "GamerPro",
      avatar: "https://placehold.co/100/097bff/ffffff.jpg",
      rating: 4.7,
      totalSales: 456,
      verified: true,
      description: "Loja especializada em contas de jogos premium. Mais de 2 anos no mercado.",
      joinedDate: "2021-06-01",
      responseTime: "< 2 horas"
    },
    inStock: true,
    featured: true,
    shortDescription: "Conta Steam com mais de 50 jogos premium, incluindo títulos de grande sucesso.",
    fullDescription: "Conta Steam com mais de 50 jogos premium, incluindo títulos de grande sucesso. Conta com email verificado e total segurança.",
    warranty: "30 dias de garantia com suporte 24/7",
    features: [
      "Mais de 50 jogos premium",
      "Email Verificado",
      "Conta Original",
      "Suporte 24/7"
    ],
    reviews: [
      {
        id: 7,
        user: {
          name: "Gabriel Oliveira",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Conta excelente, exatamente como descrito. Entrega super rápida!",
        date: "2024-02-08",
        verified: true
      },
      {
        id: 8,
        user: {
          name: "Julia Martins",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Melhor vendedor! Conta perfeita e suporte muito atencioso.",
        date: "2024-02-07",
        verified: true
      }
    ]
  },
  {
    id: 5,
    title: "Conta Disney+ Anual",
    slug: "conta-disney-plus-anual",
    price: 89.90,
    originalPrice: 119.90,
    pixDiscount: 20,
    installments: 12,
    image: "https://placehold.co/400x300/097bff/ffffff.jpg",
    category: {
      id: 1,
      name: "Streaming",
      slug: "streaming"
    },
    rating: 4.8,
    totalReviews: 178,
    seller: {
      id: 2,
      name: "StreamKing",
      avatar: "https://placehold.co/100/097bff/ffffff.jpg",
      rating: 4.8,
      totalSales: 2156,
      verified: true,
      description: "Loja especializada em contas de streaming premium. Mais de 3 anos no mercado.",
      joinedDate: "2020-05-01",
      responseTime: "< 2 horas"
    },
    inStock: true,
    featured: true,
    shortDescription: "Conta Disney+ anual com acesso a todos os conteúdos de streaming.",
    fullDescription: "Conta Disney+ anual com acesso a todos os conteúdos de streaming, incluindo filmes, séries e documentários. Conta com email verificado e total segurança.",
    warranty: "30 dias de garantia com suporte 24/7",
    features: [
      "Acesso a todos os conteúdos de streaming",
      "Email Verificado",
      "Conta Original",
      "Suporte 24/7"
    ],
    reviews: [
      {
        id: 9,
        user: {
          name: "Rafael Souza",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Conta excelente, exatamente como descrito. Entrega super rápida!",
        date: "2024-02-06",
        verified: true
      },
      {
        id: 10,
        user: {
          name: "Larissa Pereira",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Melhor vendedor! Conta perfeita e suporte muito atencioso.",
        date: "2024-02-05",
        verified: true
      }
    ]
  },
  {
    id: 6,
    title: "Conta Amazon Prime Anual",
    slug: "conta-amazon-prime-anual",
    price: 79.90,
    originalPrice: 119.90,
    pixDiscount: 20,
    installments: 12,
    image: "https://placehold.co/400x300/097bff/ffffff.jpg",
    category: {
      id: 1,
      name: "Streaming",
      slug: "streaming"
    },
    rating: 4.7,
    totalReviews: 145,
    seller: {
      id: 2,
      name: "StreamKing",
      avatar: "https://placehold.co/100/097bff/ffffff.jpg",
      rating: 4.8,
      totalSales: 2156,
      verified: true,
      description: "Loja especializada em contas de streaming premium. Mais de 3 anos no mercado.",
      joinedDate: "2020-05-01",
      responseTime: "< 2 horas"
    },
    inStock: true,
    featured: true,
    shortDescription: "Conta Amazon Prime anual com acesso a todos os conteúdos de streaming.",
    fullDescription: "Conta Amazon Prime anual com acesso a todos os conteúdos de streaming, incluindo filmes, séries e documentários. Conta com email verificado e total segurança.",
    warranty: "30 dias de garantia com suporte 24/7",
    features: [
      "Acesso a todos os conteúdos de streaming",
      "Email Verificado",
      "Conta Original",
      "Suporte 24/7"
    ],
    reviews: [
      {
        id: 11,
        user: {
          name: "Felipe Costa",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Conta excelente, exatamente como descrito. Entrega super rápida!",
        date: "2024-02-04",
        verified: true
      },
      {
        id: 12,
        user: {
          name: "Caroline Lima",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Melhor vendedor! Conta perfeita e suporte muito atencioso.",
        date: "2024-02-03",
        verified: true
      }
    ]
  },
  {
    id: 13,
    title: 'HBO Max Premium 1 Ano',
    price: 299.90,
    category: { name: 'Streaming', slug: 'streaming' },
    image: 'https://placehold.co/400x300/097bff/ffffff.jpg?text=HBO+Max',
    rating: 4.8,
    totalReviews: 890,
    featured: true,
    pixDiscount: 15,
    installments: 12,
    shortDescription: 'Acesso completo à plataforma por 1 ano',
    fullDescription: 'Assinatura anual do HBO Max com acesso a todos os conteúdos exclusivos...',
    warranty: 'Garantia de 30 dias',
    features: ['Perfil múltiplo', '4K UHD', 'Downloads ilimitados'],
    slug: 'hbo-max-premium-1-ano',
    seller: {
      id: 2,
      name: "StreamKing",
      avatar: "https://placehold.co/100/097bff/ffffff.jpg",
      rating: 4.8,
      totalSales: 2156,
      verified: true,
      description: "Loja especializada em contas de streaming premium. Mais de 3 anos no mercado.",
      joinedDate: "2020-05-01",
      responseTime: "< 2 horas"
    },
    inStock: true,
    reviews: [
      {
        id: 13,
        user: {
          name: "João Silva",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Conta excelente, exatamente como descrito. Entrega super rápida!",
        date: "2024-02-15",
        verified: true
      },
      {
        id: 14,
        user: {
          name: "Maria Santos",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Melhor vendedor! Conta perfeita e suporte muito atencioso.",
        date: "2024-02-14",
        verified: true
      }
    ]
  },
  {
    id: 14,
    title: 'Xbox Game Pass Ultimate',
    price: 349.90,
    category: { name: 'Games', slug: 'games' },
    image: 'https://placehold.co/400x300/097bff/ffffff.jpg?text=Xbox+Pass',
    rating: 4.9,
    totalReviews: 1200,
    featured: true,
    pixDiscount: 12,
    installments: 10,
    shortDescription: 'Assinatura anual do Game Pass Ultimate',
    fullDescription: 'Acesso a mais de 100 jogos premium para Xbox e PC...',
    warranty: 'Garantia de 60 dias',
    features: ['Jogos day one', 'EA Play incluído', 'Cloud gaming'],
    slug: 'xbox-game-pass-ultimate',
    seller: {
      id: 4,
      name: "GamerPro",
      avatar: "https://placehold.co/100/097bff/ffffff.jpg",
      rating: 4.7,
      totalSales: 456,
      verified: true,
      description: "Loja especializada em contas de jogos premium. Mais de 2 anos no mercado.",
      joinedDate: "2021-06-01",
      responseTime: "< 2 horas"
    },
    inStock: true,
    reviews: [
      {
        id: 15,
        user: {
          name: "Pedro Oliveira",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Conta excelente, exatamente como descrito. Entrega super rápida!",
        date: "2024-02-12",
        verified: true
      },
      {
        id: 16,
        user: {
          name: "Ana Luiza",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Melhor vendedor! Conta perfeita e suporte muito atencioso.",
        date: "2024-02-11",
        verified: true
      }
    ]
  },
  {
    id: 15,
    title: 'Adobe Creative Cloud Annual',
    price: 799.90,
    category: { name: 'Software', slug: 'software' },
    image: 'https://placehold.co/400x300/097bff/ffffff.jpg?text=Adobe+CC',
    rating: 4.7,
    totalReviews: 650,
    featured: false,
    pixDiscount: 8,
    installments: 18,
    shortDescription: 'Pacote completo de creative cloud',
    fullDescription: 'Assinatura anual com acesso a todos os aplicativos Adobe...',
    warranty: 'Garantia de 90 dias',
    features: ['Photoshop', 'Premiere Pro', '100GB cloud'],
    slug: 'adobe-creative-cloud-annual',
    seller: {
      id: 3,
      name: "MusicWorld",
      avatar: "https://placehold.co/100/097bff/ffffff.jpg",
      rating: 4.6,
      totalSales: 987,
      verified: true,
      description: "Loja especializada em contas de streaming de música premium. Mais de 2 anos no mercado.",
      joinedDate: "2021-01-01",
      responseTime: "< 3 horas"
    },
    inStock: true,
    reviews: [
      {
        id: 17,
        user: {
          name: "Luiz Carlos",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Conta excelente, exatamente como descrito. Entrega super rápida!",
        date: "2024-02-10",
        verified: true
      },
      {
        id: 18,
        user: {
          name: "Beatriz Silva",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Melhor vendedor! Conta perfeita e suporte muito atencioso.",
        date: "2024-02-09",
        verified: true
      }
    ]
  },
  {
    id: 16,
    title: 'NordVPN 3 Anos',
    price: 499.90,
    category: { name: 'Segurança', slug: 'seguranca' },
    image: 'https://placehold.co/400x300/097bff/ffffff.jpg?text=NordVPN',
    rating: 4.8,
    totalReviews: 2300,
    featured: true,
    pixDiscount: 20,
    installments: 6,
    shortDescription: 'VPN premium por 3 anos',
    fullDescription: 'Proteção completa de privacidade online...',
    warranty: 'Garantia de 30 dias',
    features: ['6 dispositivos', 'Proteção contra ameaças', 'Dark Web Monitor'],
    slug: 'nordvpn-3-anos',
    seller: {
      id: 4,
      name: "GamerPro",
      avatar: "https://placehold.co/100/097bff/ffffff.jpg",
      rating: 4.7,
      totalSales: 456,
      verified: true,
      description: "Loja especializada em contas de jogos premium. Mais de 2 anos no mercado.",
      joinedDate: "2021-06-01",
      responseTime: "< 2 horas"
    },
    inStock: true,
    reviews: [
      {
        id: 19,
        user: {
          name: "Gabriel Oliveira",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Conta excelente, exatamente como descrito. Entrega super rápida!",
        date: "2024-02-08",
        verified: true
      },
      {
        id: 20,
        user: {
          name: "Julia Martins",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Melhor vendedor! Conta perfeita e suporte muito atencioso.",
        date: "2024-02-07",
        verified: true
      }
    ]
  },
  {
    id: 17,
    title: 'Canva Pro Business',
    price: 899.90,
    category: { name: 'Design', slug: 'design' },
    image: 'https://placehold.co/400x300/097bff/ffffff.jpg?text=Canva+Pro',
    rating: 4.6,
    totalReviews: 980,
    featured: false,
    pixDiscount: 10,
    installments: 12,
    shortDescription: 'Plano empresarial do Canva',
    fullDescription: 'Ferramentas profissionais de design para equipes...',
    warranty: 'Garantia de 60 dias',
    features: ['Brand Kit', 'Magic Resize', '100GB storage'],
    slug: 'canva-pro-business',
    seller: {
      id: 3,
      name: "MusicWorld",
      avatar: "https://placehold.co/100/097bff/ffffff.jpg",
      rating: 4.6,
      totalSales: 987,
      verified: true,
      description: "Loja especializada em contas de streaming de música premium. Mais de 2 anos no mercado.",
      joinedDate: "2021-01-01",
      responseTime: "< 3 horas"
    },
    inStock: true,
    reviews: [
      {
        id: 21,
        user: {
          name: "Luiz Carlos",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Conta excelente, exatamente como descrito. Entrega super rápida!",
        date: "2024-02-10",
        verified: true
      },
      {
        id: 22,
        user: {
          name: "Beatriz Silva",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Melhor vendedor! Conta perfeita e suporte muito atencioso.",
        date: "2024-02-09",
        verified: true
      }
    ]
  },
  {
    id: 18,
    title: 'PlayStation Plus Premium',
    price: 599.90,
    category: { name: 'Games', slug: 'games' },
    image: 'https://placehold.co/400x300/097bff/ffffff.jpg?text=PS+Premium',
    rating: 4.7,
    totalReviews: 1450,
    featured: true,
    pixDiscount: 15,
    installments: 10,
    shortDescription: 'Assinatura anual PS Plus Premium',
    fullDescription: 'Catálogo completo de jogos clássicos e modernos...',
    warranty: 'Garantia de 45 dias',
    features: ['Jogos mensais', 'Cloud storage', 'Acesso remoto'],
    slug: 'playstation-plus-premium',
    seller: {
      id: 4,
      name: "GamerPro",
      avatar: "https://placehold.co/100/097bff/ffffff.jpg",
      rating: 4.7,
      totalSales: 456,
      verified: true,
      description: "Loja especializada em contas de jogos premium. Mais de 2 anos no mercado.",
      joinedDate: "2021-06-01",
      responseTime: "< 2 horas"
    },
    inStock: true,
    reviews: [
      {
        id: 23,
        user: {
          name: "Gabriel Oliveira",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Conta excelente, exatamente como descrito. Entrega super rápida!",
        date: "2024-02-08",
        verified: true
      },
      {
        id: 24,
        user: {
          name: "Julia Martins",
          avatar: "https://placehold.co/100/097bff/ffffff.jpg"
        },
        rating: 5,
        comment: "Melhor vendedor! Conta perfeita e suporte muito atencioso.",
        date: "2024-02-07",
        verified: true
      }
    ]
  }
]
