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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let mdw = [
  api,
  rest,
  ...ui,

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