"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { submitCensoCampesino, CensoCampesinoInput } from "@/app/actions/censo"
import { Tractor, Sprout, Truck, Smartphone, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react"

const MUNICIPIOS_NORTE = [
  "Cúcuta",
  "Los Patios",
  "Villa del Rosario",
  "El Zulia",
  "San Cayetano",
  "Pamplona",
  "Pamplonita",
  "Chinácota",
  "Bochalema",
  "Arboledas",
  "Cucutilla",
  "Gramalote",
  "Lourdes",
  "Salazar de Las Palmas",
  "Santiago",
  "Sardinata",
  "Tibú",
  "Ocaña",
  "Ábrego",
  "Otro",
]

const TIPO_PRODUCTOR_OPTIONS = [
  { value: "pequeno", label: "Pequeño productor (menos de 5 hectáreas)" },
  { value: "mediano", label: "Mediano productor (5 a 20 hectáreas)" },
  { value: "asociacion", label: "Representante de asociación o cooperativa" },
  { value: "familiar", label: "Agricultura familiar / huerta" },
]

const PRODUCTOS_OPTIONS = [
  "Tomate",
  "Cebolla junca / de huevo",
  "Pimentón",
  "Papa",
  "Zanahoria",
  "Yuca",
  "Plátano",
  "Cítricos (Naranja / Limón / Mandarina)",
  "Frutas (Maracuyá, Mora, Fresa, etc.)",
  "Café / Cacao",
  "Hortalizas de hoja (Lechuga, Cilantro)",
  "Huevos / Lácteos",
  "Otro",
]

const FRECUENCIA_EXCEDENTES = [
  { value: "cada_cosecha", label: "En cada cosecha o corte" },
  { value: "semanal", label: "Todas las semanas" },
  { value: "quincenal_mensual", label: "Quincenal o mensual" },
  { value: "picos_temporada", label: "Solo en picos de alta producción" },
  { value: "casi_nunca", label: "Rara vez o casi nunca" },
]

const CANTIDAD_EXCEDENTES = [
  { value: "menos_50kg", label: "Menos de 50 kg / bulto" },
  { value: "50_200kg", label: "Entre 50 kg y 200 kg (1 a 4 bultos)" },
  { value: "200_500kg", label: "Entre 200 kg y 500 kg (media tonelada)" },
  { value: "mas_500kg", label: "Más de 500 kg (toneladas)" },
]

const CAUSAS_EXCEDENTES = [
  { id: "bajo_precio", label: "Bajo precio en plaza (no paga el flete)" },
  { id: "tamano_estetica", label: "Tamaño o apariencia no deseada por intermediario" },
  { id: "maduracion", label: "Maduración rápida / falta de frío" },
  { id: "sobreproduccion", label: "Sobreproducción en la región" },
  { id: "falta_transporte", label: "Falta de transporte oportuno" },
  { id: "otro", label: "Otro" },
]

const QUE_HACEN_EXCEDENTES = [
  { id: "animales", label: "Se le da de comer a los animales" },
  { id: "abono", label: "Se deja perder / compostaje / abono" },
  { id: "regalar", label: "Se regala a vecinos o trabajadores" },
  { id: "remate", label: "Se remata a precio muy bajo a intermediario" },
  { id: "procesar", label: "Se transforma (pulpas, conservas)" },
  { id: "otro", label: "Otro" },
]

const CANALES_VENTA = [
  { id: "cenabastos", label: "Cenabastos (Cúcuta)" },
  { id: "intermediario_finca", label: "Intermediario que compra en finca" },
  { id: "plaza_local", label: "Plaza de mercado de mi municipio" },
  { id: "venta_directa", label: "Venta directa a tiendas o consumidores" },
  { id: "asociacion", label: "A través de asociación campesina" },
  { id: "otro", label: "Otro" },
]

const CONDICIONES_PARTICIPAR = [
  { id: "pago_rapido", label: "Pago seguro y rápido (contraentrega o digital)" },
  { id: "recogida_finca", label: "Que recojan el producto en la finca o centro de acopio" },
  { id: "precio_justo", label: "Precio justo que cubra costos mínimos" },
  { id: "facilidad_tecnologia", label: "Que no requiera manejar cosas difíciles en el celular" },
  { id: "otro", label: "Otro" },
]

type FormData = {
  // Paso 1: Datos del productor y finca
  nombre_productor: string
  telefono: string
  email: string
  municipio: string
  municipio_otro: string
  vereda: string
  direccion_finca: string
  tipo_productor: string
  hectareas_cultivadas: string
  productos_principales: string[]
  productos_otro: string
  temporadas_cosecha: string

  // Paso 2: Producción y excedentes
  frecuencia_excedentes: string
  cantidad_excedentes: string
  causa_excedentes: string[]
  causa_excedentes_otro: string
  que_hacen_excedentes: string[]
  que_hacen_otro: string
  perdida_estimada_porcentaje: string
  perdida_estimada_dinero: string
  canales_venta_actuales: string[]
  canal_otro: string
  precio_promedio_intermediario: string
  satisfaccion_canal_actual: string

  // Paso 3: Logística y tecnología
  tiene_transporte_propio: boolean
  tipo_transporte: string
  costo_transporte_estimado: string
  tiempo_finca_cucuta: string
  tiene_cadena_frio: boolean
  acceso_vias: string
  tiene_smartphone: boolean
  usa_whatsapp: boolean
  tiene_nequi: boolean
  tiene_cuenta_bancaria: boolean
  entidad_bancaria: string
  pertenece_asociacion: boolean
  nombre_asociacion: string
  recibe_asistencia_tecnica: boolean
  fuente_asistencia: string

  // Paso 4: Opinión sobre Delib3r
  interes_app: string
  condiciones_para_participar: string[]
  condicion_otro: string
  cantidad_minima_aceptable: string
  precio_minimo_esperado: string
  dispuesto_fotos_productos: boolean
  beneficios_esperados: string
  preocupaciones: string
  comentarios_adicionales: string
}

const initialFormData: FormData = {
  nombre_productor: "",
  telefono: "",
  email: "",
  municipio: "",
  municipio_otro: "",
  vereda: "",
  direccion_finca: "",
  tipo_productor: "",
  hectareas_cultivadas: "",
  productos_principales: [],
  productos_otro: "",
  temporadas_cosecha: "",

  frecuencia_excedentes: "",
  cantidad_excedentes: "",
  causa_excedentes: [],
  causa_excedentes_otro: "",
  que_hacen_excedentes: [],
  que_hacen_otro: "",
  perdida_estimada_porcentaje: "",
  perdida_estimada_dinero: "",
  canales_venta_actuales: [],
  canal_otro: "",
  precio_promedio_intermediario: "",
  satisfaccion_canal_actual: "",

  tiene_transporte_propio: false,
  tipo_transporte: "",
  costo_transporte_estimado: "",
  tiempo_finca_cucuta: "",
  tiene_cadena_frio: false,
  acceso_vias: "",
  tiene_smartphone: true,
  usa_whatsapp: true,
  tiene_nequi: false,
  tiene_cuenta_bancaria: false,
  entidad_bancaria: "",
  pertenece_asociacion: false,
  nombre_asociacion: "",
  recibe_asistencia_tecnica: false,
  fuente_asistencia: "",

  interes_app: "",
  condiciones_para_participar: [],
  condicion_otro: "",
  cantidad_minima_aceptable: "",
  precio_minimo_esperado: "",
  dispuesto_fotos_productos: true,
  beneficios_esperados: "",
  preocupaciones: "",
  comentarios_adicionales: "",
}

export function CensoCampesinoForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const steps = [
    { title: "Datos del productor", icon: Tractor, description: "Ubicación y finca" },
    { title: "Cosechas y excedentes", icon: Sprout, description: "Qué cultivas y qué sobra" },
    { title: "Logística y tecnología", icon: Truck, description: "Transporte y conectividad" },
    { title: "Interés en la app", icon: Smartphone, description: "Expectativas y condiciones" },
  ]

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (field: "productos_principales" | "causa_excedentes" | "que_hacen_excedentes" | "canales_venta_actuales" | "condiciones_para_participar", id: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(id)
        ? prev[field].filter(item => item !== id)
        : [...prev[field], id],
    }))
  }

  const canProceed = () => {
    if (currentStep === 0) {
      return (
        formData.nombre_productor.trim() !== "" &&
        formData.telefono.trim() !== "" &&
        formData.municipio !== "" &&
        formData.tipo_productor !== ""
      )
    }
    if (currentStep === 1) {
      return (
        formData.frecuencia_excedentes !== "" &&
        formData.cantidad_excedentes !== ""
      )
    }
    if (currentStep === 2) {
      return true
    }
    if (currentStep === 3) {
      return formData.interes_app !== ""
    }
    return false
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const dataToInsert: CensoCampesinoInput = {
        nombre_productor: formData.nombre_productor,
        telefono: formData.telefono,
        email: formData.email || null,
        municipio: formData.municipio === "Otro" ? formData.municipio_otro : formData.municipio,
        vereda: formData.vereda || null,
        direccion_finca: formData.direccion_finca || null,
        tipo_productor: formData.tipo_productor,
        hectareas_cultivadas: formData.hectareas_cultivadas || null,
        productos_principales: formData.productos_principales,
        productos_otro: formData.productos_principales.includes("Otro") ? formData.productos_otro : null,
        temporadas_cosecha: formData.temporadas_cosecha || null,
        frecuencia_excedentes: formData.frecuencia_excedentes,
        cantidad_excedentes: formData.cantidad_excedentes,
        causa_excedentes: formData.causa_excedentes,
        causa_excedentes_otro: formData.causa_excedentes.includes("otro") ? formData.causa_excedentes_otro : null,
        que_hacen_excedentes: formData.que_hacen_excedentes,
        que_hacen_otro: formData.que_hacen_excedentes.includes("otro") ? formData.que_hacen_otro : null,
        perdida_estimada_porcentaje: formData.perdida_estimada_porcentaje || null,
        perdida_estimada_dinero: formData.perdida_estimada_dinero || null,
        canales_venta_actuales: formData.canales_venta_actuales,
        canal_otro: formData.canales_venta_actuales.includes("otro") ? formData.canal_otro : null,
        precio_promedio_intermediario: formData.precio_promedio_intermediario || null,
        satisfaccion_canal_actual: formData.satisfaccion_canal_actual || null,
        tiene_transporte_propio: formData.tiene_transporte_propio,
        tipo_transporte: formData.tiene_transporte_propio ? formData.tipo_transporte : null,
        costo_transporte_estimado: formData.costo_transporte_estimado || null,
        tiempo_finca_cucuta: formData.tiempo_finca_cucuta || null,
        tiene_cadena_frio: formData.tiene_cadena_frio,
        acceso_vias: formData.acceso_vias || null,
        tiene_smartphone: formData.tiene_smartphone,
        usa_whatsapp: formData.usa_whatsapp,
        tiene_nequi: formData.tiene_nequi,
        tiene_cuenta_bancaria: formData.tiene_cuenta_bancaria,
        entidad_bancaria: formData.tiene_cuenta_bancaria ? formData.entidad_bancaria : null,
        frecuencia_uso_apps: null,
        nivel_comodidad_tecnologia: null,
        interes_app: formData.interes_app,
        condiciones_para_participar: formData.condiciones_para_participar,
        condicion_otro: formData.condiciones_para_participar.includes("otro") ? formData.condicion_otro : null,
        cantidad_minima_aceptable: formData.cantidad_minima_aceptable || null,
        precio_minimo_esperado: formData.precio_minimo_esperado || null,
        desconfianzas: null,
        dispuesto_fotos_productos: formData.dispuesto_fotos_productos,
        pertenece_asociacion: formData.pertenece_asociacion,
        nombre_asociacion: formData.pertenece_asociacion ? formData.nombre_asociacion : null,
        recibe_asistencia_tecnica: formData.recibe_asistencia_tecnica,
        fuente_asistencia: formData.recibe_asistencia_tecnica ? formData.fuente_asistencia : null,
        beneficios_esperados: formData.beneficios_esperados || null,
        preocupaciones: formData.preocupaciones || null,
        comentarios_adicionales: formData.comentarios_adicionales || null,
        ciudad: "Cúcuta",
      }

      const res = await submitCensoCampesino(dataToInsert)
      if (!res.success) {
        throw new Error(res.error || "Error al enviar el formulario")
      }

      router.push("/censo/gracias")
    } catch (err) {
      console.error(err)
      setSubmitError("Hubo un error al enviar el formulario. Por favor verifica tus datos e inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Steps bar */}
      <div className="flex justify-between items-center">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                idx <= currentStep
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-card border-border text-muted-foreground"
              }`}
            >
              {idx < currentStep ? <CheckCircle2 className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`hidden sm:block w-16 md:w-24 h-1 mx-2 rounded ${
                  idx < currentStep ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="text-center sm:text-left">
        <h2 className="text-xl font-semibold text-foreground">{steps[currentStep].title}</h2>
        <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* PASO 1 */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre_productor">Nombre del productor o líder *</Label>
                  <Input
                    id="nombre_productor"
                    placeholder="Ej. Pedro José Ramírez"
                    value={formData.nombre_productor}
                    onChange={e => updateField("nombre_productor", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono / WhatsApp *</Label>
                  <Input
                    id="telefono"
                    placeholder="Ej. 312 345 6789"
                    value={formData.telefono}
                    onChange={e => updateField("telefono", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="municipio">Municipio de la finca o cultivo *</Label>
                  <Select value={formData.municipio} onValueChange={val => updateField("municipio", val)}>
                    <SelectTrigger id="municipio">
                      <SelectValue placeholder="Selecciona un municipio" />
                    </SelectTrigger>
                    <SelectContent>
                      {MUNICIPIOS_NORTE.map(m => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {formData.municipio === "Otro" && (
                  <div className="space-y-2">
                    <Label htmlFor="municipio_otro">Escribe el municipio</Label>
                    <Input
                      id="municipio_otro"
                      placeholder="Municipio"
                      value={formData.municipio_otro}
                      onChange={e => updateField("municipio_otro", e.target.value)}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="vereda">Vereda o sector</Label>
                  <Input
                    id="vereda"
                    placeholder="Ej. Vereda Buena Vista"
                    value={formData.vereda}
                    onChange={e => updateField("vereda", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion_finca">Nombre o ubicación de la finca / parcela</Label>
                <Input
                  id="direccion_finca"
                  placeholder="Ej. Finca El Paraíso, km 4 vía Chinácota"
                  value={formData.direccion_finca}
                  onChange={e => updateField("direccion_finca", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo de productor *</Label>
                <RadioGroup
                  value={formData.tipo_productor}
                  onValueChange={val => updateField("tipo_productor", val)}
                  className="space-y-2"
                >
                  {TIPO_PRODUCTOR_OPTIONS.map(opt => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={`tipo_${opt.value}`} />
                      <Label htmlFor={`tipo_${opt.value}`} className="cursor-pointer font-normal">
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hectareas">Hectáreas cultivadas (aproximadas)</Label>
                <Input
                  id="hectareas"
                  placeholder="Ej. 2 hectáreas, media cuadra, etc."
                  value={formData.hectareas_cultivadas}
                  onChange={e => updateField("hectareas_cultivadas", e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label>¿Cuáles son tus productos agrícolas principales?</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PRODUCTOS_OPTIONS.map(prod => (
                    <div key={prod} className="flex items-center space-x-2">
                      <Checkbox
                        id={`prod_${prod}`}
                        checked={formData.productos_principales.includes(prod)}
                        onCheckedChange={() => toggleArrayItem("productos_principales", prod)}
                      />
                      <Label htmlFor={`prod_${prod}`} className="text-sm cursor-pointer font-normal">
                        {prod}
                      </Label>
                    </div>
                  ))}
                </div>
                {formData.productos_principales.includes("Otro") && (
                  <Input
                    placeholder="¿Cuáles otros productos?"
                    value={formData.productos_otro}
                    onChange={e => updateField("productos_otro", e.target.value)}
                  />
                )}
              </div>
            </div>
          )}

          {/* PASO 2 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>¿Con qué frecuencia te quedan excedentes o cosechas sin vender? *</Label>
                <RadioGroup
                  value={formData.frecuencia_excedentes}
                  onValueChange={val => updateField("frecuencia_excedentes", val)}
                  className="space-y-2"
                >
                  {FRECUENCIA_EXCEDENTES.map(opt => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={`frec_${opt.value}`} />
                      <Label htmlFor={`frec_${opt.value}`} className="cursor-pointer font-normal">
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>¿Qué cantidad aproximada te suele sobrar por ocasión? *</Label>
                <RadioGroup
                  value={formData.cantidad_excedentes}
                  onValueChange={val => updateField("cantidad_excedentes", val)}
                  className="space-y-2"
                >
                  {CANTIDAD_EXCEDENTES.map(opt => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={`cant_${opt.value}`} />
                      <Label htmlFor={`cant_${opt.value}`} className="cursor-pointer font-normal">
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>¿Por qué razones suelen sobrar o perderse cosechas?</Label>
                <div className="space-y-2">
                  {CAUSAS_EXCEDENTES.map(causa => (
                    <div key={causa.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`causa_${causa.id}`}
                        checked={formData.causa_excedentes.includes(causa.id)}
                        onCheckedChange={() => toggleArrayItem("causa_excedentes", causa.id)}
                      />
                      <Label htmlFor={`causa_${causa.id}`} className="text-sm cursor-pointer font-normal">
                        {causa.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {formData.causa_excedentes.includes("otro") && (
                  <Input
                    placeholder="¿Cuál otra causa?"
                    value={formData.causa_excedentes_otro}
                    onChange={e => updateField("causa_excedentes_otro", e.target.value)}
                  />
                )}
              </div>

              <div className="space-y-3">
                <Label>¿Qué haces actualmente con los excedentes?</Label>
                <div className="space-y-2">
                  {QUE_HACEN_EXCEDENTES.map(q => (
                    <div key={q.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`que_${q.id}`}
                        checked={formData.que_hacen_excedentes.includes(q.id)}
                        onCheckedChange={() => toggleArrayItem("que_hacen_excedentes", q.id)}
                      />
                      <Label htmlFor={`que_${q.id}`} className="text-sm cursor-pointer font-normal">
                        {q.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="perdida_porc">% estimado que se pierde de tu cosecha</Label>
                  <Input
                    id="perdida_porc"
                    placeholder="Ej. 10%, 25%, etc."
                    value={formData.perdida_estimada_porcentaje}
                    onChange={e => updateField("perdida_estimada_porcentaje", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="perdida_dinero">Pérdida en dinero aproximada (mes / cosecha)</Label>
                  <Input
                    id="perdida_dinero"
                    placeholder="Ej. $500.000 COP"
                    value={formData.perdida_estimada_dinero}
                    onChange={e => updateField("perdida_estimada_dinero", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* PASO 3 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Transporte y vías</h3>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="transporte_propio"
                    checked={formData.tiene_transporte_propio}
                    onCheckedChange={checked => updateField("tiene_transporte_propio", !!checked)}
                  />
                  <Label htmlFor="transporte_propio" className="cursor-pointer">
                    ¿Tienes transporte propio para llevar la cosecha? (moto de carga, camioneta, camión)
                  </Label>
                </div>

                {formData.tiene_transporte_propio && (
                  <div className="space-y-2 pl-6">
                    <Label htmlFor="tipo_transporte">¿Qué tipo de transporte tienes?</Label>
                    <Input
                      id="tipo_transporte"
                      placeholder="Ej. Camioneta D-Max, Camión sencillo, etc."
                      value={formData.tipo_transporte}
                      onChange={e => updateField("tipo_transporte", e.target.value)}
                    />
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tiempo_cucuta">Tiempo aproximado desde la finca hasta Cúcuta</Label>
                    <Input
                      id="tiempo_cucuta"
                      placeholder="Ej. 1 hora, 45 minutos"
                      value={formData.tiempo_finca_cucuta}
                      onChange={e => updateField("tiempo_finca_cucuta", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="acceso_vias">Estado de la vía de acceso</Label>
                    <Input
                      id="acceso_vias"
                      placeholder="Ej. Pavimentada, trocha, placa huella"
                      value={formData.acceso_vias}
                      onChange={e => updateField("acceso_vias", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium text-foreground">Conectividad y pagos digitales</h3>
                
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="smartphone"
                      checked={formData.tiene_smartphone}
                      onCheckedChange={checked => updateField("tiene_smartphone", !!checked)}
                    />
                    <Label htmlFor="smartphone" className="cursor-pointer">Tengo celular Smartphone</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="whatsapp"
                      checked={formData.usa_whatsapp}
                      onCheckedChange={checked => updateField("usa_whatsapp", !!checked)}
                    />
                    <Label htmlFor="whatsapp" className="cursor-pointer">Uso WhatsApp frecuentemente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="nequi"
                      checked={formData.tiene_nequi}
                      onCheckedChange={checked => updateField("tiene_nequi", !!checked)}
                    />
                    <Label htmlFor="nequi" className="cursor-pointer">Tengo Nequi o Daviplata</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cuenta_bancaria"
                      checked={formData.tiene_cuenta_bancaria}
                      onCheckedChange={checked => updateField("tiene_cuenta_bancaria", !!checked)}
                    />
                    <Label htmlFor="cuenta_bancaria" className="cursor-pointer">Tengo cuenta bancaria</Label>
                  </div>
                </div>

                {formData.tiene_cuenta_bancaria && (
                  <div className="space-y-2">
                    <Label htmlFor="banco">¿En qué banco?</Label>
                    <Input
                      id="banco"
                      placeholder="Ej. Banco Agrario, Bancolombia"
                      value={formData.entidad_bancaria}
                      onChange={e => updateField("entidad_bancaria", e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium text-foreground">Asociaciones</h3>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="asociacion"
                    checked={formData.pertenece_asociacion}
                    onCheckedChange={checked => updateField("pertenece_asociacion", !!checked)}
                  />
                  <Label htmlFor="asociacion" className="cursor-pointer">
                    ¿Perteneces a alguna asociación o cooperativa campesina?
                  </Label>
                </div>

                {formData.pertenece_asociacion && (
                  <div className="space-y-2 pl-6">
                    <Label htmlFor="nombre_asoc">Nombre de la asociación</Label>
                    <Input
                      id="nombre_asoc"
                      placeholder="Ej. ASOPROCAMPO"
                      value={formData.nombre_asociacion}
                      onChange={e => updateField("nombre_asociacion", e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PASO 4 */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>¿Qué tan interesado estarías en vender excedentes a través de Delib3r? *</Label>
                <RadioGroup
                  value={formData.interes_app}
                  onValueChange={val => updateField("interes_app", val)}
                  className="space-y-2"
                >
                  {[
                    { value: "muy_interesado", label: "Muy interesado, quiero participar de inmediato" },
                    { value: "interesado", label: "Interesado, me gustaría conocer las condiciones" },
                    { value: "tal_vez", label: "Tal vez, depende del precio y la logística" },
                    { value: "no_interesado", label: "No me interesa por el momento" },
                  ].map(opt => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={`interes_${opt.value}`} />
                      <Label htmlFor={`interes_${opt.value}`} className="cursor-pointer font-normal">
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>¿Qué condiciones serían claves para que te animes a participar?</Label>
                <div className="space-y-2">
                  {CONDICIONES_PARTICIPAR.map(c => (
                    <div key={c.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cond_${c.id}`}
                        checked={formData.condiciones_para_participar.includes(c.id)}
                        onCheckedChange={() => toggleArrayItem("condiciones_para_participar", c.id)}
                      />
                      <Label htmlFor={`cond_${c.id}`} className="text-sm cursor-pointer font-normal">
                        {c.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="fotos"
                  checked={formData.dispuesto_fotos_productos}
                  onCheckedChange={checked => updateField("dispuesto_fotos_productos", !!checked)}
                />
                <Label htmlFor="fotos" className="cursor-pointer text-sm">
                  ¿Estarías dispuesto a enviar fotos de tus productos por WhatsApp para publicarlos?
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="beneficios">¿Qué beneficios esperarías recibir?</Label>
                <Textarea
                  id="beneficios"
                  placeholder="Ej. Precios justos, venta asegurada, clientes directos en Cúcuta..."
                  value={formData.beneficios_esperados}
                  onChange={e => updateField("beneficios_esperados", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comentarios">Comentarios o dudas adicionales</Label>
                <Textarea
                  id="comentarios"
                  placeholder="Escribe aquí cualquier observación o inquietud..."
                  value={formData.comentarios_adicionales}
                  onChange={e => updateField("comentarios_adicionales", e.target.value)}
                />
              </div>
            </div>
          )}

          {submitError && (
            <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-lg text-sm">
              {submitError}
            </div>
          )}

          {/* Botones de navegación */}
          <div className="flex justify-between pt-4 border-t">
            {currentStep > 0 ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={isSubmitting}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>
            ) : <div />}

            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!canProceed()}
              >
                Siguiente
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="w-4 h-4 mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Completar Censo
                    <CheckCircle2 className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
