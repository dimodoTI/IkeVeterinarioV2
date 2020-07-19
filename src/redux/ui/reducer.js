import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    SHOW_ERROR,
    HIDE_ERROR,
    SET_MEDIA,
    SET_LAYOUT
} from "./actions";

const initialState = {
    spinner: {
        loading: 0
    },
    error: {
        message: "",
        timestamp: null
    },
    media: {
        size: "large",
        timeStamp: null
    }
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state
    };

    switch (action.type) {
        case SHOW_SPINNER:
            newState.spinner.loading += 1;
            break;
        case HIDE_SPINNER:
            newState.spinner.loading -= 1;
            break;
        case SHOW_ERROR:
            newState.error.timeStamp = (new Date()).getTime()
            newState.error.messages = action.message
            break;
        case HIDE_ERROR:
            newState.error.timeStamp = (new Date()).getTime()
            newState.error.messages = null
            break;
        case SET_MEDIA:
            newState.media.size = action.size
            newState.media.timeStamp = (new Date()).getTime()
            break;

    }
    return newState;
};