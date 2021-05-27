function addListener(event, callback) {
	console.log("Füge zum Event (" + event + ") den Listener hinzu:");
	console.log(callback);
	canvas.addEventListener(event, callback, false);
}
function removeListener(event, callback) {
	console.log("Entferne vom Event (" + event + ") den Listener:");
	console.log(callback);
	canvas.removeEventListener(event, callback, false);
}

// functions to reset all points or create a new Point with the event-reference.
function resetPoints() {
	first = null;
	second = null;
	third = null;
}
function createPoint(e) {
	var p = new Point(e.layerX, e.layerY);
	console.log(p);
	return p;
}

// generic functions to draw shapes on the canvas
function twoPointShape(e, shape) {
	if (!first) {
		first = createPoint(e);
		return;
	}
	second = createPoint(e);
	new shape(first, second).draw();
	resetPoints();
}
function threePointShape(e, shape) {
	if (!first) {
		first = createPoint(e);
		return;
	}
	if (!second) {
		second = createPoint(e);
		return;
	}
	third = createPoint(e);
	new shape(first, second, third).draw();
	resetPoints();
}

// Actions, what can be subscribed to and removed from the events
function createLine(e) {
	twoPointShape(e, Line);
}
function createCircle(e) {
	threePointShape(e, Circle);
}
function createArc(e) {
	threePointShape(e, Arc);
}
function createRectangle(e) {
	twoPointShape(e, Rectangle);
}
function createTriangle(e) {
	threePointShape(e, Triangle);
}
function onMouseDown(e) {
	context.moveTo(e.layerX, e.layerY);
	canvas.addEventListener(mouseMoveEvt, onMouseMove, false);
}
function onMouseUp(e) {
	canvas.removeEventListener(mouseMoveEvt, onMouseMove, false);
}
function onMouseMove(e) {
	context.lineTo(e.layerX, e.layerY, 3, 3);
	context.stroke();
}

// functions to handle userinputs
function setMode(newMode) {
	if (newMode === oldMode) {
		return; // kein neuer Modus angewählt
	}
	removeOldListener(oldMode);
	resetPoints();
	addNewListener(newMode);

	console.log("-- Den Zeichen-Modus (" + oldMode + ") auf " + newMode + " gesetzt!");
	oldMode = newMode;
}
function addNewListener(mode) {
	switch (mode) {
		case 'freehand':
			addListener(mouseDownEvt, onMouseDown);
			addListener(mouseUpEvt, onMouseUp);
			break;
		case 'line':
			addListener(mouseClickEvt, createLine);
			break;
		case 'circle':
			addListener(mouseClickEvt, createCircle);
			break;
		case 'arc':
			addListener(mouseClickEvt, createArc);
			break;
		case 'rectangle':
			addListener(mouseClickEvt, createRectangle);
			break;
		case 'triangle':
			addListener(mouseClickEvt, createTriangle);
			break;
		default:
			break;
	}
}
function removeOldListener(mode) {
	switch (mode) {
		case 'freehand':
			removeListener(mouseDownEvt, onMouseDown);
			removeListener(mouseUpEvt, onMouseUp);
			break;
		case 'line':
			removeListener(mouseClickEvt, createLine);
			break;
		case 'circle':
			removeListener(mouseClickEvt, createCircle);
			break;
		case 'arc':
			removeListener(mouseClickEvt, createArc);
			break;
		case 'rectangle':
			removeListener(mouseClickEvt, createRectangle);
			break;
		case 'triangle':
			removeListener(mouseClickEvt, createTriangle);
			break;
		default:
			break;
	}
}