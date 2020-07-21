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
} from "../redux/store";

import {
    layoutsCSS
} from "./ui/layouts"

import {
    blueHeader
} from "./headers/blueHeader"
import {
    redFoot
} from "./foots/redFoot"
import {
    greenDashboard
} from "./bodies/greenDashboard"
import {
    splashScreen
} from "./bodies/splashscreen"
import {
    pantallaInicioSesion
} from "./bodies/iniciosesion"
import {
    headerComponente
} from "./headers/header"
import {
    pantallaRecuperaClave
} from "./bodies/recuperaclave"
import {
    getLayout
} from "../redux/screens/screenLayouts";
import {
    pantallaRecuperaClaveMsg
} from "./bodies/recuperaclavemsg"
import {
    pantallaCrearClave
} from "./bodies/crearclave"
import {
    pantallaCrearClaveMsg
} from "./bodies/crearclavemsg"
import {
    pantallaMisconsultas
} from "./bodies/misconsultas"
import {
    pieComponente
} from "./foots/pie"
import {
    pantallaAgenda
} from "./bodies/agenda"
import {
    pantallaVideo
} from "./bodies/video"
import {
    diagnosticoComponente
} from "./bodies/diagnostico"
import {
    diagnosticoDetalleComponente
} from "./bodies/diagnosticoDetalle"
import {
    pantallaListaReserva
} from "./bodies/listaReserva"


const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class viewManager extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();

    }


    static get styles() {
        return css`
        :host{
            display: grid;                 
            height:100vh;
            width: 100vw;
            padding:0;
            background-color:var(--color-gris-claro);
            overflow:hidden;
        }

        ${layoutsCSS};


        `
    }



    render() {
        return html`
            <!-- <blue-header class="header"></blue-header> -->
            <green-dashboard class="body"></green-dashboard>
            <red-foot class="foot"></red-foot>
            <splash-screen class="body"></splash-screen>
            <splash-screen class="body"></splash-screen>
            <pantalla-iniciosesion class="body"></pantalla-iniciosesion>
            <header-componente class="header"></header-componente>
            <pantalla-recuperaclave class="body"></pantalla-recuperaclave>
            <pantalla-recuperaclavemsg class="body"></pantalla-recuperaclavemsg>
            <pantalla-crearclave class="body"></pantalla-crearclave>
            <pantalla-crearclavemsg class="body"></pantalla-crearclavemsg>
            <pantalla-misconsulta class="body"></pantalla-misconsulta>
            <pie-componente class="foot"></pie-componente>
            <pantalla-agenda class="body"></pantalla-agenda>
            <pantalla-video class="body" ></pantalla-video>
            <diagnostico-componente class="body" ></diagnostico-componente>
            <diagnostico-detalle-componente class="body" ></diagnostico-detalle-componente>
            <pantalla-listareserva class="body" ></pantalla-listareserva>
                             
        `
    }

    stateChanged(state, name) {
        //        this.style.height = window.innerHeight + "px"
        if ((name == MEDIA_CHANGE || name == SCREEN)) {
            this.mediaSize = state.ui.media.size
            this.layout = getLayout(state).name
        }
        this.update();
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
            }
        }
    }
}

window.customElements.define("view-manager", viewManager);