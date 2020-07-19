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
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    agenda: {
        small: HEADER_BODY,
        medium: HEADER_BODY_FOOT,
        large: HEADER_BODY_FOOT
    },
    cardA: {
        small: HEADER_BODY,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    cardB: {
        small: HEADER_BODY,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    cardC: {
        small: HEADER_BODY,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    cardD: {
        small: HEADER_BODY,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    }

}

export const showScreen = (name) => {
    const layouts = screenLayuts[name]
    return {
        type: SHOW_SCREEN,
        name: name,
        layouts: layouts
    }
};