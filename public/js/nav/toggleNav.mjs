import { variables } from "../shared/variables.mjs";

// Ich brauche absichtlich kein classlist.toggle, damit ich bei einem Click auf die Links das Menu automatisch schliessen kann. Ausserdem $= (ends with), da im PHP-Skript noch die Url vorher ist.
function toggleNav(forceClose = false) {
	var buttons = document.getElementsByName("navButton");
	if (forceClose || variables.menuOpened) {
		for (const button of buttons) {
			button.classList.add("w3-hide-small");
		}
		variables.menuOpened = false;
	}
	else {
		for (const button of buttons) {
			button.classList.remove("w3-hide-small");
		}
		variables.menuOpened = true;
	}
}

export default toggleNav;