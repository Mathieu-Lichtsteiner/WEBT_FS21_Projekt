const amount = 3; // defines, how many Posts are loaded

function loadPosts(clearCookie) {
	var script = "php/loadPosts.php?amount=" + amount;
	if (clearCookie) {
		script += "&clearCookie";
	}

	xhr = new XMLHttpRequest();
	xhr.onload = prependPosts;
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

function remove_LoadMoreButton() {
	var loadMore = document.getElementById("loadMore");
	loadMore.outerHTML = divWithClass("<p>Alle Bilder geladen!</p>", "w3-panel");
}

function prependPosts() {
	var result;
	try {
		result = JSON.parse(this.response);
	}
	catch (e) {// Wenn ein Fehler auftritt, oder bereits alle Bilder geladen wurden.
		remove_LoadMoreButton();
		return;
	}

	var loadMore = document.getElementById("loadMore");
	var newValue = "";
	for (let i = 0; i < result.length; i++) {
		newValue += formatPost(result[i]);
	}
	// as a improvement i could use the .prepend() method: https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend
	newValue += loadMore.outerHTML;
	loadMore.outerHTML = newValue;

	if (result.length < amount) { // asume, that every available post has been loaded, since the server always tries to return the maximum amount
		remove_LoadMoreButton();
	}
}

function formatPost(object) {
	var firstName = object["firstName"];
	var lastName = object["lastName"];
	var created = object["created"];
	var msg = object["msg"];
	var htmlImage = "\t<image src=\"" + object["imgUrl"] + "\" class=\"w3-col s12\" alt=\" Dieser Post wurde von " + firstName + " " + lastName + " am " + created + " erstellt. \"/>\n";
	var htmlUser = divWithClass(pWithClass(firstName + " " + lastName, "userName") + pWithClass(created, "date") + "\n", "user w3-col m5");
	var htmlMsg = pWithClass(msg, "comment w3-col m7");

	return divWithClass(htmlImage + htmlUser + htmlMsg, "post");
}

function pWithClass(content, cssClass) {
	return "\t<p class=\"" + cssClass + "\">" + content + "</p>\n";
}

function divWithClass(content, cssClass) {
	return "<div class=\"" + cssClass + "\">\n\t" + content + "\n</div>";
}