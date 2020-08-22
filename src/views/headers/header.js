import {
    html,
    LitElement,
    css
} from "lit-element";
import {
    store
} from "../../redux/store";
import {
    connect
} from "@brunomon/helpers";
import {
    ATRAS, CAMPANACONMARCA, CAMPANASINMARCA
} from "../../../assets/icons/icons";
import {
    idiomas
} from "../../redux/datos/idiomas"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";
import {
    goNext, goPrev, goTo
} from "../../redux/routing/actions"
import {
    sinContestar
} from "../../redux/chat/actions"
import {
    getNotificacionChatPendientes
} from "../../redux/notificacion/actions"
import {
    headerMuestraTapa
} from "../../redux/ui/actions"

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
const CAMPANA_SEMUESTRA = "chat.campana.timeStamp";
const CHAT_SINCONTESTARTIMESTAMP = "chat.sinContestarTimeStamp"
const CHAT_SINCONTESTAR_ERROR = "chat.sinContestarErrorTimeStamp"
const NOTIF_CHAT_PENDIENTES_TIMESTAMP = "notificacion.entityNotificacionChatPendienteTimeStamp"
const NOTIF_CHAT_PENDIENTES_ERROR = "notificacion.entityNotificacionChatPendienteError"
const HEADER_TAPA = "ui.media.headerMuestraTapa"
export class headerComponente extends connect(store, HEADER_TAPA, CAMPANA_SEMUESTRA, NOTIF_CHAT_PENDIENTES_TIMESTAMP, NOTIF_CHAT_PENDIENTES_ERROR, MEDIA_CHANGE, SCREEN)(LitElement) {

    constructor() {
        super();
        this.idioma = "ES";
        this.hidden = true
        this.area = "body"
        this.item = []
        this.pagina = store.getState().screen.name
        this.titulo = ""
        this.subTitulo = ""
        this.campanaSeMuestra = false
    }


    static get styles() {
        return css`
        
            :host{
                position: relative;
                display:grid;
                grid-template-rows: 50% 50%;
                background-color: transparent;
            }
            :host([hidden]){
                display:none ;
            }
            #divTitulo{        
                position:relative;            
                height: 50%;
                display:flex;
                flex-flow: row;
                align-self: end;
            }
            :host(:not([media-size="small"])) #divTitulo {
                justify-content: center;
            }
            #divImg{
                display:none;
                padding-right: .4rem;
                align-self: end;
            }
            #divImg svg{
                height: 1.5rem;
                width: 1.5rem;
            }
            :host([current="crearClave"]) #divImg, :host([current="atencionesMascotas"]) #divImg, :host([current="recuperaClave"]) #divImg, :host([current="igualDiagnosticosDetalle"]) #divImg {
                display:grid;
            }
            :host([media-size="small"][current="ate_listaReservas"]) #divImg, :host([media-size="small"][current="ate_videos"]) #divImg{
                display:grid;
            }
            :host([media-size="small"][current="ate_diagnosticosDetalle"]) #divImg, :host([media-size="small"][current="his_DiagnosticosDetalle"]) #divImg{
                display:grid;
            }
            :host([media-size="small"][current="his_ListaReservas"]) #divImg, :host([media-size="small"][current="notificacionReserva"]) #divImg{
                display:grid;
            }
            :host([media-size="small"][current="his_Chat"]) #divImg{
                display:grid;
            }
            :host([media-size="small"][current="sol_diagnosticodetalle"]) #divImg{
                display:grid;
            }
            #divCampana{
                position: absolute;
                display: grid;
                bottom: 0rem;
                right: 0rem;
                width:6vh;
                height:6vh;
            }
            :host([current="inicioSesion"]) #divCampana, :host([current="crearClave"]) #divCampana,:host([current="recuperaClave"]) #divCampana,:host([current="notificacionReserva"]) #divCampana{
                display:none;
            }
            :host([current="his_Chat"]) #divCampana{
                display:none;
            }
            :host([current="ate_listaReservas"]) #divCampana, :host([current="ate_Chat"]) #divCampana, :host([current="ate_diagnosticos"]) #divCampana, :host([current="ate_diagnosticosDetalle"]) #divCampana, :host([current="ate_videos"]) #divCampana{
                display:none;
            }
            #sinMarca{
                display:grid;
            }
            #conMarca{
                display:none;
            }
            #lblTitulo{               
                background-color: transparent;
                display: flex;
                align-items:center; 
                justify-content:left;
                text-align: left;
                font-size: var(--font-header-h1-size);
                font-weight: var(--font-header-h1-weight);
            }
            #lblLeyenda{           
                display: flex;
                justify-content:left;
                text-align: left;
                font-size:var(--font-bajada-size);
                font-weight: var(--font-bajada-weight);
            }
            :host(:not([media-size="small"])) #lblLeyenda {
                justify-content: center;
            }
            #divTapa{
                position:absolute;
                display: none;
                top:0;
                left:0;
                bottom: 0;
                right: 0;        
                z-index:20;            
                background-color: var(--color-gris-oscuro);
                opacity:.5;
                backdrop-filter: blur(2px);
            }
            :host([header-muestra-tapa]) #divTapa{
                display: grid;           
            }
        `
    }

    render() {
        return html`
            <div id="divTitulo">
                <div id="divImg" @click=${this.atras}>
                     ${ATRAS}
                </div>
                <div id="divTxt">
                    <label id="lblTitulo">${this.titulo}</label>
                </div>
                <div id="divCampana" @click=${this.chat}>
                ${store.getState().chat.campana.seMuestra ? CAMPANACONMARCA : CAMPANASINMARCA}
                </div>
            </div>
            <div>
                <label id="lblLeyenda">${this.subTitulo}</label>
            </div>
            <div id="divTapa"></div>
            `
    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE || name == HEADER_TAPA)) {
            this.headerMuestraTapa = state.ui.media.headerMuestraTapa
            this.current = state.screen.name
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-inicioSesion-recuperaClave-crearClave-misConsultas-ate_agendas-ate_videos-ate_diagnosticos-ate_diagnosticosDetalle-atencionesMascotas-ate_listaReservas-igualDiagnosticosDetalle-his_Agendas-his_ListaReservas-his_DiagnosticosDetalle-notificacionReserva-sol_Chat-his_Chat-sol_diagnosticodetalle-ate_Chat-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                this.titulo = idiomas[this.idioma][this.current].titulo
                this.subTitulo = idiomas[this.idioma][this.current].subTitulo
                if (this.current == "misConsultas") {
                    this.titulo = this.titulo + ", " + state.cliente.datos.nombre
                }

            }
            this.update();

        }

        if (name == NOTIF_CHAT_PENDIENTES_TIMESTAMP) {
            store.dispatch(goTo("notificacionReserva"))
        }
        if (name == CAMPANA_SEMUESTRA) {
            this.update()
        }
    }
    chat() {
        //        store.dispatch(sinContestar())
        store.dispatch(getNotificacionChatPendientes(2))
    }
    atras() {
        switch (this.current) {
            case "ate_videos":
                store.dispatch(goTo("ate_agendas"))
                break
            case "ate_diagnosticosDetalle":
                store.dispatch(goTo("ate_agendas"))
                break
            case "his_DiagnosticosDetalle":
                store.dispatch(goTo("his_ListaReservas"))
                break
            case "atencionesMascotas":
                store.dispatch(goTo("misConsultas"))
                break
            case "ate_listaReservas":
                if (this.mediaSize == "small") {
                    store.dispatch(goTo("atencionesMascotas"))
                } else {
                    store.dispatch(goTo("ate_agendas"))
                }
                break
            case "his_ListaReservas":
                store.dispatch(goTo("his_Agendas"))
                break
            case "his_Chat":
                store.dispatch(goTo("his_ListaReservas"))
                break
            case "notificacionReserva":
                store.dispatch(goTo("misConsultas"))
                break
            case "sol_diagnosticodetalle":
                store.dispatch(goTo("notificacionReserva"))
                break
            default:
                store.dispatch(goTo("inicioSesion"))
                break
        }
    }
    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            },
            layout: {
                type: String,
                reflect: true
            },
            hidden: {
                type: Boolean,
                reflect: true
            },
            area: {
                type: String
            },
            current: {
                type: String,
                reflect: true
            },
            campanaSeMuestra: {
                type: Boolean,
                reflect: true
            },
            headerMuestraTapa: {
                type: Boolean,
                reflect: true,
                attribute: 'header-muestra-tapa'
            }
        }
    }
}


window.customElements.define("header-componente", headerComponente);