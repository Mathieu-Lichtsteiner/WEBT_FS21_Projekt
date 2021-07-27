import { divWithClass, pWithClass } from "./elements.mjs";

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

export { formatPost };