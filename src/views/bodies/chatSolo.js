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

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class chatSolo extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
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
            grid-template-columns :1fr  !important;
            grid-template-rows :1fr  !important;
            grid-template-areas:"chat" !important;
        }
        :host([hidden]){
            display:none
        }

        .chat{
            grid-area:chat;
        }

        /* Defino visibilidad para small */
        :host([current="sol_Chat"]) .chat{
            display:grid !important;
        }

        `
    }
    render() {
        return html`
        <chat-app class="chat"></chat-app>
       
        `
    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            this.current = state.screen.name
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-sol_Chat-".indexOf("-" + state.screen.name + "-")
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas != -1) {
                this.hidden = false
                this.current = state.screen.name
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

window.customElements.define("chat-solo", chatSolo);