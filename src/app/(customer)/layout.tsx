import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container max-w-8xl mx-auto px-4">
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
