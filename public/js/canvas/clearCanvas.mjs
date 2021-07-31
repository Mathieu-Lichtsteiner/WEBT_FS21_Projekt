import { variables } from "../shared/variables.mjs";
import { initCanvas } from "./initCanvas.mjs";
import { toggleSelectedTool } from "../drawing/toggleSelectedTool.mjs";

function clearCanvas() {
	// context.clearRect(0, 0, canvas.width, canvas.height);
	// Das oben auskommentierte Beispiel funktioniert leider nicht, da die Zeichenoperationen im Context gespeichert sin.
	variables.canvas.outerHTML = "<canvas id=\"canvas\" width=\"940\" height=\"600\"><p>Wenn Sie das sehen, unterstützt Ihr Browser leider kein HTML5 und das benötigte Canvas-Element nicht.</p></canvas>";
	toggleSelectedTool(variables.oldMode);
	variables.oldMode = null;
	initCanvas();
	variables.initial = false;
}

export { clearCanvas };