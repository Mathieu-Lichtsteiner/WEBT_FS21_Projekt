function loadPosts(clearCookie) {
	xhr = new XMLHttpRequest();
	xhr.onload = prependPosts;

	xhr.onerror = function () {
		alert("Ladefehler!\nEs gab leider ein Problem, beim laden der Bilder.");
	}
	xhr.timeout = 3000;  // timeout nach 3 Sekunden
	xhr.ontimeout = function () {
		alert("Zeitüberschreitung!\nEs konnten leider keine neuen Bilder geladen werden.");
	}

	var script = "backend.php?load";
	if (clearCookie) {
		script += "&clearCookie";
	}

	xhr.open("POST", script, true);
	xhr.send();
}

function prependPosts() {
	var result = JSON.parse(this.response);
	var loadMore = document.getElementById("loadMore");

	if (result.length == 0) { // Wenn bereits alle Bilder geladen wurden.
		loadMore.outerHTML = divWithClass("<p>Alle Bilder geladen!</p>", "w3-panel");
		return;
	}

	var newValue = "";
	for (let i = 0; i < result.length; i++) {
		newValue += formatPost(result[i]);
	}
	newValue += loadMore.outerHTML;
	loadMore.outerHTML = newValue;
}

function formatPost(object) {
	var firstName = object["firstName"];
	var lastName = object["lastName"];
	var created = convertDate(object["created"]);
	var msg = object["msg"];
	var htmlImage = "\t<image src=\"" + object["imgUrl"] + "\" class=\"w3-col s12\" alt=\" Dieser Post wurde von " + firstName + " " + lastName + " am " + created + " erstellt. \"/>\n";
	var htmlUser = divWithClass(pWithClass(firstName + " " + lastName, "userName") + pWithClass(created, "date") + "\n", "user w3-col m5");
	var htmlMsg = pWithClass(msg, "comment w3-col m7");

	return divWithClass(htmlImage + htmlUser + htmlMsg, "post");
}

function convertDate(timeStamp) {
	console.log(timeStamp);
	var date = timeStamp;
	console.log(date);
	return date;
}

function pWithClass(content, cssClass) {
	return "\t<p class=\"" + cssClass + "\">" + content + "</p>\n";
}

function divWithClass(content, cssClass) {
	return "<div class=\"" + cssClass + "\">\n\t" + content + "\n</div>";
}