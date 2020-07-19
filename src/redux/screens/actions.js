import {
    ALL_BODY,
    HEADER_BODY_FOOT,
    BODY_FOOT,
    HEADER_BODY,
    SLIDER_HEADER_BODY
} from "./layouts"



export const SHOW_SCREEN = "[screen] show screen";

const screenLayuts = {
    splash: {
        small: ALL_BODY,
        medium: ALL_BODY,
        large: ALL_BODY
    },
    agenda: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    }
}

export const showScreen = (name, prevScreen) => {
    const layouts = screenLayuts[name]
    return {
        type: SHOW_SCREEN,
        name: name,
        prevScreen: prevScreen,
        layouts: layouts
    }
};