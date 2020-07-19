import {
  reducer as uiReducer
} from "./ui/reducer"
import {
  reducer as screenReducer
} from "./screens/reducer"

export const rootReducer = (state = {}, action) => {
  return {
    ui: uiReducer(state.ui, action),
    screen: screenReducer(state.screen, action)
  };
};