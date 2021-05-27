// Canvas zu HTML-Image convertieren: https://meshworld.in/convert-canvas-to-an-image-using-javascript/
function loadImage() {
	var parameters = httpGetParameters();
	var imgUrl = parameters["background"];
	if (imgUrl === "blank") {
		initial = false;
		console.log("Background wird leer gelassen.");
		return;
	}
	if (!imgUrl) {
		console.log("Standard-Bild wird gesetzt.");
		initial = true;
		imgUrl = "img/profile.jpg";
		makeUp = drawInitialMakeUp;
	} else {
		console.log("Background extrahiert.");
		initial = false;
	}
	// Image als Objektreferenz
	var background = new Image();
	background.src = imgUrl;
	background.onload = drawImage;
}

function drawImage() {
	const aspectRatio = this.width / this.height;
	const maxWidth = 940;
	const maxHeight = 600;
	if (aspectRatio > maxWidth / maxHeight) { // Breiter als Canvas-Verhältnis
		const newHeight = maxWidth / aspectRatio;
		const yOffset = maxHeight / 2 - newHeight / 2;
		context.drawImage(this, 0, yOffset, maxWidth, newHeight);
	} else { // Höher als Canvas-Verhältnis
		const newWidth = maxHeight * aspectRatio;
		const xOffset = maxWidth / 2 - newWidth / 2;
		context.drawImage(this, xOffset, 0, newWidth, maxHeight);
	}
	if (makeUp) {
		makeUp();
	}
}

function drawInitialMakeUp() {
	//For testing my Custom Functions
	var strokes = [
		new Circle(370, 250, 60),
		new Circle(520, 250, 60),
		new Line(new Point(430, 250), new Point(460, 250)),
		new Line(new Point(450, 100), new Point(420, 150)),
		new Line(new Point(420, 150), new Point(480, 150)),
		new Line(new Point(480, 150), new Point(450, 200)),
		new Line(new Point(580, 250), new Point(630, 280)),
		new Circle(605, 365, 5),
		new Circle(605, 378, 10),
		new Circle(605, 406, 20),
	];
	strokes.forEach(stroke => {
		stroke.draw();
	});
}

function clearCanvas() {
	// context.clearRect(0, 0, canvas.width, canvas.height);
	// Das oben auskommentierte Beispiel funktioniert leider nicht, da die Zeichenoperationen im Context gespeichert sin.
	canvas.outerHTML = "<canvas id=\"canvas\" width=\"940\" height=\"600\"><p>Wenn Sie das sehen, unterstützt Ihr Browser leider kein HTML5 und das benötigte Canvas-Element nicht.</p></canvas>";
	initCanvas();
	initial = false;
}

function clearMakeUp() {
	clearCanvas();
	loadImage();
}