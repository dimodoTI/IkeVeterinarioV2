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
    idiomas
} from "../../redux/datos/idiomas"
import {
    button
} from "../css/button"
import {
    ikeInput
} from "../css/ikeInput"
import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class pantallaRecuperaClave extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"
    }

    static get styles() {
        return css`
        ${button}
        ${ikeInput}
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
        :host::-webkit-scrollbar{
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
        #btn-recuperar{
            height:7vh;
        }        `
    }
    render() {
        return html`
        <div class="ikeInput">
            <label id="lblMail">${idiomas[this.idioma].recuperaClave.mail}</label>
            <input id="txtMail"  @input=${this.activar} type="email" placeholder=${idiomas[this.idioma].recuperaClave.mailPlaceholder}>
            <label id="lblErrorMail" error oculto>${idiomas[this.idioma].recuperaClave.errorMail.err1}</label>
        </div>

        <div class="ikeInput">
            <label id="lblDocumento">${idiomas[this.idioma].recuperaClave.documento}</label>
            <input id="txtDocumento" @input=${this.activar} type="number" placeholder=${idiomas[this.idioma].recuperaClave.documentoPlaceholder}>
            <label id="lblErrorDocumento" error oculto>${idiomas[this.idioma].recuperaClave.errorDocumento.err1}</label>
        </div>
        <button id="btn-recuperar" btn1 apagado @click=${this.clickBoton2}>
            ${idiomas[this.idioma].recuperaClave.btn1}
        </button>
        `
    }
    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-recuperaClave-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }
    }
    activar() {
        this.activo = true
        const email = this.shadowRoot.querySelector("#txtMail")
        const documento = this.shadowRoot.querySelector("#txtDocumento")
        if (documento.value.length < 4) {
            this.activo = false
        }
        if (email.value.length < 4) {
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
        const documento = this.shadowRoot.querySelector("#txtDocumento")
        const email = this.shadowRoot.querySelector("#txtMail")
        if (documento.value.length < 8) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorDocumento").removeAttribute("oculto");
        }
        if (email.value.indexOf("@") == -1) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorMail").removeAttribute("oculto");
        }
        this.update()
        return valido
    }

    clickBoton2() {
        if (this.activo) {
            if (this.valido()) {
                store.dispatch(goTo("recuperaClaveMsg"))
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
            }
        }
    }
}

window.customElements.define("pantalla-recuperaclave", pantallaRecuperaClave);