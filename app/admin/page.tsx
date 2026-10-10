import { sql } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Tractor, AlertCircle, ShoppingBag, Sprout } from "lucide-react"
import { CensoTable } from "@/components/admin/censo-table"
import { CampesinosTable, CensoCampesino } from "@/components/admin/campesinos-table"
import { StatsCards } from "@/components/admin/stats-cards"

export const metadata = {
  title: "Panel Admin - La Ñapa",
  description: "Dashboard administrativo para gestionar el censo de comercios y campesinos",
}

type CensoComercio = {
  id: string
  created_at: string
  nombre_negocio: string
  tipo_negocio: string
  nombre_contacto: string
  telefono: string
  email: string | null
  direccion: string | null
  barrio: string | null
  frecuencia_excedentes: string
  cantidad_excedentes: string
  tipos_excedentes: string | null
  que_hacen_excedentes: string[]
  que_hacen_otro: string | null
  perdida_estimada: string | null
  interes_app: string
  beneficios_esperados: string | null
  preocupaciones: string | null
  comentarios_adicionales: string | null
}

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  let comercios: CensoComercio[] = []
  let campesinos: CensoCampesino[] = []

  try {
    const [comerciosData, campesinosData] = await Promise.all([
      sql`SELECT * FROM censo_comercios ORDER BY created_at DESC`,
      sql`SELECT * FROM censo_campesinos ORDER BY created_at DESC`,
    ])

    comercios = comerciosData as unknown as CensoComercio[]
    campesinos = campesinosData as unknown as CensoCampesino[]
  } catch (error) {
    return (
      <div className="min-h-screen bg-background p-8">
        <Card className="max-w-md mx-auto border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Error al cargar datos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {error instanceof Error ? error.message : "Error al conectar con la base de datos"}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Estadísticas comercios
  const totalComercios = comercios.length
  const interesadosComercios = comercios.filter(c => c.interes_app === "muy_interesado" || c.interes_app === "interesado").length
  const porTipo = comercios.reduce((acc, c) => {
    acc[c.tipo_negocio] = (acc[c.tipo_negocio] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const tipoMasComun = Object.entries(porTipo).sort((a, b) => b[1] - a[1])[0]

  // Estadísticas campesinos
  const totalCampesinos = campesinos.length
  const interesadosCampesinos = campesinos.filter(c => c.interes_app === "muy_interesado" || c.interes_app === "interesado").length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Panel Administrativo</h1>
              <p className="text-muted-foreground">La Ñapa - Gestión de censos de Comercios y Campesinos</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-primary border-primary">
                {totalComercios} Comercios
              </Badge>
              <Badge variant="secondary" className="border">
                {totalCampesinos} Campesinos
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <Tabs defaultValue="comercios" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="comercios" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Comercios ({totalComercios})
            </TabsTrigger>
            <TabsTrigger value="campesinos" className="flex items-center gap-2">
              <Tractor className="h-4 w-4" />
              Campesinos ({totalCampesinos})
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: COMERCIOS */}
          <TabsContent value="comercios" className="space-y-6">
            <StatsCards 
              totalComercios={totalComercios}
              interesados={interesadosComercios}
              tipoMasComun={tipoMasComun}
            />

            <Card>
              <CardHeader>
                <CardTitle>Comercios Registrados</CardTitle>
                <CardDescription>
                  Listado de todos los comercios que han respondido el formulario
                </CardDescription>
              </CardHeader>
              <CardContent>
                {comercios.length === 0 ? (
                  <div className="text-center py-12">
                    <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No hay respuestas de comercios todavía</p>
                  </div>
                ) : (
                  <CensoTable comercios={comercios} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: CAMPESINOS */}
          <TabsContent value="campesinos" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Productores</CardTitle>
                  <Tractor className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalCampesinos}</div>
                  <p className="text-xs text-muted-foreground">Campesinos registrados</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Interesados en la App</CardTitle>
                  <Sprout className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{interesadosCampesinos}</div>
                  <p className="text-xs text-muted-foreground">
                    {totalCampesinos > 0 ? Math.round((interesadosCampesinos / totalCampesinos) * 100) : 0}% de los encuestados
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Con Smartphone</CardTitle>
                  <Badge variant="outline" className="text-xs">Digital</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {campesinos.filter(c => c.tiene_smartphone).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Disponen de celular inteligente</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Productores Agrícolas Registrados</CardTitle>
                <CardDescription>
                  Listado de campesinos y parceleros que han participado en el censo
                </CardDescription>
              </CardHeader>
              <CardContent>
                {campesinos.length === 0 ? (
                  <div className="text-center py-12">
                    <Tractor className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No hay respuestas de productores del campo todavía</p>
                  </div>
                ) : (
                  <CampesinosTable campesinos={campesinos} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
