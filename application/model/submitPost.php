<?php

include "shared.php";
submitCreation();

# SUBMIT CREATION
function submitCreation()
{

	$formIsValid = true;
	if (firstNameIsInvalid()) {
		displayError(
			"Formularfehler mit dem Vorname!",
			"Der Vorname wurde vom Server ungültig empfangen. Bitte das Formular gültig ausfüllen!"
		);
		$formIsValid = false;
	}
	if (lastNameIsInvalid()) {
		displayError(
			"Formularfehler mit dem Nachname!",
			"Der Nachname wurde vom Server ungültig empfangen. Bitte das Formular gültig ausfüllen!"
		);
		$formIsValid = false;
	}
	if (emailIsInvalid()) {
		displayError(
			"Formularfehler mit der Email-Adresse!",
			"Die Email-Adresse wurde vom Server ungültig empfangen. Bitte eine gültige Email-Adresse eingeben!"
		);
		$formIsValid = false;
	}
	if (messageIsInvalid()) {
		displayError(
			"Formularfehler mit der Nachricht!",
			"Die Nachricht wurde vom Server ungültig empfangen. Bitte eine anständige Nachricht mitteilen!"
		);
		$formIsValid = false;
	}
	if (!isRequiredPostSet("submitCanvas")) {
		displayError(
			"Technischer Fehler im Bild!",
			"Der Server hat leider Ihr gezeichnetes Bild nicht korrekt empfangen!"
		);
		$formIsValid = false;
	}
	if ($formIsValid) { // Form ist korrekt ausgefüllt!
		displaySuccess(
			"Formular erfolgreich eingereicht!",
			"Vielen Dank, dass Sie Ihr MakeUp mit mir teilen. Sie können auf der Homepage unter <a href=\"../index.html?background=blank#posts\">\"Posts ansehen!\"</a> ihren Beitrag ansehen"
		);

		$index = insertPostToDatabase();
		saveImageData($_POST["submitCanvas"], "../img/creations/$index.png");

		if (isRequiredPostSet("deleteImage")) { // Das Temporäre Bild wird, gelöscht, falls eines Hochgeladen wurde.
			deleteTempImage("../" . $_POST["deleteImage"]);
		}
	}
}

# Parameter-Checking
function isRequiredPostSet($name)
{
	return isset($_POST[$name]) && $_POST[$name] != "";
}

# Form-Validation in Backend
function firstNameIsInvalid()
{
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
function lastNameIsInvalid()
{
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
function emailIsInvalid()
{
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
function messageIsInvalid()
{
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

# SQL-Functions
function insertPostToDatabase()
{
	$conn = mysqli_connect("localhost", "root", "", "portofolio");
	if (!$conn) {
		// Connection Failed
		displayError(
			"Fehler in der Datenbank!",
			"Die Verbindung zur Datenbank konnte nicht hergestellt werden!"
		);
		return;
	}
	$query = "INSERT INTO posts (firstName, lastName, email, created, msg) VALUES (?, ?, ?, NOW(), ?)";
	$stmt = mysqli_prepare($conn, $query);
	// Es müssen bereits alle Post-Parameter korrekt sein, bevor diese Methode aufgerufen wird.
	$firstName = $_POST["firstName"];
	$lastName = $_POST["lastName"];
	$email = $_POST["email"];
	$message = $_POST["message"];
	mysqli_stmt_bind_param($stmt, "ssss", $firstName, $lastName, $email, $message);
	$res = mysqli_stmt_execute($stmt);
	$created = mysqli_insert_id($conn); // https://www.php.net/manual/en/mysqli.insert-id.php
	if ($res) {
		displaySuccess(
			"Upload Erfolgreich!",
			"Ihr Beitrag wurde erfolgreich in die Datenbank gespeichert!"
		);
	} else {
		displayError(
			"Fehler beim Upload!",
			"Es ist ein Fehler aufgetreten, bei dem Versuch, ihren Beitrag zu speichern!"
		);
	}
	mysqli_close($conn);
	return $created;
}

# File-Functions
function saveImageData($data, $fileName)
{
	// find the last occurance of "/" (Equivalent to the Slash separating the FileName)
	$lastSlash = strrpos($fileName, "/");
	$dir = substr($fileName, 0, $lastSlash);
	// Create the Directory, if it does not Exist.
	if (is_dir($dir) == false) {
		mkdir($dir);
	}
	// Remove File-Attribute Data
	$data = substr($data, strpos($data, ",") + 1); // Die Angaben vor dem Komma dienen zur identifizierung. z.B. png, usw... (aus logging entnommen)
	$binary = base64_decode($data);
	$resource = fopen($fileName, "wb"); // Schreiben und Binär erzwingen, siehe: https://www.php.net/manual/de/function.fopen.php
	fwrite($resource, $binary);
	fclose($resource);
}
