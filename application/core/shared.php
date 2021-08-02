<?php

# output-Functions
function displayError($header, $message) {
	echo ("<div class=\"w3-panel w3-pale-red w3-leftbar w3-border-red w3-border\">\n\t");
	displayContent($header, $message);
	echo ("\n</div>");
}
function displaySuccess($header, $message) {
	echo ("<div class=\"w3-panel w3-pale-green w3-leftbar w3-border-green w3-border\">\n\t");
	displayContent($header, $message);
	echo ("\n</div>");
}
function displayContent($header, $message) {
	echo ("<h3>\n\t\t");
	echo ($header);
	echo ("\n\t</h3>\n\t<p>\n\t\t");
	echo ($message);
	echo ("\n\t</p>");
}

# File-Functions
function deleteTempImage($fileName) {
	if (file_exists($fileName)) {
		// See w3Schools: https://www.w3schools.com/php/func_filesystem_unlink.asp
		unlink($fileName);
	}
}
