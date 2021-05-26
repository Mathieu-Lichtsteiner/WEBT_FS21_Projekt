function initEvents() {
	canvas.addEventListener("mousedown", onMouseDown, false);
	canvas.addEventListener("mouseup", onMouseUp, false);
}

function onMouseMove(e) {
	context.lineTo(e.layerX, e.layerY, 3, 3);
	context.stroke();
}

function onMouseDown(e) {
	console.log("Canvas - MouseDown: X=" + e.layerX + ", Y=" + e.layerY);
	context.moveTo(e.layerX, e.layerY);
	canvas.addEventListener("mousemove", onMouseMove, false);
}

function onMouseUp(e) {
	console.log("Canvas - MouseUp: X=" + e.layerX + ", Y=" + e.layerY);
	canvas.removeEventListener("mousemove", onMouseMove, false);
}