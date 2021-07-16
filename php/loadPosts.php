<?php

$amount = 3;
$result = array();
$index = getPostIndexCookie();

while ($amount > 0 && $index < getMaxId()) {
	$result = array_merge($result, tryGetPostFromDatabase($index, $amount));
	$index += $amount;
	setPostIndexCookie($index);
	$amount -= count($result);
}

echo (json_encode($result));

# Parameter-Checking
function getPostIndexCookie() {
	if (isset($_GET["clearCookie"])) {
		$_COOKIE["loadedPostIndex"] = 0;
	}
	if (isset($_COOKIE["loadedPostIndex"])) {
		return $_COOKIE["loadedPostIndex"];
	}
}
function setPostIndexCookie($newValue) {
	setcookie("loadedPostIndex", $newValue, time() + 600); // läuft in 10min ab.
}

# SQL-Functions
function tryGetPostFromDatabase($index, $amount) {
	$conn = mysqli_connect("localhost", "root", "", "portofolio");
	if (!$conn) { // Falls Verbindung fehlgeschlagen
		return;
	}

	$query = "SELECT id, firstName, lastName, created, msg FROM posts WHERE id >= ? AND id < ?";
	$stmt = mysqli_prepare($conn, $query);
	$end = ($index + $amount);
	mysqli_stmt_bind_param($stmt, "ii", $index, $end);

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
		array_push($data, cleanSQLResult($row));
	}

	mysqli_close($conn);
	return $data;
}
function cleanSQLResult($sqlRow) {
	if (isset($sqlRow["id"])) { // convert id to img URL
		$path = "img/creations/" . $sqlRow["id"] . ".png";
		if (file_exists("../" . $path)) {
			$sqlRow["imgUrl"] = $path;
		} else {
			$sqlRow["imgUrl"] = "img/404-error.gif"; // Freie & Kommerzielle nutzung von: https://www.worldwidejournals.com/paripex/images/404-error.gif
		}
		unset($sqlRow["id"]);
		return $sqlRow;
	}
}
function getMaxId() {
	$conn = mysqli_connect("localhost", "root", "", "portofolio");
	if (!$conn) { // Falls Verbindung fehlgeschlagen
		return;
	}

	$query = "SELECT MAX(id) FROM posts";
	$stmt = mysqli_prepare($conn, $query);

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

	$max = mysqli_fetch_row($result);
	if (!$max) { // Falls kein Maximalwert vorhanden
		mysqli_close($conn);
		return;
	}

	mysqli_close($conn);
	return $max[0];
}
