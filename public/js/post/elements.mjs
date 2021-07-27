function pWithClass(content, cssClass) {
	return "\t<p class=\"" + cssClass + "\">" + content + "</p>\n";
}

function divWithClass(content, cssClass) {
	return "<div class=\"" + cssClass + "\">\n\t" + content + "\n</div>";
}

export { pWithClass, divWithClass };