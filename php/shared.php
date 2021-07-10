<?php

# HTML-Functions
function printHTMLHead() {
	echo <<<HTML
	<!DOCTYPE html>
	<html lang="de">

	<head>
		<meta charset="UTF-8" />
		<meta name="author" content="Mathieu Lichtsteiner" />
		<meta name="description" content="Das ist das Resultat des Unterrichts im Modul &quot;Webtechnologien&quot;. Diese Webseite ist mit Humor zu geniessen..." />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>
			Mathieu's MakeUp Studio
		</title>

		<link rel="shortcut icon" href="../img/lipstick.svg">
		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
		<link rel="stylesheet" href="../css/main.css" />
	</head>

	<body>

		<nav class="w3-bar w3-white">
			<!-- In den Unterlage &#2261, funktioniert aber in utf8 nicht!, mit &#8801 würde es gehen, aber die html-identity (Congruent & equiv) gefällt mir am besten. -->
			<a onclick="toggleMenu();" class="w3-bar-item w3-button w3-mobile w3-hide-medium w3-hide-large">&equiv;</a>
			<a onclick="toggleMenu(true);" href="../index.html?background=blank#home" class="w3-bar-item w3-button w3-mobile w3-hide-small">Home</a>
			<a onclick="toggleMenu(true);" href="../index.html?background=blank#information" class="w3-bar-item w3-button w3-mobile w3-hide-small">Informationen</a>
			<a onclick="toggleMenu(true);" href="../index.html?background=blank#draw" class="w3-bar-item w3-button w3-mobile w3-hide-small">Zeichnen!</a>
			<a onclick="toggleMenu(true);" href="../index.html?background=blank#submit" class="w3-bar-item w3-button w3-mobile w3-hide-small">Beitragen!</a>
			<a onclick="toggleMenu(true);" href="../index.html?background=blank#posts" class="w3-bar-item w3-button w3-mobile w3-hide-small">Posts ansehen!</a>
		</nav>

		<div title="nav-Abstand"></div>
	HTML;
}
function printHTMLTail() {
	echo ("\n\n\t<div title=\"footer-Abstand\"></div>\n\n</body>\n\n</html>");
}

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
