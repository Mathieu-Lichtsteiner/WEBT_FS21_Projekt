import { divWithClass, pWithClass, imageWithSourceClassAndAlt } from "./elements.mjs";

function formatPost(object) {
	var firstName = object["firstName"];
	var lastName = object["lastName"];
	var created = object["created"];
	var msg = object["msg"];

	var postElement = divWithClass(null, "post");

	var alt = "Dieser Post wurde von " + firstName + " " + lastName + " am " + created + " erstellt.";
	var imgElement = imageWithSourceClassAndAlt(object["imgUrl"], ["w3-col", "s12"], alt);
	postElement.append(imgElement);
	var userElement = divWithClass(null, ["user", "w3-col", "m5"]);
	postElement.append(userElement);

	var nameElement = pWithClass(firstName + " " + lastName, "userName");
	userElement.append(nameElement);
	var dateElement = pWithClass(created, "date");
	userElement.append(dateElement);
	var htmlMsg = pWithClass(msg, ["comment", "w3-col", "m7"]);
	postElement.append(htmlMsg);

	return postElement;
}

export { formatPost };