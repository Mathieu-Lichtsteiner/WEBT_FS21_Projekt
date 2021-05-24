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
		<a href="#home" class="w3-bar-item w3-button w3-mobile w3-hide-small">Home</a>
		<a href="#information" class="w3-bar-item w3-button w3-mobile w3-hide-small">Informationen</a>
		<a href="#draw" class="w3-bar-item w3-button w3-mobile w3-hide-small">Zeichnen!</a>
		<a href="#submit" class="w3-bar-item w3-button w3-mobile w3-hide-small">Beitragen!</a>
		<a href="#posts" class="w3-bar-item w3-button w3-mobile w3-hide-small">Posts ansehen!</a>
	</nav>

	<?php
	function isRequiredPostSet($name) {
		return isset($_POST[$name]) && $_POST[$name] != "";
	}
	function isFormDataValid() {
		return isRequiredPostSet("firstName") &&
			isRequiredPostSet("lastName") &&
			isRequiredPostSet("email") &&
			isRequiredPostSet("message");
	}
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

	<?php

	if(isFormDataValid()){
		
	}

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