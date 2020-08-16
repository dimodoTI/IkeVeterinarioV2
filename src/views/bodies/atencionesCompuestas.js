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

        :host([media-size="small"][current="agendas"]){
            grid-template-areas:"agendas" !important;
        }

        :host([media-size="small"][current="listaReservas"]){
            grid-template-areas:"listaReservas" !important;
        }

        :host([media-size="small"][current="videos"]){
            grid-template-areas:"videos" !important;
        }

        :host([media-size="small"][current="diagnosticos"]){
            grid-template-areas:"diagnosticos" !important;
        }
        
        :host([media-size="small"][current="diagnosticosDetalle"]){
            grid-template-areas:"diagnosticosDetalle" !important;
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
        }
        .diagnosticosDetalle{
            grid-area:diagnosticosDetalle;
        }
        /* Defino visibilidad para small */
        :host([current="agendas"][media-size="small"]) .agendas{
            display:grid !important;
        }
        :host(:not([current="agendas"])[media-size="small"]) .agendas{
            display:none !important;
        }
        :host([current="listaReservas"][media-size="small"]) .listaReservas{
            display:grid !important;
        }
        :host(:not([current="listaReservas"])[media-size="small"]) .listaReservas{
            display:none !important;
        }
        :host([current="videos"][media-size="small"]) .videos{
            display:grid !important;
        }
        :host(:not([current="videos"])[media-size="small"]) .videos{
            display:none !important;
        }
        :host([current="diagnosticos"][media-size="small"]) .diagnosticos{
            display:grid !important;
        }
        :host(:not([current="diagnosticos"])[media-size="small"]) .diagnosticos{
            display:none !important;
        }
        :host([current="diagnosticosDetalle"][media-size="small"]) .diagnosticosDetalle{
            display:grid !important;
        }
        :host(:not([current="diagnosticosDetalle"])[media-size="small"]) .diagnosticosDetalle{
            display:none !important;
        }
        /* Defino visibilidad para large y medium  */
        /* Pantalla Aganda */
        /*:host(:not([media-size="small"])[current="agendas"]){
            grid-template-areas:"agendas";
            grid-template-columns :1fr;
            grid-template-rows :1fr;        
        }
        :host(:not([media-size="small"])[current="agendas"]) #agendasId{
            display:grid
        }
        :host(:not([media-size="small"])[current="agendas"]) .listaReservas{
            display:none
        }
        :host(:not([media-size="small"])[current="agendas"]) .videos{
            display:none
        }
        :host(:not([media-size="small"])[current="agendas"]) .diagnosticos{
            display:none
        }*/
        /* Defino visibilidad para large y medium  */
        /* Pantalla listaReservas */
        /* :host(:not([media-size="small"])[current="listaReservas"]){
            grid-template-areas:"agendas listaReservas";
            grid-template-columns :1fr 1fr;
            grid-template-rows :1fr;        
        }
        :host(:not([media-size="small"])[current="listaReservas"]) .listaReservas{
            display:grid
        }
        :host(:not([media-size="small"])[current="listaReservas"]) .videos{
            display:none
        }
        :host(:not([media-size="small"])[current="listaReservas"]) .diagnosticos{
            display:none
        } */

        /* Defino visibilidad para large y medium  */
        /* Pantalla diagnosticosDetalle */
        /*:host(:not([media-size="small"])[current="diagnosticosDetalle"]){
            grid-template-areas:"agendas listaReservas";
            grid-template-columns :1fr 1fr;
            grid-template-rows :1fr;        
        }
        :host(:not([media-size="small"])[current="diagnosticosDetalle"]) .listaReservas{
            display:grid
        }
        :host(:not([media-size="small"])[current="diagnosticosDetalle"]) .videos{
            display:none
        }
        :host(:not([media-size="small"])[current="diagnosticosDetalle"]) .diagnosticos{
            display:none
        }*/

        `
    }
    render() {
        return html`
        <pantalla-agenda class="agendas" id="agendasId"></pantalla-agenda>
        <pantalla-listareserva class="listaReservas" id="listaReservasId"></pantalla-listareserva>
        <video-rtc class="videos" id="videosId"></video-rtc>
        <diagnostico-componente class="diagnosticos" id="diagnosticosId"></diagnostico-componente>
        <diagnostico-detalle-componente class="diagnosticosDetalle" id="diagnosticosDetalleId"></diagnostico-detalle-componente>
       
        `
    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            this.current = state.screen.name
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-agendas-listaReservas-videos-diagnosticos-diagnosticosDetalle-".indexOf("-" + state.screen.name + "-")
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas != -1) {
                this.hidden = false
                switch (this.current) {
                    case "agendas":
                        if (this.mediaSize != "small") {
                            this.style.gridTemplateAreas = '"agendas"';
                            this.style.gridTemplateRows = '1fr'
                            this.style.gridTemplateColumns = '1fr'
                            this.shadowRoot.getElementById("agendasId").style.display = "grid"
                            this.shadowRoot.getElementById("listaReservasId").style.display = "none"
                            this.shadowRoot.getElementById("videosId").style.display = "none"
                            this.shadowRoot.getElementById("diagnosticosId").style.display = "none"
                            this.shadowRoot.getElementById("diagnosticosDetalleId").style.display = "none"
                        }
                        break;
                    case "listaReservas":
                        if (this.mediaSize == "small") {
                            if (this.shadowRoot.querySelector("#videosId").style.display == "grid") {
                                store.dispatch(goTo("videos"))
                            } else {
                                store.dispatch(goTo("agendas"))
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
                            } else {
                                this.style.gridTemplateAreas = '"listaReservas videos" "listaReservas diagnosticos';
                                this.style.gridTemplateRows = '1fr 1fr'
                                this.style.gridTemplateColumns = '1fr 1fr'
                                this.shadowRoot.getElementById("agendasId").style.display = "none"
                                this.shadowRoot.getElementById("listaReservasId").style.display = "grid"
                                this.shadowRoot.getElementById("videosId").style.display = "grid"
                                this.shadowRoot.getElementById("diagnosticosId").style.display = "grid"
                                this.shadowRoot.getElementById("diagnosticosDetalleId").style.display = "none"
                            }
                        }
                        break;
                    case "diagnosticosDetalle":
                        if (this.mediaSize == "small") {
                            if (this.shadowRoot.querySelector("#videosId").style.display == "grid") {
                                store.dispatch(goTo("videos"))
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
                            } else {
                                this.style.gridTemplateAreas = '"diagnosticosDetalle videos" "diagnosticosDetalle diagnosticos';
                                this.style.gridTemplateRows = '1fr 1fr'
                                this.style.gridTemplateColumns = '1fr 1fr'
                                this.shadowRoot.getElementById("agendasId").style.display = "none"
                                this.shadowRoot.getElementById("listaReservasId").style.display = "none"
                                this.shadowRoot.getElementById("videosId").style.display = "grid"
                                this.shadowRoot.getElementById("diagnosticosId").style.display = "grid"
                                this.shadowRoot.getElementById("diagnosticosDetalleId").style.display = "grid"
                            }
                        }
                        break;
                    case "videos":
                        if (this.mediaSize != "small") {
                            this.style.gridTemplateAreas = '"listaReservas videos" "listaReservas diagnosticos"';
                            this.style.gridTemplateRows = '1fr 1fr'
                            this.style.gridTemplateColumns = '1fr 1fr'
                            this.shadowRoot.getElementById("agendasId").style.display = "none"
                            this.shadowRoot.getElementById("listaReservasId").style.display = "grid"
                            this.shadowRoot.getElementById("videosId").style.display = "grid"
                            this.shadowRoot.getElementById("diagnosticosId").style.display = "grid"
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

window.customElements.define("atenciones-compuestas", atencionesCompuesta);