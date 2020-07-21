import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { idiomas } from "../../redux/datos/idiomas"
import { button } from "../css/button"
import { ikeInput } from "../css/ikeInput"
import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class pantallaCrearClave extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"
    }

    static get styles() {
        return css`
        ${ikeInput}
        ${button}
        :host{
            position: relative;
            display:grid;
            background-color: var(--color-gris-fondo) !important;
            grid-auto-flow:row;
            grid-gap:.8rem;
            overflow-x: hidden;
            overflow-y: auto;
        }
        :host([hidden]){
            display: none; 
        } 
        :host(:not([media-size="small"])){
            max-width: fit-content;
            min-width: 18rem;
            justify-self: center;
            max-height: fit-content;
            min-height: 18rem;
            align-self: center;
            border-radius: 1rem;
            box-shadow: var(--shadow-elevation-3-box);
        }
        label {
            position: relative;
            width: 80%;
            color: var(--color-negro);
            background-color:transparent;
            border-radius:0;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        }
        `
    }
    render() {
        return html`
            <div class="ikeInput">
                <label id="lblClave1">${idiomas[this.idioma].crearClave.clave1}</label>
                <input id="txtClave1" type="password" @input=${this.activar} }>
                <label id="lblErrorClave1" error oculto>${idiomas[this.idioma].crearClave.errorClave1.err1}</label>
            </div>

            <div class="ikeInput">
                <label id="lblClave2">${idiomas[this.idioma].crearClave.clave2}</label>
                <input id="txtClave2" type="password" @input=${this.activar} }>
                <label id="lblErrorClave2" error oculto>${idiomas[this.idioma].crearClave.errorClave2.err1}</label>
            </div>
            <button id="btn-recuperar" style="height:7vh" btn1 apagado @click=${this.clickBoton2}>
            ${idiomas[this.idioma].crearClave.btn1}
            </button>
        `
    }
    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-crearClave-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }
    }
    activar() {
        this.activo = true
        const clave1 = this.shadowRoot.querySelector("#txtClave1")
        const clave2 = this.shadowRoot.querySelector("#txtClave2")
        if (clave1.value.length < 4) {
            this.activo = false
        }
        if (clave2.value.length < 4) {
            this.activo = false
        }
        if (this.activo) {
            this.shadowRoot.querySelector("#btn-recuperar").removeAttribute("apagado")
        } else {
            this.shadowRoot.querySelector("#btn-recuperar").setAttribute("apagado", "")
        }
        this.update()
    }
    valido() {
        [].forEach.call(this.shadowRoot.querySelectorAll("[error]"), element => {
            element.setAttribute("oculto", "")
        })
        let valido = true
        const clave1 = this.shadowRoot.querySelector("#txtClave1")
        const clave2 = this.shadowRoot.querySelector("#txtClave2")
        if (clave1.value.length < 8) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorClave1").removeAttribute("oculto");
        }
        if (clave2.value.length < 8) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorClave2").removeAttribute("oculto");
        }
        this.update()
        return valido
    }
    clickBoton2() {
        if (this.activo) {
            if (this.valido()) {
                store.dispatch(goTo("crearClaveMsg"));
            }
        }
    }
    firstUpdated() {
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
            }
        }
    }
}

window.customElements.define("pantalla-crearclave", pantallaCrearClave);