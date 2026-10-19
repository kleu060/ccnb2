<?php

include_once('config.php');
require_once "../lib/auth.php";
require_once "../lib/ProxyClient.php";
require_once    '../lib/classes/ConstMapping.php';

$endpoint = $_GET['endpoint'] ?? '';
$client = new ProxyClient();


switch ($endpoint) {
    case "list_account_hierarchy";
        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "action" => "acchierarchy",
            "acc_id" => $input["acc_id"]
        ];
        echo $client->get("/enterprise301/search.php", $token, $data, true);
        break;

     default:
        http_response_code(404);
        echo json_encode([
            "error" => "Unknown endpoint"
        ]);
}