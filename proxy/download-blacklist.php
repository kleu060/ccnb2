<?php

include_once('config.php');
require_once "../lib/auth.php";

// Define the file name and path
// 1. Sanitize the input immediately to prevent Path Traversal attacks
$file = basename($_GET["file"]);

// 2. Dynamically fetch the absolute path to your Document Root
$docRoot = rtrim($_SERVER['DOCUMENT_ROOT'], '/');

// Define the file name and path
if ($file == "sample-id-blacklist.xlsx") {
    // This dynamically resolves to: /var/www/html/ccnb2/proxy/files/sample-id-blacklist.xlsx
    $filePath = $docRoot . '/ccnb2/proxy/files/' . $file;
}
else {
    $filePath = sys_get_temp_dir().'/'.$file;
}

$downloadName = $file; // Name the user will see

// Check if the file actually exists
if (file_exists($filePath)) {
    // Clean output buffer to prevent corrupted file downloads
    if (ob_get_level()) { ob_end_clean(); }

    // Set standard HTTP headers for XLSX download
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment; filename="' . basename($downloadName) . '"');
    header('Content-Length: ' . filesize($filePath));
    header('Cache-Control: max-age=0');
    
    // Clear system cache and read the file to output stream
    flush();
    readfile($filePath);
    exit;
} else {
    http_response_code(404);
    echo "Error: The requested file does not exist.";
}
?>