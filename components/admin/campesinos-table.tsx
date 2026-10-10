"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, Search, Phone, Mail, MapPin, Tractor, Smartphone, Truck } from "lucide-react"

export type CensoCampesino = {
  id: string
  created_at: string
  nombre_productor: string
  telefono: string
  email: string | null
  municipio: string
  vereda: string | null
  direccion_finca: string | null
  tipo_productor: string
  hectareas_cultivadas: string | null
  productos_principales: string[]
  productos_otro: string | null
  temporadas_cosecha: string | null
  frecuencia_excedentes: string
  cantidad_excedentes: string
  causa_excedentes: string[]
  causa_excedentes_otro: string | null
  que_hacen_excedentes: string[]
  que_hacen_otro: string | null
  perdida_estimada_porcentaje: string | null
  perdida_estimada_dinero: string | null
  canales_venta_actuales: string[]
  canal_otro: string | null
  precio_promedio_intermediario: string | null
  satisfaccion_canal_actual: string | null
  tiene_transporte_propio: boolean
  tipo_transporte: string | null
  costo_transporte_estimado: string | null
  tiempo_finca_cucuta: string | null
  tiene_cadena_frio: boolean
  acceso_vias: string | null
  tiene_smartphone: boolean
  usa_whatsapp: boolean
  tiene_nequi: boolean
  tiene_cuenta_bancaria: boolean
  entidad_bancaria: string | null
  frecuencia_uso_apps: string | null
  nivel_comodidad_tecnologia: string | null
  interes_app: string
  condiciones_para_participar: string[]
  condicion_otro: string | null
  cantidad_minima_aceptable: string | null
  precio_minimo_esperado: string | null
  desconfianzas: string | null
  dispuesto_fotos_productos: boolean
  pertenece_asociacion: boolean
  nombre_asociacion: string | null
  recibe_asistencia_tecnica: boolean
  fuente_asistencia: string | null
  beneficios_esperados: string | null
  preocupaciones: string | null
  comentarios_adicionales: string | null
  ciudad: string | null
}

type Props = {
  campesinos: CensoCampesino[]
}

const interesLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  muy_interesado: { label: "Muy interesado", variant: "default" },
  interesado: { label: "Interesado", variant: "secondary" },
  tal_vez: { label: "Tal vez", variant: "outline" },
  no_interesado: { label: "No interesado", variant: "destructive" },
}

export function CampesinosTable({ campesinos }: Props) {
  const [search, setSearch] = useState("")
  const [municipioFilter, setMunicipioFilter] = useState("todos")
  const [interesFilter, setInteresFilter] = useState("todos")
  const [selectedProductor, setSelectedProductor] = useState<CensoCampesino | null>(null)

  const municipios = Array.from(new Set(campesinos.map(c => c.municipio))).filter(Boolean)

  const filtered = campesinos.filter(c => {
    const matchesSearch =
      c.nombre_productor.toLowerCase().includes(search.toLowerCase()) ||
      c.municipio.toLowerCase().includes(search.toLowerCase()) ||
      (c.vereda && c.vereda.toLowerCase().includes(search.toLowerCase())) ||
      c.telefono.includes(search)
    const matchesMunicipio = municipioFilter === "todos" || c.municipio === municipioFilter
    const matchesInteres = interesFilter === "todos" || c.interes_app === interesFilter

    return matchesSearch && matchesMunicipio && matchesInteres
  })

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por productor, vereda o teléfono..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={municipioFilter} onValueChange={setMunicipioFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Municipio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los municipios</SelectItem>
            {municipios.map(m => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={interesFilter} onValueChange={setInteresFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Interés" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los niveles</SelectItem>
            <SelectItem value="muy_interesado">Muy interesado</SelectItem>
            <SelectItem value="interesado">Interesado</SelectItem>
            <SelectItem value="tal_vez">Tal vez</SelectItem>
            <SelectItem value="no_interesado">No interesado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabla */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Productor</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Excedentes</TableHead>
              <TableHead>Interés</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No se encontraron productores que coincidan con la búsqueda.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map(p => {
                const badge = interesLabels[p.interes_app] || { label: p.interes_app, variant: "outline" }
                return (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">
                      <div>{p.nombre_productor}</div>
                      <span className="text-xs text-muted-foreground capitalize">{p.tipo_productor}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{p.municipio}</span>
                      </div>
                      {p.vereda && <span className="text-xs text-muted-foreground">{p.vereda}</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {(p.productos_principales || []).slice(0, 2).map((prod, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {prod}
                          </Badge>
                        ))}
                        {(p.productos_principales || []).length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{p.productos_principales.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs capitalize">{p.frecuencia_excedentes?.replace("_", " ")}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span>{p.telefono}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedProductor(p)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Tractor className="h-5 w-5 text-primary" />
                              {p.nombre_productor}
                            </DialogTitle>
                            <DialogDescription>
                              Registrado el {new Date(p.created_at).toLocaleDateString("es-CO")}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4 py-4 text-sm">
                            <div className="grid grid-cols-2 gap-4 border-b pb-4">
                              <div>
                                <span className="text-muted-foreground font-medium">Ubicación:</span>
                                <p>{p.municipio} {p.vereda ? ` - Vereda ${p.vereda}` : ""}</p>
                                {p.direccion_finca && <p className="text-xs text-muted-foreground">{p.direccion_finca}</p>}
                              </div>
                              <div>
                                <span className="text-muted-foreground font-medium">Contacto:</span>
                                <p className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {p.telefono}</p>
                                {p.email && <p className="flex items-center gap-1 text-xs"><Mail className="h-3.5 w-3.5" /> {p.email}</p>}
                              </div>
                            </div>

                            <div className="border-b pb-4">
                              <span className="text-muted-foreground font-medium">Cultivos y Finca:</span>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {(p.productos_principales || []).map((pr, i) => (
                                  <Badge key={i} variant="secondary">{pr}</Badge>
                                ))}
                              </div>
                              {p.hectareas_cultivadas && (
                                <p className="mt-2 text-xs text-muted-foreground">Área: {p.hectareas_cultivadas}</p>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-b pb-4">
                              <div>
                                <span className="text-muted-foreground font-medium">Excedentes:</span>
                                <p className="text-xs mt-1">Frecuencia: {p.frecuencia_excedentes}</p>
                                <p className="text-xs">Cantidad: {p.cantidad_excedentes}</p>
                                {p.perdida_estimada_porcentaje && (
                                  <p className="text-xs">Pérdida aprox: {p.perdida_estimada_porcentaje}</p>
                                )}
                              </div>
                              <div>
                                <span className="text-muted-foreground font-medium">Logística:</span>
                                <p className="text-xs mt-1">Transporte propio: {p.tiene_transporte_propio ? "Sí" : "No"}</p>
                                {p.tipo_transporte && <p className="text-xs">Vehículo: {p.tipo_transporte}</p>}
                                {p.tiempo_finca_cucuta && <p className="text-xs">Tiempo a Cúcuta: {p.tiempo_finca_cucuta}</p>}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-b pb-4">
                              <div>
                                <span className="text-muted-foreground font-medium">Digitalización:</span>
                                <p className="text-xs mt-1">Smartphone: {p.tiene_smartphone ? "Sí" : "No"}</p>
                                <p className="text-xs">WhatsApp: {p.usa_whatsapp ? "Sí" : "No"}</p>
                                <p className="text-xs">Nequi/Daviplata: {p.tiene_nequi ? "Sí" : "No"}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground font-medium">Asociación:</span>
                                <p className="text-xs mt-1">{p.pertenece_asociacion ? `Pertenece: ${p.nombre_asociacion || "Sí"}` : "Independiente"}</p>
                              </div>
                            </div>

                            {p.beneficios_esperados && (
                              <div>
                                <span className="text-muted-foreground font-medium">Beneficios esperados:</span>
                                <p className="text-xs mt-1 bg-muted p-2 rounded">{p.beneficios_esperados}</p>
                              </div>
                            )}

                            {p.comentarios_adicionales && (
                              <div>
                                <span className="text-muted-foreground font-medium">Comentarios adicionales:</span>
                                <p className="text-xs mt-1 bg-muted p-2 rounded">{p.comentarios_adicionales}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
