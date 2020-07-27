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
import { COLGAR, MICROFONO, VIDEO, MICROFONONO, VIDEONO } from "../../../assets/icons/icons"
import { idiomas } from "../../redux/datos/idiomas"
import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class pantallaVideo extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"
    }

    static get styles() {
        return css`
        :host{
            position: relative;
            display:grid;
            background-color: var(--color-gris-fondo) !important;
            overflow-x: hidden;
            overflow-y: auto;
        }
        :host([hidden]){
            display: none; 
        }
        :host::-webkit-scrollbar{
            display: none;
        }
        #todo{
            display:grid;
            position:relative;
            background-image:var(--imagen-video-inactivo);
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            /* align-items: center; */
            justify-items: center;
            grid-template-rows:50% 15% 55%;
        }
        #todo[llamando]{
            background-image:var(--imagen-video-inactivo);
        }
        #todo[hablando]{
            background-image:var(--imagen-video-activo);
        }
        #llamando{
            width:8rem;
            text-align:center;
            align-self:center;
            color: var(--color-blanco);
            background-color: var(--color-gris-oscuro);
            opacity:.8;
            border-radius:1rem;
            font-size: var(--font-titulo-h1-size);
            font-weight: var(--font-titulo-h1-weight);        
        }
        #cortar{
            display:grid;
            width:2.5rem;
            height:2.5rem;
            background-color: var(--color-rojo);
            border-radius:1.25rem;
            text-align:center;
            align-items: center;
            justify-content: center;
            align-self: flex-start;
        }
        #micvid{
            display:grid;
            width:12rem;
            grid-template-columns:50% 50%;
            align-items: center;
            justify-items: center;
            opacity:.6;
        }
        #microfono,#video{
            width:2.5rem;
            height:2.5rem;
            background-color: var(--color-gris-oscuro);
            border-radius:1.25rem;
            align-items: center;
            justify-content: center;
            cursor:pointer;
            z-index:10;
        }
        #cortar svg, #microfono svg,#video svg{
            width:2rem;
            height:2rem;
            fill: var(--color-blanco);
            stroke: transparent;
        }
        .parpadea {
            animation-name: parpadeo;
            animation-duration: 2s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          
            -webkit-animation-name:parpadeo;
            -webkit-animation-duration: 2s;
            -webkit-animation-timing-function: linear;
            -webkit-animation-iteration-count: infinite;
        }
          
        @-moz-keyframes parpadeo{  
            0% { opacity: 1.0; }
            50% { opacity: 0.0; }
            100% { opacity: 1.0; }
        }     
        @-webkit-keyframes parpadeo {  
            0% { opacity: 1.0; }
            50% { opacity: 0.0; }
             100% { opacity: 1.0; }
        } 
        @keyframes parpadeo {  
            0% { opacity: 1.0; }
             50% { opacity: 0.0; }
            100% { opacity: 1.0; }
        }
        `
    }
    render() {
        return html`
            <div id="todo"  llamando @click="${this.pasar}">
                <div id="llamando" class="parpadea">
                    ${idiomas[this.idioma].videos.conectando}
                </div>
                <div id="micvid">
                    <div id="microfono" style="display:grid" @click="${this.microfonoMostrar}">${MICROFONO}</div>
                    <div id="microfono" style="display:none" @click="${this.microfonoMostrar}">${MICROFONONO}</div>
                    <div id="video" style="display:grid" @click="${this.videoMostrar}">${VIDEO}</div>
                    <div id="video" style="display:none" @click="${this.videoMostrar}">${VIDEONO}</div>
                </div>
                <div id="cortar" @click="${this.colgar}">${COLGAR}</div>
            </div>
        `
    }
    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-videosANTERIOR-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = true
                if (this.shadowRoot.querySelector("#todo")) {
                    this.shadowRoot.querySelector("#todo").removeAttribute("hablando");
                    this.shadowRoot.querySelector("#todo").setAttribute("llamando", "");
                    this.shadowRoot.querySelector("#llamando").innerHTML = idiomas[this.idioma].videos.conectando;
                    this.shadowRoot.querySelectorAll("#video")[0].style.display = "grid"
                    this.shadowRoot.querySelectorAll("#video")[1].style.display = "none"
                    this.shadowRoot.querySelectorAll("#microfono")[0].style.display = "grid"
                    this.shadowRoot.querySelectorAll("#microfono")[1].style.display = "none"
                }
            }
            this.update();
        }
    }
    colgar() {
        this.hidden = true;
        if (this.shadowRoot.querySelector("#todo").hasAttribute("llamando")) {
            store.dispatch(goTo("agendas"))
        } else {
            store.dispatch(goTo("diagnosticos"))
        }
    }
    videoMostrar(e) {
        e.stopPropagation();
        [].forEach.call(this.shadowRoot.querySelectorAll("#video"), element => {
            if (element.style.display == "grid") {
                element.style.display = "none";
            } else {
                element.style.display = "grid";
            }
        })
    }
    microfonoMostrar(e) {
        e.stopPropagation();
        [].forEach.call(this.shadowRoot.querySelectorAll("#microfono"), element => {
            if (element.style.display == "grid") {
                element.style.display = "none";
            } else {
                element.style.display = "grid";
            }
        })
    }
    pasar(e) {
        this.shadowRoot.querySelector("#todo").removeAttribute("llamando");
        this.shadowRoot.querySelector("#todo").setAttribute("hablando", "");
        this.shadowRoot.querySelector("#llamando").innerHTML = "";
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
window.customElements.define("pantalla-video", pantallaVideo);