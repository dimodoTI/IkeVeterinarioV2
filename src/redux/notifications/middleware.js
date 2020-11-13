/** @format */

import { ON_OPEN, ON_CLOSE, ON_ERROR, ON_MESSSAGE } from "./actions";
import { mostrarNotificaciones, clearStorage, prendeNotificacion, apagaNotificacion, getNotificacion as get_notifi } from "../notifi/actions";

export const onOpen = ({ dispatch }) => (next) => (action) => {
	next(action);
	if (action.type === ON_OPEN) {
		console.log("open" + " - Id:" + action.connectionId);
	}
};
export const onClose = ({ dispatch }) => (next) => (action) => {
	next(action);
	if (action.type === ON_CLOSE) {
		console.log("close");
	}
};
export const onError = ({ dispatch }) => (next) => (action) => {
	next(action);
	if (action.type === ON_ERROR) {
		console.log("error");
	}
};
export const onMessage = ({ dispatch }) => (next) => (action) => {
	next(action);
	if (action.type === ON_MESSSAGE) {
		console.log("message");
		if (action.message.data.substring(0, 1) == "{") {

		}
	}
};
export const middleware = [onOpen, onClose, onError, onMessage];
