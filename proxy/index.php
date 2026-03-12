<?php

include_once('config.php');
require_once "../lib/auth.php";
require_once "../lib/ProxyClient.php";
echo $token;
$endpoint = $_GET['endpoint'] ?? '';

$client = new ProxyClient();

switch ($endpoint) {

    case "invoices":

        echo $client->get("/invoices", $token);
        break;

    case "payments":

        echo $client->get("/payments", $token);
        break;

    case "subscribers":

        echo $client->get("/subscribers", $token);
        break;

    default:

        http_response_code(404);

        echo json_encode([
            "error" => "Unknown endpoint"
        ]);
}