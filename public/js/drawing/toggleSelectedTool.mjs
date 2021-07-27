function toggleSelectedTool(elementName) {
	if (elementName) {
		document.querySelector("button[name=\"" + elementName + "\"]").classList.toggle("activated");
	}
}

export { toggleSelectedTool };