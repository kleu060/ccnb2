<?php

include_once('config.php');
require_once "../lib/auth.php";
require_once "../lib/ProxyClient.php";
require_once    '../lib/classes/ConstMapping.php';

$endpoint = $_GET['endpoint'] ?? '';
$client = new ProxyClient();

switch ($endpoint) {

    case "view_dca_comm_table";     // page 901 , DCA Commission > Manage
        $input = json_decode(file_get_contents('php://input'), true);
        $year = isset($input["year"]) ? $input["year"] : ($_REQUEST["year"] ?? null);
        $month = isset($input["month"]) ? $input["month"] : ($_REQUEST["month"] ?? null);

        $data = [
            "action" => "view_dca_comm_table",
            "year" => $year,
            "month" => $month,
        ];
        echo $client->get("/dcacommission/dca_commission_manage.php", $token, $data, true);
        break;

    case "list_dca_comm_version";       // page 901, DCA Commssion > Setup
        $data = [
            "action" => "list_dca_comm_version",
        ];
        echo $client->get("/dcacommission/dca_commission_manage.php", $token, $data, true);
        break;

    case "edit_dca_comm_version";
        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "action" => "edit_dca_comm_version",
            "version_id" => $input["version_id"],
            "name" => $input["name"],
            "remark" => $input["remark"],
        ];

        echo $client->post("/dcacommission/dca_commission_manage.php", $token, $data, true);
        break;
    case "view_dca_comm_rate"; // page 901 , DCA Commission > Setup
        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "action" => "view_dca_comm_rate",
            "version_id" => $input["version_id"]
        ];
        echo $client->get("/dcacommission/dca_commission_manage.php", $token, $data, true);
        break;
    case "edit_dca_comm_rate";
        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "action" => "edit_dca_comm_rate",
            "version_id" => $input["version_id"],
            "rate_table" => json_encode($input["rate_table"])
        ];
        echo $client->post("/dcacommission/dca_commission_manage.php", $token, $data);
        break;
    default:
        http_response_code(404);
        echo json_encode([
            "error" => "Unknown endpoint 2"
        ]);
}