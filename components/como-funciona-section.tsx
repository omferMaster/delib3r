"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import {
  Store,
  ShoppingBag,
  Utensils,
  Tractor,
  Sprout,
  Truck,
  PackageCheck,
  Users,
  HandCoins,
} from "lucide-react"

type Audience = "comercios" | "campesinos" | "comun"

const steps: Record<Audience, { icon: React.ElementType; title: string; description: string }[]> = {
  comercios: [
    {
      icon: Store,
      title: "Registra tus excedentes",
      description:
        "Publica tus sobrantes del día: bandeja de pan, porciones de comida preparada, frutas maduras... lo que sea que vaya a perderse.",
    },
    {
      icon: ShoppingBag,
      title: "Compradores te encuentran",
      description:
        "Usuarios cercanos ven tus ofertas en tiempo real y reservan sus productos a precios reducidos, sin desperdiciarlos.",
    },
    {
      icon: HandCoins,
      title: "Generas ingresos extras",
      description:
        "Lo que normalmente sería pérdida, ahora se convierte en dinero. Reduces costos de desechos y atraes nuevos clientes.",
    },
  ],
  campesinos: [
    {
      icon: Tractor,
      title: "Registra tu cosecha",
      description:
        "Cuéntanos qué productos tienes disponibles, cuántos kilos sobran y con qué frecuencia. Sin complicaciones.",
    },
    {
      icon: Sprout,
      title: "Conectamos tu producto",
      description:
        "Te ponemos en contacto con comercios, restaurantes y consumidores en Cúcuta que necesitan exactamente lo que tú tienes.",
    },
    {
      icon: Truck,
      title: "Vende sin intermediarios",
      description:
        "Recibe el pago directamente, ya sea por Nequi, Daviplata o transferencia. Sin remates injustos, sin intermediarios abusivos.",
    },
  ],
  comun: [
    {
      icon: PackageCheck,
      title: "Encuentra ofertas cerca de ti",
      description:
        "Explora las bolsas sorpresa y excedentes disponibles en restaurantes, panaderías y productores de tu zona.",
    },
    {
      icon: ShoppingBag,
      title: "Reserva y ahorra hasta 70%",
      description:
        "Selecciona lo que te interesa, paga un precio increíble y recibe confirmación al instante en tu celular.",
    },
    {
      icon: Utensils,
      title: "Recoge y disfruta",
      description:
        "Pasa por el local o punto de entrega, recoge tu pedido fresco y disfruta comida de calidad sin desperdiciar nada.",
    },
  ],
}

const tabs: { id: Audience; label: string; icon: React.ElementType; color: string }[] = [
  { id: "comercios", label: "Comercios & Negocios", icon: Store, color: "text-blue-600 dark:text-blue-400" },
  { id: "campesinos", label: "Productores del Campo", icon: Tractor, color: "text-green-600 dark:text-green-400" },
  { id: "comun", label: "Consumidores", icon: Users, color: "text-orange-600 dark:text-orange-400" },
]

export function ComoFuncionaSection() {
  const [active, setActive] = useState<Audience>("comercios")
  const activeTab = tabs.find(t => t.id === active)!
  const currentSteps = steps[active]

  return (
    <section id="como-funciona" className="py-16 sm:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">¿Cómo funciona?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un proceso simple para salvar comida, generar ingresos y ahorrar dinero
          </p>
        </div>

        {/* Toggle buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all border ${
                active === tab.id
                  ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              }`}
            >
              <tab.icon className={`w-4 h-4 shrink-0 ${active === tab.id ? "" : tab.color}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Steps cards */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {currentSteps.map((step, index) => (
            <Card
              key={`${active}-${index}`}
              className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/60 opacity-0 animate-[fadeIn_0.4s_ease_forwards]"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CardContent className="pt-8 pb-6 px-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="absolute top-4 right-4 text-6xl font-bold text-muted-foreground/10 select-none">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA hint below */}
        <div className="text-center mt-8">
          {active === "comercios" && (
            <p className="text-sm text-muted-foreground">
              ¿Tienes un comercio?{" "}
              <Link href="/censo" className="text-primary font-medium hover:underline">
                Regístrate aquí →
              </Link>
            </p>
          )}
          {active === "campesinos" && (
            <p className="text-sm text-muted-foreground">
              ¿Eres productor del campo?{" "}
              <Link href="/censo/campesinos" className="text-primary font-medium hover:underline">
                Únete al censo campesino →
              </Link>
            </p>
          )}
          {active === "comun" && (
            <p className="text-sm text-muted-foreground">
              La app estará disponible próximamente. ¡Mantente atento!
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
