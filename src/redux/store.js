import {
  applyMiddleware,
  createStore,
  compose
} from "redux";
import {
  logger
} from "redux-logger";
import {
  rootReducer as reducers
} from "./reducers";
import {
  middleware as ui
} from "./ui/middleware";
import {
  middleware as api
} from "./api/middleware";
import {
  middleware as rest
} from "./rest/middleware";
import {
  middleware as route
} from "./routing/middleware";
import {
  middleware as autorizacion
} from "./autorizacion/middleware";
import {
  middleware as puestos
} from "./puestos/middleware";
import {
  middleware as reservas
} from "./reservas/middleware";
import {
  middleware as atenciones
} from "./atenciones/middleware";
import {
  middleware as reservasDelDia
} from "./reservasDelDia/middleware";
import {
  middleware as chat
} from "./chat/middleware";
import {
  middleware as notificacion
} from "./notificacion/middleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let mdw = [
  api,
  rest,
  ...ui,
  ...route,
  ...autorizacion,
  ...puestos,
  ...reservas,
  ...atenciones,
  ...reservasDelDia,
  ...chat,
  ...notificacion

]

if (process.env.NODE_ENV !== 'production') {
  mdw = [...mdw, logger]
}

const initialData = {}



export const store = createStore(
  reducers,
  initialData,
  composeEnhancers(applyMiddleware(...mdw))
);