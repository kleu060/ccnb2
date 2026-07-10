<?php

include_once('config.php');
require_once "../lib/auth.php";
require_once "../lib/Mapping.php";

$mapping = new Mapping($token);

$input = json_decode(file_get_contents('php://input'), true);
$type = $input["type"] ?? "";

// $type = "ContactType";
echo $mapping->getMapping($type);
