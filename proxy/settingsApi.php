<?php

include_once('config.php');
require_once "../lib/auth.php";
require_once "../lib/ProxyClient.php";
require_once    '../lib/classes/ConstMapping.php';

$endpoint = $_GET['endpoint'] ?? '';
$client = new ProxyClient();
switch ($endpoint) {

    case "view_creditscore_settings":
        $data = [
            "type" => "creditscore",
            "action" => "get",
        ];
        echo $client->get("/settings/manage.php", $token, $data);
        break;
    
    default:
        http_response_code(404);
        echo json_encode([
            "error" => "Unknown endpoint"
        ]);
}
