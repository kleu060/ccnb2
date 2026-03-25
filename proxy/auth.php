<?php

session_start();
include_once('config.php');

header('Content-Type: application/json');

if (!isset($_SESSION['access_token'])) {
    echo json_encode([
        "isLogin" => false
    ]);
    exit;
}

echo json_encode([
    "isLogin" => true
]);
exit;