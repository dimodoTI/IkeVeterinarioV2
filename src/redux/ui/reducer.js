import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    SHOW_ERROR,
    HIDE_ERROR,
    SHOW_WARNING,
    HIDE_WARNING,
    SET_MEDIA,
    SET_MEDIA_ORIENTATION,
    PAGINA_ANTERIOR,
    HEADER_MUESTRA_TAPA,
    FOOTHER_MUESTRA_TAPA
} from "./actions";

const initialState = {
    spinner: {
        loading: 0
    },
    error: {
        message: "",
        timestamp: null
    },
    warning: {
        pagina: "",
        nroWarning: -1,
        timeStamp: null,
        hidden: true
    },
    media: {
        size: "large",
        orientation: "landscape",
        timeStamp: null,
        paginaAnterior: "",
        headerMuestraTapa: false,
        footherMuestraTapa: false
    }

};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state
    };

    switch (action.type) {
        case SHOW_SPINNER:
            newState.spinner.loading += 1;
            break;
        case HIDE_SPINNER:
            newState.spinner.loading -= 1;
            break;
        case SHOW_ERROR:
            newState.error.timeStamp = (new Date()).getTime()
            newState.error.messages = action.message
            break;
        case HIDE_ERROR:
            newState.error.timeStamp = (new Date()).getTime()
            newState.error.messages = null
            break;
        case SHOW_WARNING:
            newState.warning.timeStamp = (new Date()).getTime()
            newState.warning.pagina = action.pagina
            newState.warning.nroWarning = action.nroWarning
            newState.warning.hidden = false
            break;
        case HIDE_WARNING:
            newState.warning.timeStamp = (new Date()).getTime()
            newState.warning.pagina = ""
            newState.warning.nroWarning = -1
            newState.warning.hidden = true
            break;
        case SET_MEDIA:
            newState.media.size = action.size
            newState.media.timeStamp = (new Date()).getTime()
            break;
        case SET_MEDIA_ORIENTATION:
            newState.media.orientation = action.orientation
            newState.media.timeStamp = (new Date()).getTime()
            break;
        case PAGINA_ANTERIOR:
            newState.media.paginaAnterior = action.pagina
            break;
        case HEADER_MUESTRA_TAPA:
            newState.media.headerMuestraTapa = action.mostrar
            break;
        case FOOTHER_MUESTRA_TAPA:
            newState.media.footherMuestraTapa = action.mostrar
            break;
    }
    return newState;
};