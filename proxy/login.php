<?php

session_start();
include_once('config.php');
require_once __DIR__.'/../proxy/helpers.php';

// if(!isset($_SESSION['access_token'])){
//     http_response_code(401);
//     exit;
// }

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';
$checkedAgreeLegalNotice = $data['chk-agree-legal-notice'] ?? '';

if ( $checkedAgreeLegalNotice != "agree" ) {
   echo json_encode([
        "success" => false,
        "error_code" => 50,
        "error_description" => "You did not agree no legal term"
    ]); 
    return;
}
$verbose = fopen('php://temp', 'w+');

$url = API_URL."/auth/login.php?username=".$username."&password=".$password;
$ch = curl_init($url);
// echo $url; exit();

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json"
    ],
    CURLOPT_POSTFIELDS => json_encode([
        "username" => $username,
        "password" => $password
    ]),
    CURLOPT_VERBOSE => true,
    CURLOPT_STDERR => $verbose,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// print_r($response); exit();
rewind($verbose);
$verboseLog = stream_get_contents($verbose);
curl_close($ch);

writeCurlLog('POST', $url , "", [], $response, $httpCode, $verboseLog);
$result = json_decode($response, true);

if (isset($result['access_token'])) {
// if ( true ) {
    $_SESSION['user_id'] = $result['user_id'];
    $_SESSION['access_token'] = $result['access_token'];
    $_SESSION['username'] = $username;
    $_SESSION['allowed_pages'] = $result['allowed_pages'];
    $_SESSION['force_change_pw'] = $result['force_change_pw'];
    $_SESSION['group_name'] = $result['group_name'];
    
    // $_SESSION['access_token'] = rand(1000, 9999);

    echo json_encode([
        "success" => true,
        "username" => $username,
        'force_change_pw' => $result['force_change_pw']
    ]);

} else {

    http_response_code(401);
    echo json_encode([
        "success" => false,
        "error_code" => $result["error_code"] ?? "98",
        "error_description" => $result["error_description"] ?? "API server not responding"
    ]);
}