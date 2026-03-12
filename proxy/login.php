<?php

session_start();
include_once('config.php');
// if(!isset($_SESSION['access_token'])){
//     http_response_code(401);
//     exit;
// }

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';


$ch = curl_init(API_URL."/login");

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json"
    ],
    CURLOPT_POSTFIELDS => json_encode([
        "username" => $username,
        "password" => $password
    ])
]);
$response = curl_exec($ch);
curl_close($ch);

$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);

if (isset($result['access_token'])) {
// if ( true ) {
    $_SESSION['access_token'] = $result['access_token'];
    // $_SESSION['access_token'] = rand(1000, 9999);

    echo json_encode([
        "success" => true
    ]);

} else {

    http_response_code(401);
    echo json_encode([
        "success" => false,
        "error_code" => $response["error_code"] ?? "",
        "error_description" => $response["error_description"] ?? ""
    ]);
}