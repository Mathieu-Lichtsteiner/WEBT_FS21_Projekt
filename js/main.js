// Canvas als Objektreferenz
var canvas;
var context;
// Uploadsperre für erstes Bild
var initial = true;
var makeUp;
var strokeColor = "black";
// Variablen für Zeichenpunkte & den Modus
var first, second, third;
var oldMode;

function initCanvas() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	context.lineWidth = 5;
	context.strokeStyle = strokeColor;

	setMode('freehand');
}

function toggleSelectedTool(elementName) {
	if (elementName) {
		document.querySelector("button[name=\"" + elementName + "\"]").classList.toggle("activated");
	}
}

function setColor(color) {
	context.strokeStyle = color;
	strokeColor = color;
}