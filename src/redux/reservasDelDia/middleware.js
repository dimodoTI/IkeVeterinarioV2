import {
    GET,
    GET_SUCCESS,
    GET_ERROR
} from "../reservasDelDia/actions";
import {
    GET_SUCCESS as GET_SUCCESS_PUESTOS,
    GET_ERROR as GET_ERROR_PUESTOS
} from "../puestos/actions"
import {
    GET_SUCCESS as GET_SUCCESS_RESERVAS,
    GET_ERROR as GET_ERROR_RESERVAS
} from "../reservas/actions"

import {
    ikePuestosQuery,
    ikeReservasQuery
} from "../fetchs"
import { goTo } from "../routing/actions";

export const get = ({
    dispatch, getState
}) => next => action => {
    next(action);
    if (action.type === GET) {
        const token = getState().cliente.datos.token
        action.optionsPuestos.token = token
        action.optionsReservas.token = token
        Promise.all([
            ikePuestosQuery.get(action.optionsPuestos).then((data) => {
                dispatch({
                    type: GET_SUCCESS_PUESTOS,
                    payload: {
                        send: null,
                        receive: data
                    }
                })
            }).catch((err) => {
                dispatch({
                    type: GET_ERROR_PUESTOS,
                    payload: err
                })
                return err
            }),

            ikeReservasQuery.get(action.optionsReservas).then((data) => {
                dispatch({
                    type: GET_SUCCESS_RESERVAS,
                    payload: {
                        send: null,
                        receive: data
                    }
                })
            }).catch((err) => {
                dispatch({
                    type: GET_ERROR_RESERVAS,
                    payload: err
                })
                return err
            })

        ]).then(() => {
            dispatch(goTo("agendas"))
        }).catch(() => {
            console.log("Error!!!")
            //store.dispatch(getRazas({}))
        })
    }
};

export const middleware = [get];
