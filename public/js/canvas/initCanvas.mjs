import { updateOffset } from "./updateOffset.mjs";
import { setMode } from "../drawing/drawingMode.mjs";
import { setColor } from "../drawing/setColor.mjs";

function initCanvas() {
	Window.variables.canvas = document.getElementById("canvas");
	Window.variables.context = canvas.getContext("2d");
	Window.variables.colorExample = document.getElementById("colorExample");
	Window.variables.context.lineWidth = 5;
	setColor(Window.variables.strokeColor);

	setMode('freehand');
	Window.variables.canvasContainer = document.querySelector("#canvasContainer");
	updateOffset();
}

export { initCanvas };