function loadPictures() {
	xhr = new XMLHttpRequest();
	xhr.onload = displayPictures;

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

function displayPictures() {
	var loadMore = document.getElementById("loadMore");
	if (this.response == false) { // Wenn bereits alle Bilder geladen wurden. (leere Strings sind false)
		loadMore.outerHTML = "<div class=\"w3-panel\"><p>Alle Bilder geladen!</p><div>";
		return;
	}
	var append = this.response + loadMore.outerHTML;
	loadMore.outerHTML = append;
}