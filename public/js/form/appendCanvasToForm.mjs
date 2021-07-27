import { httpGetParameters } from "../parameter/httpGetParameter.mjs";

// Interessanter Link, langes suchen: https://re-cycledair.com/html-5-canvas-saving-to-a-file-with-php 
function appendCanvasToForm() {
	// Bild von Canvas mit dem Formular mitschicken
	var formCanvas = document.getElementById("submitCanvas");
	formCanvas.value = canvas.toDataURL();
	// Get-Paramter übermitteln, um das Hintergrundbild wieder zu löschen!
	var formDelete = document.getElementById("deleteImage");
	var parameters = httpGetParameters();
	var background = parameters["background"];
	if (background !== "blank" && background !== "img/profile.jpg") {
		formDelete.value = background;
	}
}

export { appendCanvasToForm };