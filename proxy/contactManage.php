<?php

include_once('config.php');
require_once "../lib/auth.php";
require_once "../lib/ProxyClient.php";
require_once    '../lib/classes/ConstMapping.php';

$endpoint = $_GET['endpoint'] ?? '';
$client = new ProxyClient();


switch ($endpoint) {
    case "edit_contact";
        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "action" => "edit",
            "contact_id" => $input["id"],
            "contact_type" => $input["type"],
            "contact_info" => $input["info"],
            "status" => $input["status"]
        ];
        echo $client->post("/custinq_2002/contact_manage.php", $token, $data, true);
        break;

     default:
        http_response_code(404);
        echo json_encode([
            "error" => "Unknown endpoint"
        ]);
}