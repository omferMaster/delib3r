"use server"

import { sql } from "@/lib/db"

export type CensoInput = {
  nombre_negocio: string
  tipo_negocio: string
  nombre_contacto: string
  telefono: string
  email: string | null
  direccion: string | null
  ciudad: string
  barrio: string
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

export async function submitCenso(data: CensoInput) {
  try {
    await sql`
      INSERT INTO censo_comercios (
        nombre_negocio,
        tipo_negocio,
        nombre_contacto,
        telefono,
        email,
        direccion,
        ciudad,
        barrio,
        frecuencia_excedentes,
        cantidad_excedentes,
        tipos_excedentes,
        que_hacen_excedentes,
        que_hacen_otro,
        perdida_estimada,
        interes_app,
        beneficios_esperados,
        preocupaciones,
        comentarios_adicionales
      ) VALUES (
        ${data.nombre_negocio},
        ${data.tipo_negocio},
        ${data.nombre_contacto},
        ${data.telefono},
        ${data.email},
        ${data.direccion},
        ${data.ciudad},
        ${data.barrio},
        ${data.frecuencia_excedentes},
        ${data.cantidad_excedentes},
        ${data.tipos_excedentes},
        ${data.que_hacen_excedentes},
        ${data.que_hacen_otro},
        ${data.perdida_estimada},
        ${data.interes_app},
        ${data.beneficios_esperados},
        ${data.preocupaciones},
        ${data.comentarios_adicionales}
      )
    `

    return { success: true }
  } catch (error) {
    console.error("Error al registrar censo en Neon:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al guardar el registro",
    }
  }
}

export type CensoCampesinoInput = {
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
  ciudad?: string
}

export async function submitCensoCampesino(data: CensoCampesinoInput) {
  try {
    await sql`
      INSERT INTO censo_campesinos (
        nombre_productor,
        telefono,
        email,
        municipio,
        vereda,
        direccion_finca,
        tipo_productor,
        hectareas_cultivadas,
        productos_principales,
        productos_otro,
        temporadas_cosecha,
        frecuencia_excedentes,
        cantidad_excedentes,
        causa_excedentes,
        causa_excedentes_otro,
        que_hacen_excedentes,
        que_hacen_otro,
        perdida_estimada_porcentaje,
        perdida_estimada_dinero,
        canales_venta_actuales,
        canal_otro,
        precio_promedio_intermediario,
        satisfaccion_canal_actual,
        tiene_transporte_propio,
        tipo_transporte,
        costo_transporte_estimado,
        tiempo_finca_cucuta,
        tiene_cadena_frio,
        acceso_vias,
        tiene_smartphone,
        usa_whatsapp,
        tiene_nequi,
        tiene_cuenta_bancaria,
        entidad_bancaria,
        frecuencia_uso_apps,
        nivel_comodidad_tecnologia,
        interes_app,
        condiciones_para_participar,
        condicion_otro,
        cantidad_minima_aceptable,
        precio_minimo_esperado,
        desconfianzas,
        dispuesto_fotos_productos,
        pertenece_asociacion,
        nombre_asociacion,
        recibe_asistencia_tecnica,
        fuente_asistencia,
        beneficios_esperados,
        preocupaciones,
        comentarios_adicionales,
        ciudad
      ) VALUES (
        ${data.nombre_productor},
        ${data.telefono},
        ${data.email},
        ${data.municipio},
        ${data.vereda},
        ${data.direccion_finca},
        ${data.tipo_productor},
        ${data.hectareas_cultivadas},
        ${data.productos_principales},
        ${data.productos_otro},
        ${data.temporadas_cosecha},
        ${data.frecuencia_excedentes},
        ${data.cantidad_excedentes},
        ${data.causa_excedentes},
        ${data.causa_excedentes_otro},
        ${data.que_hacen_excedentes},
        ${data.que_hacen_otro},
        ${data.perdida_estimada_porcentaje},
        ${data.perdida_estimada_dinero},
        ${data.canales_venta_actuales},
        ${data.canal_otro},
        ${data.precio_promedio_intermediario},
        ${data.satisfaccion_canal_actual},
        ${data.tiene_transporte_propio},
        ${data.tipo_transporte},
        ${data.costo_transporte_estimado},
        ${data.tiempo_finca_cucuta},
        ${data.tiene_cadena_frio},
        ${data.acceso_vias},
        ${data.tiene_smartphone},
        ${data.usa_whatsapp},
        ${data.tiene_nequi},
        ${data.tiene_cuenta_bancaria},
        ${data.entidad_bancaria},
        ${data.frecuencia_uso_apps},
        ${data.nivel_comodidad_tecnologia},
        ${data.interes_app},
        ${data.condiciones_para_participar},
        ${data.condicion_otro},
        ${data.cantidad_minima_aceptable},
        ${data.precio_minimo_esperado},
        ${data.desconfianzas},
        ${data.dispuesto_fotos_productos},
        ${data.pertenece_asociacion},
        ${data.nombre_asociacion},
        ${data.recibe_asistencia_tecnica},
        ${data.fuente_asistencia},
        ${data.beneficios_esperados},
        ${data.preocupaciones},
        ${data.comentarios_adicionales},
        ${data.ciudad ?? "Cúcuta"}
      )
    `

    return { success: true }
  } catch (error) {
    console.error("Error al registrar censo campesino en Neon:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al guardar el registro",
    }
  }
}
