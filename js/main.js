// Canvas als Objektreferenz & variablen
var canvas;
var context;
var strokeColor = "black";
var colorExample;
var canvasContainer;
const maxWidth = 940;
var offsetFactor;
// Uploadsperre für erstes Bild
var initial = true;
var makeUp;
// Variablen für Zeichenpunkte & den Modus
var first, second;
var oldMode;
// Menü offen?
var menuOpened = false;

function initCanvas() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	colorExample = document.getElementById("colorExample");
	context.lineWidth = 5;
	setColor(strokeColor);

	setMode('freehand');
	canvasContainer = document.querySelector("#canvasContainer");
	updateOffset();
}

function toggleSelectedTool(elementName) {
	if (elementName) {
		document.querySelector("button[name=\"" + elementName + "\"]").classList.toggle("activated");
	}
}

function setColor(color) {
	context.strokeStyle = color;
	strokeColor = color;
	colorExample.style.backgroundColor = color;
}

// Ich brauche absichtlich kein classlist.toggle, damit ich bei einem Click auf die Links das Menu automatisch schliessen kann. Ausserdem $= (ends with), da im PHP-Skript noch die Url vorher ist.
function toggleMenu(forceClose = false) {
	if (forceClose || menuOpened) {
		document.querySelector("a[href$=\"#home\"").classList.add("w3-hide-small");
		document.querySelector("a[href$=\"#information\"").classList.add("w3-hide-small");
		document.querySelector("a[href$=\"#draw\"").classList.add("w3-hide-small");
		document.querySelector("a[href$=\"#submit\"").classList.add("w3-hide-small");
		document.querySelector("a[href$=\"#posts\"").classList.add("w3-hide-small");
		menuOpened = false;
	}
	else {
		document.querySelector("a[href$=\"#home\"").classList.remove("w3-hide-small");
		document.querySelector("a[href$=\"#information\"").classList.remove("w3-hide-small");
		document.querySelector("a[href$=\"#draw\"").classList.remove("w3-hide-small");
		document.querySelector("a[href$=\"#submit\"").classList.remove("w3-hide-small");
		document.querySelector("a[href$=\"#posts\"").classList.remove("w3-hide-small");
		menuOpened = true;
	}
}

function updateOffset() {
	var actualWidth = canvasContainer.offsetWidth;
	offsetFactor = maxWidth / actualWidth;
}