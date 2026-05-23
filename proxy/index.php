<?php

include_once('config.php');
require_once "../lib/auth.php";
require_once "../lib/ProxyClient.php";
$endpoint = $_GET['endpoint'] ?? '';
$client = new ProxyClient();

switch ($endpoint) {

    case "checktoken":
        echo $client->get("/checktoken/", $token);
        break;
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

        $data = json_decode(file_get_contents('php://input'), true);
        echo $client->get("/accinq_2001/", $token, $data);
        // echo "here";
        break;

    case "acodeinq_2003":
        $input = json_decode(file_get_contents('php://input'), true);
        $data = [];
        if ( $input["searchType"] == "acc_code"){
            $data = [
                "search_type" => $input["searchType"],
                "acc_code" => $input["searchString"],
            ];
        }
        else{       //search_type == "acc_id"
            $data = [
                "search_type" => $input["searchType"],
                "acc_id" => $input["searchString"],
            ];
        }
        // print_r($data); exit();
        echo $client->get("/acodeinq_2003/search.php", $token, $data);
        // echo "here";
        break;

    case "acodeinq_2003_subinfo":
        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "search_type" => $input["searchType"],
            "acc_id" => $input["accId"],
        ];
        
        echo $client->get("/acodeinq_2003/getsubinfo.php", $token, $data);
        break;
    
    case "change_password":
        $input = json_decode(file_get_contents('php://input'), true);

        $newPassword = $input["new_password"];
        $confirmPassword = $input["confirm_password"];

        if ( $newPassword != $confirmPassword ) {
            $return = [
                "success" => false,
                "response" => "New Password and Confirm Password not match"
            ];
            echo json_encode($return);
            return;
        }

        if ( !validatePassword($newPassword) ) {
            $return = [
                "success" => false,
                "response" => "Password does not meet requirements."
            ];
            echo json_encode($return);
            return;
        }

        

        $data = [
            "new_password" => $input["new_password"],
            "confirm_password" => $input["confirm_password"],
        ];

        $return = [
                "success" => false,
                "response" => "Valid Password"
            ];
        echo json_encode($return);
        

        break;
    case "logout":
        $response = $client->get("/logout", $token);
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

function validatePassword($password) {
    // Regular expression for the specified criteria
    $pattern = '/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@\$%\^&\*\(\);:,<\.>\/\?]).{9,20}$/';
    
    if (preg_match($pattern, $password)) {
        return true;
    }
    return false;
}