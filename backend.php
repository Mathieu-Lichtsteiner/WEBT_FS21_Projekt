<?php

# Parameter-Checking
function isRequiredPostSet($name) {
	return isset($_POST[$name]) && $_POST[$name] != "";
}

# Form-Validation in Backend
function firstNameIsInvalid() {
	if (isRequiredPostSet("firstName")) {
		$firstName = $_POST["firstName"];
		if (
			strlen($firstName) >= 2
			&& strlen($firstName) <= 30
		) {
			return false;
		}
	}
	return true;
}
function lastNameIsInvalid() {
	if (isRequiredPostSet("lastName")) {
		$lastName = $_POST["lastName"];
		if (
			strlen($lastName) >= 2
			&& strlen($lastName) <= 30
		) {
			return false;
		}
	}
	return true;
}
function emailIsInvalid() {
	if (isRequiredPostSet("email")) {
		$email = $_POST["email"];
		if (
			strlen($email) <= 100
			&& str_contains($email, "@") // enthält ein @-Zeichen
			&& stripos($email, "@") > 1 // enhält min 1 zeichen für den namen der Email
			&& stripos($email, "@") < strlen($email) - 6 // min. 2 buchstaben provider, plus 2 buchstaben domain, plus 1 wegen nullindex, plus 1 wegen "."
			&& str_contains($email, ".") // enthält einen punkt
			&& stripos($email, ".") < strlen($email) - 3
		) { // min. 2 buchstaben domain
			return false;
		}
	}
	return true;
}
function messageIsInvalid() {
	if (isRequiredPostSet("message")) {
		$message = $_POST["message"];
		$islegal = true;
		$illegalWords = ["fuck", "scheisse", "nazi", "hitler", "kacke", "shit"];
		foreach ($illegalWords as $word) {
			if (str_contains($message, $word)) {
				$islegal = false;
			}
		}
		unset($word); // Die letzte referenz löschen: https://www.php.net/manual/de/control-structures.foreach.php
		return $islegal === false;
	}
	return true;
}

# output-Functions
function displayError($message) {
	echo ("<div class=\"w3-panel w3-pale-red w3-leftbar w3-border-red w3-border\">\n\t");
	echo ("<h3>Es gab einen Fehler!</h3>\n\t<p>\n\t\t");
	echo ($message);
	echo ("\n\t</p>\n</div>");
}
function displaySuccess($message) {
	echo ("<div class=\"w3-panel w3-pale-green w3-leftbar w3-border-green w3-border\">\n\t");
	echo ("<h3>Formular erfolgreich eingereicht und gepostet!</h3>\n\t<p>\n\t\t");
	echo ($message);
	echo ("\n\t</p>\n</div>");
}

# File-Functions
function createNewFileName($fileExt) {
	return "img/upload/" . uniqid("", true) . "." . $fileExt;
}
function getFileExtension($fileName) {
	$split = explode(".", $fileName);
	$last = end($split);
	return strtolower($last);
}
function isImage($fileExt) {
	$allowedExts = array("jpg", "jpeg", "png", "tif");
	return in_array($fileExt, $allowedExts);
}
?>

<!DOCTYPE html>
<html lang="de">

<head>
	<meta charset="UTF-8" />
	<meta name="author" content="Mathieu Lichtsteiner" />
	<meta name="description" content="Das ist das Resultat des Unterrichts im Modul \&quot;Webtechnologien\&quot;. Diese Webseite ist mit Humor zu geniessen..." />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>
		Mathieu's MakeUp Studio
	</title>

	<link rel="shortcut icon" type="image/png" href="img/lipstick.png" />
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
	<link rel="stylesheet" href="css/main.css" />
</head>

<body>

	<nav class="w3-bar w3-white">
		<a class="w3-bar-item w3-button w3-mobile w3-hide-medium w3-hide-large">&#10094;&#10096;</a>
		<!-- In den Unterlage &#2261, funktioniert aber in utf8 nicht!, mit &#8801 würde es gehen, aber die html-identity (Congruent & equiv) gefällt mir am besten. -->
		<a class="w3-bar-item w3-button w3-mobile w3-hide-medium w3-hide-large">&equiv;</a>
		<a href="index.html#home?background=blank" class="w3-bar-item w3-button w3-mobile w3-hide-small">Home</a>
		<a href="index.html#information?background=blank" class="w3-bar-item w3-button w3-mobile w3-hide-small">Informationen</a>
		<a href="index.html#draw?background=blank" class="w3-bar-item w3-button w3-mobile w3-hide-small">Zeichnen!</a>
		<a href="index.html#submit?background=blank" class="w3-bar-item w3-button w3-mobile w3-hide-small">Beitragen!</a>
		<a href="index.html#posts?background=blank" class="w3-bar-item w3-button w3-mobile w3-hide-small">Posts ansehen!</a>
	</nav>

	<div name="nav-Abstand"></div>

	<?php

	# Submit Creation
	if (isset($_POST["submitCreation"])) {
		$formIsValid = true;
		if (firstNameIsInvalid()) {
			displayError("Der Vorname wurde vom Server ungültig empfangen! Bitte das Formular gültig ausfüllen!");
			$formIsValid = false;
		}
		if (lastNameIsInvalid()) {
			displayError("Der Nachname wurde vom Server ungültig empfangen! Bitte das Formular gültig ausfüllen!");
			$formIsValid = false;
		}
		if (emailIsInvalid()) {
			displayError("Die Email-Adresse wurde vom Server ungültig empfangen! Bitte eine gültige Email-Adresse eingeben!");
			$formIsValid = false;
		}
		if (messageIsInvalid()) {
			displayError("Die Nachricht wurde vom Server ungültig empfangen! Bitte eine anständige Nachricht mitteilen!");
			$formIsValid = false;
		}
		if ($formIsValid) { # Form ist korrekt ausgefüllt!
			displaySuccess("Vielen Dank, dass Sie Ihr MakeUp mit mir teilen. Sie können auf der Homepage unter <a href=\"index.html#posts?background=blank\">\"Posts ansehen!\"</a> ihren Beitrag ansehen");
		}
	}

	# File-Upload
	# Anleitung gemäss: https://www.youtube.com/watch?v=JaRq73y5MJk
	if (isset($_FILES["fileInput"])) {
		$file = $_FILES["fileInput"];
		$fileTmpName = $file["tmp_name"];
		$fileSize = $file["size"];
		$maxSize = 5000000; // Entspricht 5mb
		$fileError = $file["error"];
		$fileExt = getFileExtension($file["name"]);

		if (isImage($fileExt)) {
			if ($fileError === 0) {
				if ($fileSize  < $maxSize) {
					$newName = createNewFileName($fileExt);
					move_uploaded_file($fileTmpName, $newName);
					header("Location: index.html?background=$newName");
				} else {
					#Error zu gross
				}
			} else {
				#Error in file
			}
		} else {
			#Error falsches format
		}
	}

	?>

</body>

</html>