<?php

include_once('config.php');
require_once "../lib/auth.php";
require_once "../lib/ProxyClient.php";
require_once    '../lib/classes/ConstMapping.php';

$endpoint = $_GET['endpoint'] ?? '';
$client = new ProxyClient();

switch ($endpoint) {

    case "add_user";

        $input = json_decode(file_get_contents('php://input'), true);
        $username = $input['user_name'] ?? '';
        $password = $input['password'] ?? '';
        $groupId = $input['group_id'] ?? '';
        $fullName = $input['full_name'] ?? '';
        $department = $input['department'] ?? '';
        $phone = $input['phone'] ?? '';
        $email = $input['email'] ?? '';
        $remark = $input['remark'] ?? '';
        
        $data = [
            "user_name" => $username,
            "password" => $password,
            "group_id" => $groupId,
            "full_name" => $fullName,
            "department" => $department,
            "phone" => $phone,
            "email" => $email,
            "remark" => $remark,
        ];


        echo $client->get("/usergroup/useradd.php", $token, $data, true);
        break;
    
    case "view_user";
        $input = json_decode(file_get_contents('php://input'), true);
        $userId = $input['user_id'] ?? '';

        $data = [
            "user_id" => $userId,
        ];

        echo $client->get("/usergroup/userview.php", $token, $data, true);
        break;
    case "edit_user";
        $input = json_decode(file_get_contents('php://input'), true);
        $userId = $input['user_id'] ?? '';
        $groupId = $input['group_id'] ?? '';
        $fullName = $input['full_name'] ?? '';
        $department = $input['department'] ?? '';
        $phone = $input['phone'] ?? '';
        $email = $input['email'] ?? '';
        $remark = $input['remark'] ?? '';

        $data = [
            "user_id" => $userId,
            "group_id" => $groupId,
            "full_name" => $fullName,
            "department" => $department,
            "phone" => $phone,
            "email" => $email,
            "remark" => $remark,
        ];

        echo $client->get("/usergroup/useredit.php", $token, $data, true);
        break;
    default:

        http_response_code(404);

        echo json_encode([
            "error" => "Unknown endpoint"
        ]);
}