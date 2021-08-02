import { variables } from "../shared/variables.mjs";

import { updateOffset } from "./updateOffset.mjs";
import { setMode } from "../drawing/drawingMode.mjs";
import { setColor } from "../drawing/setColor.mjs";

function initCanvas() {
	variables.canvas = document.getElementById("canvas");
	variables.context = canvas.getContext("2d");
	// No longer works, because the information is on another page than the colorPicker
	// variables.colorExample = document.getElementById("colorExample");
	variables.context.lineWidth = 5;
	setColor(variables.strokeColor);

	setMode('freehand');
	variables.canvasContainer = document.querySelector("#canvasContainer");
	updateOffset();
}

export { initCanvas };