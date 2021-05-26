function initEvents() {
	canvas.addEventListener("mousedown", onMouseDown, false);
	canvas.addEventListener("mouseup", onMouseUp, false);
	canvas.addEventListener("click", onMouseClick, false);
}

function resetPoints() {
	first = null;
	second = null;
}
function resetActions() {
	onMouseDown = null;
	onMouseUp = null;
	onMouseMove = null;
	onMouseClick = null;

	console.log(onMouseDown);
	console.log(onMouseUp);
	console.log(onMouseMove);
	console.log(onMouseClick);
}

function createPoint(e) {
	var point = Point(e.layerX, e.layerY);
	point.log();
	return point;
}
function createLine() {
	return Line(first, second);
}
function createCircle() {
	return Circle(first, second, third)
}
function createArc() {
	return Arc(first, second, third);
}
function createRectangle() {
	return Rectangle(first, second);
}
function createTriangle() {
	return Triangle(first, second, third);
}

function twoPointCallback(e, callback) {
	if (!first) {
		first = createPoint(e);
		return;
	}
	second = createPoint(e);
	callback().draw();
	resetPoints();
}
function threePointCallback(e, callback) {
	if (!first) {
		first = createPoint(e);
		return;
	}
	if (!second) {
		second = createPoint(e);
		return;
	}
	third = createPoint(e);
	callback().draw();
	resetPoints();
}

function setMode(newMode) {

	console.log(onMouseDown);
	console.log(onMouseUp);
	console.log(onMouseMove);
	console.log(onMouseClick);

	if (newMode === oldMode) {
		return; // kein neuer Modus angewählt
	}
	oldMode = newMode;
	resetPoints();
	resetActions();

	switch (newMode) {
		case 'freehand':
			onMouseDown = function (e) {
				console.log("Canvas - MouseDown: X=" + e.layerX + ", Y=" + e.layerY);
				context.moveTo(e.layerX, e.layerY);
				canvas.addEventListener("mousemove", onMouseMove, false);
			}
			onMouseUp = function (e) {
				console.log("Canvas - MouseUp: X=" + e.layerX + ", Y=" + e.layerY);
				canvas.removeEventListener("mousemove", onMouseMove, false);
			}
			onMouseMove = function (e) {
				context.lineTo(e.layerX, e.layerY, 3, 3);
				context.stroke();
			}
			break;
		case 'line':
			onMouseClick = function (e) { return twoPointCallback(e, createLine); }
			break;
		case 'circle':
			onMouseClick = function (e) { return threePointCallback(e, createCircle); }
			break;
		case 'arc':
			onMouseClick = function (e) { return threePointCallback(e, createArc); }
			break;
		case 'rectangle':
			onMouseClick = function (e) { return twoPointCallback(e, createRectangle); }
			break;
		case 'triangle':
			onMouseClick = function (e) { return threePointCallback(e, createTriangle); }
			break;
		default:
			break;
	}
	console.log("Modus auf " + newMode + " gesetzt!");

	console.log(onMouseDown);
	console.log(onMouseUp);
	console.log(onMouseMove);
	console.log(onMouseClick);
}





