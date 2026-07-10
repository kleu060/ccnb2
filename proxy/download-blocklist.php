<?php

include_once('config.php');
require_once "../lib/auth.php";

// Define the file name and path
$file = $_GET["file"];
$filePath = 'files/'.$file;
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