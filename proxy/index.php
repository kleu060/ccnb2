<?php

include_once('config.php');
require_once "../lib/auth.php";
require_once "../lib/ProxyClient.php";
require_once    '../lib/classes/ConstMapping.php';

$endpoint = $_GET['endpoint'] ?? '';
$client = new ProxyClient();
switch ($endpoint) {

    case "checktoken":
        echo $client->get("/auth/checktoken.php", $token);
        break;
    // case "invoices":
    //     echo $client->get("/invoices", $token);
    //     break;

    // case "payments":

    //     echo $client->get("/payments", $token);
    //     break;

    // case "subscribers":

    //     echo $client->get("/subscribers", $token);
    //     break;
    case "accinq_2001":

        $data = json_decode(file_get_contents('php://input'), true);
        echo $client->get("/accinq_2001/search.php", $token, $data);
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
    case "agent-update-contact":

        $input = json_decode(file_get_contents('php://input'), true);


        $accId = $input['accId'] ?? '';
        $contactType = $input['contactType'] ?? '';
        $contactTypeValue = $input['contactTypeValue'] ?? '';

        if ( $contactType == constant("ConstMapping::ContactType")["EMAIL"]["ID"] ){ // Email
            if ( !filter_var($contactTypeValue, FILTER_VALIDATE_EMAIL)) {

                $return = [
                    "success" => false,
                    "response" => "Invalid Email Address"
                ];
                echo json_encode($return);
                return;
            }
        }

        $return = [
            "success" => true,
            "response" => ""
        ];
        
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
                "response" => "{\"error_code\": 99991,\"error_description\": \"New Password and Confirm Password not match.\"}"

            ];
            echo json_encode($return);
            return;
        }

        if ( !validatePassword($newPassword) ) {
            $return = [
                "success" => false,
                "response" => "{\"error_code\": 99992,\"error_description\": \"Password does not meet requirements.\"}"
            ];
            echo json_encode($return);
            return;
        }

        $data = [
            "user_id" => $_SESSION['user_id'],
            "password" => $input["new_password"],
            "force_pw_change" => 0
        ];
        $result = $client->get("/auth/setpw.php", $token, $data);
        $resultArray = json_decode($result, true);
        
        // print_r($resultArray);
        // Update force_change_pw session if change password success
        if ($resultArray["success"] ){
            $responseArray = json_decode($resultArray["response"], true);
            
            if ($responseArray["response"]["error_code"] == 0) {

                $_SESSION['force_change_pw'] = 0;
            }
        }
        echo $result;
        break;
    case "logout":
        $_SESSION = [];
        echo $client->get("/auth/logout.php", $token);
	    // $responseDecode = json_decode($response, true);

        // if ($responseDecode["error_code"] == 0) {
            // unset($_SESSION["access_token"]);

        // }
        
        break;

    case "blacklist_search":
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

    case "id_blacklist_search";
        $input = json_decode(file_get_contents('php://input'), true);
        $idNum = $input['idNum'] ?? '';
        $data = [
            "id_num" => $idNum
        ];
        echo $client->get("/blfunc/idbl_search.php", $token, $data);
        break;

    case "id_blacklist_excel_download";
    
        // Read the raw input stream
        $rawInput = file_get_contents('php://input');

        // Decode the JSON string into an associative array
        $data = json_decode($rawInput, true);

        $requester = isset($data['requester']) ? $data['requester'] : "fraud";

        $data = [
            "action" => "init",
            "requester" => $requester
        ];
        $response =json_decode($client->get("/blfunc/id_blacklist_excel_download.php", $token, $data), true);
        if ($response["success"] == 1 ){
            $responseArray = json_decode($response["response"], true);
            
            $id = $responseArray["id"];
            $data = [
                "action" => "getcontent",
                "id" => $id,
                
            ];
            $errCode = 5;
            $excelFileDownloadResponse = null;
            while ($errCode == 5) {
                $excelFileDownloadResponse = json_decode($client->get("/blfunc/id_blacklist_excel_download.php", $token, $data), true);
                $excelFileDownloadResponseArray = json_decode($excelFileDownloadResponse["response"], true);
                $errCode = $excelFileDownloadResponseArray["error_code"];
                sleep(5);

            }
            
            if ( $excelFileDownloadResponse["success"] == 1 ) {
                $excelFileDownloadReponseArray = json_decode($excelFileDownloadResponse["response"], true);

                $dir = "files";
                $filename = "id_black_list_".$id."_".$requester."_".date("YmdHis").".xlsx";
                $excelFileName = $dir."/". $filename;
                $result = file_put_contents($excelFileName, base64_decode($excelFileDownloadReponseArray["filecontent"]));
                if ($result !== false ) {
                    $return = [
                        "success" => true,
                        "response" => $filename
                    ];
                    echo json_encode($return);
                    $_SESSION["latest_id_blacklist_file_".$requester] = $filename;
                    return;
                }
            }

        }

        $responseArray = json_decode($response["response"], true);
        $return = [
            "success" => false,
            "response" => $responseArray
        ];
        echo json_encode($return);            
        break;
        
    case "id_blacklist_excel_upload";
        // read file binary and base64 encode it
        $requester = $_POST["requester"];

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
            "filecontent" => $base64,
            "requester" => $requester
        ];
        echo $client->post("/blfunc/id_blacklist_excel_upload.php", $token, $data);
        break;

    case "list_users";
        echo $client->get("/usergroup/userlist.php", $token);
        break;

    case "list_groups";
        echo $client->get("/usergroup/grouplist.php", $token);
        break;

    case "list_group_access";
        echo $client->get("/usergroup/accesslist.php", $token);
        break;
    
    case "edit_access_list";

        $input = json_decode(file_get_contents('php://input'), true);
        $groupId = $input['groupId'] ?? '';
        $pageCode = $input['pageCode'] ?? '';
        
        $data = [
            "group_id" => $groupId,
            "page_code" => $pageCode
        ];


        echo $client->get("/usergroup/accessedit.php", $token, $data, true);
        break;
    default:

        http_response_code(404);

        echo json_encode([
            "error" => "Unknown endpoint"
        ]);
}

function validatePassword($password) {
    // Regular expression for the specified criteria
    $pattern = '/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@\$%\^&\*\(\);:,<\.>\/\?]).{9,50}$/';


    if ($_SESSION['group_name']  == "System1" || $_SESSION['group_name']  == "SystemAdmin1" || $_SESSION['group_name']  == "SystemAdmin2" || $_SESSION['group_name']  == "Usertermination" ) {
            $pattern = '/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@\$%\^&\*\(\);:,<\.>\/\?]).{15,50}$/';
    }
    
    if (preg_match($pattern, $password)) {
        return true;
    }
    return false;
}