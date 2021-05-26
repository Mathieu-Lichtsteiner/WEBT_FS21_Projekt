function initCanvas() {
	// Canvas als Objektreferenz
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	context.lineWidth = 5;
	context.strokeStyle = "black";
	initBackground(context);
	initEvents(canvas, context);
}

function initBackground(context) {
	var parameters = httpGetParameters();
	var background = parameters["background"];

	if (!background) {
		// Standard-Bild zeichnen
		console.log("Standard-Bild wird gesetzt.");
		drawImage(context, "img/profile.jpg", drawInitialMakeUp);

	} else if (background === "blank") {
		// keinen Hintergrund zeichnen
		console.log("Background wird leer gelassen.");

	} else {
		// Background mit URL zeichnen
		console.log("Background extrahiert.");
		drawImage(context, background);
	}
}

function initEvents(canvas, context) {
	canvas.addEventListener("mousedown", onMouseDown, false);
	canvas.addEventListener("mouseup", onMouseUp, false);

	function onMouseMove(e) {
		context.lineTo(e.layerX, e.layerY, 3, 3);
		context.stroke();
	}
	function onMouseDown(e) {
		confirm("X: " + e.layerX + " / Y: " + e.layerY);
		context.moveTo(e.layerX, e.layerY);
		canvas.addEventListener("mousemove", onMouseMove, false);
	}
	function onMouseUp(e) {
		canvas.removeEventListener("mousemove", onMouseMove, false);
	}
}