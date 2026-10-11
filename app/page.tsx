import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, ShoppingBag, Store, Tractor, TrendingDown, Users, Utensils } from "lucide-react"
import { ComoFuncionaSection } from "@/components/como-funciona-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">Delib3r</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">
              Como funciona
            </Link>
            <Link href="#beneficios" className="text-muted-foreground hover:text-foreground transition-colors">
              Beneficios
            </Link>
            <Link href="/censo" className="text-muted-foreground hover:text-foreground transition-colors">
              Negocios
            </Link>
            <Link href="/censo/campesinos" className="text-muted-foreground hover:text-foreground transition-colors">
              Campesinos
            </Link>
          </nav>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button variant="outline" asChild size="sm" className="text-xs sm:text-sm px-2.5 sm:px-3">
              <Link href="/censo/campesinos">
                <Tractor className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-primary shrink-0" />
                <span className="hidden xs:inline">Censo </span>Campesinos
              </Link>
            </Button>
            <Button asChild size="sm" className="text-xs sm:text-sm px-2.5 sm:px-3">
              <Link href="/censo">
                <Store className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 shrink-0 sm:hidden" />
                <span className="hidden xs:inline">Censo </span>Comercios
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-6 max-w-full">
              <Leaf className="w-4 h-4 shrink-0" />
              <span className="truncate">Movimiento anti-desperdicio en Cúcuta y su área metropolitana</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6 text-balance">
              Salvemos la comida que aun es buena
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
              Conectamos restaurantes, panaderias y comercios de Cucuta con personas que quieren
              aprovechar excedentes de comida a precios increibles. Juntos reducimos el desperdicio alimentario.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto w-full">
              <Button size="lg" asChild className="text-sm sm:text-base w-full sm:w-auto justify-center h-12 sm:h-11">
                <Link href="/censo">
                  <Store className="w-5 h-5 mr-2 shrink-0" />
                  Registra tu negocio
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild className="text-sm sm:text-base border border-border w-full sm:w-auto justify-center h-12 sm:h-11">
                <Link href="/censo/campesinos">
                  <Tractor className="w-5 h-5 mr-2 text-primary shrink-0" />
                  Soy productor del campo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "30%", label: "de la comida se desperdicia" },
              { value: "2.5M", label: "toneladas al año en Colombia" },
              { value: "70%", label: "de descuento promedio" },
              { value: "0", label: "razon para botar comida buena" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - interactive */}
      <ComoFuncionaSection />

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Beneficios para todos</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Un ecosistema donde todos ganan: comercios, consumidores y el planeta
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-2 border-primary/20 bg-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <Store className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Para comercios</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <TrendingDown className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Recupera ingresos de productos que normalmente se pierden</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Atrae nuevos clientes que luego vuelven a precio completo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Leaf className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Mejora tu imagen como negocio sostenible y responsable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Leaf className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Accede a los productos del campo a precios accesibles y sin mucho problema</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            <Card className="p-8 border-2 border-accent/40 bg-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Para consumidores</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ShoppingBag className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>Ahorra hasta 70% en comida de calidad que todavia tiene uso</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Utensils className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>Descubre nuevos restaurantes y locales que antes no conocias</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Leaf className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>Atrevete a comprar paquetes sorpresa, no sabras que te espera</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Leaf className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>Apoya a los negocios locales y contribuye a reducir el desperdicio en la ciudad</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            <Card className="p-8 border-2 border-green-500/30 bg-green-50/30 dark:border-green-500/20 dark:bg-green-950/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0">
                  <Tractor className="w-6 h-6 text-green-700 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Para campesinos</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ShoppingBag className="w-5 h-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                      <span>Recupera ingresos de la mercancia que normalmente se pierden</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Utensils className="w-5 h-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                      <span>Ofrece directamente tus productos a los negociantes de una manera ágil y sencilla</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Leaf className="w-5 h-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                      <span>Sin más intermediarios, recibe tu pago directamente y sin preocupaciones</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4 sm:mb-6">
            ¿Tienes un comercio o eres productor del campo?
          </h2>
          <p className="text-base sm:text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Queremos conocerte. Completa nuestro censo para entender tus necesidades
            y cómo podemos ayudarte a reducir el desperdicio mientras generas ingresos extra.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
            <Button size="lg" variant="secondary" asChild className="text-sm sm:text-base w-full sm:w-auto justify-center h-12 sm:h-11">
              <Link href="/censo">
                <Store className="w-5 h-5 mr-2 shrink-0" />
                Censo de comercios
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-sm sm:text-base bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 w-full sm:w-auto justify-center h-12 sm:h-11">
              <Link href="/censo/campesinos">
                <Tractor className="w-5 h-5 mr-2 shrink-0" />
                Censo de campesinos
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Delib3r</span>
            </div>
            <p className="text-background/60 text-sm">
              Lo bueno que sobra, a precio justo. Hecho para Cucuta.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
