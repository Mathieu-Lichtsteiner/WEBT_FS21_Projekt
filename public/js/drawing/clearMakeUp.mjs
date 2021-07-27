import { loadImage } from "../canvas/loadImage.mjs";
import { clearCanvas } from "../canvas/clearCanvas.mjs";

function clearMakeUp() {
	clearCanvas();
	loadImage();
}

export { clearMakeUp };