import {
    GET_SUCCESS,
    GET_ERROR,
    SIN_CONTESTAR_SUCCESS,
    SIN_CONTESTAR_ERROR,
    SET_CAMPANA_SUCCESS,
    SET_CAMPANA_ERROR,
    CHAT_RESERVA_SUCCESS,
    CHAT_RESERVA_ERROR,
    GRABAR_RESPUESTA_SUCCESS,
    GRABAR_RESPUESTA_ERROR,
    PATCH_SUCCESS,
    PATCH_ERROR,
    UPDATE_SUCCESS,
    UPDATE_ERROR,
    ADD_SUCCESS,
    ADD_ERROR,
    REMOVE_SUCCESS,
    REMOVE_ERROR,
    EDIT,
    SHOW_CAMPANA,
    HIDE_CAMPANA
} from "./actions";


const initialState = {
    entities: null,
    timeStamp: null,
    sinContestarTimeStamp: null,
    entitySinContestar: null,
    chatReservaTimeStamp: null,
    entityChatReserva: null,
    removeTimeStamp: null,
    updateTimeStamp: null,
    addTimeStamp: null,
    errorTimeStamp: null,
    errorSincontestarTimeStamp: null,
    commandErrorTimeStamp: null,
    editTimeStamp: null,
    grabarRespuestaTimeStamp: null,
    grabarRespuestaErrorTimeStamp: null,
    campana: {
        seMuestra: false,
        timeStamp: null
    }
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state
    };

    switch (action.type) {
        case GET_SUCCESS:
            newState.entities = action.payload.receive
            newState.timeStamp = (new Date()).getTime();
            break;
        case EDIT:
            newState.editTimeStamp = (new Date()).getTime();
            newState.entities.currentItem = action.item
            newState.modo = action.modo;
            break;
        case UPDATE_SUCCESS:
            newState.updateTimeStamp = (new Date()).getTime();
            break;
        case PATCH_SUCCESS:
            newState.updateTimeStamp = (new Date()).getTime();
            break;
        case REMOVE_SUCCESS:
            newState.removeTimeStamp = (new Date()).getTime();
            break;
        case ADD_SUCCESS:
            newState.addTimeStamp = (new Date()).getTime();
            break;
        case GET_ERROR:
            newState.errorTimeStamp = (new Date()).getTime();
            break;
        case UPDATE_ERROR:
        case REMOVE_ERROR:
        case PATCH_ERROR:
        case ADD_ERROR:
            newState.commandErrorTimeStamp = (new Date()).getTime();
            break;
        case SIN_CONTESTAR_ERROR:
            newState.sinContestarErrorTimeStamp = (new Date()).getTime();
            break;
        case SIN_CONTESTAR_SUCCESS:
            newState.entitySinContestar = action.payload.receive
            newState.sinContestarTimeStamp = (new Date()).getTime();
            break;
        case SET_CAMPANA_ERROR:
            //newState.setCampanaErrorTimeStamp = (new Date()).getTime();
            break;
        case SET_CAMPANA_SUCCESS:
            if (action.payload.receive.length > 0) {
                newState.campana.seMuestra = true
            } else {
                newState.campana.seMuestra = false
            }
            newState.campana.timeStamp = (new Date()).getTime()
            break;
        case SHOW_CAMPANA:
            newState.campana.seMuestra = true
            newState.campana.timeStamp = (new Date()).getTime()
            break;
        case HIDE_CAMPANA:
            newState.campana.seMuestra = false
            newState.campana.timeStamp = (new Date()).getTime()
            break;
        case CHAT_RESERVA_SUCCESS:
            newState.entityChatReserva = action.payload.receive
            newState.chatReservaTimeStamp = (new Date()).getTime();
            break;
        case GRABAR_RESPUESTA_SUCCESS:
            newState.grabarRespuestaTimeStamp = (new Date()).getTime()
            break;
        case GRABAR_RESPUESTA_ERROR:
            newState.grabarRespuestaErrorTimeStamp = (new Date()).getTime()
            break;
    }
    return newState;
};