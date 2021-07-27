import { formatPost } from "./formatPosts.mjs";
import { divWithClass } from "./elements.mjs";

function prependPosts(response, amount) {
	var result;
	try {
		result = JSON.parse(response);
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

function remove_LoadMoreButton() {
	var loadMore = document.getElementById("loadMore");
	loadMore.outerHTML = divWithClass("<p>Alle Bilder geladen!</p>", "w3-panel");
}

export { prependPosts };