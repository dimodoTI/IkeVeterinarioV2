import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { idiomas } from "../../redux/datos/idiomas"
import { label } from "../css/label"
import { goTo } from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class pantallaRecuperaClaveMsg extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"
    }

    static get styles() {
        return css`
        ${label}
        :host{
            position: relative;
            display:grid;
            grid-template-rows: 30% 20% 50%;
            grid-gap:0.5rem;
            background-color:var(--color-gris-fondo) !important;
            justify-content:center;
            align-items:center; 
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
        #x{
            position: relative;
            align-self: flex-start;
            justify-self: flex-end;
            cursor: pointer;
        }
        #titulo{
            position:relative;
            text-align:center;
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);
        }
        #leyenda{
            position:relative;
            text-align:center;
            align-self: flex-start;
            font-size: var(--font-header-h2-size);
            font-weight: var(--font-header-h2-weight);
        }
        `
    }
    render() {
        return html`
            <div id="x"  @click=${this.clickBoton1}>
            X
            </div>               
            <label id="titulo">
            ${idiomas[this.idioma].recuperaClaveMsg.titulo}
            </label>
            <label id="leyenda">
            ${idiomas[this.idioma].recuperaClaveMsg.subTitulo}
            </label>
        `
    }
    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-recuperaClaveMsg-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }
    }
    clickBoton1() {
        store.dispatch(goTo("inicioSesion"))
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

window.customElements.define("pantalla-recuperaclavemsg", pantallaRecuperaClaveMsg);