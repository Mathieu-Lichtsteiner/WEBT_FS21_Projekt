function updateOffset() {
	var actualWidth = Window.variables.canvasContainer.offsetWidth;
	Window.variables.offsetFactor = Window.variables.maxWidth / actualWidth;
}

export { updateOffset };