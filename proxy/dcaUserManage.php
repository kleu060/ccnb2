<?php

include_once('config.php');
require_once "../lib/auth.php";
require_once "../lib/ProxyClient.php";
require_once    '../lib/classes/ConstMapping.php';

$endpoint = $_GET['endpoint'] ?? '';
$client = new ProxyClient();


switch ($endpoint) {
    case "list_dca_user";
        // $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "action" => "list",
        ];
        echo $client->get("/dunningcampaign/dca_user_manage.php", $token, $data, true);
        break;

    case "add_dca_user";
        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "action" => "add",
            "user_id" => $input["user_id"],
            "dca_id" => $input["dca_id"],
        ];

        echo $client->post("/dunningcampaign/dca_user_manage.php", $token, $data, true);
        break;

    case "edit_dca_user";
        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "action" => "edit",
            "attachment_id" => $input["attachment_id"],
            "dca_id" => $input["dca_id"],
        ];

        echo $client->post("/dunningcampaign/dca_user_manage.php", $token, $data, true);
        break;
    default:
        http_response_code(404);
        echo json_encode([
            "error" => "Unknown endpoint"
        ]);
}