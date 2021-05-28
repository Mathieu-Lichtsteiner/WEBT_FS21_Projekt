function addListener(event, callback) {
	// console.log("Füge zum Event (" + event + ") den Listener hinzu:");
	// console.log(callback);
	canvas.addEventListener(event, callback, false);
}
function removeListener(event, callback) {
	// console.log("Entferne vom Event (" + event + ") den Listener:");
	// console.log(callback);
	canvas.removeEventListener(event, callback, false);
}

// helper-functions
function resetPoints() {
	first = null;
	second = null;
	// i don't reset third, because it's never checked.
}
function sleep(milliseconds = 180) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}
function getX(e) {
	return e.offsetX * offsetFactor;
}
function getY(e) {
	return e.offsetY * offsetFactor;
}
function createPoint(e) {
	return new Point(getX(e), getY(e));
}

// generic function to draw shape with three points on the canvas
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
	if (!first) {
		first = createPoint(e);
		return;
	}
	second = createPoint(e);
	sleep().then(() => { // wait for the doubleClick to happen, with clickspeed test i found, that 180 is normal, but still quite reactive
		if (first) {
			new Line(first, second).draw();
			var temp = second;
			resetPoints();
			first = temp;
		}
	})

}
function resetLine(e) {
	first = null;
}
function createCircle(e) {
	threePointShape(e, Circle);
}
function createArc(e) {
	threePointShape(e, Arc);
}
function createRectangle(e) {
	if (!first) {
		first = createPoint(e);
		return;
	}
	second = createPoint(e);
	new Rectangle(first, second).draw();
	resetPoints();
}
function createTriangle(e) {
	threePointShape(e, Triangle);
}
function onMouseDown(e) {
	context.beginPath();
	context.moveTo(getX(e), getY(e));
	addListener(mouseMoveEvt, onMouseMove);
	addListener(mouseLeaveEvt, onMouseUp);
}
function onMouseUp(e) {
	removeListener(mouseMoveEvt, onMouseMove);
	removeListener(mouseLeaveEvt, onMouseUp);
}
function onMouseMove(e) {
	context.lineTo(getX(e), getY(e), 3, 3);
	context.stroke();
}

// functions to handle userinputs
function setMode(newMode) {
	if (newMode === oldMode) {
		return; // kein neuer Modus angewählt
	}
	removeOldListener(oldMode);
	toggleSelectedTool(oldMode);
	resetPoints();

	addNewListener(newMode);
	toggleSelectedTool(newMode);

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
			addListener(mouseDoubleClickEvt, resetLine);
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
			removeListener(mouseDoubleClickEvt, resetLine);
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