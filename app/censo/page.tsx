import Link from "next/link"
import { Leaf, Tractor } from "lucide-react"
import { CensoForm } from "@/components/censo-form"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Censo de Comercios - delib3r",
  description: "Registra tu negocio y cuentanos sobre tus excedentes de comida. Juntos podemos reducir el desperdicio alimentario en Cucuta.",
}

export default function CensoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg sm:text-xl text-foreground">delib3r</span>
          </Link>

          <Button variant="outline" asChild size="sm" className="text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9 shrink-0">
            <Link href="/censo/campesinos">
              <Tractor className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-primary shrink-0" />
              <span>Censo <span className="hidden sm:inline">Productores / </span>Campesinos</span>
            </Link>
          </Button>
        </div>
      </header>

      {/* Form Section */}
      <main className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Leaf className="w-4 h-4" />
              Censo de Comercios
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Cuentanos sobre tu negocio
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Este censo nos ayuda a entender la situacion de los excedentes de comida en Cucuta
              y como podemos ayudarte a convertirlos en oportunidades.
            </p>
          </div>

          <CensoForm />
        </div>
      </main>
    </div>
  )
}
