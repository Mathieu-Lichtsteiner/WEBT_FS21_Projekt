import { prependPosts } from "./prependPosts.mjs";

const amount = 3; // defines, how many Posts are loaded

function loadPosts(clearCookie) {
	var script = "php/loadPosts.php?amount=" + amount;
	if (clearCookie) {
		script += "&clearCookie";
	}

	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		prependPosts(this.response, amount);
	}
	xhr.onerror = function () {
		alert("Ladefehler!\nEs gab leider ein Problem, beim laden der Bilder.");
	}
	xhr.timeout = 3000;  // timeout nach 3 Sekunden
	xhr.ontimeout = function () {
		alert("Zeitüberschreitung!\nEs konnten leider keine neuen Bilder geladen werden.");
	}

	xhr.open("POST", script, true);
	xhr.send();
}

export { loadPosts };