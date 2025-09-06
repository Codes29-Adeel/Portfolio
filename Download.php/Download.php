<?php
// Set the file path
$filename = 'Download.php/Download.php';

if (file_exists($filename)) {
    // Set headers to force download
    header('Content-Description: File Transfer');
    header('Content-Type: application/pdf'); // You can also use: application/octet-stream
    header('Content-Disposition: attachment; filename="' . basename($filename) . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filename));
    flush(); // Flush system output buffer
    readfile($filename); // Read and send the file to the browser
    exit;
} else {
    echo "File not found.";
}
?>
