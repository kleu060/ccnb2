<?php

include_once('config.php');
require_once "../lib/auth.php";
require_once "../lib/ProxyClient.php";
require_once    '../lib/classes/ConstMapping.php';

$endpoint = $_GET['endpoint'] ?? '';
$client = new ProxyClient();


switch ($endpoint) {
    case "getdetails";
        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "customer_id" => $_GET["customer_id"],
        ];
        echo $client->get("/custinq_2002/getdetails.php", $token, $data, true);
        break;

     default:
        http_response_code(404);
        echo json_encode([
            "error" => "Unknown endpoint"
        ]);
}