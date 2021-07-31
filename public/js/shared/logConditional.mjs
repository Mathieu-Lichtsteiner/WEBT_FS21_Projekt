import { constants } from "./constants.mjs";

function logConditional(obj) {
	if (constants.DEBUG) {
		console.log(obj);
	}
}

export default logConditional;