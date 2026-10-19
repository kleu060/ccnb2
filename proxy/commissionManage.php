<?php

include_once('config.php');
require_once "../lib/auth.php";
require_once "../lib/ProxyClient.php";
require_once    '../lib/classes/ConstMapping.php';

$endpoint = $_GET['endpoint'] ?? '';
$client = new ProxyClient();


switch ($endpoint) {
    case "view_internal_commission_table";       //Page 802 , Commission > Manage

        $input = json_decode(file_get_contents('php://input'), true);
    
        // Fallback check: if php://input is empty, check $_POST or $_GET
        $year = isset($input["year"]) ? $input["year"] : ($_REQUEST["year"] ?? null);
        $month = isset($input["month"]) ? $input["month"] : ($_REQUEST["month"] ?? null);
        
        $data = [
            "action" => "view_int_comm_table",
            "year" => $year,
            "month" => $month
        ];
        echo $client->get("/commission/commission_manage.php", $token, $data, true);
        break;

    case "list_int_comm_version";  // page 803 , Commission > Setup
        $data = [
            "action" => "list_int_comm_version",
        ];
        echo $client->get("/commission/commission_manage.php", $token, $data, true);
        break;

    case "change_int_comm_version_status";  // page 803 , Commission > Setup
        $input = json_decode(file_get_contents('php://input'), true);
        
        $data = [
            "action" => "change_int_comm_version_status",
            "version_id" => $input["version_id"],
            "status" => $input["status"]
        ];

        echo $client->post("/commission/commission_manage.php", $token, $data);
        break;

    case "view_int_comm_rate";

        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "action" => "view_int_comm_rate",
            "version_id" => $input["version_id"]
        ];

        echo $client->get("/commission/commission_manage.php", $token, $data);
        break;

    case "edit_int_comm_version";
        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "action" => "edit_int_comm_version",
            "version_id" => $input["version_id"],
            "name" => $input["name"],
            "remark" => $input["remark"]
        ];

        echo $client->post("/commission/commission_manage.php", $token, $data);
        break;
    case "edit_int_comm_rate";
        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "action" => "edit_int_comm_rate",
            "version_id" => $input["version_id"],
            "rate_table" => json_encode($input["rate_table"])
        ];
        echo $client->post("/commission/commission_manage.php", $token, $data);
        break;

   
    default:
        http_response_code(404);
        echo json_encode([
            "error" => "Unknown endpoint 2"
        ]);
}