import { variables } from "../shared/variables.mjs";
import logConditional from "../shared/logConditional.mjs";

function setColor(color) {
	variables.context.strokeStyle = color;
	variables.strokeColor = color;
	// No longer works, because the information is on another page than the colorPicker
	// variables.colorExample.style.backgroundColor = color;
	logConditional("Die Farbe wurde geändert auf: Style=" + variables.context.strokeStyle + ", StrokeColor=" + variables.strokeColor)
}

export { setColor };