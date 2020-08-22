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
const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";

export class pantallaNotificacionReserva extends connect(store, RESERVA_GET_AGENDA_SUCCESS, RESERVA_GET_AGENDA_ERROR, CHAT_GRABAR_RESPUESTA, CHAT_GRABAR_RESPUESTA_ERROR, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"
        this.item = []
        this.chatGrabar = null
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
                                ${dato.item.motivo.substring(0, 80)}
                            </div>                        
                            <div id="cchatDivTexto">
                                ${dato.item.texto.substring(0, 80)}
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
                                ${dato.item.titulo.substring(0, 80)}
                            </div>                        
                            <div id="cnotiDivTexto">
                                ${dato.item.texto.substring(0, 80)}
                            </div>
                            <div id="cnotiDivVerDetalle">
                                <label id="cnotiLblLink" @click=${this.verAtencion} .item=${dato}>${dato.item.link}</label>                 
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
                this.item = state.notificacion.entityNotificacionChatPendiente
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
                    FinAtencion: arr.Atencion ? arr.Atencion.FinAtencion : null
                }
                store.dispatch(agendaAtencionSeleccionada(atencionCompleta))
                store.dispatch(goTo("sol_diagnosticodetalle"))
            }
        }
        if (name == RESERVA_GET_AGENDA_ERROR && this.current == "notificacionReserva") {
            store.dispatch(showWarning())
        }
    }
    cancelar() {
        store.dispatch(footherMuestraTapa(false))
        store.dispatch(headerMuestraTapa(false))
        this.shadowRoot.querySelector("#divRespuesta").style.display = "none"
    }
    verAtencion(e) {
        store.dispatch(getAgenda(store.getState().cliente.datos.token, " Id eq " + e.currentTarget.item.ReservaId))
    }
    verDetalle(e) {
        store.dispatch(chatReserva(e.currentTarget.item.ReservaId))
    }
    responder(e) {
        store.dispatch(footherMuestraTapa(true))
        store.dispatch(headerMuestraTapa(true))
        const chat = e.currentTarget.item
        const textoRespuesta = this.shadowRoot.querySelector("#textoRespuesta")
        const divRespuesta = this.shadowRoot.querySelector("#divRespuesta")
        this.shadowRoot.querySelector("#nuevaRespuesta").value = ""
        divRespuesta.style.display = "grid"
        textoRespuesta.innerHTML = chat.Texto
        this.chatGrabar = {
            Chat: {
                Fecha: (new Date()),
                ReservaId: chat.ReservaId,
                UsuarioId: store.getState().cliente.datos.id,
                Texto: "",
                Leido: 0,
                Respondido: 0,
                Tipo: 1
            },
            PreguntaId: chat.Id
        }
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