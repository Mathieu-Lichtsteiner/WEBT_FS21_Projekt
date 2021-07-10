<?php

loadPosts();

# LOAD POSTS
function loadPosts() {
	$amount = 3;
	$result = false;
	$end = 0;

	do {
		$offset = getPostsCookieValue();
		$result = getPostsFromDatabase($offset, $amount);
		$end = $offset + $amount;
		setPostsCookie($end);
	} while (empty($result) && $end < getMaxId());

	echo (json_encode($result));
}

# Parameter-Checking
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
function setPostsCookie($newValue) {
	setcookie("loadedPosts", $newValue, time() + 600); // läuft in 10min ab.
}

# SQL-Functions
function getPostsFromDatabase($offset, $amount) {
	$conn = mysqli_connect("localhost", "root", "", "portofolio");
	if (!$conn) { // Falls Verbindung fehlgeschlagen
		return;
	}

	$query = "SELECT id, firstName, lastName, created, msg FROM posts WHERE id > ? AND id <= ?";
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
