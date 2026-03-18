<?php

include_once('config.php');
require_once "../lib/auth.php";
require_once "../lib/ProxyClient.php";
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

    case "accinq_2001":

        $data = [
            "account_code" => $_GET["account_code"],
            "customer_name" => $_GET["customer_name"],
            "accounid_numbert_code" => $_GET["id_number"],
            "msisdn" => $_GET["msisdn"],
            "invoice_number" => $_GET["invoice_number"],
            "iccid" => $_GET["iccid"],
        ];

        echo $client->get("/accinq_2001/", $token, $data);
        // echo "here";
        break;

    case "logout":
        $response = $client->get("/logout/", $token);
	    $responseDecode = json_decode($response, true);

        if ($responseDecode["error_code"] == 0) {
            unset($_SESSION["access_token"]);
        }

	echo $response;
        break;

    default:

        http_response_code(404);

        echo json_encode([
            "error" => "Unknown endpoint"
        ]);
}
