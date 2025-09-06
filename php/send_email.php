<?php
header('Content-Type: application/json');

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields and sanitize data
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    // Check that data was sent to the mailer
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(array("message" => "Please complete the form and try again."));
        exit;
    }

    // Set the recipient email address (change to your email)
    $recipient = "specialcodes29@gmail.com";
    
    // Set the email subject
    $email_subject = "New contact from $name: $subject";

    // Build the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Subject: $subject\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers
    $email_headers = "From: $name <$email>";

    // Send the email
    if (mail($recipient, $email_subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo json_encode(array("message" => "Thank you! Your message has been sent."));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Oops! Something went wrong and we couldn't send your message."));
    }

} else {
    http_response_code(403);
    echo json_encode(array("message" => "There was a problem with your submission, please try again."));
}
?>