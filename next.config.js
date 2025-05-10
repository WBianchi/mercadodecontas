/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignorar erros de ESLint durante o build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignorar erros de TypeScript durante o build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuração de imagens
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    domains: ['i0.wp.com', 'mercadodecontas.com.br', 'via.placeholder.com'],
  },
}

module.exports = nextConfig
