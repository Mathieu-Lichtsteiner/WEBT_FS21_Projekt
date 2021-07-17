<?php

include "shared.php";
include "exceptions.php";
uploadImage();

# UPLOAD BACKGROUND
function uploadImage() {
	# Anleitung gemäss: https://www.youtube.com/watch?v=JaRq73y5MJk
	$errorTitle = "Es gab einen unbekannten Fehler!";
	$errorMessage = "Theoretisch sollten Sie diese Standard-Fehlermeldung nicht sehen!";
	try {
		$newName = saveUploadedFile("fileInput");
		header("Location: ../index.html?background=$newName#draw");
	} catch (FileNotSentException $fnsEx) {
		$errorTitle = "Keine Datei hochgeladen!";
		$errorMessage = "Es wurde vom Server leider keine gültige Datei empfangen.";
	} catch (FileErrorException $feEx) {
		$errorTitle = "Fehler in der Datei!";
		$errorMessage = "Es wurde vom Server leider keine gültige Datei empfangen.";
	} catch (FileFormatException $ffEx) {
		$errorTitle = "Falsches Dateiformat hochgeladen!";
		$errorMessage = "Die hochgeladene Datei ist leider im Falschen Format. Bitte nur .jpg oder .jpeg oder .png hochladen!";
	} catch (FileSizeException $fsEx) {
		$errorTitle = "Datei zu gross!";
		$errorMessage = "Die Datei darf nur maximal 20MB gross sein. Bitte ein kleineres Bild hochladen!";
	}

	printHTMLHead();
	displayError($errorTitle, $errorMessage);
	printHTMLTail();
}

# File-Functions
function saveUploadedFile($parameterName) { // Für die PHP-Exceptions siehe: https://www.php.net/manual/en/spl.exceptions.php
	if (!isset($_FILES[$parameterName])) {
		#Error kein File mitgeliefert!
		throw new FileNotSentException();
	}
	$file = $_FILES[$parameterName];
	if ($file["error"] !== 0) {
		deleteTempImage($file["tmp_name"]);
		#Error in file
		throw new FileErrorException();
	}
	$fileExt = getFileExtension($file["name"]);
	if (!isAllowedFormat($fileExt)) {
		deleteTempImage($file["tmp_name"]);
		#Error falsches format
		throw new FileFormatException();
	}
	$maxSize = 5000000; // Entspricht 5mb
	if ($file["size"] > $maxSize) {
		deleteTempImage($file["tmp_name"]);
		#Error zu gross
		throw new FileSizeException();
	}
	$newName = createTempFileName($fileExt);
	move_uploaded_file($file["tmp_name"], "../" . $newName);
	return $newName;
}
function getFileExtension($fileName) {
	$split = explode(".", $fileName);
	$last = end($split);
	return strtolower($last);
}
function isAllowedFormat($fileExt) {
	$allowedExts = array("jpg", "jpeg", "png", "tif");
	return in_array($fileExt, $allowedExts);
}
function createTempFileName($fileExt) {
	return "img/upload/" . uniqid("", true) . "." . $fileExt;
}
