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
    idiomas
} from "../../redux/datos/idiomas"
import { ARCHIVO, TRASH } from "../../../assets/icons/icons";
import { cardArchivo } from "../css/cardArchivo"

import { add as addAtenciones } from "../../redux/atenciones/actions";
import { agendaAtencionSeleccionada } from "../../redux/reservas/actions";
import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
const ATENCIONES_ADDTIMESTAMP = "atenciones.addTimeStamp"
const ATENCIONES_ERROROTROSTIMESTAMP = "atenciones.commandErrorTimeStamp"
const RESERVAS_NUEVAATENCIONDESDEVIDEO = "reservas.agendaNuevaAtencionDesdeVideo"

export class diagnosticoComponente extends connect(store, MEDIA_CHANGE, SCREEN, RESERVAS_NUEVAATENCIONDESDEVIDEO, ATENCIONES_ADDTIMESTAMP, ATENCIONES_ERROROTROSTIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.idioma = "ES"
        this.area = "body"
        this.hidden = false;
        this.atencionCompleta = {}
        this.reservaEnCurso = {}
        this.archivo = [{ nombre: "Documento.jpg" },
        { nombre: "Estudio.pdf" },
        { nombre: "Estudio.pdf" },
        { nombre: "Estudio.pdf" },
        { nombre: "Estudio.pdf" },
        { nombre: "Estudio.pdf" },
        { nombre: "Estudio.pdf" }]
    }

    static get styles() {
        return css`
        ${button}
        ${cardArchivo}
        :host{
            display: grid;
            position: relative;
            background-color: var(--color-gris-fondo) !important;
            grid-template-rows: 8% 36% 42% 14%;
            overflow-x:none;
            overflow-y:auto;
        }
        :host([hidden]){
            display: none; 
        }
        :host::-webkit-scrollbar {
            display: none;
        }
        #divTitulo{
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
            align-self:center;
        }
        #txtDiagnostico{
            width: 100%;
            height:95%;
            font-family:var(--font-label-family);
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
        }
        #divRecetas{
            display:grid;
            position:relative;
            grid-gap:2vh;
            overflow-x:none;
            overflow-y:auto;
            margin : 1vh 0 1vh 0;
            align-content: baseline;
        }
        #divRecetas::-webkit-scrollbar {
            display: none;
        }
        #divAdjuntar{
            align-self:center;
        }
        #divBtn{
            display:grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 1rem;
            align-self:center;
        }
        .btn{
            width: 100%;
            max-height: 1.5rem;
            min-height: 5vh;
         }
        #btnCancelar{
            color:var(--color-rojo);
        }
        `
    }


    render() {
        return html`
            <div id="divTitulo">
                ${idiomas[this.idioma].diagnosticos.tituloDetalle}
            </div>
            <div id="divDiagnostico">
                <textarea id="txtDiagnostico" rows="8" ></textarea>
            </div>
            <div id="divRecetas">
                ${this.archivo.map(dato => html`
                    <div id="ciDivEtiqueta">
                        <div id="ciDivContenido">
                            <div id="ciDivIcomo">${ARCHIVO}</div>
                            <div id="ciDivNombre">${dato.nombre}</div>
                        </div>
                        <div id="ciDivDelete">${TRASH}</div>
                    </div>
                `)} 
            </div>
            <!-- <div id="divAdjuntar">
                <button id="btnAdjuntar" class="btn" btn3 >${idiomas[this.idioma].diagnosticos.btnAdjuntar}</button>
            </div> -->
            <div id="divBtn">
                <button id="btnAceptar" class="btn" btn1 @click=${this.clickAceptar}>${idiomas[this.idioma].diagnosticos.btnAceptar}</button>
                <button id="btnAdjuntar" class="btn" btn1 >${idiomas[this.idioma].diagnosticos.btnAdjuntar}</button>
                <button id="btnCancelar" class="btn" btn3  @click=${this.clickCancelar}>${idiomas[this.idioma].diagnosticos.btnCancelar}</button>
            </div>
        `
    }
    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-diagnosticos-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }
        if (name == RESERVAS_NUEVAATENCIONDESDEVIDEO) {
            this.reservaEnCurso = store.getState().reservas.entitiesAgendaNuevaAtencionDesdeVideo
        }
        if (name == ATENCIONES_ADDTIMESTAMP) {
            if (this.shadowRoot.querySelector("#txtDiagnostico")) this.shadowRoot.querySelector("#txtDiagnostico").value = ""
            store.dispatch(agendaAtencionSeleccionada(this.atencionCompleta))
            store.dispatch(goTo("diagnosticosDetalle"))
            // if (this.mediaSize == "small") {
            // } else {
            //     store.dispatch(goTo("agendas"))
            // }
        }
    }
    clickCancelar() {
        store.dispatch(goTo("agendas"))
    }
    clickAceptar() {
        let res = this.reservaEnCurso
        let d = new Date()
        let h = (d.getHours() * 100) + d.getMinutes()
        this.atencionCompleta = {
            ReservaId: res.ReservaId,
            FechaReserva: res.FechaReserva,
            HoraReserva: res.HoraReserva,
            MascotaId: res.MascotaId,
            MascotaNombre: res.MascotaNombre,
            Motivo: res.Motivo,
            AtencionId: 0,
            VeterinarioId: res.VeterinarioId,
            Diagnostico: this.shadowRoot.querySelector("#txtDiagnostico").value,
            InicioAtencion: res.InicioAtencion,
            FinAtencion: d
        }
        let addAte = {
            ReservaId: res.ReservaId,
            VeterinarioId: store.getState().cliente.datos.id,
            InicioAtencion: res.InicioAtencion,
            FinAtencion: d,
            Diagnostico: this.shadowRoot.querySelector("#txtDiagnostico").value,
            Observaciones: "",
            Estado: 0,
            Calificacion: 0,
            ComentarioCalificacion: "",
            Activo: true
        }
        res.Diagnostico = addAte.Diagnostico
        store.dispatch(addAtenciones(addAte, store.getState().cliente.datos.token))
        this.shadowRoot.querySelector("#txtDiagnostico").value = ""
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

window.customElements.define("diagnostico-componente", diagnosticoComponente);