function drawImage(img) {
	const aspectRatio = img.width / img.height;
	const maxWidth = 940;
	const maxHeight = 600;
	if (aspectRatio > maxWidth / maxHeight) { // Breiter als Canvas-Verhältnis
		const newHeight = maxWidth / aspectRatio;
		const yOffset = maxHeight / 2 - newHeight / 2;
		Window.variables.context.drawImage(img, 0, yOffset, maxWidth, newHeight);
	} else { // Höher als Canvas-Verhältnis
		const newWidth = maxHeight * aspectRatio;
		const xOffset = maxWidth / 2 - newWidth / 2;
		Window.variables.context.drawImage(img, xOffset, 0, newWidth, maxHeight);
	}
}

export { drawImage };