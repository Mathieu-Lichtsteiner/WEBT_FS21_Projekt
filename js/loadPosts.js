function loadPosts() {
	xhr = new XMLHttpRequest();
	xhr.onload = prependPosts;

	xhr.onerror = function () {
		confirm("Ladefehler!\nEs gab leider ein Problem, beim laden der Bilder.");
	}
	xhr.timeout = 3000;  // timeout nach 3 Sekunden
	xhr.ontimeout = function () {
		confirm("Zeitüberschreitung!\nEs konnten leider keine neuen Bilder geladen werden.");
	}

	xhr.open("POST", "backend.php?load", true);
	xhr.send();
}

function prependPosts() {
	var result = JSON.parse(this.response);
	var loadMore = document.getElementById("loadMore");

	if (result.length == 0) { // Wenn bereits alle Bilder geladen wurden.
		loadMore.outerHTML = divWithClass("<p>Alle Bilder geladen!</p>", "w3-panel");;
		return;
	}

	var append = "";
	for (let i = 0; i < result.length; i++) {
		append += formatPost(result[i]);
	}
	append = result + loadMore.outerHTML;
	loadMore.outerHTML = append;
}

function formatPost(object) {
	var firstName = object["firstName"];
	var lastName = object["lastName"];
	var created = convertDate(object["created"]);
	var msg = object["msg"];

	var htmlImage = "\t<image href=\"" + object["imgUrl"] + "\" alt=\" Dieser Post wurde von " + firstName + " " + lastName + " am " + created + " erstellt. \"/>\n";
	var htmlUser = pWithClass(firstName, "firstName") + pWithClass(lastName, "lastName") + pWithClass(created, "date");
	var htmlMsg = pWithClass(msg, "comment");
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