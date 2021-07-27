import logConditional from "../shared/logConditional.mjs";

function setColor(color) {
	Window.variables.context.strokeStyle = color;
	Window.variables.strokeColor = color;
	Window.variables.colorExample.style.backgroundColor = color;
	logConditional("Die Farbe wurde geändert auf: Style=" + Window.variables.context.strokeStyle + ", StrokeColor=" + Window.variables.strokeColor)
}

export { setColor };