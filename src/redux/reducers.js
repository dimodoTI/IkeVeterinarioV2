import {
  reducer as uiReducer
} from "./ui/reducer"
import {
  reducer as screenReducer
} from "./screens/reducer"
import {
  reducer as routingReducer
} from "./routing/reducer"
import {
  reducer as autorizacionReducer
} from "./autorizacion/reducer"
import {
  reducer as clienteReducer
} from "./cliente/reducer"
import {
  reducer as puestosReducer
} from "./puestos/reducer"
import {
  reducer as reservasReducer
} from "./reservas/reducer"
import {
  reducer as atencionesReducer
} from "./atenciones/reducer"

export const rootReducer = (state = {}, action) => {
  return {
    ui: uiReducer(state.ui, action),
    screen: screenReducer(state.screen, action),
    routing: routingReducer(state.routing, action),
    autorizacion: autorizacionReducer(state.autorizacion, action),
    cliente: clienteReducer(state.cliente, action),
    puestos: puestosReducer(state.puestos, action),
    reservas: reservasReducer(state.reservas, action),
    atenciones: atencionesReducer(state.atenciones, action),
  }
}