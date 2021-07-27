import * as Shapes from "./shapes.mjs";
import { toggleSelectedTool } from "./toggleSelectedTool.mjs";
import logConditional from "../shared/logConditional.mjs";

// functions to handle userinputs
function setMode(newMode) {
	if (newMode === Window.variables.oldMode) {
		return; // kein neuer Modus angewählt
	}
	removeOldListener(Window.variables.oldMode);
	toggleSelectedTool(Window.variables.oldMode);
	resetPoints();

	addNewListener(newMode);
	toggleSelectedTool(newMode);

	logConditional("-- Den Zeichen-Modus (" + Window.variables.oldMode + ") auf " + newMode + " gesetzt!");
	Window.variables.oldMode = newMode;
}

export { setMode };

// Actions, what can be subscribed to and removed from the events
function createLine(e) {
	if (!Window.variables.first) {
		Window.variables.first = createPoint(e);
		return;
	}
	Window.variables.second = createPoint(e);
	sleep(180).then(() => { // wait for the doubleClick to happen, with clickspeed test i found, that 180 is normal, but still quite reactive
		if (Window.variables.first) {
			new Shapes.Line(Window.variables.first, Window.variables.second).draw(Window.variables.context);
			var temp = Window.variables.second;
			resetPoints();
			Window.variables.first = temp;
		}
	})

}
function resetLine(e) {
	Window.variables.first = null;
}
function createCircle(e) {
	if (!Window.variables.first) {
		Window.variables.first = createPoint(e);
		return;
	}
	if (!Window.variables.second) {
		Window.variables.second = createPoint(e);
		return;
	}
	new Shapes.Circle(Window.variables.first, Window.variables.second, createPoint(e)).draw(Window.variables.context);
	resetPoints();
}
function createArc(e) {
	if (!Window.variables.first) {
		Window.variables.first = createPoint(e);
		return;
	}
	if (!Window.variables.second) {
		Window.variables.second = createPoint(e);
		return;
	}
	new Shapes.Arc(Window.variables.first, Window.variables.second, createPoint(e)).draw(Window.variables.context);
	resetPoints();
}
function createRectangle(e) {
	if (!Window.variables.first) {
		Window.variables.first = createPoint(e);
		return;
	}
	Window.variables.second = createPoint(e);
	new Shapes.Rectangle(Window.variables.first, Window.variables.second).draw(Window.variables.context);
	resetPoints();
}
function createTriangle(e) {
	if (!Window.variables.first) {
		Window.variables.first = createPoint(e);
		return;
	}
	if (!Window.variables.second) {
		Window.variables.second = createPoint(e);
		new Shapes.Line(Window.variables.first, Window.variables.second).draw(Window.variables.context);
		return;
	}
	new Shapes.Triangle(Window.variables.first, Window.variables.second, createPoint(e)).draw(Window.variables.context);
	resetPoints();
}
function onMouseDown(e) {
	Window.variables.context.beginPath();
	Window.variables.context.moveTo(getX(e), getY(e));
	addListener(Window.constants.mouseMoveEvt, onMouseMove);
	addListener(Window.constants.mouseLeaveEvt, onMouseUp);
}
function onMouseUp(e) {
	removeListener(Window.constants.mouseMoveEvt, onMouseMove);
	removeListener(Window.constants.mouseLeaveEvt, onMouseUp);
}
function onMouseMove(e) {
	Window.variables.context.lineTo(getX(e), getY(e), 3, 3);
	Window.variables.context.stroke();
}

// Listener-Functions
function addListener(event, callback) {
	Window.variables.canvas.addEventListener(event, callback, false);
}
function removeListener(event, callback) {
	Window.variables.canvas.removeEventListener(event, callback, false);
}

function addNewListener(mode) {
	switch (mode) {
		case 'freehand':
			addListener(Window.constants.mouseDownEvt, onMouseDown);
			addListener(Window.constants.mouseUpEvt, onMouseUp);
			break;
		case 'line':
			addListener(Window.constants.mouseClickEvt, createLine);
			addListener(Window.constants.mouseDoubleClickEvt, resetLine);
			break;
		case 'circle':
			addListener(Window.constants.mouseClickEvt, createCircle);
			break;
		case 'arc':
			addListener(Window.constants.mouseClickEvt, createArc);
			break;
		case 'rectangle':
			addListener(Window.constants.mouseClickEvt, createRectangle);
			break;
		case 'triangle':
			addListener(Window.constants.mouseClickEvt, createTriangle);
			break;
		default:
			break;
	}
}
function removeOldListener(mode) {
	switch (mode) {
		case 'freehand':
			removeListener(Window.constants.mouseDownEvt, onMouseDown);
			removeListener(Window.constants.mouseUpEvt, onMouseUp);
			break;
		case 'line':
			removeListener(Window.constants.mouseClickEvt, createLine);
			removeListener(Window.constants.mouseDoubleClickEvt, resetLine);
			break;
		case 'circle':
			removeListener(Window.constants.mouseClickEvt, createCircle);
			break;
		case 'arc':
			removeListener(Window.constants.mouseClickEvt, createArc);
			break;
		case 'rectangle':
			removeListener(Window.constants.mouseClickEvt, createRectangle);
			break;
		case 'triangle':
			removeListener(Window.constants.mouseClickEvt, createTriangle);
			break;
		default:
			break;
	}
}

// helper-functions
function resetPoints() {
	Window.variables.first = null;
	Window.variables.second = null;
}
function sleep(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}
function getX(e) {
	return e.offsetX * Window.variables.offsetFactor;
}
function getY(e) {
	return e.offsetY * Window.variables.offsetFactor;
}
function createPoint(e) {
	return new Shapes.Point(getX(e), getY(e));
}