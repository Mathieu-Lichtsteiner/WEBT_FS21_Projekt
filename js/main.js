// import { drawImage, Line, Circle, Arc, Rect, Triangle } from "./canvasFunctions.js"
// import { httpGetParameters } from "./parseGetParameter.js"

function updateCanvas() {
	// Canvas als Objektreferenz
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	context.lineWidth = 5;
	context.strokeStyle = "black";

	initBackground(context);
	initEvents(canvas);
}

function initBackground(context) {
	var parameters = httpGetParameters();
	var background = parameters["background"];
	if (background === "blank") { // keinen Hintergrund zeichnen
		console.log("Background wird leer gelassen.");
	} else { // falls kein paramter gesetzt ist, oder eine url angegeben wird.
		var imgSource;
		if (background) { // Background mit URL zeichnen
			console.log("Background extrahiert.");
			imgSource = background;
		} else { // Standard-Bild zeichnen
			console.log("Standard-Bild gesetzt.");
			drawInitialMakeUp(context);
			imgSource = "img/profile.jpg";
		}
		drawImage(context, imgSource);
	}
}

function initEvents(canvas) {

}

// Interessanter Link, langes suchen: https://re-cycledair.com/html-5-canvas-saving-to-a-file-with-php 
function appendCanvasToForm() {
	// Bild von Canvas mit dem Formular mitschicken
	var canvas = document.getElementById("canvas");
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

function drawInitialMakeUp(context) {
	//For testing my Custom Functions
	var strokes = [
		new Line(200, 200, 300, 300),
		new Circle(200, 200, 50),
		new Arc(300, 300, 400, 400, 20, 130),
		new Rect(200, 300, 400, 400),
		new Triangle(400, 100, 500, 100, 400, 200)
	];
	strokes.forEach(stroke => {
		stroke.draw(context);
	});
}

// export {updateCanvas};