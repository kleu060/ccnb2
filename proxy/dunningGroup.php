<?php

include_once('config.php');
require_once "../lib/auth.php";
require_once "../lib/ProxyClient.php";
require_once    '../lib/classes/ConstMapping.php';

$endpoint = $_GET['endpoint'] ?? '';
$client = new ProxyClient();

switch ($endpoint) {
    case "list_dunning";
        $data = [
            "action" => "list"
        ];
        echo $client->get("/dunningcampaign/dunning_manage.php", $token, $data, true);

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
    default:
        http_response_code(404);

        echo json_encode([
            "error" => "Unknown endpoint"
        ]);
}