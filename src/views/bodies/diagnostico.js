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
import { agendaAtencionSeleccionada, getAgenda as getReservasAgenda } from "../../redux/reservas/actions";
import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";
import { showWarning } from "../../redux/ui/actions";
import {
    delVeterinario, upload,
    borrarAdjunto
} from "../../redux/adjuntos/actions"

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
const ATENCIONES_ADDTIMESTAMP = "atenciones.addTimeStamp"
const ATENCIONES_ERROROTROSTIMESTAMP = "atenciones.commandErrorTimeStamp"
const RESERVAS_NUEVAATENCIONDESDEVIDEO = "reservas.agendaNuevaAtencionDesdeVideo"
const ADJUNTOS_TIMESTAMP = "adjuntos.delVeterinarioTimeStamp"

export class diagnosticoComponente extends connect(store, ADJUNTOS_TIMESTAMP, MEDIA_CHANGE, SCREEN, RESERVAS_NUEVAATENCIONDESDEVIDEO, ATENCIONES_ADDTIMESTAMP, ATENCIONES_ERROROTROSTIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.idioma = "ES"
        this.area = "diagnosticos"
        this.hidden = false;
        this.atencionCompleta = {}
        this.reservaEnCurso = {}
        this.archivo = []
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
                ${idiomas[this.idioma].ate_diagnosticos.tituloDetalle}
            </div>
            <div id="divDiagnostico">
                <textarea id="txtDiagnostico" rows="8"  @input=${this.activar}></textarea>
            </div>
            <div id="divRecetas">
                ${this.archivo.map(dato => html`
                    <div id="ciDivEtiqueta">
                        <div id="ciDivContenido">
                            <div id="ciDivIcomo" .link="${dato.Url}"  @click=${this.irA}>${ARCHIVO}</div>
                            <div id="ciDivNombre" .link="${dato.Url}"  @click=${this.irA}>${dato.Nombre}</div>
                        </div>
                        <div id="ciDivDelete" .item="${dato}" @click="${this.borrarAdjunto}">${TRASH}</div>
                    </div>
                `)} 
            </div>
            <!-- <div id="divAdjuntar">
                <button id="btnAdjuntar" class="btn" btn3 >${idiomas[this.idioma].ate_diagnosticos.btnAdjuntar}</button>
            </div> -->
            <div id="divBtn">
                <button id="btnAceptar" class="btn" apagado btn1 @click=${this.clickAceptar}>${idiomas[this.idioma].ate_diagnosticos.btnAceptar}</button>
                <form id="form" name="form" action="/uploader" enctype="multipart/form-data" method="POST" style="justify-self: center;">
                    <input id="files" name="files" type="file" size="1" style="display:none" @change="${this.uploadFiles}" />
                    <button type="button" class="btn" id="btnAdjuntar" btn1 @click=${this.adjuntar}>
                        ${idiomas[this.idioma].ate_diagnosticos.btnAdjuntar}
                    </button>
                </form>  
                <button id="btnCancelar" class="btn" btn3  @click=${this.clickCancelar}>${idiomas[this.idioma].ate_diagnosticos.btnCancelar}</button>
            </div>
        `
    }
    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            if (state.screen.name == "ate_diagnosticos" || state.screen.name == "ate_videos") {
                store.dispatch(delVeterinario(this.reservaEnCurso.ReservaId, store.getState().cliente.datos.token))
            }
            this.update();
        }
        // if (state.screen.name == "ate_videos") {
        //     store.dispatch(delVeterinario(this.reservaEnCurso.ReservaId, store.getState().cliente.datos.token))
        // }
        if (name == RESERVAS_NUEVAATENCIONDESDEVIDEO) {
            this.reservaEnCurso = state.reservas.entitiesAgendaNuevaAtencionDesdeVideo
        }
        if (name == ATENCIONES_ADDTIMESTAMP && state.screen.name == "ate_diagnosticos") {
            store.dispatch(agendaAtencionSeleccionada(this.atencionCompleta))
            store.dispatch(getReservasAgenda(store.getState().cliente.datos.token, null))
            this.shadowRoot.querySelector("#txtDiagnostico").value = ""
            if (this.mediaSize == "small") {
                store.dispatch(goTo("ate_diagnosticosDetalle"))
            } else {
                store.dispatch(goTo("ate_agendas"))
            }
        }
        if (name == ATENCIONES_ERROROTROSTIMESTAMP && state.screen.name == "ate_diagnosticos") {
            store.dispatch(showWarning(store.getState().screen.name, 0))
        }
        if (name == ADJUNTOS_TIMESTAMP) {
            this.archivo = state.adjuntos.entitityDelVeterinario ? state.adjuntos.entitityDelVeterinario : []
            this.update()
        }
    }

    irA(e) {
        if (e.currentTarget.link) {
            window.open(e.currentTarget.link)
        }
    }
    borrarAdjunto(e) {
        const id = e.currentTarget.item.Id
        let datosPatch = [{
            "op": "replace",
            "path": "/Activo",
            "value": false
        }]
        store.dispatch(borrarAdjunto(id, datosPatch, store.getState().cliente.datos.token))
    }
    adjuntar(e) {
        this.shadowRoot.querySelector("#files").click()
    }
    uploadFiles() {
        var input = this.shadowRoot.querySelector("#files");
        var files = input.files;
        var formData = new FormData();
        for (var i = 0; i != files.length; i++) {
            formData.append("files", files[i]);
        }
        formData.append("ReservaId", this.reservaEnCurso.ReservaId)
        store.dispatch(upload(this.reservaEnCurso.ReservaId, formData, store.getState().cliente.datos.token))
    }
    activar() {
        this.activo = true
        const txtDiag = this.shadowRoot.querySelector("#txtDiagnostico")
        if (txtDiag.value.length < 1) {
            this.activo = false
        }
        if (this.activo) {
            this.shadowRoot.querySelector("#btnAceptar").removeAttribute("apagado")
        } else {
            this.shadowRoot.querySelector("#btnAceptar").setAttribute("apagado", "")
        }
        this.update()
    }
    firstUpdated(changedProperties) {
    }
    clickCancelar() {
        store.dispatch(goTo("ate_agendas"))
    }
    clickAceptar() {
        let Diagnostico = this.shadowRoot.querySelector("#txtDiagnostico").value
        if (Diagnostico == "") {
            store.dispatch(showWarning("ate_diagnosticos", 0))
        } else {
            store.dispatch(goTo("ate_diagnosticos"))
            let d = new Date()
            let h = (d.getHours() * 100) + d.getMinutes()
            // if (state.reservas.entitiesAgendaNuevaAtencionDesdeVideo) {
            //     this.reservaEnCurso = state.reservas.entitiesAgendaNuevaAtencionDesdeVideo
            // }
            let res = this.reservaEnCurso
            var arrAdj = []
            if (res.Adjuntos.length > 0) {
                res.Adjuntos.forEach(function (p) {
                    if (p.Perfil == "Cliente" || p.Perfil == "cliente mascota") {
                        arrAdj.push(p)
                    }
                })
            }
            if (this.archivo.length > 0) {
                this.archivo.forEach(function (p) {
                    let adj = { Id: p.Id, Nombre: p.Nombre, Perfil: p.Perfil, Url: p.Url, Activo: true }
                    arrAdj.push(adj)
                })
            }
            this.atencionCompleta = {
                ReservaId: res.ReservaId,
                FechaReserva: res.FechaReserva,
                HoraReserva: res.HoraReserva,
                MascotaId: res.MascotaId,
                MascotaNombre: res.MascotaNombre,
                Motivo: res.Motivo,
                AtencionId: 0,
                VeterinarioId: res.VeterinarioId,
                Veterinario: res.Veterinario,
                Diagnostico: this.shadowRoot.querySelector("#txtDiagnostico").value,
                InicioAtencion: res.InicioAtencion,
                FinAtencion: d,
                Adjuntos: arrAdj
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
            }
        }
    }
}

window.customElements.define("diagnostico-componente", diagnosticoComponente);