function pWithClass(content, cssClasses = []) {
	var p = document.createElement("p");
	p.innerText = content;
	addClassesToElement(p, cssClasses);
	return p;
}

function divWithClass(content, cssClasses = []) {
	var div = document.createElement("div");
	div.innerHTML = content;
	addClassesToElement(div, cssClasses);
	return div;
}

function imageWithSourceClassAndAlt(source, cssClasses = [], alt = "") {
	var img = new Image();
	img.src = source;
	addClassesToElement(img, cssClasses);
	img.alt = alt;
	return img;
}

function addClassesToElement(element, cssClasses) {
	if (typeof cssClasses === "string") {
		element.classList.add(cssClasses);
	} else {
		element.classList.add(...cssClasses);
	}
}

export { pWithClass, divWithClass, imageWithSourceClassAndAlt };