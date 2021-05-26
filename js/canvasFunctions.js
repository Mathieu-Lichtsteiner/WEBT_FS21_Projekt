// Canvas zu HTML-Image convertieren: https://meshworld.in/convert-canvas-to-an-image-using-javascript/
function loadImage() {
	var parameters = httpGetParameters();
	var imgUrl = parameters["background"];
	if (imgUrl === "blank") {
		// keinen Hintergrund zeichnen
		console.log("Background wird leer gelassen.");
		return;
	}
	var makeUp;
	if (!imgUrl) {
		// Standard-Bild zeichnen
		console.log("Standard-Bild wird gesetzt.");
		imgUrl = "img/profile.jpg";
		makeUp = drawInitialMakeUp;
	} else {
		// Background mit URL zeichnen
		console.log("Background extrahiert.");
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
		new Line(430, 250, 460, 250),
		new Line(450, 100, 420, 150),
		new Line(420, 150, 480, 150),
		new Line(480, 150, 450, 200),
		new Line(580, 250, 630, 280),
		new Circle(605, 365, 5),
		new Circle(605, 378, 10),
		new Circle(605, 406, 20),
	];
	strokes.forEach(stroke => {
		stroke.draw();
	});
}

function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function clearMakeUp() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	loadImage();
}

function Line(xStart, yStart, xEnd, yEnd) {
	this.xStart = xStart;
	this.yStart = yStart;
	this.xEnd = xEnd;
	this.yEnd = yEnd;

	this.draw = function () {
		context.beginPath();
		context.moveTo(this.xStart, this.yStart);
		context.lineTo(this.xEnd, this.yEnd);
		context.stroke();
		console.log("linie gezeichnet: Von (" + this.xStart + "/" + this.yStart + "), Bis (" + this.xEnd + "/" + this.yEnd + ")");
	}
}

function Circle(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;

	this.draw = function () {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		context.stroke();
		console.log("Kreis gezeichnet: x=" + this.x + ", y=" + this.y + ", radius=" + this.radius);
	}
}

function Arc(xStart, yStart, xEnd, yEnd, radius, angle) {
	this.xStart = xStart;
	this.yStart = yStart;
	this.xEnd = xEnd;
	this.yEnd = yEnd;
	this.radius = radius;
	this.angle = angle > Math.PI ? angle * Math.PI / 180 : angle; // If in Degrees, conversion to Radians

	this.draw = function () {
		context.beginPath();
		context.moveTo(xStart, xEnd);
		context.arcTo(xStart, yStart, xEnd, yEnd, radius);
		context.lineTo(xEnd, yEnd);
		context.stroke();
		console.log("Rechteck gezeichnet: Von (" + this.xStart + "/" + this.yStart + ") Bis (" + this.xEnd + "/" + this.yEnd + "), Radius=" + this.radius + ", Winkel=" + this.angle * 180);
	}
}

function Rect(xStart, yStart, xEnd, yEnd) {
	this.xStart = xStart;
	this.yStart = yStart;
	this.xEnd = xEnd;
	this.yEnd = yEnd;

	this.draw = function () {
		context.beginPath();
		context.moveTo(this.xStart, this.yStart);
		context.lineTo(this.xStart, this.yEnd);
		context.lineTo(this.xEnd, this.yEnd);
		context.lineTo(this.xEnd, this.yStart);
		context.closePath();
		context.stroke();
		console.log("Rechteck gezeichnet: Von (" + this.xStart + "/" + this.yStart + "), Bis (" + this.xEnd + "/" + this.yEnd + ")");
	}
}

function Triangle(x1, y1, x2, y2, x3, y3) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.x3 = x3;
	this.y3 = y3;

	this.draw = function () {
		context.beginPath();
		context.moveTo(this.x1, this.y1);
		context.lineTo(this.x2, this.y2);
		context.lineTo(this.x3, this.y3);
		context.closePath();
		context.stroke();
		console.log("Dreieck gezeichnet: (" + this.x1 + "/" + this.y1 + ") - (" + this.x2 + "/" + this.y2 + ") - (" + this.x3 + "/" + this.y3 + ")");
	}
}