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

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class historicoCompuesta extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
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
        :host([media-size="small"]){
            grid-template-columns :1fr  !important;
            grid-template-rows :1fr  !important;
        }

        :host([media-size="small"][current="his_Agendas"]){
            grid-template-areas:"agendas" !important;
        }

        :host([media-size="small"][current="his_ListaReservas"]){
            grid-template-areas:"listaReservas" !important;
        }
        
        :host([media-size="small"][current="his_DiagnosticosDetalle"]){
            grid-template-areas:"diagnosticosDetalle" !important;
        }

        :host([media-size="small"][current="his_Chat"]){
            grid-template-areas:"chat" !important;
        }
        /* Defino areas */

        .agendas{
            grid-area:agendas;
        }
        .listaReservas{
            grid-area:listaReservas;          
        }
        .diagnosticosDetalle{
            grid-area:diagnosticosDetalle;
        }
        .chat{
            grid-area:chat;
        }
        /* Defino visibilidad para small */
        :host([current="his_Agendas"][media-size="small"]) .agendas{
            display:grid !important;
        }
        :host(:not([current="his_Agendas"])[media-size="small"]) .agendas{
            display:none !important;
        }
        :host([current="his_ListaReservas"][media-size="small"]) .listaReservas{
            display:grid !important;
        }
        :host([current="his_Chat"][media-size="small"]) .chat{
            display:grid !important;
        }

        :host(:not([current="his_ListaReservas"])[media-size="small"]) .listaReservas{
            display:none !important;
        }
        :host([current="his_DiagnosticosDetalle"][media-size="small"]) .diagnosticosDetalle{
            display:grid !important;
        }
        :host(:not([current="his_DiagnosticosDetalle"])[media-size="small"]) .diagnosticosDetalle{
            display:none !important;
        }
        :host(:not([current="his_Chat"])[media-size="small"]) .chat{
            display:none !important;
        }
        `
    }
    render() {
        return html`
        <pantalla-agenda class="agendas" id="agendasIdHis" solo-atencion></pantalla-agenda>
        <pantalla-listareserva class="listaReservas" id="listaReservasId" ></pantalla-listareserva>
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
            const SeMuestraEnUnasDeEstasPantallas = "-his_Agendas-his_ListaReservas-his_DiagnosticosDetalle-his_Chat-".indexOf("-" + state.screen.name + "-")
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas != -1) {
                this.hidden = false
                switch (this.current) {
                    case "his_Agendas":
                        if (this.mediaSize != "small") {
                            this.style.gridTemplateAreas = '"agendas"';
                            this.style.gridTemplateRows = '1fr'
                            this.style.gridTemplateColumns = '1fr'
                            this.shadowRoot.getElementById("agendasIdHis").style.display = "grid"
                            this.shadowRoot.getElementById("listaReservasId").style.display = "none"
                            this.shadowRoot.getElementById("diagnosticosDetalleId").style.display = "none"
                            this.shadowRoot.getElementById("chatId").style.display = "none"
                        }
                        break;
                    case "his_ListaReservas":
                        if (this.mediaSize != "small") {
                            this.style.gridTemplateAreas = '"agendas listaReservas"';
                            this.style.gridTemplateRows = '1fr'
                            this.style.gridTemplateColumns = '1fr 1fr'
                            this.shadowRoot.getElementById("agendasIdHis").style.display = "grid"
                            this.shadowRoot.getElementById("listaReservasId").style.display = "grid"
                            this.shadowRoot.getElementById("diagnosticosDetalleId").style.display = "none"
                            this.shadowRoot.getElementById("chatId").style.display = "none"
                        }
                        break;
                    case "his_DiagnosticosDetalle":
                        if (this.mediaSize != "small") {
                            this.style.gridTemplateAreas = '"agendas listaReservas diagnosticosDetalle"';
                            this.style.gridTemplateRows = '1fr'
                            this.style.gridTemplateColumns = '1fr 1fr 1fr'
                            this.shadowRoot.getElementById("agendasIdHis").style.display = "grid"
                            this.shadowRoot.getElementById("listaReservasId").style.display = "grid"
                            this.shadowRoot.getElementById("diagnosticosDetalleId").style.display = "grid"
                            this.shadowRoot.getElementById("chatId").style.display = "none"
                        }
                        break;
                    case "his_Chat":
                        if (this.mediaSize != "small") {
                            this.style.gridTemplateAreas = '"agendas listaReservas chat"';
                            this.style.gridTemplateRows = '1fr'
                            this.style.gridTemplateColumns = '1fr 1fr 1fr'
                            this.shadowRoot.getElementById("agendasIdHis").style.display = "grid"
                            this.shadowRoot.getElementById("listaReservasId").style.display = "grid"
                            this.shadowRoot.getElementById("chatId").style.display = "grid"
                            this.shadowRoot.getElementById("diagnosticosDetalleId").style.display = "none"
                        }
                        break;
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

window.customElements.define("historico-compuestas", historicoCompuesta);