import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { idiomas } from "../../redux/datos/idiomas"
import { button } from "../css/button"
import { cardMascotaHorizontal } from "../css/cardMascotaHorizontal"
import { CHAT } from "../../../assets/icons/icons"
import { chatReserva } from "../../redux/chat/actions";

import { agendaAtencionSeleccionada } from "../../redux/reservas/actions";
import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";
import {
    delVeterinario, delCliente
} from "../../redux/adjuntos/actions"

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
const RESERVASATENCIONESDEUNAMASCOTA_TIMESTAMP = "reservas.timeStampAtencionDeUnaMascota"

export class pantallaListaReserva extends connect(store, MEDIA_CHANGE, SCREEN, RESERVASATENCIONESDEUNAMASCOTA_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.hidden = false
        this.area = "listaReservas"
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
            height:100%;
            color:var(--color-azul-oscuro);
            font-size:var(--font-header-h1-menos-size);
            font-weight:var(--font-header-h1-menos-weight);
            background-color:var(--color-celeste-muy-claro);
            text-justify:left;
            display:flex;
            align-items: center;    
            padding-left:.5rem;
        }
        #grilla{
            display:grid;
            align-content: flex-start;
            grid-gap:.5rem;
            overflow-x:none;
            overflow-y:auto;
            padding-top:.5rem;
        }
        #grilla::-webkit-scrollbar {
            display: none;
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
                            <div id="cmhDivChat" @click=${this.clickChat} .item=${dato} hiddechat=${dato.Chats.length == 0 ? true : false}>${CHAT}</div>              
                        </div>
                    `)}
    </div>

`
    }
    verFecha(f) {
        let d = new Date(f);
        return d.getUTCDate() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCFullYear()
    }
    clickChat(e) {
        store.dispatch(chatReserva(e.currentTarget.item.Id))
    }
    clickAtencion(e) {
        let arr = e.currentTarget.item;
        //store.dispatch(delVeterinario(arr.Id, store.getState().cliente.datos.token))
        //store.dispatch(delCliente(arr.Id, store.getState().cliente.datos.token))

        var vetNombre = ""
        if (arr.Atencion) {
            if (arr.Atencion.Veterinario) {
                vetNombre = arr.Atencion.Veterinario.Apellido + " " + arr.Atencion.Veterinario.Nombre
            }
        }
        this.atencionCompleta = {
            ReservaId: arr.Id,
            FechaReserva: arr.FechaAtencion,
            HoraReserva: ("0" + arr.HoraAtencion.toString()).substr(-4, 2) + ":" + arr.HoraAtencion.toString().substr(-2),
            MascotaId: arr.MascotaId,
            MascotaNombre: arr.Mascota.Nombre,
            Motivo: arr.Motivo,
            AtencionId: arr.Atencion ? arr.Atencion.id : 0,
            VeterinarioId: arr.Atencion ? arr.Atencion.VeterinarioId : 0,
            Veterinario: vetNombre,
            Diagnostico: arr.Atencion ? arr.Atencion.Diagnostico : "",
            InicioAtencion: arr.Atencion ? arr.Atencion.InicioAtencion : null,
            FinAtencion: arr.Atencion ? arr.Atencion.FinAtencion : null,
            Adjuntos: arr.Adjuntos
        }
        //graba solo en el STATE
        store.dispatch(agendaAtencionSeleccionada(this.atencionCompleta))
        if (store.getState().screen.name.indexOf("his_") == 0) {
            store.dispatch(goTo("his_DiagnosticosDetalle"))
        }
        if (store.getState().screen.name.indexOf("ate_") == 0) {
            store.dispatch(goTo("ate_diagnosticosDetalle"))
        }
    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.update();
        }
        if (name == RESERVASATENCIONESDEUNAMASCOTA_TIMESTAMP) {
            if (state.reservas.entitiesAtencionDeUnaMascota) {
                this.item = state.reservas.entitiesAtencionDeUnaMascota;
                if (this.shadowRoot.querySelector("#tituloLista")) {
                    if (this.item.length > 0) {
                        this.shadowRoot.querySelector("#tituloLista").innerHTML = idiomas[this.idioma].listaReservas.tituloLista + " (" + this.item[0].Mascota.Nombre + ")"
                    }
                }



            }
            this.update();
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