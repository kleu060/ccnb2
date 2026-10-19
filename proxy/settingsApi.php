<?php

include_once('config.php');
require_once "../lib/auth.php";
require_once "../lib/ProxyClient.php";
require_once    '../lib/classes/ConstMapping.php';

$endpoint = $_GET['endpoint'] ?? '';
$client = new ProxyClient();
switch ($endpoint) {

    case "view_creditscore_settings":       // Page 701 , js/pages/CreditScore.js
        $data = [
            "type" => "creditscore",
            "action" => "get",
        ];
        echo $client->get("/settings/manage.php", $token, $data);
        break;
    
    case "edit_creditscore_settings":

        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "type" => "creditscore",
            "action" => "set",
            "data" => json_encode($input["data"])
        ];

        echo $client->post("/settings/manage.php", $token, $data);
        break;
    default:
        http_response_code(404);
        echo json_encode([
            "error" => "Unknown endpoint"
        ]);
}
