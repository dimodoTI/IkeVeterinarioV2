import {
    html,
    LitElement,
    css
} from "lit-element";
import {
    connect
} from "@brunomon/helpers"
import {
    store
} from "../../redux/store";
import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";
import {
    pantallaAgenda
} from "../bodies/agenda"
import {
    headerMuestraTapa, footherMuestraTapa
} from "../../redux/ui/actions"

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class atencionesCompuesta extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = false
        this.area = "body"
    }

    static get styles() {
        return css`
        :host{
            position: relative;
            display: grid;      
            background-color: var(--color-gris-fondo) !important;
            grid-gap:.1rem;
            overflow-x: hidden;
            overflow-y: auto;
            padding: 0 !important;
        }
        :host([hidden]){
            display:none
        }

        /* Layout para large */

        /*:host([media-size="large"]){
            grid-template-areas:"agendas listaReservas videos"
                                "agendas listaReservas diagnosticos";
            grid-template-columns :1fr 1fr 1fr;
            grid-template-rows :1fr 1fr;
        }*/

        /* Layout para medium */

        /*:host([media-size="medium"]){
            grid-template-areas:"agendas listaReservas videos"
                                "agendas listaReservas diagnosticos";
            grid-template-columns :1fr 1fr 1fr;
            grid-template-rows :1fr 1fr;
        }*/

        /* Layout para small */

        :host([media-size="small"]){
            grid-template-columns :1fr  !important;
            grid-template-rows :1fr  !important;
        }

        :host([media-size="small"][current="ate_agendas"]){
            grid-template-areas:"agendas" !important;
        }

        :host([media-size="small"][current="late_istaReservas"]){
            grid-template-areas:"listaReservas" !important;
        }

        :host([media-size="small"][current="ate_videos"]){
            grid-template-areas:"videos" !important;
        }

        :host([media-size="small"][current="ate_diagnosticos"]){
            grid-template-areas:"diagnosticos" !important;
        }
        
        :host([media-size="small"][current="ate_diagnosticosDetalle"]){
            grid-template-areas:"diagnosticosDetalle" !important;
        }

        :host([media-size="small"][current="ate_Chat"]){
            grid-template-areas:"chat" !important;
        }
        /* Defino areas */

        .agendas{
            grid-area:agendas;
        }
        .listaReservas{
            grid-area:listaReservas; 
        }
        .videos{
            grid-area:videos;
        }
        .diagnosticos{
            grid-area:diagnosticos;
            padding: 0 .5rem 0 .5rem;
        }
        .diagnosticosDetalle{
            grid-area:diagnosticosDetalle;
        }
        .chat{
            grid-area:chat;
        }
        /* Defino visibilidad para small */
        :host([current="ate_agendas"][media-size="small"]) .agendas{
            display:grid !important;
        }
        :host(:not([current="ate_agendas"])[media-size="small"]) .agendas{
            display:none !important;
        }
        :host([current="ate_listaReservas"][media-size="small"]) .listaReservas{
            display:grid !important;
        }
        :host(:not([current="ate_listaReservas"])[media-size="small"]) .listaReservas{
            display:none !important;
        }
        :host([current="ate_videos"][media-size="small"]) .videos{
            display:grid !important;
        }
        :host(:not([current="ate_videos"])[media-size="small"]) .videos{
            display:none !important;
        }
        :host([current="ate_diagnosticos"][media-size="small"]) .diagnosticos{
            display:grid !important;
        }
        :host(:not([current="ate_diagnosticos"])[media-size="small"]) .diagnosticos{
            display:none !important;
        }
        :host([current="ate_diagnosticosDetalle"][media-size="small"]) .diagnosticosDetalle{
            display:grid !important;
        }
        :host(:not([current="ate_diagnosticosDetalle"])[media-size="small"]) .diagnosticosDetalle{
            display:none !important;
        }
        :host([current="ate_Chat"][media-size="small"]) .chat{
            display:grid !important;
        }
        :host(:not([current="ate_Chat"])[media-size="small"]) .chat{
            display:none !important;
        }


        `
    }
    render() {
        return html`
        <pantalla-agenda class="agendas" id="agendasId"></pantalla-agenda>
        <pantalla-listareserva class="listaReservas" id="listaReservasId"></pantalla-listareserva>
        <video-rtc class="videos" id="videosId"></video-rtc>
        <diagnostico-componente class="diagnosticos" id="diagnosticosId"></diagnostico-componente>
        <diagnostico-detalle-componente class="diagnosticosDetalle" id="diagnosticosDetalleId"></diagnostico-detalle-componente>
        <chat-app class="chat" id="chatId"></chat-app>
       
        `
    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            this.current = state.screen.name
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-ate_agendas-ate_listaReservas-ate_videos-ate_diagnosticos-ate_diagnosticosDetalle-ate_Chat-".indexOf("-" + state.screen.name + "-")
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas != -1) {
                this.hidden = false

                switch (this.current) {
                    case "ate_agendas":
                        if (this.mediaSize != "small") {
                            this.style.gridTemplateAreas = '"agendas"';
                            this.style.gridTemplateRows = '1fr'
                            this.style.gridTemplateColumns = '1fr'
                            this.shadowRoot.getElementById("agendasId").style.display = "grid"
                            this.shadowRoot.getElementById("listaReservasId").style.display = "none"
                            this.shadowRoot.getElementById("videosId").style.display = "none"
                            this.shadowRoot.getElementById("diagnosticosId").style.display = "none"
                            this.shadowRoot.getElementById("diagnosticosDetalleId").style.display = "none"
                            this.shadowRoot.getElementById("chatId").style.display = "none"
                        }
                        break;
                    case "ate_listaReservas":
                        if (this.mediaSize == "small") {
                            if (this.shadowRoot.querySelector("#videosId").style.display == "grid") {
                                store.dispatch(goTo("ate_videos"))
                            } else {
                                store.dispatch(goTo("ate_agendas"))
                            }
                        } else {
                            if (this.shadowRoot.querySelector("#videosId").style.display == "none") {
                                this.style.gridTemplateAreas = '"agendas listaReservas"';
                                this.style.gridTemplateRows = '1fr'
                                this.style.gridTemplateColumns = '1fr 1fr'
                                this.shadowRoot.getElementById("agendasId").style.display = "grid"
                                this.shadowRoot.getElementById("listaReservasId").style.display = "grid"
                                this.shadowRoot.getElementById("videosId").style.display = "none"
                                this.shadowRoot.getElementById("diagnosticosId").style.display = "none"
                                this.shadowRoot.getElementById("diagnosticosDetalleId").style.display = "none"
                                this.shadowRoot.getElementById("chatId").style.display = "none"
                            } else {
                                this.style.gridTemplateAreas = '"listaReservas videos" "listaReservas diagnosticos';
                                this.style.gridTemplateRows = '1fr 1fr'
                                this.style.gridTemplateColumns = '1fr 1fr'
                                this.shadowRoot.getElementById("agendasId").style.display = "none"
                                this.shadowRoot.getElementById("listaReservasId").style.display = "grid"
                                this.shadowRoot.getElementById("videosId").style.display = "grid"
                                this.shadowRoot.getElementById("diagnosticosId").style.display = "grid"
                                this.shadowRoot.getElementById("diagnosticosDetalleId").style.display = "none"
                                this.shadowRoot.getElementById("chatId").style.display = "none"
                            }
                        }
                        break;
                    case "ate_diagnosticosDetalle":
                        if (this.mediaSize == "small") {
                            if (this.shadowRoot.querySelector("#videosId").style.display == "grid") {
                                store.dispatch(goTo("ate_videos"))
                            }
                            //store.dispatch(goTo("agendas"))
                        } else {
                            if (this.shadowRoot.querySelector("#videosId").style.display == "none") {
                                this.style.gridTemplateAreas = '"agendas diagnosticosDetalle"';
                                this.style.gridTemplateRows = '1fr'
                                this.style.gridTemplateColumns = '1fr 1fr'
                                this.shadowRoot.getElementById("agendasId").style.display = "grid"
                                this.shadowRoot.getElementById("listaReservasId").style.display = "none"
                                this.shadowRoot.getElementById("videosId").style.display = "none"
                                this.shadowRoot.getElementById("diagnosticosId").style.display = "none"
                                this.shadowRoot.getElementById("diagnosticosDetalleId").style.display = "grid"
                                this.shadowRoot.getElementById("chatId").style.display = "none"
                            } else {
                                this.style.gridTemplateAreas = '"diagnosticosDetalle videos" "diagnosticosDetalle diagnosticos';
                                this.style.gridTemplateRows = '1fr 1fr'
                                this.style.gridTemplateColumns = '1fr 1fr'
                                this.shadowRoot.getElementById("agendasId").style.display = "none"
                                this.shadowRoot.getElementById("listaReservasId").style.display = "none"
                                this.shadowRoot.getElementById("videosId").style.display = "grid"
                                this.shadowRoot.getElementById("diagnosticosId").style.display = "grid"
                                this.shadowRoot.getElementById("diagnosticosDetalleId").style.display = "grid"
                                this.shadowRoot.getElementById("chatId").style.display = "none"
                            }
                        }
                        break;
                    case "ate_Chat":
                        if (this.mediaSize == "small") {
                            if (this.shadowRoot.querySelector("#videosId").style.display == "grid") {
                                store.dispatch(goTo("ate_videos"))
                            }
                            //store.dispatch(goTo("agendas"))
                        } else {
                            if (this.shadowRoot.querySelector("#videosId").style.display == "none") {
                                this.style.gridTemplateAreas = '"agendas chat"';
                                this.style.gridTemplateRows = '1fr'
                                this.style.gridTemplateColumns = '1fr 1fr'
                                this.shadowRoot.getElementById("agendasId").style.display = "grid"
                                this.shadowRoot.getElementById("listaReservasId").style.display = "none"
                                this.shadowRoot.getElementById("videosId").style.display = "none"
                                this.shadowRoot.getElementById("diagnosticosId").style.display = "none"
                                this.shadowRoot.getElementById("diagnosticosDetalleId").style.display = "none"
                                this.shadowRoot.getElementById("chatId").style.display = "grid"
                            } else {
                                this.style.gridTemplateAreas = '"chat videos" "chat diagnosticos';
                                this.style.gridTemplateRows = '1fr 1fr'
                                this.style.gridTemplateColumns = '1fr 1fr'
                                this.shadowRoot.getElementById("agendasId").style.display = "none"
                                this.shadowRoot.getElementById("listaReservasId").style.display = "none"
                                this.shadowRoot.getElementById("videosId").style.display = "grid"
                                this.shadowRoot.getElementById("diagnosticosId").style.display = "grid"
                                this.shadowRoot.getElementById("diagnosticosDetalleId").style.display = "none"
                                this.shadowRoot.getElementById("chatId").style.display = "grid"
                            }
                        }
                        break;
                    case "ate_videos":
                        if (this.mediaSize != "small") {
                            this.style.gridTemplateAreas = '"listaReservas videos" "listaReservas diagnosticos"';
                            this.style.gridTemplateRows = '1fr 1fr'
                            this.style.gridTemplateColumns = '1fr 1fr'
                            this.shadowRoot.getElementById("agendasId").style.display = "none"
                            this.shadowRoot.getElementById("listaReservasId").style.display = "grid"
                            this.shadowRoot.getElementById("videosId").style.display = "grid"
                            this.shadowRoot.getElementById("diagnosticosId").style.display = "grid"
                            this.shadowRoot.getElementById("diagnosticosDetalleId").style.display = "none"
                            this.shadowRoot.getElementById("chatId").style.display = "none"
                        }
                        break;
                }
                if (this.shadowRoot.getElementById("videosId").style.display == "grid" && this.mediaSize != "small") {
                    store.dispatch(headerMuestraTapa(true))
                    store.dispatch(footherMuestraTapa(true))
                } else {
                    store.dispatch(headerMuestraTapa(false))
                    store.dispatch(footherMuestraTapa(false))
                }
            }
            this.update();
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
                type: String,
                reflect: true,
            }
        }
    }
}

window.customElements.define("atenciones-compuestas", atencionesCompuesta);