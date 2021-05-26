// Canvas als Objektreferenz
var canvas;
var context;
var initial = true;
var makeUp;
var onMouseDown, onMouseUp, onMouseMove, onMouseClick;
var first, second, third;
var oldMode;

function initCanvas() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	context.lineWidth = 5;
	context.strokeStyle = "black";

	initEvents();
	setMode('freehand');
}
