// Canvas als Objektreferenz
var canvas;
var context;
var initial = true;
var makeUp;

function initCanvas() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	context.lineWidth = 5;
	context.strokeStyle = "black";

	initEvents();
}
