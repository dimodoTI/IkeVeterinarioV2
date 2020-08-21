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
    ATRAS
} from "../../../assets/icons/icons";
import {
    idiomas
} from "../../redux/datos/idiomas"
import {
    ARCHIVO
} from "../../../assets/icons/icons"

import {
    cardArchivo
} from "../css/cardArchivo"
import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
const PUESTO_TIMESTAMP = "puesto.timeStamp"
const MODO_PANTALLA = "ui.timeStampPantalla"
const RESERVAS_AGENDAATENCIONSELECCIONADA = "reservas.agendaAtencionSeleccionada"

export class diagnosticoDetalleComponente extends connect(store, MEDIA_CHANGE, SCREEN, PUESTO_TIMESTAMP, MODO_PANTALLA, RESERVAS_AGENDAATENCIONSELECCIONADA)(LitElement) {
    constructor() {
        super();
        this.idioma = "ES"
        this.area = "body"
        this.hidden = true;
        this.reservas = null
        this.atencionEnCurso = []
        this.archivo = [{
            nombre: "Documento.jpg"
        },
        {
            nombre: "Estudio.pdf"
        },
        {
            nombre: "Estudio.pdf"
        },
        {
            nombre: "Estudio.pdf"
        },
        {
            nombre: "Estudio.pdf"
        },
        {
            nombre: "Estudio.pdf"
        },
        {
            nombre: "Estudio.pdf"
        }
        ]
    }

    static get styles() {
        return css`
        ${cardArchivo}

        :host{
            display: grid;
            position: relative;
            background-color: var(--color-gris-fondo) !important;
            overflow-x:none;
            overflow-y:auto;
        }
        :host([hidden]){
            display: none; 
        }
        :host::-webkit-scrollbar {
            display: none;
        }
        #divTituloAtencion{
            display:grid;
            align-content: center;
            width: 100%;
            height:5vh;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);  
            grid-template-columns: 100%;
            align-items: center;
            grid-gap: .5rem;
        }
        :host(:not([media-size="small"])) #divTituloAtencion{
            grid-template-columns: 10% 90%;
        }
        :host([media-size="small"]) #divTituloAtencion{
            display: none;
        }
        #divAtencion{
            display:grid;
            padding: .5rem 1rem .5rem 1rem;
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
            background-color: transparent;
            grid-gap: .2rem;
            border-radius: .4rem;            
        }
        #lblDiagnostico{
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);   
        }
        #txtDiagnostico{
            font-family:var(--font-label-family);
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
        }
        #divRecetas{
            display:grid;
            height: fit-content;
            grid-gap:1vh;
            overflow-x:none;
            overflow-y:auto;
            margin : 1vh 0 1vh 0;
            align-content: baseline;
        }
        #divRecetas::-webkit-scrollbar {
            display: none;
        }
        #divTituloConsulta{
            display:grid;
            align-content: center;
            width: 100%;
            height:5vh;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);   
        }
        #divDetalle{
            display:grid;
            padding: .5rem 1rem .5rem 1rem;
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
            background-color: transparent;
            grid-gap: .2rem;
            border-radius: .4rem;
        }
        `
    }

    render() {
        return html`

            <div id="divTituloAtencion">
                <div id="divTituloAtencionImg" @click=${this.atras}>
                    ${ATRAS}
                </div>
                <div id="divTituloAtencionTxt">
                    ${idiomas[this.idioma].diagnosticosDetalle.tituloAtencion}
                </div>
            </div>
            <div id="divAtencion">
                <label id="lblVeterinario">${idiomas[this.idioma].diagnosticosDetalle.veterinario + " " + this.verVeterinario()}</label>
                <label id="lblComienzo">${idiomas[this.idioma].diagnosticosDetalle.lblComienzo + " " + this.comenzo()}</label>
                <label id="lblFinal">${idiomas[this.idioma].diagnosticosDetalle.lblFinal + " " + this.termino()}</label>
                <label  id="lblDiagnostico">${idiomas[this.idioma].diagnosticosDetalle.lblDiagnostico}</label>
                <textarea id="txtDiagnostico" rows="8" readonly>${this.atencionEnCurso.Diagnostico}</textarea>
                <div id="divRecetas">
                    ${this.archivo.map(dato => html`
                        <div id="ciDivEtiqueta">
                            <div id="ciDivContenido" style="grid-column-start:1;grid-column-end:3">
                                <div id="ciDivIcomo">${ARCHIVO}</div>
                                <div id="ciDivNombre">${dato.nombre}</div>
                            </div>
                        </div>
                    `)} 
                    
                </div>            
            </div>

            <div id="divTituloConsulta">
                ${idiomas[this.idioma].diagnosticosDetalle.tituloconsulta}
            </div>
            <div id="divDetalle">
                <label id="lblExpediente">${idiomas[this.idioma].diagnosticosDetalle.expediente + " " + this.atencionEnCurso.ReservaId}</label>
                <label id="lblPaciente">${idiomas[this.idioma].diagnosticosDetalle.paciente + " " + this.atencionEnCurso.MascotaNombre}</label>           
                <label id="lblMotivo">${idiomas[this.idioma].diagnosticosDetalle.motivo + " " + this.atencionEnCurso.Motivo}</label>           
                <label id="lblFecha">${idiomas[this.idioma].diagnosticosDetalle.fecha + " " + this.verFecha()}</label>           
                <label id="lblHora">${idiomas[this.idioma].diagnosticosDetalle.hora + " " + this.verHora()}</label>
                <div style="padding-top:.5rem;display:grid;grid-gap:.5rem">
                    ${this.archivo.map(dato => html`
                        <div id="ciDivEtiqueta">
                            <div id="ciDivContenido" style="grid-column-start:1;grid-column-end:3">
                                <div id="ciDivIcomo">${ARCHIVO}</div>
                                <div id="ciDivNombre">${dato.nombre}</div>
                            </div>
                        </div>
                    `)}
                </div>
            </div >
        `
    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            if (state.reservas.entitiesAgendaAtencionSeleccionada) {
                this.atencionEnCurso = state.reservas.entitiesAgendaAtencionSeleccionada;
            }
            this.update();
        }
        // if (name == RESERVAS_AGENDAATENCIONSELECCIONADA) {
        //     if (state.reservas.entitiesAgendaAtencionSeleccionada) {
        //         this.atencionEnCurso = state.reservas.entitiesAgendaAtencionSeleccionada;
        //         this.update()
        //     }
        // }
    }
    comenzo() {
        var ret = ""
        if (this.atencionEnCurso.InicioAtencion) {
            let d = new Date(this.atencionEnCurso.InicioAtencion);
            ret = d.getUTCDate() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCFullYear();
            ret = ret + "  -  " + d.getHours() + ":" + d.getMinutes();
        }
        return ret
    }
    termino() {
        var ret = ""
        if (this.atencionEnCurso.FinAtencion) {
            let d = new Date(this.atencionEnCurso.FinAtencion);
            ret = d.getUTCDate() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCFullYear();
            ret = ret + "  -  " + d.getHours() + ":" + d.getMinutes();
        }
        return ret
    }
    verFecha() {
        let d = new Date(this.atencionEnCurso.FechaReserva)
        return d.getUTCDate() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCFullYear()
    }
    verHora() {
        return this.atencionEnCurso.HoraReserva
    }
    verVeterinario() {
        var ret = ""
        if (this.atencionEnCurso.Veterinario) {
            ret = this.atencionEnCurso.Veterinario
        }
        return ret
    }
    atras() {
        if (store.getState().screen.name.indexOf("his_") == 0) {
            store.dispatch(goTo("his_Agendas"))
        }
        if (store.getState().screen.name.indexOf("ate_") == 0) {

            store.dispatch(goTo("ate_listaReservas"))
        }
        if (store.getState().screen.name.indexOf("sol_diagnosticodetalle") == 0) {
            store.dispatch(goTo("notificacionReserva"))
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
window.customElements.define("diagnostico-detalle-componente", diagnosticoDetalleComponente);