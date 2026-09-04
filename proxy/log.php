<?php

$data = json_decode(file_get_contents('php://input'), true);

$level = $data['level'] ?? 'info';
$message = $data['message'] ?? '';
$user = $data['user'] ?? '';

$date = date("Y_m_d");
$timestamp = date('Y-m-d H:i:s');

$logLine = sprintf(
    "[%s] [%s] [%s] %s\n",
    $timestamp,
    strtoupper($level),
    $user,
    substr($message, 0, 3000)
);

error_log($logLine);

// $logDir = '/var/log/ccnb2/';
// $logFile = $logDir . '/app_'.$date.'.log';

// if (!is_dir($logDir)) {
//     mkdir($logDir, 0777, true);
// }

// file_put_contents(
//     $logFile,
//     $logLine,
//     FILE_APPEND
// );

// echo json_encode([
//     'success' => true
// ]);