<?php // -------------------- FUNKTIONEN -------------------------

# Parameter-Checking
function isRequiredPostSet($name) {
	return isset($_POST[$name]) && $_POST[$name] != "";
}
function getPostsCookieValue() {
	if (!isset($_GET["clearCookie"]) && (isset($_COOKIE["loadedPosts"]))) {
		return $_COOKIE["loadedPosts"];
	}
	$_COOKIE["loadedPosts"] = 0;
	return 0;
}
function incrementPostsCookie($increment) {
	setcookie("loadedPosts", $_COOKIE["loadedPosts"] + $increment, time() + 600); // läuft in 10min ab.
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

		<link rel="shortcut icon" href="img/lipstick.svg">
		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
		<link rel="stylesheet" href="css/main.css" />
	</head>

	<body>

		<nav class="w3-bar w3-white">
			<!-- In den Unterlage &#2261, funktioniert aber in utf8 nicht!, mit &#8801 würde es gehen, aber die html-identity (Congruent & equiv) gefällt mir am besten. -->
			<a onclick="toggleMenu();" class="w3-bar-item w3-button w3-mobile w3-hide-medium w3-hide-large">&equiv;</a>
			<a onclick="toggleMenu(true);" href="index.html?background=blank#home" class="w3-bar-item w3-button w3-mobile w3-hide-small">Home</a>
			<a onclick="toggleMenu(true);" href="index.html?background=blank#information" class="w3-bar-item w3-button w3-mobile w3-hide-small">Informationen</a>
			<a onclick="toggleMenu(true);" href="index.html?background=blank#draw" class="w3-bar-item w3-button w3-mobile w3-hide-small">Zeichnen!</a>
			<a onclick="toggleMenu(true);" href="index.html?background=blank#submit" class="w3-bar-item w3-button w3-mobile w3-hide-small">Beitragen!</a>
			<a onclick="toggleMenu(true);" href="index.html?background=blank#posts" class="w3-bar-item w3-button w3-mobile w3-hide-small">Posts ansehen!</a>
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

# SQL-Functions
function insertPostToDatabase() {
	$conn = mysqli_connect("localhost", "root", "", "portofolio");
	if (!$conn) {
		// Connection Failed
		displayError(
			"Fehler in der Datenbank!",
			"Die Verbindung zur Datenbank konnte nicht hergestellt werden!"
		);
		return;
	}
	$query = "INSERT INTO posts (firstName, lastName, email, created, msg) VALUES (?, ?, ?, now(), ?)";
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
		echo $res;
	}
	mysqli_close($conn);
	return $created;
}
function getPostsFromDatabase($offset, $amount) {
	$conn = mysqli_connect("localhost", "root", "", "portofolio");
	if (!$conn) { // Falls Verbindung fehlgeschlagen
		return;
	}

	$query = "SELECT id, firstName, lastName, created, msg from posts where id > ? and id <= ?";
	$stmt = mysqli_prepare($conn, $query);
	$end = $offset + $amount;
	mysqli_stmt_bind_param($stmt, "ii", $offset, $end);

	$exec = mysqli_stmt_execute($stmt);
	if (!$exec) { // Falls Ausführung fehlgeschlagen.
		mysqli_close($conn);
		return;
	}

	$result = mysqli_stmt_get_result($stmt);
	if (!$result) { // Falls Resultat fehlgeschlagen.
		mysqli_close($conn);
		return;
	}

	$data = array();
	while ($row = mysqli_fetch_assoc($result)) {
		array_push($data, cleanJson($row));
	}

	mysqli_close($conn);
	return $data;
}
function cleanJson($sqlRow) {
	if (isset($sqlRow["id"])) { // convert id to img URL
		$path = "img/creations/" . $sqlRow["id"] . ".png";
		if (file_exists($path)) {
			$sqlRow["imgUrl"] = $path;
		} else {
			$sqlRow["imgUrl"] = "img/404-error.gif"; // Freie & Kommerzielle nutzung von: https://www.worldwidejournals.com/paripex/images/404-error.gif
		}
		unset($sqlRow["id"]);
		return $sqlRow;
	}
}

# File-Exceptions
class FileNotSentException extends Exception {
}
class FileErrorException extends Exception {
}
class FileFormatException extends Exception {
}
class FileSizeException extends Exception {
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
	move_uploaded_file($file["tmp_name"], $newName);
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
function saveImageData($data, $fileName) {
	$data = substr($data, strpos($data, ",") + 1); // Die Angaben vor dem Komma dienen zur identifizierung. z.B. png, usw... (aus logging entnommen)
	$binary = base64_decode($data);
	$resource = fopen($fileName, "wb"); // Schreiben und Binär erzwingen, siehe: https://www.php.net/manual/de/function.fopen.php
	fwrite($resource, $binary);
	fclose($resource);
}
function deleteTempImage($fileName) {
	if (file_exists($fileName)) {
		// See w3Schools: https://www.w3schools.com/php/func_filesystem_unlink.asp
		unlink($fileName);
	}
}

?>

<?php echo ("\n"); // -------------------- MAIN-PROGRAMM --------------------

# SUBMIT CREATION
if (isset($_GET["submit"])) { // Mithilfe des Get-Parameters wird erkannt, dass es sich um das eingereichte Form handelt.
	printHTMLHead(); // Es wird die Navigation & alle head-Informationen gepostet.

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
			"Vielen Dank, dass Sie Ihr MakeUp mit mir teilen. Sie können auf der Homepage unter <a href=\"index.html?background=blank#posts\">\"Posts ansehen!\"</a> ihren Beitrag ansehen"
		);

		$index = insertPostToDatabase();
		saveImageData($_POST["submitCanvas"], "img/creations/$index.png");

		if (isRequiredPostSet("deleteImage")) { // Das Temporäre Bild wird, gelöscht, falls eines Hochgeladen wurde.
			deleteTempImage($_POST["deleteImage"]);
		}
	}

	printHTMLTail(); // Es werden die geöffneten Tags des HTML-Heads geschlossen.
}

# UPLOAD BACKGROUND
# Anleitung gemäss: https://www.youtube.com/watch?v=JaRq73y5MJk
if (isset($_GET["upload"])) {
	$errorTitle = "Es gab einen unbekannten Fehler!";
	$errorMessage = "Theoretisch sollten Sie diese Standard-Fehlermeldung nicht sehen!";
	try {
		$newName = saveUploadedFile("fileInput");
		header("Location: index.html?background=$newName#draw");
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

# LOAD POSTS
if (isset($_GET["load"])) {
	$offset = getPostsCookieValue();
	$result = getPostsFromDatabase($offset, 3);
	echo (json_encode($result));
	incrementPostsCookie(count($result));
}

?>
