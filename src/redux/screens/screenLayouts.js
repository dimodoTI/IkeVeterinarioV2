import {
    ALL_BODY,
    HEADER_BODY_FOOT,
    BODY_FOOT,
    HEADER_BODY,
    SLIDER_HEADER_BODY
} from "./layouts"

export const screenLayuts = {
    splash: {
        small: ALL_BODY,
        medium: ALL_BODY,
        large: ALL_BODY
    },
    inicioSesion: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    recuperaClave: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    recuperaClaveMsg: {
        small: ALL_BODY,
        medium: ALL_BODY,
        large: ALL_BODY
    },
    crearClave: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    crearClaveMsg: {
        small: ALL_BODY,
        medium: ALL_BODY,
        large: ALL_BODY
    },
    misConsultas: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    ate_agendas: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    ate_videos: {
        small: HEADER_BODY,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    ate_diagnosticos: {
        small: HEADER_BODY,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    ate_diagnosticosDetalle: {
        small: HEADER_BODY,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    ate_Chat: {
        small: HEADER_BODY,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    atencionesMascotas: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    ate_listaReservas: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    his_DiagnosticosDetalle: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    his_Agendas: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    his_ListaReservas: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    his_Chat: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    notificacionReserva: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    sol_Chat: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    sol_diagnosticodetalle: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },

    cardA: {
        small: HEADER_BODY,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    cardB: {
        small: HEADER_BODY,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    cardC: {
        small: HEADER_BODY,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    cardD: {
        small: HEADER_BODY,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    }

}

// export const screenLayuts = {
//     splash: {
//         small: ALL_BODY,
//         medium: HEADER_BODY,
//         large: HEADER_BODY
//     },
//     agenda: {
//         small: HEADER_BODY,
//         medium: HEADER_BODY_FOOT,
//         large: HEADER_BODY_FOOT
//     },
//     cardA: {
//         small: {
//             portrait: HEADER_BODY,
//             landscape: HEADER_BODY_FOOT
//         },
//         medium: {
//             portrait: SLIDER_HEADER_BODY,
//             landscape: HEADER_BODY
//         },
//         large: SLIDER_HEADER_BODY
//     },
//     cardB: {
//         small: HEADER_BODY,
//         medium: SLIDER_HEADER_BODY,
//         large: SLIDER_HEADER_BODY
//     },
//     cardC: {
//         small: HEADER_BODY,
//         medium: SLIDER_HEADER_BODY,
//         large: SLIDER_HEADER_BODY
//     },
//     cardD: {
//         small: HEADER_BODY,
//         medium: SLIDER_HEADER_BODY,
//         large: SLIDER_HEADER_BODY
//     }

// }


export const getLayout = (state) => {
    if (!state.screen.layouts[state.ui.media.size]) throw "no hay un layout definido en el state para media-size:" + state.ui.media.size
    let layout = state.screen.layouts[state.ui.media.size]
    if (state.screen.layouts[state.ui.media.size][state.ui.media.orientation]) {
        layout = state.screen.layouts[state.ui.media.size][state.ui.media.orientation]
    }
    return layout
}

export const isInLayout = (state, area) => {
    return getLayout(state).areas.find(a => a == area)
}