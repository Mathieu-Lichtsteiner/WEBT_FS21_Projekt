<?php
define("SLASH", DIRECTORY_SEPARATOR);
define("ROOT", dirname(__DIR__) . SLASH);
define("APP", ROOT . "application" . SLASH);
define("CONFIG_FILE", APP . "config.php");

// Always have the configuration-file loaded
require CONFIG_FILE;
