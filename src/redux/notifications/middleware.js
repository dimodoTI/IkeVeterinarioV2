/** @format */

import { ON_OPEN, ON_CLOSE, ON_ERROR, ON_MESSSAGE } from "./actions";
import { showCampana} from "../chat/actions"

export const onOpen = ({ dispatch, getState }) => (next) => (action) => {
	next(action);
	if (action.type === ON_OPEN) {
		let connectionId = getState().cliente.datos.id;

		action.ws.send(
			JSON.stringify({
				type: "new-connection",
				id: connectionId ,
				rol: "vet",
				data: "",
			})
		);
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
		dispatch(showCampana())
	}
};
export const middleware = [onOpen, onClose, onError, onMessage];
