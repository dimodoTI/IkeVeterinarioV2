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
    button
} from "../css/button"
import {
    btnFlotanteRedondo
} from "../css/btnFlotanteRedondo"
import {
    idiomas
} from "../../redux/datos/idiomas";

import {
    MAS,
    ATRAS
} from "../../../assets/icons/icons"
import {
    footherMuestraTapa, headerMuestraTapa, showWarning
} from "../../redux/ui/actions"
import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";
import { grabarRespuesta as chatGrabarRespuesta }
    from "../../redux/chat/actions";

const CHAT_GRABAR_RESPUESTA = "chat.grabarRespuestaTimeStamp"
const CHAT_GRABAR_RESPUESTA_ERROR = "chat.grabarRespuestaErrorTimeStamp"
const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";

export class chatApp extends connect(store, CHAT_GRABAR_RESPUESTA, CHAT_GRABAR_RESPUESTA_ERROR, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.area = "body"
        this.hidden = false
        this.idioma = "ES"

        this.accion = ""
        this.chat = {
            id: 0,
            quien: "",
            texto: "",
            hora: "",
            fecha: ""
        }
        this.activo = false;
        this.chates = [];
        this.chatGrabar = null;
    }
    static get styles() {
        return css`
        ${button}
        ${btnFlotanteRedondo}
        :host{
            position: relative;
            display: grid;
            padding: 0  !important;
            background-color: var(--color-gris-fondo) !important;
            grid-template-rows: 100%;    
            overflow-x: hidden;
            overflow-y: auto;  
        }
        :host([hidden]){
            display: grid; 
        } 
        :host(:not([media-size="small"])[current="his_Chat"]) {
            grid-template-rows: 1fr 9fr;            
        }
        :host(:not([media-size="small"])[current="ate_Chat"]) {
            grid-template-rows: 1fr 9fr;            
        }
        #divTituloChat{
            display:none;
            align-content: center;
            width: 100%;
            height:5vh;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);  
            grid-template-columns: 1fr 9fr;
            align-items: center;
            grid-gap: .5rem;
        }
        :host(:not([media-size="small"])[current="his_Chat"]) #divTituloChat{
            display: grid;
        }
        :host(:not([media-size="small"])[current="ate_Chat"]) #divTituloChat{
            display: grid;
        }
        #divTituloChatImg{
            width: 4vh;
            height:4vh;
        }
        #divRegistros{
            display:grid;
            grid-gap: .2rem;
            height:100%;
            width:100%;
            background-color:var(--color-gris-fondo);
            overflow-x:none;
            overflow-y:auto;
        }

        #divChat{
            display: grid;
            flex-direction: column;
            grid-gap: .4rem;
            background-color:var(--color-gris-fondo);
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight); 
            overflow-x:none;
            overflow-y:auto;
            align-content: flex-start;
            padding: 0 .5rem 0 .5rem;
        }
        #divChat::-webkit-scrollbar {
            display: none;
        }
        #divEnviar{
            display:grid;
            width:100%;
            justify-self:center;
            grid-template-columns: 8fr 2fr;
            grid-gap:1rem;
            background-color:var(--color-gris-blanco);
            padding: .6rem 0 .1rem 0;
        }
        #divBotonTerminar{
            position:relative;
            display:grid;
            width:100%;
            padding: .2rem 0 .2rem 0;
        }
        #txtTexto{
            border-radius:.4rem;
            border: 1px solid var(--color-gris);
        }
        #chatCuerpo{
            display:grid;
            border-radius: .5rem;
            border: 1px solid var(--color-gris);
            grid-template-rows: 1rem auto 1rem;
            width:fit-content;
            height:fit-content;
            max-width:100vw;
        }
        .classCuerpoyo{
            justify-self:left;
            background-color: var(--color-blanco);
         }
        .classCuerpootro{
            justify-self:right;
            background-color: var(--color-celeste-claro);
        }
        #chatQuien{
            font-size: var(--font-label-size);
            font-weight: 900;
            padding: 0 .5rem 0 .5rem;
        }
        .classQuienyo{
            color: var(--color-azul);
            justify-self: left;
        }
        .classQuienotro{
            color: var(--color-rojo);
            justify-self: right;
        }
        #chatTexto{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
            color: var(--color-negro);
            align-self:center;
            padding: 0 .5rem 0 .5rem;
            word-wrap:break-word;
            max-width:80vw;
        }
        #chatHora{
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
            color: var(--color-gris-oscuro);
            align-self:flex-start;
            padding: 0 .5rem 0 .5rem;
        }
        .classHora{
            justify-self: right;
        }
        #divRespuesta{
             z-index:100;
             background-color:  var(--color-celeste-muy-claro);;
             position:absolute;
             display:none;
             grid-template-rows: 4fr 4fr 1fr;
             grid-gap:2vh;
             padding:1rem;
             top:10vh;
             height:50vh;
             left:5vw;
             right:5vw;
             border: solid 1px var(--color-gris-oscuro);
             border-radius: .5rem;
             box-shadow: var(--shadow-elevation-4-box);
        }
        #textoRespuesta{
            background-color:var(--color-blanco);
            color:var(--color-negro);
            padding:.5rem;
            font-size:var(--font-label-size);
            font-weight:bolder;
            border-radius: .5rem;
        }
        #nuevaRespuesta{
            padding:.5rem;
            font-family:var(--font-label-family);
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
            border-radius: .5rem;
        }
        #divRespuestaBotones{
            grid-gap:.3rem;
            display:grid;
            grid-template-columns:50% 50%;
        }
        #btnGrabar{
            height:7vh;
        }
        #btnCancelar{
            color:red;
            height:7vh;
        }   
        :host([current="his_Chat"]) #bfrDivMas{
            display: none;
        }
        :host([current="ate_Chat"]) #bfrDivMas{
            display: none;
        }
        `
    }

    render() {
        return html`
            <div id="divTituloChat">
                <div id="divTituloChatImg" @click=${this.atras}>
                    ${ATRAS}
                </div>
                <div id="divTituloChatTxt">
                    ${idiomas[this.idioma].chatApp.tituloChat}
                </div>
            </div>
            <div id=divRegistros>
                <div id="divChat">
                    ${this.chates.map(dato => html`
                        <div id="chatCuerpo" class="classCuerpo${dato.Tipo == 0 ? 'yo' : 'otro'}">   
                            <div id="chatQuien" class="classQuien${dato.Tipo == 0 ? 'yo' : 'otro'}">${dato.Tipo == 0 ? dato.Reserva.Mascota.Nombre : "Veterinario"}</div>
                            <div id="chatTexto">${dato.Texto}</div>
                            <div id="chatHora" class="classHora">${this.verFecha(dato.Fecha)}</div>
                        </div>
                    `)}
                </div>
            </div>
            <div id="bfrDivMas"  @click=${this.responder}>${MAS}</div>
            <div id="divRespuesta">    
                <label id="textoRespuesta"></label>
                <textarea id="nuevaRespuesta" placeholder="Escribí tu respuesta"></textarea>
                <div id="divRespuestaBotones">
                    <button id="btnGrabar" btn1 @click="${this.grabar}" >${idiomas[this.idioma].notificacionReserva.btnGrabar}</button>
                    <button  id="btnCancelar" btn3 @click="${this.cancelar}">${idiomas[this.idioma].notificacionReserva.btnCancelar}</button>
                </div>  
            </div>
        `
    }


    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = false
            this.current = state.screen.name
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-sol_Chat-his_Chat-ate_Chat-".indexOf("-" + state.screen.name + "-")
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas != -1) {
                this.chates = state.chat.entityChatReserva
            }
            this.update();
        }
        if (name == CHAT_GRABAR_RESPUESTA) {
            this.shadowRoot.querySelector("#divRespuesta").style.display = "none"
            store.dispatch(footherMuestraTapa(false))
            store.dispatch(headerMuestraTapa(false))
        }
        if (name == CHAT_GRABAR_RESPUESTA_ERROR) {
            store.dispatch(showWarning())
        }
    }

    firstUpdated(changedProperties) { }

    verFecha(f) {
        let d = new Date(f);
        return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + "    " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
    }
    scrollDiv() {
        const myElem = this.shadowRoot.getElementById("divChat")
        myElem.style.alignContent = "baseline"
        if (myElem.scrollHeight > myElem.offsetHeight) {
            myElem.style.alignContent = "stretch"
            const altoTotal = this.shadowRoot.getElementById("divChat").scrollHeight;
            this.shadowRoot.getElementById("divChat").scrollTop = altoTotal;
        } else {
            myElem.style.alignContent = "flex-end"
        }
        this.shadowRoot.getElementById("txtTexto").value = "";
    }
    clickDelete(e) {
        if (confirm('Delete')) {

        }
    }
    responder() {
        store.dispatch(footherMuestraTapa(true))
        store.dispatch(headerMuestraTapa(true))
        const chat = store.getState().chat.entityChatReserva[0]
        const textoRespuesta = this.shadowRoot.querySelector("#textoRespuesta")
        const divRespuesta = this.shadowRoot.querySelector("#divRespuesta")
        this.shadowRoot.querySelector("#nuevaRespuesta").value = ""
        divRespuesta.style.display = "grid"
        textoRespuesta.innerHTML = chat.Texto
        this.chatGrabar = {
            Chat: {
                Fecha: (new Date()).getFullYear() + "-" + (new Date()).getMonth() + "-" + (new Date()).getDate(),
                ReservaId: chat.ReservaId,
                UsuarioId: store.getState().cliente.datos.id,
                Texto: "",
                Leido: 0,
                Respondido: 0,
                Tipo: 1
            },
            PreguntaId: chat.Id
        }

        this.update()
    }
    grabar() {
        if (this.shadowRoot.querySelector("#nuevaRespuesta").value == "") {
            store.dispatch(showWarning("sol_Chat", 0))
        } else {
            if (this.chatGrabar) {
                this.chatGrabar.Chat.Texto = this.shadowRoot.querySelector("#nuevaRespuesta").value
                store.dispatch(chatGrabarRespuesta(this.chatGrabar, store.getState().cliente.datos.token))
            }
        }
    }
    cancelar() {
        store.dispatch(footherMuestraTapa(false))
        store.dispatch(headerMuestraTapa(false))
        this.shadowRoot.querySelector("#divRespuesta").style.display = "none"
    }
    atras() {
        if (store.getState().screen.name.indexOf("his_") == 0) {
            store.dispatch(goTo("his_Agendas"))
        }
        if (store.getState().screen.name.indexOf("ate_") == 0) {
            store.dispatch(goTo("ate_listaReservas"))
        }

    }
    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            },
            hidden: {
                type: Boolean,
                reflect: true
            },
            area: {
                type: String
            },
            current: {
                type: String,
                reflect: true
            }
        }
    }
}

window.customElements.define("chat-app", chatApp);