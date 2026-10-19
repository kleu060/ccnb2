<?php

include_once('config.php');
require_once "../lib/auth.php";
require_once "../lib/ProxyClient.php";
require_once    '../lib/classes/ConstMapping.php';

$endpoint = $_GET['endpoint'] ?? '';
$client = new ProxyClient();


switch ($endpoint) {  // page 205, js/pages/accountSearchCodeTabs/updateTab.js
    case "admin_change_pullback_status";

        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "type" => "admin_pullback_change",
            "acc_id" => $input["acc_id"],
            "pullback"  => $input["pullback"]
        ];
        echo $client->post("/acodeinq_2003/update.php", $token, $data);
        break;
    
    case "admin_update_disposition"; // page 205, js/pages/accountSearchCodeTabs/updateTab.js
        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "type" => "admin_disposition",
            "acc_id" => $input["acc_id"],
            "agent_id"  => $input["agent_id"],
            "disposition_date"  => $input["disposition_date"]
        ];
        echo $client->post("/acodeinq_2003/update.php", $token, $data);
        break;
    default:
        http_response_code(404);
        echo json_encode([
            "error" => "Unknown endpoint"
        ]);
}