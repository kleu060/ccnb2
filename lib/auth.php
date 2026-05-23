<?php

session_start();

if (!isset($_SESSION['access_token'])) {

    http_response_code(401);

    echo json_encode([
        "error" => "Not authenticated"
    ]);

    exit;
}

$token = $_SESSION['access_token'];
