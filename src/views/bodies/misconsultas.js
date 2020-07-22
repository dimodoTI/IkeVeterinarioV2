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
    AGENDA,
    HISTORIAL
} from "../../../assets/icons/icons"

import {
    button
} from "../css/button"

import {
    proxima
} from "../css/proxima"
import {
    get as getReservasDelDia
} from "../../redux/reservasDelDia/actions"
import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class pantallaMisconsultas extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"
    }

    static get styles() {
        return css`
        ${button}
        ${proxima}
        :host{
            position: relative;
            display: grid;
            padding: 0  !important;
            background-color: var(--color-gris-fondo) !important;
            grid-template-rows:10% 90%;   
            grid-gap: 2vh; 
            overflow-x: hidden;
            overflow-y: auto;       
        }
        :host([hidden]){
            display: none; 
        }
        :host(:not([media-size="small"])){
            grid-template-rows:1fr;
        }
        :host(:not([media-size="small"])) #gridContenedor{
            align-content:flex-start;
        }
        :host::-webkit-scrollbar {
            display: none;
        }
        .proxima{
            height:3vh;
            font-size:var(--font-bajada-size);
            font-weight:var(--font-bajada-weight);
        }
        .cuerpo{
            position: relative;
            display:grid;
            grid-auto-flow:row;
            width:100%;
            padding-top:.84rem;
            overflow-x: none; 
            overflow-y: auto; 
        }
        .cuerpo::-webkit-scrollbar {
            display: none;
        }
        .cajas{
            display:grid;
            grid-template-columns:50% 50%;
            align-content:center;
            background-color:transparent;
            justify-content:space-between;
            padding-bottom:5rem;
        }
        .caja{
            display:grid;
            flex-direction:column;
            align-content:center;
            background-color:var(--color-celeste);
            border-radius:.2rem;
            text-align:center;
            margin-left:.84rem;
            margin-right:0rem;
            height:35vw;
            cursor:pointer;
        }

        div svg {
            height:2.94rem;
            width:3.56rem;
            padding-top:1rem         
        }

        .cajaTexto{
            font-size:.84rem;
            color:#fff;
            padding-right:1rem;
            padding-top:.8rem;
            padding-left:1rem;
            padding-bottom:.8rem;
            text-align:center
        }

        .ayuda{
            display:grid;
            grid-auto-flow:row;
            background-color:var(--color-gris-claro);
            font-size:var(--font-header-h2-family);
            font-weight:var(--font-header-h2-weight);
            color:var(--color-azul-oscuro);
            align-content:center;
            width:100%;
            padding-top:.84rem;
            text-align:center;
            grid-gap:.84rem
        }
        :host(:not([media-size="small"])) .ayuda{
            display:none;
        }
        `
    }

    render() {
        return html`
                <div class="proxima">
                    <div>
                        ${idiomas[this.idioma].misConsultas.consulta}
                    </div>
                    <div style="text-align:right;text-decoration:underline;padding-right:.8rem">
                        ${idiomas[this.idioma].misConsultas.ingresar}
                    </div>
                </div>
           
                <div class="cuerpo">
                    <div class="cajas">
                        <div class="caja"  @click="${this.irAtenciones}">
                            <div>${HISTORIAL}</div>
                            <div class="cajaTexto">Ver historial de consultas</div>
                        </div>
                        <div class="caja" style="margin-right:.84rem" @click="${this.irAgenda}">
                            <div>${AGENDA}</div>
                            <div class="cajaTexto">Ver próximas consultas</div>
                        </div>
                    </div>
                    <div class="ayuda">
                        <div>
                            <div>
                            ${idiomas[this.idioma].misConsultas.footerTitulo1}
                            </div>
                            <div>
                            ${idiomas[this.idioma].misConsultas.footerTitulo2}
                            </div>
                        </div>

                        <div style="padding-left:.84rem;padding-right: .84rem;padding-bottom: .84rem;">
                            <button style="width: 100%;height:8vh" id="asistencia" btn1 >${idiomas[this.idioma].misConsultas.footerLeyenda}</button>
                        </div>
                    </div>
                </div>

        `
    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-misConsultas-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }
    }


    irAgenda(e) {
        //store.dispatch(goTo("agendas"))
        store.dispatch(getReservasDelDia("FechaAtencion ge 2020-01-07", {}))
    }
    irAtenciones() {
        store.dispatch(goTo("atencionesMascotas"))
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
window.customElements.define("pantalla-misconsulta", pantallaMisconsultas);