import Link from "next/link"
import { Leaf, Tractor, Store } from "lucide-react"
import { CensoCampesinoForm } from "@/components/censo-campesino-form"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Censo de Productores del Campo - La Ñapa",
  description: "Registra tu finca o producción agrícola. Ayúdanos a conectar cosechas y excedentes con compradores y consumidores en Cúcuta.",
}

export default function CensoCampesinosPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">La Ñapa</span>
          </Link>

          <Button variant="outline" asChild size="sm">
            <Link href="/censo">
              <Store className="w-4 h-4 mr-2" />
              ¿Eres comercio? Ir a Censo Negocios
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Section */}
      <main className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Tractor className="w-4 h-4" />
              Censo de Productores Agrícolas
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              ¡El campo no se pierde! Cuéntanos de tu cosecha
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Queremos apoyar a los campesinos y productores del área metropolitana y Norte de Santander
              a vender sus excedentes a precios justos, sin intermediarios abusivos.
            </p>
          </div>

          <CensoCampesinoForm />
        </div>
      </main>
    </div>
  )
}
