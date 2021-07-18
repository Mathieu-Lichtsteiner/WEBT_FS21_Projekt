<?php
// Always have the configuration-file loaded
require dirname(__DIR__) . DIRECTORY_SEPARATOR . "application" . DIRECTORY_SEPARATOR . "config.php";

$page = isset($_GET["page"]) ? $_GET["page"] : "home";
$model = MODEL . $page . PHP;
$view = VIEW . $page . PHTML;
$_404 = VIEW . "404" . PHTML;

$content = $_404;

if (file_exists($model)) {
	require $model;
}
if (file_exists($view)) {
	$content = $view;
}

require VIEW . "layout" . PHTML;
