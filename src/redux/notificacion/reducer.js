import {
    GET_SUCCESS,
    GET_ERROR,
    PATCH_SUCCESS,
    PATCH_ERROR,
    LEIDO_SUCCESS,
    LEIDO_ERROR,
    GET_DETALLE_CABECERA_SUCCESS,
    GET_DETALLE_CABECERA_ERROR,
    GET_NOTIFICACION_PENDIENTES_SUCCESS,
    GET_NOTIFICACION_PENDIENTES_ERROR,
    GET_NOTIFICACION_CHAT_PENDIENTES_SUCCESS,
    GET_NOTIFICACION_CHAT_PENDIENTES_ERROR
} from "../notificacion/actions";
import { store } from "../store";


const initialState = {
    entities: null,
    timeStamp: null,
    updateTimeStamp: null,
    leidoTimeStamp: null,
    errorTimeStamp: null,
    commandErrorTimeStamp: null,
    leidoErrorTimeStamp: null,
    entityDetalleCabecera: null,
    entityDetalleCabeceraError: null,
    entityDetalleCabeceraTimeStamp: null,
    entityNotificacionPendiente: null,
    entityNotificacionPendienteError: null,
    entityNotificacionPendienteTimeStamp: null,
    entityNotificacionChatPendiente: null,
    entityNotificacionChatPendienteError: null,
    entityNotificacionChatPendienteTimeStamp: null

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
        case GET_DETALLE_CABECERA_SUCCESS:
            newState.entityDetalleCabecera = action.payload.receive
            newState.entityDetalleCabeceraTimeStamp = (new Date()).getTime();
            break;
        case GET_NOTIFICACION_PENDIENTES_SUCCESS:
            newState.entityNotificacionPendiente = action.payload.receive
            newState.entityNotificacionPendienteTimeStamp = (new Date()).getTime();
            break;
        case GET_NOTIFICACION_CHAT_PENDIENTES_SUCCESS:
            newState.entityNotificacionChatPendiente = action.payload.receive
            newState.entityNotificacionChatPendienteTimeStamp = (new Date()).getTime();
            break;
        case PATCH_SUCCESS:
            newState.updateTimeStamp = (new Date()).getTime();
            break;
        case LEIDO_SUCCESS:
            newState.leidoTimeStamp = (new Date()).getTime();
            break;
        case GET_ERROR:
            newState.errorTimeStamp = (new Date()).getTime();
            break;
        case GET_DETALLE_CABECERA_ERROR:
            newState.entityDetalleCabeceraError = (new Date()).getTime();
            break;
        case GET_NOTIFICACION_PENDIENTES_ERROR:
            newState.entityNotificacionPendienteError = (new Date()).getTime();
            break;
        case GET_NOTIFICACION_CHAT_PENDIENTES_ERROR:
            newState.entityNotificacionChatPendienteError = (new Date()).getTime();
            break;
        case PATCH_ERROR:
            newState.commandErrorTimeStamp = (new Date()).getTime();
            break;
        case LEIDO_ERROR:
            newState.leidoErrorTimeStamp = (new Date()).getTime();
            break;

    }
    return newState;
};