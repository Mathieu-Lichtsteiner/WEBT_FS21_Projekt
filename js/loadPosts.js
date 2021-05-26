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
		loadMore.outerHTML = "<div class=\"w3-panel\"><p>Alle Bilder geladen!</p><div>";
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
	console.log(
	+ object["id"]
	+ object["firstName"]
	+ object["lastName"]
	+ object["email"]
	+ object["created"]
	+ object["msg"]
	);
}