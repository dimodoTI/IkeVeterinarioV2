import {
    GET,
    GET_SUCCESS,
    GET_ERROR
} from "../reservasDelDia/actions";
import { showSpinner, hideSpinner } from "../api/actions"
import {
    GET_SUCCESS as GET_SUCCESS_PUESTOS,
    GET_ERROR as GET_ERROR_PUESTOS
} from "../puestos/actions"
import {
    GET_AGENDA_SUCCESS as GET_SUCCESS_RESERVAS,
    GET_ERROR as GET_ERROR_RESERVAS
} from "../reservas/actions"

import {
    ikePuestosQuery,
    ikeReservasQuery
} from "../fetchs"
import { goTo } from "../routing/actions";
import { showWarning } from "../ui/actions";

export const get = ({
    dispatch, getState
}) => next => action => {
    next(action);
    if (action.type === GET) {
        const token = getState().cliente.datos.token
        action.optionsPuestos.token = token
        const optionsReservas = {}
        optionsReservas.token = token
        optionsReservas.expand = "Mascota($select = Nombre), Tramo, Atencion($expand=Veterinario), Adjuntos($select = Id, Perfil, Nombre, Url, Activo;$filter = Activo)"
        optionsReservas.orderby = "FechaAtencion,HoraAtencion"
        if (action.filterReservas) {
            optionsReservas.filter = action.filterReservas
        } else {
            var fec = new Date()
            fec.setDate(fec.getDate() - 0);
            fec = (new Date(fec.getTime() - (fec.getTimezoneOffset() * 60000))).toJSON()
            optionsReservas.filter = "FechaAtencion eq " + fec.substr(0, 10)
            //Aca y en actions reservas
        }
        dispatch(showSpinner(ikePuestosQuery))
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
                throw err
            }),

            ikeReservasQuery.get(optionsReservas).then((data) => {
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
                throw err
            })

        ]).then((value) => {
            dispatch(hideSpinner(ikePuestosQuery))
            dispatch(goTo(action.paginaSiguiente))
        }).catch(() => {
            //console.log("Error!!!")
            dispatch(hideSpinner(ikePuestosQuery))
            dispatch(showWarning(getState().screen.name, 0))
        })
    }
};

export const middleware = [get];
