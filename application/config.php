<?php
// Folders / Navigation
define("SLASH", DIRECTORY_SEPARATOR);
define("ROOT", dirname(__DIR__) . SLASH);
define("APP", ROOT . "application" . SLASH);
define("PUBLIC", ROOT . "public" . SLASH);

// Application Folders
define("CORE", APP . "core" . SLASH);
define("CONTROLLER", APP . "controller" . SLASH);
define("MODEL", APP . "model" . SLASH);
define("VIEW", APP . "view" . SLASH);
define("DATA", APP . "data" . SLASH);

// Database configuration
define("DB_HOST", "localhost");
define("DB_USER", "root");
define("DB_PASSWORD", "");
define("DB_NAME", "portofolio");
