// Canvas als Objektreferenz
var canvas;
var context;
// Uploadsperre für erstes Bild
var initial = true;
var makeUp;
// Variablen für Zeichenpunkte & den Modus
var first, second, third;
var oldMode;

function initCanvas() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	context.lineWidth = 5;
	context.strokeStyle = "black";

	setMode('freehand');
}