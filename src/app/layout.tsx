import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Providers } from "@/providers"
import { ThemeProvider } from "@/components/theme-provider"
import { IAAssistant } from "@/components/ia-assistant"
import { CartProvider } from "@/contexts/cart-context"
import AuthProvider from "@/providers/session-provider"
import cn from "classnames"
import { Toaster } from "sonner"
import GoogleAnalytics from "@/components/analytics/google-analytics"
import GoogleAds from "@/components/analytics/google-ads"
import GoogleMerchantBadge from "@/components/analytics/google-merchant-badge"
import GoogleMerchantOptIn from "@/components/analytics/google-merchant-optin"
import { CookieConsent } from "@/components/cookie-consent"

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Mercado de Contas",
  description: "O maior marketplace de contas premium, licenças digitais e assinaturas de streaming. Compre contas verificadas de Instagram, Facebook, TikTok, Google, além de softwares originais, licenças e assinaturas de streaming com segurança e garantia.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/logo-mercadodecontas.png", sizes: "192x192" }
    ],
    apple: { url: "/logo-mercadodecontas.png", sizes: "192x192" },
  },
  keywords: "contas premium, redes sociais, licenças digitais, windows, instagram, facebook, tiktok, google, streaming, assinaturas premium, softwares originais",
  authors: [{ name: "Mercado de Contas" }],
  creator: "Mercado de Contas",
  publisher: "Mercado de Contas",
  openGraph: {
    type: "website",
    title: "Mercado de Contas - O maior marketplace de contas premium",
    description: "Contas verificadas, licenças digitais e assinaturas de streaming com garantia e suporte. Compre com segurança no maior marketplace brasileiro.",
    siteName: "Mercado de Contas",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mercado de Contas - O maior marketplace de contas premium",
    description: "Contas verificadas, licenças digitais e assinaturas de streaming com garantia e suporte.",
    images: [{ url: "/og-image.png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
        <GoogleAds ADS_ID={process.env.NEXT_PUBLIC_GOOGLE_ADS_ID!} />
        <GoogleMerchantBadge MERCHANT_ID="584741722" />
        <GoogleMerchantOptIn MERCHANT_ID="584741722" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          poppins.variable
        )}
      >
        <Providers>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <CartProvider>
                <Providers>
                  {children}
                </Providers>
                <Toaster richColors position="top-center" />
                <CookieConsent />
              </CartProvider>
              <IAAssistant />
            </ThemeProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
