<?php
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Get form data
$name    = $_POST['full_name'] ?? '';
$email   = $_POST['email'] ?? '';
$phone   = $_POST['phone'] ?? '';
$topic   = $_POST['topic'] ?? '';
$experience   = $_POST['experience'] ?? '';
$learning_level   = $_POST['learning_level'] ?? '';
$message = $_POST['message'] ?? '';
$submitted_from = $_POST['submitted_from'] ?? '';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo "Invalid email address.";
  exit;
}

// Create a new PHPMailer instance
$mail = new PHPMailer(true);

try {
  // Server settings
  $mail->isSMTP();
  $mail->Host       = 'email-smtp.us-east-2.amazonaws.com';
  $mail->SMTPAuth   = true;
  $mail->Username   = 'AKIA5QLOYHUQJIMQYOHR';     // SMTP username
  $mail->Password   = 'BAFEY7ztKihEtM4jm3bUQXGRf6PoKXeFLYy//mre5p2i';        // SMTP app password
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port       = 587;

  // Sender and recipient
  $senderEmail = 'noreply@evokeinteractive.com';
  $senderName = 'Evokeinteractive';
  $mail->setFrom($senderEmail, $senderName);
  $mail->addAddress('dhina@tekclarion.com'); // Your receiving email address

  // Content
  $mail->isHTML(true);
  $mail->Subject = "New contact form submission from $submitted_from";
  $mail->Body    = "<strong>Full Name:</strong> $name<br>
                      <strong>Email Address:</strong> $email<br>
                      <strong>Phone Number:</strong> $phone<br>
                      <strong>Message:</strong><br>$message";
  if($submitted_from == 'Teacher'){
    $mail->Body    .= "<strong>What Can I Teach:</strong> $topic<br>
                      <strong>My Teaching Experience:</strong> $experience";
  }else
  if($submitted_from == 'Student'){
    $mail->Body    .= "<strong>What I Want To Learn:</strong> $topic<br>
                      <strong>My Learning Level:</strong> $learning_level";
  }

  $mail->send();
  echo "Data sent successfully!";
} catch (Exception $e) {
  http_response_code(500);
  echo "Data could not be sent.";
}
