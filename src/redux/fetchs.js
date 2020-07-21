import {
  ODataEntity,
  ODataFetchFactory
} from "@brunomon/odata-fetch-factory"
import {
  fetchFactory
} from "../libs/fetchFactory"

const webApiUsuarios = "https://apis.usuarios.dimodo.ga/api"
const webApiUsuariosOdata = "https://apis.usuarios.dimodo.ga"
const webApiMascotas = "https://apis.mascotas.dimodo.ga/api"
const webApiMascotasOdata = "https://apis.mascotas.dimodo.ga"
const webApiPublicacion = "https://apis.publicaciones.dimodo.ga/api"
const webApiPublicacionOdata = "https://apis.publicaciones.dimodo.ga"

const mascotaOdata = ODataFetchFactory({
  fetch: fetch,
  domain: webApiMascotasOdata
})
const usuarioOdata = ODataFetchFactory({
  fetch: fetch,
  domain: webApiUsuariosOdata
})
const publicacionOdata = ODataFetchFactory({
  fetch: fetch,
  domain: webApiPublicacionOdata
})

export const ikeUsuarioFetch = fetchFactory(webApiUsuarios, "Usuario")
export const ikeOdataUsuarioFetch = ODataEntity(usuarioOdata, "UsuarioQuery")
export const ikeLoginFetch = fetchFactory(webApiUsuarios, "Autorizacion/login")
export const ikeRenovacionFetch = fetchFactory(webApiUsuarios, "Autorizacion/renovacion")
export const ikeRecuperoFetch = fetchFactory(webApiUsuarios, "Autorizacion/recupero")
export const ikeLogonFetch = fetchFactory(webApiUsuarios, "Autorizacion/logon")
export const ikeUpdateProfileFetch = fetchFactory(webApiUsuarios, "Autorizacion/updateProfile")


export const ikeMascotas = fetchFactory(webApiMascotas, "Mascotas")
export const ikeOdataMascotasTipo = ODataEntity(mascotaOdata, "MascotasTipoQuery")
export const ikeRazas = fetchFactory(webApiMascotas, "Razas")
export const ikePublicaciones = fetchFactory(webApiPublicacion, "Publicaciones")
export const ikePuestos = fetchFactory(webApiMascotas, "Puestos")
export const ikeCalendario = fetchFactory(webApiMascotas, "Calendario")
export const ikeVacuna = fetchFactory(webApiMascotas, "Vacunas")
export const ikeConfiguracion = fetchFactory(webApiMascotas, "Configuracion")
export const ikeTramo = fetchFactory(webApiMascotas, "Tramos")
export const ikeReservas = fetchFactory(webApiMascotas, "Reservas")
export const ikeAtenciones = fetchFactory(webApiMascotas, "Atenciones")

export const ikeOdataMascotas = ODataEntity(mascotaOdata, "MascotasQuery")
export const ikeMascotasTipo = fetchFactory(webApiMascotas, "MascotasTipo")
export const ikeOdataRazas = ODataEntity(mascotaOdata, "RazasQuery")
export const ikeOdataPublicaciones = ODataEntity(publicacionOdata, "PublicacionesQuery")
export const ikePuestosQuery = ODataEntity(mascotaOdata, "PuestosQuery")
export const ikeOdataCalendario = ODataEntity(mascotaOdata, "CalendarioQuery")
export const ikeOdataVacuna = ODataEntity(mascotaOdata, "VacunasQuery")
export const ikeOdataConfiguracion = ODataEntity(mascotaOdata, "ConfiguracionQuery")
export const ikeOdataTramo = ODataEntity(mascotaOdata, "TramosQuery")
export const ikeReservasQuery = ODataEntity(mascotaOdata, "ReservasQuery")
export const ikeAtencionesQuery = ODataEntity(mascotaOdata, "AtencionesQuery")
