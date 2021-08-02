import { formatPost } from "./formatPosts.mjs";
import { divWithClass, pWithClass } from "./elements.mjs";

function prependPosts(response, amount) {
	var result;
	try {
		result = JSON.parse(response);
	}
	catch (e) {// Wenn ein Fehler auftritt, oder bereits alle Bilder geladen wurden.
		remove_LoadMoreButton();
		return;
	}

	var main = document.getElementById("postsContainer");
	var loadMore = document.getElementById("loadMore");
	for (let i = 0; i < result.length; i++) {
		main.insertBefore(formatPost(result[i]), loadMore);
	}

	if (result.length < amount) { // asume, that every available post has been loaded, since the server always tries to return the maximum amount
		remove_LoadMoreButton();
	}
}

function remove_LoadMoreButton() {
	var main = document.getElementById("postsContainer");
	var loadMore = document.getElementById("loadMore");
	var panelElement = divWithClass("", "w3-panel");
	var textElement = pWithClass("Alle Bilder geladen!");
	panelElement.append(textElement);
	main.insertBefore(panelElement, loadMore);
	loadMore.remove();
}

export { prependPosts };