import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { idiomas } from "../../redux/datos/idiomas"
import { button } from "../css/button"
import { cardChat } from "../css/cardChat"
import { cardNotif } from "../css/cardNotif"
import { CHAT } from "../../../assets/icons/icons"

import { get as getChat, SIN_CONTESTAR_SUCCESS, chatReserva, grabarRespuesta as chatGrabarRespuesta } from "../../redux/chat/actions";
import {
    paginaAnterior, footherMuestraTapa, headerMuestraTapa, showWarning
} from "../../redux/ui/actions"
import { getAgenda, agendaAtencionSeleccionada } from "../../redux/reservas/actions"
import { leido as leidoNotificacion, patch as patchNotificacion } from "../../redux/notificacion/actions"
import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";

const RESERVA_GET_AGENDA_SUCCESS = "reservas.timeStampAgenda"
const RESERVA_GET_AGENDA_ERROR = "reservas.errorTimeStamp"
const CHAT_GRABAR_RESPUESTA = "chat.grabarRespuestaTimeStamp"
const CHAT_GRABAR_RESPUESTA_ERROR = "chat.grabarRespuestaErrorTimeStamp"
const NOTIF_LEIDO_TIMESTAMP = "notificacion.leidoTimeStamp"
const NOTIF_LEIDO_ERROR = "notificacion.leidoErrorTimeStamp"
const NOTIF_PATCH_TIMESTAMP = "notificacion.updateTimeStamp"
const NOTIF_PATCH_ERROR = "notificacion.commandErrorTimeStamp"
const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";

export class pantallaNotificacionReserva extends connect(store, NOTIF_PATCH_TIMESTAMP, NOTIF_PATCH_ERROR, NOTIF_LEIDO_TIMESTAMP, NOTIF_LEIDO_ERROR, RESERVA_GET_AGENDA_SUCCESS, RESERVA_GET_AGENDA_ERROR, CHAT_GRABAR_RESPUESTA, CHAT_GRABAR_RESPUESTA_ERROR, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"
        this.item = []
        this.chatGrabar = null
        this.notifGrabar = 0
    }

    static get styles() {
        return css`
        ${button}
        ${cardChat}
        ${cardNotif}
        :host{
            position: relative;
            display: grid;
            padding: 0  !important;
            background-color: var(--color-gris-fondo) !important;
            grid-template-rows: 100%;    
            overflow-x: hidden;
            overflow-y: auto;    
        }
        :host([hidden]){
            display: none; 
        }
        :host::-webkit-scrollbar {
            display: none;
        }
        button {
            position: relative;
            width: 95%;
            color: var(--color-negro);
            background-color:transparent;
            border-radius:0;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        } 
        #tituloLista{
            height:100%;
            color:var(--color-azul-oscuro);
            font-size:var(--font-header-h1-menos-size);
            font-weight:var(--font-header-h1-menos-weight);
            background-color:var(--color-celeste-muy-claro);
            text-justify:left;
            display:flex;
            align-items: center;    
            padding-left:.5rem;
        }
        #grilla{
            position:relative;
            display:grid;
            align-content: flex-start;
            grid-gap:.5rem;
            overflow-x:none;
            overflow-y:auto;
            padding: 0 1rem 0 1rem;
        }
        #grilla::-webkit-scrollbar {
            display: none;
        }
        #divRespuesta{
             z-index:100;
             background-color:  var(--color-celeste-muy-claro);;
             position:absolute;
             display:none;
             grid-template-rows: 4fr 4fr 1fr;
             grid-gap:2vh;
             padding:1rem;
             top:10vh;
             height:50vh;
             left:5vw;
             right:5vw;
             border: solid 1px var(--color-gris-oscuro);
             border-radius: .5rem;
             box-shadow: var(--shadow-elevation-4-box);
        }
        #textoRespuesta{
            background-color:var(--color-gris-claro);
            color:var(--color-negro);
            padding:.5rem;
            font-size:var(--font-label-size);
            font-weight:bolder;
            border-radius: .5rem;
        }
        #nuevaRespuesta{
            padding:.5rem;
            font-family:var(--font-label-family);
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
            border-radius: .5rem;
        }
        #divRespuestaBotones{
            grid-gap:.3rem;
            display:grid;
            grid-template-columns:50% 50%;
        }
        #btnGrabar{
            height:7vh;
        }
        #btnCancelar{
            color:red;
            height:7vh;
        }     
        #divNotificacion{
             z-index:100;
             background-color:  var(--color-gris-claro);;
             position:absolute;
             display:none;
             grid-template-columns: .5fr 12fr;
             top:10vh;
             height: auto ;
             left:5vw;
             right:5vw;
             border: solid 1px var(--color-gris-oscuro);
             border-radius: .5rem;
             box-shadow: var(--shadow-elevation-4-box);
        }
        #divNotificacionBarra{
            background-color:var(--color-celeste);
            border-radius :.4rem 0 0 .4rem;           
        }
        #divNotificacionCuerpo{
            background-color:  var(--color-gris-claro);;
            display:grid;
            grid-auto-flow: row ;
            grid-gap:2vh;
            padding:.4rem;
        }
        #textoTitulo{
            font-size:var(--font-bajada-size);
            font-weight:var(--font-bajada-weight);
            background-color:var(--color-gris-fondo);
            color:var(--color-gris-oscuro);
            padding:.5rem;
            font-size:var(--font-label-size);
            font-weight:bolder;
            border-radius: .5rem .5rem 0 0 ;
        }
        #textoCuerpo{
            padding:.5rem;
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
            border-radius: .5rem;
        }
        #divNotifBotones{
            display:grid;
            grid-gap:1rem;
            grid-template-columns:1fr 1fr;
            justify-items: center;
        }
        #btnDelete{
            height:7vh;
        }
        #btnVolver{
            color:red;
            height:7vh;
        } 
    `
    }
    render() {
        return html`
            <div id="grilla">
                ${this.item.map(dato => dato.tipo == 0 ? html`
                    <div id="cchatDivEtiqueta" >
                        <div id="cchatBarra" fondo=${dato.tipo == 0 ? 'gris' : 'celeste'}>
                        </div>
                        <div id= "cchatContenido">
                            <div id="cchatFechaNombre">
                                <div id="cchatDivNombre">
                                    ${dato.item.mascota}
                                </div>
                                <div id="cchatDivFecha">
                                    ${dato.fecha.substring(8, 10) + "/" + dato.fecha.substring(5, 7) + "/" + dato.fecha.substring(0, 4)}
                                </div>
                            </div>
                            <div id="cchatDivDiagnostico">
                                ${this.mediaSize == "small" ? dato.item.motivo.substring(0, 80) : dato.item.motivo}
                            </div>                        
                            <div id="cchatDivTexto">
                                ${this.mediaSize == "small" ? dato.item.texto.substring(0, 80) : dato.item.texto}
                            </div>
                            <div id="cchatDivVerDetalle">
                                <label id="cchatLblVerDetalle" @click=${this.verDetalle} .item=${dato}>${idiomas[this.idioma].notificacionReserva.verChat}</label>                 
                                <label id="cchatLblAtencion" @click=${this.verAtencion} .item=${dato}>${idiomas[this.idioma].notificacionReserva.verAtencion}</label>                 
                                <label id="cchatLblResponder" @click=${this.responder} .item=${dato}>${idiomas[this.idioma].notificacionReserva.responder}</label>                 
                            </div>
                        </div>

                    </div>
                `: html`
                    <div id="cnotiDivEtiqueta" >
                        <div id="cnotiBarra" fondo=${dato.tipo == 0 ? 'gris' : 'celeste'}>
                        </div>
                        <div id= "cnotiContenido">
                            <div id="cnotiDivFecha">
                                ${dato.fecha.substring(8, 10) + "/" + dato.fecha.substring(5, 7) + "/" + dato.fecha.substring(0, 4)}
                            </div>
                            <div id="cnotiDivTitulo">
                                ${this.mediaSize == "small" ? dato.item.titulo.substring(0, 74) : dato.item.titulo}
                            </div>                        
                            <div id="cnotiDivTexto">
                                ${this.mediaSize == "small" ? dato.item.texto.substring(0, 74) : dato.item.texto}
                            </div>
                            <div id="cnotiDivVerDetalle">
                                <label id="cnotiLblLink" @click=${this.verLink} .item=${dato} style=${dato.item.link.length == 0 ? 'visibility:hidden' : 'visibility:visible'} >${dato.item.link.length == 0 ? "" : idiomas[this.idioma].notificacionReserva.btnNavegar}</label>                 
                                <label id="cnotiLblVer" @click=${this.verNotif} .item=${dato}>${idiomas[this.idioma].notificacionReserva.btnVer}</label>                 
                            </div>
                        </div>

                    </div>
                `
        )}
            </div>
            <div id="divRespuesta">    
                <label id="textoRespuesta"></label>
                <textarea id="nuevaRespuesta" placeholder="Escribí tu respuesta"></textarea>
                <div id="divRespuestaBotones">
                    <button id="btnGrabar" btn1 @click="${this.grabar}" >${idiomas[this.idioma].notificacionReserva.btnGrabar}</button>
                    <button  id="btnCancelar" btn3 @click="${this.cancelar}">${idiomas[this.idioma].notificacionReserva.btnCancelar}</button>
                </div>  
            </div>
            <div id="divNotificacion">  
                <div id="divNotificacionBarra">
                </div>
                <div id="divNotificacionCuerpo">
                    <label id="textoTitulo"></label>
                    <label id="textoCuerpo"></label>
                    <div id="divNotifBotones">
                        <button id="btnDelete" btn1 @click="${this.delete}" >${idiomas[this.idioma].notificacionReserva.btnDelete}</button>
                        <button  id="btnVolver" btn3 @click="${this.volver}">${idiomas[this.idioma].notificacionReserva.btnVolver}</button>
                    </div>  
                </div>  
            </div>
        `
    }
    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-notificacionReserva-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                this.current = state.screen.name
                this.item = state.notificacion.entityNotificacionChatPendiente ? state.notificacion.entityNotificacionChatPendiente : []
            }
            this.update();
        }
        if (name == CHAT_GRABAR_RESPUESTA) {
            this.shadowRoot.querySelector("#divRespuesta").style.display = "none"
            store.dispatch(footherMuestraTapa(false))
            store.dispatch(headerMuestraTapa(false))
        }
        if (name == CHAT_GRABAR_RESPUESTA_ERROR) {
            store.dispatch(showWarning())
        }
        if (name == RESERVA_GET_AGENDA_SUCCESS && this.current == "notificacionReserva") {
            if (state.reservas.entitiesAgenda.length == 1) {
                let arr = state.reservas.entitiesAgenda[0]
                let atencionCompleta = {
                    ReservaId: arr.Id,
                    FechaReserva: arr.FechaAtencion,
                    HoraReserva: ("0" + arr.HoraAtencion.toString()).substr(-4, 2) + ":" + arr.HoraAtencion.toString().substr(-2),
                    MascotaId: arr.MascotaId,
                    MascotaNombre: arr.Mascota.Nombre,
                    Motivo: arr.Motivo,
                    AtencionId: arr.Atencion ? arr.Atencion.Id : 0,
                    VeterinarioId: arr.Atencion ? arr.Atencion.VeterinarioId : 0,
                    Veterinario: arr.Atencion ? arr.Atencion.Veterinario.Apellido + ", " + arr.Atencion.Veterinario.Nombre : "",
                    Diagnostico: arr.Atencion ? arr.Atencion.Diagnostico : 0,
                    InicioAtencion: arr.Atencion ? arr.Atencion.InicioAtencion : null,
                    FinAtencion: arr.Atencion ? arr.Atencion.FinAtencion : null,
                    Adjuntos: arr.Adjuntos
                }
                store.dispatch(agendaAtencionSeleccionada(atencionCompleta))
                store.dispatch(goTo("sol_diagnosticodetalle"))
            }
        }
        if (name == RESERVA_GET_AGENDA_ERROR && this.current == "notificacionReserva") {
            store.dispatch(showWarning())
        }
        if (name == NOTIF_LEIDO_TIMESTAMP && this.current == "notificacionReserva") {
            store.dispatch(footherMuestraTapa(false))
            store.dispatch(headerMuestraTapa(false))
            this.shadowRoot.querySelector("#divNotificacion").style.display = "none"
            this.update();
        }
        if (name == NOTIF_LEIDO_ERROR && this.current == "notificacionReserva") {
            store.dispatch(showWarning())
        }
    }
    cancelar() {
        store.dispatch(footherMuestraTapa(false))
        store.dispatch(headerMuestraTapa(false))
        this.shadowRoot.querySelector("#divRespuesta").style.display = "none"
    }
    volver() {
        store.dispatch(footherMuestraTapa(false))
        store.dispatch(headerMuestraTapa(false))
        this.shadowRoot.querySelector("#divNotificacion").style.display = "none"
    }
    verAtencion(e) {
        store.dispatch(getAgenda(store.getState().cliente.datos.token, " Id eq " + e.currentTarget.item.item.reservaId))
    }
    verDetalle(e) {
        store.dispatch(chatReserva(e.currentTarget.item.item.reservaId))
    }
    verLink(e) {
        window.open(e.currentTarget.item.item.link, '_blank')
    }
    responder(e) {
        store.dispatch(footherMuestraTapa(true))
        store.dispatch(headerMuestraTapa(true))
        const chat = e.currentTarget.item
        const textoRespuesta = this.shadowRoot.querySelector("#textoRespuesta")
        const divRespuesta = this.shadowRoot.querySelector("#divRespuesta")
        this.shadowRoot.querySelector("#nuevaRespuesta").value = ""
        divRespuesta.style.display = "grid"
        textoRespuesta.innerHTML = chat.item.texto
        this.chatGrabar = {
            Chat: {
                Fecha: (new Date()),
                ReservaId: chat.item.reservaId,
                UsuarioId: store.getState().cliente.datos.id,
                Texto: "",
                Leido: 0,
                Respondido: 0,
                Tipo: 1
            },
            PreguntaId: chat.item.chatId
        }
        this.update()
    }
    verNotif(e) {
        store.dispatch(footherMuestraTapa(true))
        store.dispatch(headerMuestraTapa(true))
        const notif = e.currentTarget.item
        const textoTitulo = this.shadowRoot.querySelector("#textoTitulo")
        const textoCuerpo = this.shadowRoot.querySelector("#textoCuerpo")
        const divNotificacion = this.shadowRoot.querySelector("#divNotificacion")
        const btnDelete = this.shadowRoot.querySelector("#btnDelete")
        btnDelete.setAttribute('detalleid', notif.item.detalleId)
        this.shadowRoot.querySelector("#textoTitulo").value = ""
        this.shadowRoot.querySelector("#textoCuerpo").value = ""
        divNotificacion.style.display = "grid"
        textoTitulo.innerHTML = notif.item.titulo
        textoCuerpo.innerHTML = notif.item.texto
        this.notifGrabar = notif.item.cabeceraId
        this.update()
    }

    grabar() {
        if (this.shadowRoot.querySelector("#nuevaRespuesta").value == "") {
            store.dispatch(showWarning("notificacionReserva", 0))
        } else {
            if (this.chatGrabar) {
                this.chatGrabar.Chat.Texto = this.shadowRoot.querySelector("#nuevaRespuesta").value
                store.dispatch(chatGrabarRespuesta(this.chatGrabar, store.getState().cliente.datos.token))
            }
        }
    }

    delete(e) {
        //let detalleid = { entity: "/Leido(" + e.currentTarget.getAttribute("detalleid") + ")" }
        //store.dispatch(leidoNotificacion(detalleid, store.getState().cliente.datos.token))
        let detalleid = e.currentTarget.getAttribute("detalleid")
        store.dispatch(leidoNotificacion(detalleid, null, store.getState().cliente.datos.token))


    }
    firstUpdated() { }

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            },
            layout: {
                type: String,
                reflect: true,
            },
            hidden: {
                type: Boolean,
                reflect: true,
            },
            area: {
                type: String
            },
            current: {
                type: String
            }
        }
    }
}

window.customElements.define("pantalla-notificacionreserva", pantallaNotificacionReserva);