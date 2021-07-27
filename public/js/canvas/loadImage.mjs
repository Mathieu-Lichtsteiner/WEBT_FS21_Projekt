import { drawImage } from "./drawImage.mjs";
import { drawInitialMakeUp } from "../drawing/drawInitialMakeUp.mjs";
import { httpGetParameters } from "../parameter/httpGetParameter.mjs";
import logConditional from "../shared/logConditional.mjs";

// Canvas zu HTML-Image convertieren: https://meshworld.in/convert-canvas-to-an-image-using-javascript/
function loadImage() {
	var parameters = httpGetParameters();
	var imgUrl = parameters["background"];
	if (imgUrl === "blank") {
		Window.variables.initial = false;

		logConditional("Background wird leer gelassen.");
		return;
	}
	if (!imgUrl) {
		logConditional("Standard-Bild wird gesetzt.");
		Window.variables.initial = true;
		imgUrl = "img/profile.jpg";
		Window.variables.initialMakeUp = true;
	} else {
		logConditional("Background extrahiert.");
		Window.variables.initial = false;
	}
	// Image als Objektreferenz
	var background = new Image();
	background.src = imgUrl;
	background.onload = function () {
		drawImage(this);
		if (Window.variables.initialMakeUp) {
			drawInitialMakeUp();
		}
	}
}

export { loadImage };