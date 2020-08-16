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
    hiddeCampana,
    showCampana,
    setCampana,
    sinContestar

} from "./actions";

import {
    ikeChatQuery,
    ikeChat
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

export const get = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET || action.type === SIN_CONTESTAR || action.type === SET_CAMPANA || action.type === CHAT_RESERVA) {
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
        dispatch(goTo("chatApp"))
    }
};

export const processComand = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === ADD_SUCCESS || action.type === UPDATE_SUCCESS || action.type === REMOVE_SUCCESS || action.type === PATCH_SUCCESS) {

    }
    if (action.type === GRABAR_RESPUESTA_SUCCESS) {
        dispatch(sinContestar())
        dispatch(setCampana())

    }
};


export const processError = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_ERROR || action.type === ADD_ERROR || action.type === UPDATE_ERROR || action.type === REMOVE_ERROR || action.type === PATCH_ERROR || action.type === SIN_CONTESTAR_ERROR || action.type === SET_CAMPANA_ERROR) {

    }
};

export const middleware = [get, add, update, patch, remove, processGet, processComand, processError];