export { initCanvas } from "./canvas/initCanvas.mjs";
export { loadImage } from "./canvas/loadImage.mjs";
export { updateOffset } from "./canvas/updateOffset.mjs";

export { loadPosts } from "./post/loadPosts.mjs";

import { clearCanvas } from "./canvas/clearCanvas.mjs";
import { setMode } from "./drawing/drawingMode.mjs";
import { setColor } from "./drawing/setColor.mjs";
import { clearMakeUp } from "./drawing/clearMakeUp.mjs";
import { validateForm } from "./form/validateForm.mjs";
import { appendCanvasToForm } from "./form/appendCanvasToForm.mjs";

export function initEventListener() {
	// Event-Listener für die Zeichen-Modi
	for (const button of document.getElementsByClassName("modeBtn")) {
		button.addEventListener(Window.constants.mouseClickEvt, () => {
			setMode(button.name);
		});
	}

	//Event-Listener für die anderen Controls
	// File-Input: Change Event
	var fileInput = document.getElementById("fileInput")
	fileInput.addEventListener(Window.constants.changeEvt, () => {
		fileInput.form.submit();
	});
	// Color-Picker: Change Event
	var colorPicker = document.getElementById("colorPicker");
	colorPicker.addEventListener(Window.constants.changeEvt, () => {
		setColor(colorPicker.value);
	});
	// Clear-Button: Click Event
	document.getElementsByName("clearImage")[0].addEventListener(Window.constants.mouseClickEvt, () => {
		clearCanvas();
	});
	// Reset_MakeUp-Button: Click Event
	document.getElementsByName("clearDrawing")[0].addEventListener(Window.constants.mouseClickEvt, () => {
		clearMakeUp();
	});
	// Form: Submit Event
	var submitForm = document.getElementsByName("submitForm")[0];
	submitForm.addEventListener(Window.constants.submitEvt, (evt) => {
		appendCanvasToForm();
		if (validateForm() === false) {
			evt.preventDefault();
		}
	});
	// Load_More-Button: Click Event
	document.getElementById("loadMore").addEventListener(Window.constants.mouseClickEvt, () => {
		loadPosts();
	});
}