import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { idiomas } from "../../redux/datos/idiomas"
import { button } from "../css/button"
import { cardMascotaHorizontal } from "../css/cardMascotaHorizontal"
import { CHAT } from "../../../assets/icons/icons"

import { agendaAtencionSeleccionada } from "../../redux/reservas/actions";
import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
const RESERVASATENCIONDEUNAMASCOTA_TIMESTAMP = "reservas.timeStampAtencionDeUnaMascota"

export class pantallaListaReserva extends connect(store, MEDIA_CHANGE, SCREEN, RESERVASATENCIONDEUNAMASCOTA_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"
        this.item = []
        this.atencionCompleta = {}
    }

    static get styles() {
        return css`
        ${button}
        ${cardMascotaHorizontal}
        :host{
            position: relative;
            display: grid;
            padding: 0  !important;
            background-color: var(--color-gris-fondo) !important;
            grid-template-rows: 12% 88%;    
            overflow-x: hidden;
            overflow-y: auto;    
        }
        :host([hidden]){
            display: none; 
        }
        :host::-webkit-scrollbar {
            display: none;
        }
        button {
            position: relative;
            width: 95%;
            color: var(--color-negro);
            background-color:transparent;
            border-radius:0;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        } 
        #tituloLista{
            padding-left:0.84rem;
            color:var(--color-azul-oscuro);
            font-size:var(--font-header-h2-size);
            font-weight:var(--font-header-h2-weight);
            background-color:var(--color-celeste-muy-claro);
            text-justify:left;
            display:flex;
            padding-bottom:.84rem;     
            align-items: flex-end;    
      
        }
        #grilla{
            display:grid;
            align-content: flex-start;
            grid-gap:.5rem;
            overflow-x:none;
            overflow-y:auto;
        }
        #grilla::-webkit-scrollbar {
            display: none;
        }
        #cmhDivEtiqueta{
            width: 90%;
            justify-self:center;
        }
    `
    }
    render() {
        return html`
                    <div id="tituloLista">
                        ${idiomas[this.idioma].listaReservas.tituloLista}
                    </div>
                    <div id="grilla">
                   ${this.item.map(dato => html`
                        <div id="cmhDivEtiqueta">
                            <div id="cmhDivImagen" style="background-image:url(${dato.Mascota.Foto});grid-row-start:1;grid-row-end:4;"></div>
                            <div id="cmhDivNombre">${dato.Mascota.Nombre}</div>
                            <div id="cmhDivFecha">${this.verFecha(dato.FechaAtencion)}</div>
                            <div id="cmhDivDiagnostico">${dato.Motivo}</div>
                            <div id="cmhDivVerDetalle">
                                <button btn2  @click=${this.clickAtencion} .item=${dato} style="width:4rem;padding:0;text-align:left;font-size: var(--font-label-size);font-weight: var(--font-label-weight);">${idiomas[this.idioma].listaReservas.verDetalle}</button>                    
                            </div>
                            <div id="cmhDivChat">${CHAT}</div>              
                        </div>
                    `)}
                    </div>

        `
    }
    verFecha(f) {
        let d = new Date(f);
        return d.getUTCDate() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCFullYear()
    }
    clickAtencion(e) {
        let arr = e.currentTarget.item;
        this.atencionCompleta = {
            ReservaId: arr.Id,
            FechaReserva: arr.FechaAtencion,
            HoraReserva: ("0" + arr.HoraAtencion.toString()).substr(-4, 2) + ":" + arr.HoraAtencion.toString().substr(-2),
            MascotaId: arr.MascotaId,
            MascotaNombre: arr.Mascota.Nombre,
            Motivo: arr.Motivo,
            AtencionId: arr.Atencion ? arr.Atencion.id : 0,
            VeterinarioId: arr.Atencion ? arr.Atencion.VeterinarioId : 0,
            Diagnostico: arr.Atencion ? arr.Atencion.Diagnostico : 0,
            InicioAtencion: arr.Atencion ? arr.Atencion.InicioAtencion : null,
            FinAtencion: arr.Atencion ? arr.Atencion.FinAtencion : null
        }
        store.dispatch(agendaAtencionSeleccionada(this.atencionCompleta))
        store.dispatch(goTo("igualDiagnosticosDetalle"))
    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-listaReservas-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }
        if (name == RESERVASATENCIONDEUNAMASCOTA_TIMESTAMP) {
            if (state.reservas.entitiesAtencionDeUnaMascota) {
                this.item = state.reservas.entitiesAtencionDeUnaMascota;
                this.update();
            }
        }
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

window.customElements.define("pantalla-listareserva", pantallaListaReserva);