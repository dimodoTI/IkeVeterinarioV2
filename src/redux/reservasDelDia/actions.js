export const GET = "[reservasdeldia] GET"
export const GET_SUCCESS = "[reservasdeldia] GET_SUCCESS"
export const GET_ERROR = "[reservasdeldia] GET_ERROR"

export const get = (optionsReservas, optionsPuestos) => ({
    type: GET,
    optionsReservas: optionsReservas,
    optionsPuestos: optionsPuestos
});

