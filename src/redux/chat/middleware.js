import {
    GET,
    GET_SUCCESS,
    GET_ERROR,
    SIN_CONTESTAR,
    SIN_CONTESTAR_SUCCESS,
    SIN_CONTESTAR_ERROR,
    SET_CAMPANA,
    SET_CAMPANA_SUCCESS,
    SET_CAMPANA_ERROR,
    CHAT_RESERVA,
    CHAT_RESERVA_SUCCESS,
    CHAT_RESERVA_ERROR,
    GRABAR_RESPUESTA,
    GRABAR_RESPUESTA_SUCCESS,
    GRABAR_RESPUESTA_ERROR,
    ADD,
    ADD_SUCCESS,
    ADD_ERROR,
    UPDATE,
    UPDATE_SUCCESS,
    UPDATE_ERROR,
    PATCH,
    PATCH_SUCCESS,
    PATCH_ERROR,
    REMOVE,
    REMOVE_SUCCESS,
    REMOVE_ERROR,
    hideCampana,
    showCampana,
    sinContestar,
    setCampana as setCampanaAction

} from "./actions";

import {
    ikeChatQuery,
    ikeChat,
    ikeNotificacionDetalleQuery
} from "../fetchs"

import {
    RESTAdd,
    RESTDelete,
    RESTUpdate,
    RESTPatch
} from "../rest/actions"

import {
    apiRequest
} from "../api/actions"
import {
    goTo
} from "../../redux/routing/actions"
import { store } from "../store";
import { showWarning } from "../ui/actions";
import { showSpinner, hideSpinner } from "../api/actions"
import {
    getNotificacionChatPendientes
} from "../../redux/notificacion/actions"

export const get = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET || action.type === SIN_CONTESTAR || action.type === CHAT_RESERVA) {
        dispatch(apiRequest(ikeChatQuery, action.options, action.onSuccess, action.onError))
    }

};

export const add = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === ADD) {
        dispatch(RESTAdd(ikeChat, action.body, ADD_SUCCESS, ADD_ERROR, action.token))
    }
    if (action.type === GRABAR_RESPUESTA) {
        dispatch(RESTAdd(ikeChat, action.options, action.onSuccess, action.onError, action.token))
    }
};

export const update = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === UPDATE) {
        dispatch(RESTUpdate(ikeChat, action.id, action.body, UPDATE_SUCCESS, UPDATE_ERROR, action.token))
    }
};

export const patch = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === PATCH) {
        dispatch(RESTPatch(ikeChat, action.id, action.body, PATCH_SUCCESS, PATCH_ERROR, action.token))
    }
};

export const remove = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === REMOVE) {
        dispatch(RESTDelete(ikeChat, action.id, REMOVE_SUCCESS, REMOVE_ERROR, action.token))
    }
};

export const processGet = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_SUCCESS) {
    }
    if (action.type === SIN_CONTESTAR_SUCCESS) {
        dispatch(goTo("notificacionReserva"))
    }
    if (action.type === SET_CAMPANA_SUCCESS) {

    }
    if (action.type === CHAT_RESERVA_SUCCESS) {
        if (store.getState().screen.name == "notificacionReserva") {
            dispatch(goTo("sol_Chat"))
        }
        if (store.getState().screen.name.indexOf("his_") == 0) {
            dispatch(goTo("his_Chat"))
        }
        if (store.getState().screen.name.indexOf("ate_") == 0) {
            dispatch(goTo("ate_Chat"))
        }
    }
};

export const processComand = ({
    dispatch, getState
}) => next => action => {
    next(action);
    if (action.type === ADD_SUCCESS || action.type === UPDATE_SUCCESS || action.type === REMOVE_SUCCESS || action.type === PATCH_SUCCESS) {

    }
    if (action.type === GRABAR_RESPUESTA_SUCCESS) {
        //dispatch(sinContestar())
        dispatch(getNotificacionChatPendientes(getState().cliente.datos.id))
        dispatch(setCampanaAction(getState().cliente.datos.id))

    }
};


export const processError = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_ERROR || action.type === ADD_ERROR || action.type === UPDATE_ERROR || action.type === REMOVE_ERROR || action.type === PATCH_ERROR || action.type === SIN_CONTESTAR_ERROR || action.type === SET_CAMPANA_ERROR || action.type === GRABAR_RESPUESTA_ERROR) {

    }
};

export const setCampana = ({
    dispatch, getState
}) => next => action => {
    next(action);
    if (action.type === SET_CAMPANA) {
        const optionsChat = {}
        optionsChat.top = 1
        optionsChat.expand = "Usuario,Reserva($expand=Mascota($select=Nombre))"
        optionsChat.filter = "Tipo eq 0 and Respondido eq 0"
        const optionsNotif = {}
        optionsNotif.top = 1
        optionsNotif.expand = "Cabecera"
        optionsNotif.filter = "Leido eq 0 and ClienteId eq " + action.clienteId
        var dataChat = null
        var dataNotif = null
        dispatch(showSpinner(ikeChatQuery))
        Promise.all([
            ikeChatQuery.get(optionsChat).then((data) => {
                dataChat = data
            }).catch((err) => {
                throw err
            }),
            ikeNotificacionDetalleQuery.get(optionsNotif).then((data) => {
                dataNotif = data
            }).catch((err) => {
                throw err
            })
        ]).then((value) => {
            var estado = false
            if (dataChat.length > 0 || dataNotif.length > 0) {
                dispatch(showCampana());
                estado = true
            } else {
                dispatch(hideCampana());
            }
            dispatch({
                type: SET_CAMPANA_SUCCESS,
                payload: {
                    send: null,
                    receive: estado
                }
            })
            dispatch(hideSpinner(ikeChatQuery))
        }).catch(() => {
            dispatch({ type: SET_CAMPANA_ERROR })
            dispatch(hideSpinner(ikeChatQuery))
            //dispatch(showWarning())
        })
    }
};


export const middleware = [get, setCampana, add, update, patch, remove, processGet, processComand, processError];