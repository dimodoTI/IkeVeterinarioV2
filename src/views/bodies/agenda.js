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
    VIDEO,
    REFRESH,
    ARCHIVO
} from "../../../assets/icons/icons"

import {
    get as getPuesto
} from "../../redux/puestos/actions";
import {
    getAgenda as getReservasAgenda,
    agendaNuevaAtencionDesdeVideo,
    agendaAtencionSeleccionada,
    getAtencionDeUnaMascota as getReservasAndAtencionesDeUnaMascota
} from "../../redux/reservas/actions";
import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";
import { showWarning } from "../../redux/ui/actions";

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
const PUESTO_TIMESTAMP = "puestos.timeStamp"
const RESERVASAGENDA_TIMESTAMP = "reservas.timeStampAgenda"
const RESERVASATENCIONSELECCIONADA_TIMESTAMP = "reservas.agendaAtencionSeleccionada"
const RESERVASATENCIONESDEUNAMASCOTA_TIMESTAMP = "reservas.timeStampAtencionDeUnaMascota"
const RESERVAS_ERRORGET_TIMESTAMP = "reservas.errorTimeStamp"
const RESERVAS_ERROROTROS_TIMESTAMP = "reservas.commandErrorTimeStamp"

export class pantallaAgenda extends connect(store, MEDIA_CHANGE, SCREEN, PUESTO_TIMESTAMP, RESERVASAGENDA_TIMESTAMP, RESERVASATENCIONSELECCIONADA_TIMESTAMP, RESERVASATENCIONESDEUNAMASCOTA_TIMESTAMP, RESERVAS_ERRORGET_TIMESTAMP, RESERVAS_ERROROTROS_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.area = "body"
        this.idioma = "ES"
        this.puestoSeleccionado = -1
        this.puestos = []
        this.reservas = []
        this.videoOAtencion = false
        this.videoYAtencion = false
        this.soloAtencion = false
        this.clickVideoOAtencion = "atencion"
    }

    static get styles() {
        return css`
        :host{
            position: relative;
            display: grid;
            padding: 0  !important;
            background-color: var(--color-gris-fondo) !important;
            grid-template-rows: 12% 88%;    
            overflow-x: hidden;
            overflow-y: auto;         
        }
        :host::-webkit-scrollbar {
            display: none;
        }
        #seleccionPuesto{
            display:grid;
            grid-template-columns: 9fr 1fr;          
            background-color:var(--color-celeste-muy-claro);
        }
        #divPuestoSelect{
            display:grid;
            height:100%;
            align-content: center;
            padding:0 .5rem 0 1rem;
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
            align-self:stretch;
        }
        #selectPuesto{
            width:100%;
            height:4vh;
            border: 1px solid var(--color-gris);
            cursor:default;
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
        }
        #divRefresh{
            align-self: center;
            cursor: pointer;
        }
        #divRefresh svg{
            height:1.5rem;
            width: 1.5rem;
        }
        .contenedorLista{
            display:grid;
            position:relative;
            background-color:transparent;
            grid-template-rows: 6% 94%;            
            padding-top:.84rem;
        }
        .tituloLista{
            padding-left:0.84rem;
            color:var(--color-azul-oscuro);
            font-size:var(--font-header-h2-size);
            font-weight:var(--font-header-h2-weight);
            text-justify:left;
            background-color:transparent;
            display:flex;
            padding-bottom:.84rem;       
        }
        .grillaLista{
            display:grid;
            overflow-x:none;
            overflow-y:auto;
            align-content: flex-start;
        }
        .grillaLista::-webkit-scrollbar {
            display: none;
        }
        .row{
            display:grid;
            grid-auto-flow:column;
            grid-template-columns:1fr 5fr;
            color:var(--color-azul-oscuro);
            padding-bottom:.42rem;
            width:90%;
            height:12vh;
            padding-left:1.2rem;
        }
        .row .fecha{
            display:grid;
            grid-auto-flow:row;
            grid-template-rows:2fr ;
            align-self:center;
            background-color:transparent;
            padding-right:.42rem;
            justify-items:center;
        }

        .row .nroDia{
            font-size:var(--font-header-h1-size);
            font-weight:var(--font-header-h1-weight);
        }

        .row .dow {
            font-weight:var(--font-label-weight);
            font-size:var(--font-label-size);
        }

        .row .agenda{
            display:grid;
            grid-template-rows:1f 1f;
            background-color:var(--color-celeste-muy-claro);
            border: 1px solid var(-color-celeste-claro);
            padding-left:.42rem;
            width:100%;
            border-radius:.3rem;
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
        }

        .row .paciente{
            display:grid;
            grid-template-columns:auto 1fr 

        }
        #footer{
            grid-area: Pie; 
            display:grid;
            overflow-x: none; 
        }

        #divVideo{
            display:grid;
            grid-template-columns: 90% 10%;
        }
        :host([video-y-atencion]) #divVideo{
            grid-template-columns: 60% 40%;
        }
        :host([video-o-atencion]) #divBotonesVideoOAtencion{
            display:grid;
        }
        :host(:not([video-o-atencion])) #divBotonesVideoOAtencion{
            display: none;
        }
        :host([video-y-atencion]) #divBotonesVideoYAtencion{
            grid-template-columns: 50% 50%;
            display:grid;
        }
        :host(:not([video-y-atencion])) #divBotonesVideoYAtencion{
            display: none;
        }   
        :host([solo-atencion]) #divBotonesSoloAtencion{
            display:grid;
        }
        :host(:not([solo-atencion])) #divBotonesSoloAtencion{
            display: none;
        }      
        #divImgVideo, #divImgAtencion{
            align-self:center;
            justify-self:center;
            cursor:pointer;
            z-index:10;
        }
        :host(:not([media-size="small"])) #divImgVideo{
            justify-self:flex-end;
        }
        :host(:not([media-size="small"])) #divImgAtencion{
            justify-self:flex-end;
        }
        #divImgVideo svg{
            height:1.5rem;
            width: 1.5rem;
        }

        .NO{
            display:none;
        }
        .NOVIDEO{
            grid-column-start:1;
            grid-column-end:3;
            justify-content:right;
        }
        #divImgAtencion svg{
            height:1.5rem;
            width: 1.5rem;
        }


        `
    }

    render() {
        return html`
            <div id="seleccionPuesto">
                <div id="divPuestoSelect"> 
                    <label class="labelPuesto">${idiomas[this.idioma].agendas.lblFiltro}</label>
                    <select id="selectPuesto" @change=${this.clickFiltrarPuesto}>          
                        ${this.puestos.map(dato => html`
                            <option value="${dato.Id}" .selected="${this.puestoSeleccionado == dato.Id}">${dato.Descripcion}</option>                               
                        `)} 
                    </select>
                </div>
                <div id="divRefresh"  @click=${this.clickRefresh}>
                    ${REFRESH}
                </div>
            </div>
            <div class="contenedorLista">
                <div id="TituloDeLaLista" class="tituloLista">
                </div>
                <div class="grillaLista">
                    ${!this.reservas ? "" : this.reservas.filter(item => { return item.Tramo.PuestoId == this.puestoSeleccionado }).map((item) => {
            return html` 
                    <div class="row" .item=${item} >
                        <div class="fecha">
                            <div class="dow">${this.queMes(item.FechaAtencion)}</div>
                            <div class="nroDia">${this.nroDia(item.FechaAtencion)}</div>
                            <div class="dow">${this.dow(item.FechaAtencion)}</div>
                        </div>
                        <div class="agenda" @click=${this.editar}>
                            <div id="divVideo">
                                <div style="align-self:center;">${this.queHora(item.HoraAtencion) + " hs"}</div>
                                <div id = "divBotonesVideoOAtencion" >
                                    <div id = "divImgVideo" class =${item.Atencion ? "NO" : ""} .item=${item} @click="${this.clickVideo}">${VIDEO}</div>
                                    <div id = "divImgAtencion" class=${!item.Atencion ? "NO" : ""} .item=${item} @click="${this.clickAtencion}">${ARCHIVO}</div>
                                </div>
                                <div id="divBotonesVideoYAtencion">
                                    <div id="divImgVideo" class=${item.Atencion ? "NO" : ""} .item=${item} @click="${this.clickVideo}">${VIDEO}</div> 
                                    <div id="divImgAtencion" class=${item.Atencion ? "NOVIDEO" : ""} .item=${item} @click="${this.clickAtencion}">${ARCHIVO}</div>
                                </div>
                                <div id="divBotonesSoloAtencion" >
                                    <div id="divImgAtencion" .item=${item} @click="${this.clickAtencion}">${ARCHIVO}</div> 
                                </div> 
                            </div> 
                            <div class = "paciente">
                                <div style = "padding-right:.7rem">${item.Mascota.Nombre}</div> 
                                <div> ${" - " + item.Motivo}</div> 
                            </div>
                        </div> 
                    </div>`})}
                </div>
            </div>
        
        `
    }


    nroDia(fecha) {
        let d = new Date(fecha).getUTCDate()
        return ("0" + d).substr(-2)
    }
    dow(fecha) {
        let d = new Date(fecha);
        let dia = d.getUTCDay()
        return idiomas[this.idioma].diasCorto[dia]
    }
    queHora(hora) {
        let miHora = ("0" + hora).substr(-4, 2)
        let miMin = hora.toString().substr(-2)
        return miHora + ":" + miMin
    }
    queMes(fecha) {
        let d = new Date(fecha);
        let mes = d.getUTCMonth()
        return idiomas[this.idioma].mesCorto[mes]
    }
    editar(e) {
        //e.currentTarget.style.backgroundColor = "#ffffff";
        return true
    }
    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            if (state.screen.name == "agendas" || state.screen.name == "his_Agendas") {
                this.shadowRoot.querySelector("#TituloDeLaLista").innerHTML = idiomas[this.idioma][store.getState().screen.name].tituloLista
                this.videoOAtencion = false
                this.videoYAtencion = false
                this.soloAtencion = false
                switch (state.screen.name) {
                    case "agendas":
                        if (this.mediaSize == "small") {
                            this.videoOAtencion = true
                        } else {
                            this.videoYAtencion = true
                        }
                        break
                    case "his_Agendas":
                        this.soloAtencion = true
                        break
                }
                this.update();
            }
        }
        /////////// carga de datos
        if (name == RESERVASAGENDA_TIMESTAMP) {
            this.reservas = state.reservas.entitiesAgenda ? state.reservas.entitiesAgenda : []
            this.update()
        }
        if (name == PUESTO_TIMESTAMP) {
            this.puestos = state.puestos.entities ? state.puestos.entities : []
            if (this.puestoSeleccionado == -1) { this.puestoSeleccionado = state.puestos.entities[0].Id }
            this.update()
        }
        ////////// acciones 
        if (name == RESERVASATENCIONESDEUNAMASCOTA_TIMESTAMP && (state.screen.name == "agendas" || state.screen.name == "his_Agendas" || state.screen.name == "diagnosticosDetalle")) {
            if (this.videoYAtencion) {
                if (this.clickVideoOAtencion == "atencion") {
                    store.dispatch(goTo("listaReservas"))
                } else {
                    store.dispatch(goTo("videos"))
                }
            }
            if (this.videoOAtencion) {
                if (this.clickVideoOAtencion == "atencion") {
                    store.dispatch(goTo("diagnosticosDetalle"))
                } else {
                    store.dispatch(goTo("videos"))
                }
            }
            if (this.soloAtencion) {
                store.dispatch(goTo("his_ListaReservas"))
            }
        }
        if (name == RESERVASATENCIONSELECCIONADA_TIMESTAMP && state.screen.name == "agendas") {
            store.dispatch(goTo("diagnosticosDetalle"))
        }
        if (name == RESERVAS_ERRORGET_TIMESTAMP && (state.screen.name == "agendas" || state.screen.name == "his_Agendas")) {
            store.dispatch(showWarning(store.getState().screen.name, 0))
        }
    }
    clickVideo(e) {
        this.clickVideoOAtencion = "video"
        store.dispatch(goTo("agendas"))

        let arr = e.currentTarget.item;
        var d = new Date()
        if (store.getState().reservas.entitiesAgendaNuevaAtencionDesdeVideo) {
            if (store.getState().reservas.entitiesAgendaNuevaAtencionDesdeVideo.ReservaId == arr.Id) {
                d = store.getState().reservas.entitiesAgendaNuevaAtencionDesdeVideo.InicioAtencion
            }
        }
        let myJson = {
            ReservaId: arr.Id,
            FechaReserva: arr.FechaAtencion,
            HoraReserva: ("0" + arr.HoraAtencion).toString().substr(-4, 2) + ":" + arr.HoraAtencion.toString().substr(-2),
            MascotaId: arr.MascotaId,
            MascotaNombre: arr.Mascota.Nombre,
            Motivo: arr.Motivo,
            VeterinarioId: store.getState().cliente.datos.id,
            Veterinario: store.getState().cliente.datos.apellido + " " + store.getState().cliente.datos.nombre,
            InicioAtencion: d
        }
        store.dispatch(agendaNuevaAtencionDesdeVideo(myJson))
        if (this.videoOAtencion) {
            store.dispatch(goTo("videos"))
        }
        if (this.videoYAtencion) {
            let arr = e.currentTarget.item;
            let filtroPorMascota = "MascotaId eq " + arr.MascotaId
            store.dispatch(getReservasAndAtencionesDeUnaMascota(store.getState().cliente.datos.token, filtroPorMascota))
            //store.dispatch(goTo("videos"))
        }
    }
    clickAtencion(e) {
        this.clickVideoOAtencion = "atencion"
        if (store.getState().screen.name.indexOf("his_") == -1) {
            store.dispatch(goTo("agendas"))
        } else {
            store.dispatch(goTo("his_Agendas"))
        }
        if (this.videoOAtencion || this.videoYAtencion) {
            let myJson = this.jsonAtencion(e.currentTarget.item)
            store.dispatch(agendaAtencionSeleccionada(myJson))
        }

        let arr = e.currentTarget.item;
        let filtroPorMascota = "MascotaId eq " + arr.MascotaId
        store.dispatch(getReservasAndAtencionesDeUnaMascota(store.getState().cliente.datos.token, filtroPorMascota))

    }
    jsonAtencion(arr) {
        var vetNombre = ""
        if (arr.Atencion) {
            if (arr.Atencion.Veterinario) {
                vetNombre = arr.Atencion.Veterinario.Apellido + " " + arr.Atencion.Veterinario.Nombre
            }
        }
        let myJson = {
            ReservaId: arr.Id,
            FechaReserva: arr.FechaAtencion,
            HoraReserva: ("0" + arr.HoraAtencion).toString().substr(-4, 2) + ":" + arr.HoraAtencion.toString().substr(-2),
            MascotaId: arr.MascotaId,
            MascotaNombre: arr.Mascota.Nombre,
            Motivo: arr.Motivo,
            AtencionId: arr.Id,
            VeterinarioId: arr.Atencion ? arr.Atencion.VeterinarioId : 0,
            Veterinario: vetNombre,
            Diagnostico: arr.Atencion ? arr.Atencion.Diagnostico : "",
            InicioAtencion: arr.Atencion ? arr.Atencion.InicioAtencion : null,
            FinAtencion: arr.Atencion ? arr.Atencion.FinAtencion : null
        }
        return myJson
    }
    clickFiltrarPuesto() {
        this.puestoSeleccionado = this.shadowRoot.querySelector("#selectPuesto").value
        this.update()
    }
    clickRefresh() {
        let d = new Date()
        let filtroFecha = d.getUTCFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCDate()
        //        store.dispatch(getReservasAgenda(miToken, "FechaAtencion ge " + filtroFecha))
        if (store.getState().screen.name.indexOf("his_") == -1) {
            store.dispatch(getReservasAgenda(store.getState().cliente.datos.token, "FechaAtencion eq 2020-07-29"))
        } else {
            store.dispatch(getReservasAgenda(store.getState().cliente.datos.token, "FechaAtencion eq 2020-07-29"))
        }
        // las consultas las hago en mis consultas, aca, en pie y diagnostico
        this.update()
    }
    static get properties() {
        return {
            videoOAtencion: {
                type: Boolean,
                reflect: true,
                attribute: 'video-o-atencion'
            },
            videoYAtencion: {
                type: Boolean,
                reflect: true,
                attribute: 'video-y-atencion'
            },
            soloAtencion: {
                type: Boolean,
                reflect: true,
                attribute: 'solo-atencion'
            },
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
            clickVideoOAtencion: {
                type: String,
                reflect: true
            }
        }
    }

}
window.customElements.define("pantalla-agenda", pantallaAgenda);