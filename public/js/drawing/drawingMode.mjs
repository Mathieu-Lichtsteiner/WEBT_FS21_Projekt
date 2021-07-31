import { variables } from "../shared/variables.mjs";
import { constants } from "../shared/constants.mjs";

import * as Shapes from "./shapes.mjs";
import { toggleSelectedTool } from "./toggleSelectedTool.mjs";
import logConditional from "../shared/logConditional.mjs";

// functions to handle userinputs
function setMode(newMode) {
	if (newMode === variables.oldMode) {
		return; // kein neuer Modus angewählt
	}
	removeOldListener(variables.oldMode);
	toggleSelectedTool(variables.oldMode);
	resetPoints();

	addNewListener(newMode);
	toggleSelectedTool(newMode);

	logConditional("-- Den Zeichen-Modus (" + variables.oldMode + ") auf " + newMode + " gesetzt!");
	variables.oldMode = newMode;
}

export { setMode };

// Actions, what can be subscribed to and removed from the events
function createLine(e) {
	if (!variables.first) {
		variables.first = createPoint(e);
		return;
	}
	variables.second = createPoint(e);
	sleep(180).then(() => { // wait for the doubleClick to happen, with clickspeed test i found, that 180 is normal, but still quite reactive
		if (variables.first) {
			new Shapes.Line(variables.first, variables.second).draw(variables.context);
			var temp = variables.second;
			resetPoints();
			variables.first = temp;
		}
	})

}
function resetLine(e) {
	variables.first = null;
}
function createCircle(e) {
	if (!variables.first) {
		variables.first = createPoint(e);
		return;
	}
	if (!variables.second) {
		variables.second = createPoint(e);
		return;
	}
	new Shapes.Circle(variables.first, variables.second, createPoint(e)).draw(variables.context);
	resetPoints();
}
function createArc(e) {
	if (!variables.first) {
		variables.first = createPoint(e);
		return;
	}
	if (!variables.second) {
		variables.second = createPoint(e);
		return;
	}
	new Shapes.Arc(variables.first, variables.second, createPoint(e)).draw(variables.context);
	resetPoints();
}
function createRectangle(e) {
	if (!variables.first) {
		variables.first = createPoint(e);
		return;
	}
	variables.second = createPoint(e);
	new Shapes.Rectangle(variables.first, variables.second).draw(variables.context);
	resetPoints();
}
function createTriangle(e) {
	if (!variables.first) {
		variables.first = createPoint(e);
		return;
	}
	if (!variables.second) {
		variables.second = createPoint(e);
		new Shapes.Line(variables.first, variables.second).draw(variables.context);
		return;
	}
	new Shapes.Triangle(variables.first, variables.second, createPoint(e)).draw(variables.context);
	resetPoints();
}
function onMouseDown(e) {
	variables.context.beginPath();
	variables.context.moveTo(getX(e), getY(e));
	addListener(constants.mouseMoveEvt, onMouseMove);
	addListener(constants.mouseLeaveEvt, onMouseUp);
}
function onMouseUp(e) {
	removeListener(constants.mouseMoveEvt, onMouseMove);
	removeListener(constants.mouseLeaveEvt, onMouseUp);
}
function onMouseMove(e) {
	variables.context.lineTo(getX(e), getY(e), 3, 3);
	variables.context.stroke();
}

// Listener-Functions
function addListener(event, callback) {
	variables.canvas.addEventListener(event, callback, false);
}
function removeListener(event, callback) {
	variables.canvas.removeEventListener(event, callback, false);
}

function addNewListener(mode) {
	switch (mode) {
		case 'freehand':
			addListener(constants.mouseDownEvt, onMouseDown);
			addListener(constants.mouseUpEvt, onMouseUp);
			break;
		case 'line':
			addListener(constants.mouseClickEvt, createLine);
			addListener(constants.mouseDoubleClickEvt, resetLine);
			break;
		case 'circle':
			addListener(constants.mouseClickEvt, createCircle);
			break;
		case 'arc':
			addListener(constants.mouseClickEvt, createArc);
			break;
		case 'rectangle':
			addListener(constants.mouseClickEvt, createRectangle);
			break;
		case 'triangle':
			addListener(constants.mouseClickEvt, createTriangle);
			break;
		default:
			break;
	}
}
function removeOldListener(mode) {
	switch (mode) {
		case 'freehand':
			removeListener(constants.mouseDownEvt, onMouseDown);
			removeListener(constants.mouseUpEvt, onMouseUp);
			break;
		case 'line':
			removeListener(constants.mouseClickEvt, createLine);
			removeListener(constants.mouseDoubleClickEvt, resetLine);
			break;
		case 'circle':
			removeListener(constants.mouseClickEvt, createCircle);
			break;
		case 'arc':
			removeListener(constants.mouseClickEvt, createArc);
			break;
		case 'rectangle':
			removeListener(constants.mouseClickEvt, createRectangle);
			break;
		case 'triangle':
			removeListener(constants.mouseClickEvt, createTriangle);
			break;
		default:
			break;
	}
}

// helper-functions
function resetPoints() {
	variables.first = null;
	variables.second = null;
}
function sleep(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}
function getX(e) {
	return e.offsetX * variables.offsetFactor;
}
function getY(e) {
	return e.offsetY * variables.offsetFactor;
}
function createPoint(e) {
	return new Shapes.Point(getX(e), getY(e));
}