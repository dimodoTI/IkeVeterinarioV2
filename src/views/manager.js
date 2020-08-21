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
import {
    dimodoSpinner
} from "../views/componentes/spinner"
import {
    pantallaWarning
} from "../views/bodies/warning"
import {
    videoRTC
} from "../views/bodies/videoRTC"
import {
    atencionesCompuesta
} from "../views/bodies/atencionesCompuestas"
import {
    historicoCompuesta
} from "../views/bodies/historico"
import {
    pantallaNotificacionReserva
} from "../views/bodies/notificacionReserva"
import {
    chatApp
} from "../views/bodies/chatApp"
import {
    chatSolo
} from "../views/bodies/chatSolo"
import {
    diagnosticoDetalleSolo
} from "../views/bodies/diagnosticoDetalleSolo"

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
            <pantalla-iniciosesion class="body"></pantalla-iniciosesion>
            <header-componente class="header"></header-componente>
            <pantalla-recuperaclave class="body"></pantalla-recuperaclave>
            <pantalla-recuperaclavemsg class="body"></pantalla-recuperaclavemsg>
            <pantalla-crearclave class="body"></pantalla-crearclave>
            <pantalla-crearclavemsg class="body"></pantalla-crearclavemsg>
            <pantalla-misconsulta class="body"></pantalla-misconsulta>
            <pantalla-notificacionreserva class="body"></pantalla-notificacionreserva>
            <diagnostico-detallesolo class="body"></diagnostico-detallesolo>
            <pie-componente class="foot"></pie-componente>

            <chat-solo class="body" ></chat-solo>
            <historico-compuestas class="body" ></historico-compuestas>
            <atenciones-compuestas class="body" ></atenciones-compuestas>
            <pantalla-warning ></pantalla-warning>
            <dimodo-spinner type="spinner2"></dimodo-spinner>

        `
    }

    stateChanged(state, name) {

        if ((name == MEDIA_CHANGE || name == SCREEN)) {
            this.mediaSize = state.ui.media.size
            this.layout = getLayout(state).name
            if (!window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
                this.style.height = window.innerHeight + "px"
            }
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