//Oculta o muestra spinner
export const SHOW_SPINNER = "[ui] show spinner";
export const HIDE_SPINNER = "[ui] hide spinner";

//oculta o muestra ventana de error
export const SHOW_ERROR = "[ui] show error";
export const HIDE_ERROR = "[ui] hide error";

//define el tamaño,forma orientacion de la UI
export const CAPTURE_MEDIA = "[ui] capture media"
export const SET_MEDIA = "[ui] set media"

//define el layout de la UI
export const SET_LAYOUT = "[ui] set layout"


export const showSpinner = () => ({
  type: SHOW_SPINNER
});
export const hideSpinner = () => ({
  type: HIDE_SPINNER
});

export const showError = (message) => ({
  type: SHOW_ERROR,
  message: message
});
export const hideError = () => ({
  type: HIDE_ERROR
});

export const captureMedia = () => ({
  type: CAPTURE_MEDIA
});
export const setMedia = (size) => ({
  type: SET_MEDIA,
  size: size
});