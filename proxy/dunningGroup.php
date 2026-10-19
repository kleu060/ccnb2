<?php

include_once('config.php');
require_once "../lib/auth.php";
require_once "../lib/ProxyClient.php";
require_once    '../lib/classes/ConstMapping.php';

$endpoint = $_GET['endpoint'] ?? '';
$client = new ProxyClient();

switch ($endpoint) {
    case "list_internal_campaign";  // Page 504
        $data = [
            "action" => "list"
        ];
        echo $client->get("/dunningcampaign/campaign_manage.php", $token, $data, true);
        break;
    case "list_dca_campaign";   // page 603
        $data = [
            // "type" => "2",
            "action" => "list"
        ];
        echo $client->get("/dunningcampaign/dca_campaign_manage.php", $token, $data, true);
        break;
    case "list_dunning";
        $data = [
            "action" => "list"
        ];
        echo $client->get("/dunningcampaign/dunning_manage.php", $token, $data, true);

        break;
    case "add_campaign";
        $input = json_decode(file_get_contents('php://input'), true);

        $data = [
            "action" => "add",
            "dunning_id" => $input['dunning_id'] ?? '',
            "campaign_name" => $input['campaign_name'] ?? '',
            "status" => $input['status'] ?? '1',
            "overdue_days" => $input['overdue_days'] ?? '0',
            "validity" => $input['validity'] ?? '',
            "callgroup" => $input['callgroup'] ?? '0',
            "type" => $input['type'] ?? '1',
            "remark" => $input['remark'] ?? '',

        ];
        echo $client->post("/dunningcampaign/campaign_manage.php", $token, $data);
        break;
    case "add_dunning";
        $input = json_decode(file_get_contents('php://input'), true);
        $name = $input['name'] ?? '';
        $priority = $input['priority'] ?? '';
        $remark = $input['remark'] ?? '';
        
        $data = [
            "action" => "add",
            "name" => $name,
            "priority" => $priority,
            "remark" => $remark,
        ];
        echo $client->get("/dunningcampaign/dunning_manage.php", $token, $data, false);
        break;

    case "edit_dunning";
        $input = json_decode(file_get_contents('php://input'), true);
        $dunningId = $input['id'] ?? '';
        $name = $input['name'] ?? '';
        $priority = $input['priority'] ?? '';
        $remark = $input['remark'] ?? '';
        
        $data = [
            "action" => "edit",
            "id" => $dunningId,
            "name" => $name,
            "priority" => $priority,
            "remark" => $remark,
        ];
        echo $client->get("/dunningcampaign/dunning_manage.php", $token, $data, false);
        break;
    
    case "view_campaign";

        $campaignId = $_GET['campaign_id'];
        $data = [
            "action" => "view",
            "id" => $campaignId,
        ];
        
        echo $client->get("/dunningcampaign/campaign_manage.php", $token, $data, false);
        break;

    case "view_dca_campaign"; // page 603, DCA > Campaign Setup

        $campaignId = $_GET['campaign_id'];
        $data = [
            "action" => "view",
            "id" => $campaignId,
        ];
        
        echo $client->get("/dunningcampaign/dca_campaign_manage.php", $token, $data, false);
        break;


    case "edit_campaign";

        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? '';
        $status = $input['status'] ?? '';
        $overdue_days = $input['overdue_days'] ?? '';
        $validity = $input['validity'] ?? '';
        $callgroup = $input['callgroup'] ?? '';
        $type = $input['type'] ?? '';
        $remark = $input['remark'] ?? '';

        $data = [
            "action" => "edit",
            "id" => $id,
            "status" => $status,
            "overdue_days" => $overdue_days,
            "validity" => $validity,
            "callgroup" => $callgroup,
            "type" => $type,
            "remark" => $remark,
        ];
        echo $client->post("/dunningcampaign/campaign_manage.php", $token, $data, false);
        break;


    case "edit_dca_campaign";

        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? '';
        $status = $input['status'] ?? '';
        $overdue_days = $input['overdue_days'] ?? '';
        $validity = $input['validity'] ?? '';
        $callgroup = $input['callgroup'] ?? '';
        $type = $input['type'] ?? '';
        $remark = $input['remark'] ?? '';

        $data = [
            "action" => "edit",
            "id" => $id,
            "status" => $status,
            "overdue_days" => $overdue_days,
            "validity" => $validity,
            "callgroup" => $callgroup,
            "type" => $type,
            "remark" => $remark,
        ];
        echo $client->post("/dunningcampaign/dca_campaign_manage.php", $token, $data, false);
        break;
    
    case "list_dunning_version";

        $dunningId = $_GET['dunning_id'];
        $data = [
            "action" => "list",
            "dunning_id" => $dunningId,
        ];
        echo $client->get("/dunningcampaign/dunning_version_manage.php", $token, $data, true);
    break;

    case "add_dunning_version";

        $input = json_decode(file_get_contents('php://input'), true);
        $dunningId = $input['dunningId'] ?? '';
        $version = $input['version'] ?? '';
        $status = $input['status'] ?? '';
        $remark = $input['remark'] ?? '';
        $criterias = $input['criteria'] ?? [];
        
        $data = [
            "action" => "add",
            "dunning_id" => $dunningId,
            "version" => $version,
            "status" => $status,
            "remark" => $remark,
        ];
        $editDunningVersionResult = $client->get("/dunningcampaign/dunning_version_manage.php", $token, $data, false);


        // only update dunning logic in status == 1 (Not used)
        if ($status == 1) {
            $editDunningVersionResultArray = json_decode($editDunningVersionResult, true);


            $editDunningVersionResponsArray = json_decode($editDunningVersionResultArray["response"], true);

            if (!$editDunningVersionResultArray["success"]) {
                
                if ($editDunningVersionResponsArray["error_code"] != 0 ) {
                    echo $editDunningVersionResult;
                    return;
                }
                
            }

            $versionId = $editDunningVersionResponsArray["version_id"];
            $logics = [];

            foreach ($criterias as $index => $item) {
                if (isset($item['enable']) && $item['enable'] === 'on') {
            
                    // Convert comma-separated string value into an array of integers
                    $valuesArray = [];
                    if (isset($item['value']) && "".$item['value'] !== '') {
                        // Split by commas and force clean integer casting
                        $valuesArray = explode(',', "".$item['value']); 
                    }

                    // Structure the object to match your endpoint's criteria fields
                    $logics[] = [
                        'criteria' => (int)$index,            // Maps the array index (e.g., 1, 2)
                        'operator' => (int)$item['option'],   // Maps your form option key
                        'values'   => $valuesArray            // Maps your cleaned array of ints
                    ];
                }
            };

            // echo json_encode($logics); exit();
            $data = [
                "action" => "edit",
                "version_id" => $versionId,
                "logics" => json_encode($logics)
            ];
            $editDunningLogicResponse = $client->get("/dunningcampaign/dunning_logic_manage.php", $token, $data, false);
            echo $editDunningLogicResponse;
        }
        else {
            echo $editDunningVersionResponse;
        }
    break;

    case "edit_dunning_version";
        $input = json_decode(file_get_contents('php://input'), true);
        $versionId = $input['id'] ?? '';
        $version = $input['version'] ?? '';
        $status = $input['status'] ?? '';
        $remark = $input['remark'] ?? '';
        $criterias = $input['criteria'] ?? [];

        $data = [
            "action" => "edit",
            "id" => $versionId,
            "version" => $version,
            "status" => $status,
            "remark" => $remark,
            // "criteria" => $criteria,
        ];

        $editDunningVersionResult =  $client->get("/dunningcampaign/dunning_version_manage.php", $token, $data, false);

        // only update dunning logic in status == 1 (Not used)
        if ($status == 1) {
            $editDunningVersionResultArray = json_decode($editDunningVersionResult, true);
            $editDunningVersionResponsArray = json_decode($editDunningVersionResultArray["response"], true);
            if (!$editDunningVersionResultArray["success"]) {
                
                if ($editDunningVersionResponsArray["error_code"] != 0 ) {
                    echo $editDunningVersionResult;
                    return;
                }
            }
            $logics = [];
            foreach ($criterias as $index => $item) {
                if (isset($item['enable']) && $item['enable'] === 'on') {
            
                    // Convert comma-separated string value into an array of integers
                    $valuesArray = [];
                    if (isset($item['value']) && "".$item['value'] !== '') {
                        // Split by commas and force clean integer casting
                        $valuesArray = explode(',', "".$item['value']); 
                    }

                    
                    // Structure the object to match your endpoint's criteria fields
                    $logics[] = [
                        'criteria' => (int)$index,            // Maps the array index (e.g., 1, 2)
                        'operator' => (int)$item['option'],   // Maps your form option key
                        'values'   => $valuesArray            // Maps your cleaned array of ints
                    ];

                }
            };


            // echo json_encode($logics); exit();
            $data = [
                "action" => "edit",
                "version_id" => $versionId,
                "logics" => json_encode($logics)
            ];
            $editDunningLogicResponse = $client->get("/dunningcampaign/dunning_logic_manage.php", $token, $data, false);
            echo $editDunningLogicResponse;
        }
        else {
            echo $editDunningVersionResult;
        }

        break;

    case "view_dunning_logic";
        $versionId = $_GET["versionId"];
        $data = [
            "action" => "view",
            "version_id" => $versionId
        ];
        echo $client->get("/dunningcampaign/dunning_logic_manage.php", $token, $data, true);
        break;
        
    case "edit_dunning_logic";

        $input = json_decode(file_get_contents('php://input'), true);
        $versionId = $input['version_id'] ?? '';
        $logic = $input['logic'] ?? '';
        
        $data = [
            "action" => "edit",
            "version_id" => $versionId,
            "logic" => $logic
        ];
        echo $client->get("/dunningcampaign/dunning_logic_manage.php", $token, $data, true);
        
        break;
    case "list_agent":
        $data = [
            "action" => "list",
        ];

        echo $client->get("/dunningcampaign/agent_manage.php", $token, $data, true);
        break;
    case "list_user_for_agent":
        $data = [
            "action" => "userforagent",
        ];

        echo $client->get("/dunningcampaign/agent_manage.php", $token, $data, true);
        break;
    case "add_agent":
        $input = json_decode(file_get_contents('php://input'), true);
        $userId = $input['user_id'] ?? '';
        $callerId = $input['caller_id'] ?? [];
        $callGroupId = $input['callgroup_id'] ?? '';
        $teamId = $input['team_id'] ?? '';
        $status = $input['status'] ?? '';

        // $remark = $input['remark'] ?? [];

        $data = [
            "action" => "add",
            "callgroup_id" => $callGroupId, 
            "user_id" => $userId,
            "status" => $status,
            "team" => $teamId, 
            "caller_id" => $callerId,
        ];

        //action=add&callgroup_id=1&user_id=15&status=1&team=12
        echo $client->get("/dunningcampaign/agent_manage.php", $token, $data, false);
        break;

    case "view_agent":

        $data = [
            "action" => "view",
            "id" => $_GET['agentId'], 
        ];

        echo $client->get("/dunningcampaign/agent_manage.php", $token, $data, false);
        break;
    case "edit_agent":

        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? '';
        $callGroupId = $input['callgroup_id'] ?? '';
        $status = $input['status'] ?? '';
        $team = $input['team'] ?? '';
        $callerId = $input['caller_id'] ?? [];
        $remark = $input['remark'] ?? [];

        $data = [
            "action" => "edit",
            "id" => $id,
            "callgroup_id" => $callGroupId, 
            "status" => $status,
            "team" => $team, 
            "caller_id" => $callerId,
            "remark" => $remark
        ];

        echo $client->get("/dunningcampaign/agent_manage.php", $token, $data, false);
        break;
    case "get_disposition_history":
            $input = json_decode(file_get_contents('php://input'), true);
            $accountNo = $input['accountNo'] ?? '';
            $data = [
                "action" => "get_history",
                "acc_id" => $accountNo
            ];

            echo $client->get("/dunningcampaign/agent_disposition.php", $token, $data, false);

        break;
    case "list_dca_profile":
        $data = [
            "action" => "list"
        ];
        
        echo $client->get("/dunningcampaign/dca_manage.php", $token, $data, false);
        break;

    case "add_dca_profile":
        $input = json_decode(file_get_contents('php://input'), true);

        $data = [
            "action" => "add",
            "dca_code" => $input["dca_code"],
            "dca_name" => $input["dca_name"],
            "dca_brn" => $input["dca_brn"],
            "dca_email" => $input["dca_email"],
            "gst_code" => $input["gst_code"],
            "agreement_start_date" => $input["agreement_start_date"],
            "agreement_end_date" => $input["agreement_end_date"],
            "bank_guarantee_issuer" => $input["bank_guarantee_issuer"],
            "bank_name" => $input["bank_name"],
            "bank_account_num" => $input["bank_account_num"],
            "bank_guarantee_cert_num" => $input["bank_guarantee_cert_num"],
            "bank_guarantee_start_date" => $input["bank_guarantee_start_date"],
            "bank_guarantee_end_date" => $input["bank_guarantee_end_date"],
            "insurance_policy_num" => $input["insurance_policy_num"],
            "insurance_policy_start_date" => $input["insurance_policy_start_date"],
            "insurance_policy_end_date" => $input["insurance_policy_end_date"],
            "contact_name" => $input["contact_name"],
            "contact_phone1" => $input["contact_phone1"],
            "contact_phone2" => $input["contact_phone2"],
            "contact_email" => $input["contact_email"],
            "contact_fax" => $input["contact_fax"],
            "contact_address" => $input["contact_address"],
            "dca_group_standard" => $input["dca_group_standard"],
            "dca_group_spdca" => $input["dca_group_spdca"],
            "dca_group_adhoc" => $input["dca_group_adhoc"],
            "status" => $input["status"],
            "ranking" => $input["ranking"],
        ];
        echo $client->post("/dunningcampaign/dca_manage.php", $token, $data, false);

        break;
    case "edit_dca_profile":
        $input = json_decode(file_get_contents('php://input'), true);

        $data = [
            "action" => "edit",
            "dca_id" => $input["dca_id"],
            "dca_code" => $input["dca_code"],
            "dca_name" => $input["dca_name"],
            "dca_brn" => $input["dca_brn"],
            "dca_email" => $input["dca_email"],
            "gst_code" => $input["gst_code"],
            "agreement_start_date" => $input["agreement_start_date"],
            "agreement_end_date" => $input["agreement_end_date"],
            "bank_guarantee_issuer" => $input["bank_guarantee_issuer"],
            "bank_name" => $input["bank_name"],
            "bank_account_num" => $input["bank_account_num"],
            "bank_guarantee_cert_num" => $input["bank_guarantee_cert_num"],
            "bank_guarantee_start_date" => $input["bank_guarantee_start_date"],
            "bank_guarantee_end_date" => $input["bank_guarantee_end_date"],
            "insurance_policy_num" => $input["insurance_policy_num"],
            "insurance_policy_start_date" => $input["insurance_policy_start_date"],
            "insurance_policy_end_date" => $input["insurance_policy_end_date"],
            "contact_name" => $input["contact_name"],
            "contact_phone1" => $input["contact_phone1"],
            "contact_phone2" => $input["contact_phone2"],
            "contact_email" => $input["contact_email"],
            "contact_fax" => $input["contact_fax"],
            "contact_address" => $input["contact_address"],
            "dca_group_standard" => $input["dca_group_standard"],
            "dca_group_spdca" => $input["dca_group_spdca"],
            "dca_group_adhoc" => $input["dca_group_adhoc"],
            "status" => $input["status"],
            "ranking" => $input["ranking"],
        ];
        echo $client->post("/dunningcampaign/dca_manage.php", $token, $data, false);

        break;

    case "view_dca_profile":

        $data = [
            "action" => "view",
            "dca_id" => $_GET['id']
        ];
        
        echo $client->get("/dunningcampaign/dca_manage.php", $token, $data, false);
        break;
    case "view_dca_weight":
        $data = [
            "action" => "viewweight",
        ];
        
        echo $client->get("/dunningcampaign/dca_manage.php", $token, $data, false);
        break;

    case "edit_dca_weight":
        $input = json_decode(file_get_contents('php://input'), true);

        $data = [
            "action" => "editweight",
            "dca_group" => $input["dca_group"],
            "dca_weight" => json_encode($input["dca_weight"]),

        ];
        
        echo $client->post("/dunningcampaign/dca_manage.php", $token, $data, false);
        break;
    
    case "list_nod_dispatch_schedule";
        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "action" => "list_schedule",       // init, getcontent
        ];

        echo $client->get("/dunningcampaign/nod_dispatch_manage.php", $token, $data, false);
        break;
    
    case "download_nod_account_list";   // Page 605
        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "action" => "init",       // init, getcontent
        ];

        $response =json_decode($client->get("/dunningcampaign/nod_account_download.php", $token, $data), true);
        if ($response["success"] == 1 ){
            $responseArray = json_decode($response["response"], true);

            $id = $responseArray["id"];
            $dataContent = [
                "action" => "getcontent",       // init, getcontent
                "id" => $id,
            ];
            $errCode = 5;      
            $excelFileDownloadResponse = null;
            $MAX_TIMEOUT = 10;
            $count = 0;
            while ($errCode == 5 && $count < $MAX_TIMEOUT) {
                $excelFileDownloadResponse = json_decode($client->get("/dunningcampaign/nod_account_download.php", $token, $dataContent), true);
                $excelFileDownloadResponseArray = json_decode($excelFileDownloadResponse["response"], true);
                $errCode = $excelFileDownloadResponseArray["error_code"];
                sleep(5);

                $count ++;

            }

            if ( $count >= $MAX_TIMEOUT ){
                $return = [
                    "success" => false,
                    "response" => [
                        "error_description" => "Download file timeout"
                    ]   
                ];

                echo json_encode($return); 
                return;
            }

            if ( $excelFileDownloadResponse["success"] == 1 ) {
                $excelFileDownloadReponseArray = json_decode($excelFileDownloadResponse["response"], true);

                // $dir = "files";
                // $dir = "/tmp/";
                
                $filename = "nod_account_list".date("YmdHis")."_".rand(1000, 9999).".xlsx";
                $excelFileName = sys_get_temp_dir()."/". $filename;
                $result = file_put_contents($excelFileName, base64_decode($excelFileDownloadReponseArray["filecontent"]));
                if ($result !== false ) {
                    $return = [
                        "success" => true,
                        "response" => $filename
                    ];
                    echo json_encode($return);
                    $_SESSION["nod_account_list"] = $filename;
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

    case "upload_nod_account_list";      // Page 605
        $input = json_decode(file_get_contents('php://input'), true);

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

        $data = [
            "filecontent" => $base64,
            "filename" => $originalName,
        ];
        echo $client->get("/dunningcampaign/nod_dispatch_manage.php", $token, $data, false);
        break;
    
    case "view_nod_dispatch_schedule";
        // $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            "action" => "view_schedule",
            "schedule_id" => $_GET["schedule_id"]
        ];
        echo $client->get("/dunningcampaign/nod_dispatch_manage.php", $token, $data, false);

        break;

    case "view_nod_dispatch_schedule";
        $data =  [
            "action" => "view"
        ];
        break;

    default:
        http_response_code(404);

        echo json_encode([
            "error" => "Unknown endpoint"
        ]);
}