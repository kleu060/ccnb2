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

        // if ($responseDecode["error_code"] == 0) {
            unset($_SESSION["access_token"]);
        // }
        break;

    case "blacklist_serach":
        $input = json_decode(file_get_contents('php://input'), true);
        $searchType = $input['searchType'] ?? '';
        $searchString = $input['searchString'] ?? '';
        $idType = $input['idType'] ?? '';

        if  ( $searchType == "acc_code" ) {
            $data = [
                "search_type" => $searchType,
                "acc_code" => $searchString,
            ];
        }
        else {
            $data = [
                "search_type" => $searchType,
                "id_num" => $searchString,
                "id_type" => $idType,
            ];
        }

        echo $client->get("/blfunc/search.php", $token, $data);
        break; 

    case "deblacklist";
        $input = json_decode(file_get_contents('php://input'), true);
        $blacklistType = $input['blacklistType'] ?? '';
        $searchString = $input['searchString'] ?? '';
        $idType = $input['idType'] ?? '';

        if  ( $blacklistType == "acc_code" ) {
            $data = [
                "blacklist_type" => $blacklistType,
                "acc_code" => $searchString,
            ];
        }
        else {
            $data = [
                "blacklist_type" => $blacklistType,
                "id_num" => $searchString,
                "id_type" => $idType,
            ];
        }

        echo $client->get("/blfunc/deblacklist.php", $token, $data);

        break;
    case "internal_blacklist_download_list";
        $data = [
            "search_id" => $_GET["search_id"]
        ];

        echo $client->get("/internal_blacklist_download_list/", $token, $data);
        break;

    case "id_blacklist_excel_upload";
        // read file binary and base64 encode it
        $tmpPath = $_FILES['file']['tmp_name'];
        $originalName = $_FILES['file']['name'] ?? 'upload.bin';
        $mime = $_FILES['file']['type'] ?? 'application/octet-stream';
        $size = $_FILES['file']['size'] ?? 0;

        $binary = file_get_contents($tmpPath);
        if ($binary === false) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to read uploaded file']);
            break;
        }

        $base64 = base64_encode($binary);

        // $data = [
        //     'filename' => $originalName,
        //     'mime' => $mime,
        //     'size' => $size,
        //     'content_base64' => $base64
        // ];
        
        $data = [
            "filecontent" => $base64
        ];
        echo $client->post("/blfunc/id_blacklist_excel_upload.php", $token, $data);
        break;

    default:

        http_response_code(404);

        echo json_encode([
            "error" => "Unknown endpoint"
        ]);
}
