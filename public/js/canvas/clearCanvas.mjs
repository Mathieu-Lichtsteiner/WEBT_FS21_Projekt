import { initCanvas } from "./initCanvas.mjs";
import { toggleSelectedTool } from "../drawing/toggleSelectedTool.mjs";

function clearCanvas() {
	// context.clearRect(0, 0, canvas.width, canvas.height);
	// Das oben auskommentierte Beispiel funktioniert leider nicht, da die Zeichenoperationen im Context gespeichert sin.
	Window.variables.canvas.outerHTML = "<canvas id=\"canvas\" width=\"940\" height=\"600\"><p>Wenn Sie das sehen, unterstützt Ihr Browser leider kein HTML5 und das benötigte Canvas-Element nicht.</p></canvas>";
	toggleSelectedTool(Window.variables.oldMode);
	Window.variables.oldMode = null;
	initCanvas();
	Window.variables.initial = false;
}

export { clearCanvas };