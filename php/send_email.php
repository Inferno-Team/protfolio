<?php
require_once "../vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
$env = parse_ini_file(".env");
function send_mail($email, $recipient_name, $message = '')
{

    global $env;
    $mail = new PHPMailer(false);

    $mail->CharSet = "utf-8";
    $mail->IsSMTP(); // Set mailer to use SMTP
    $mail->Host = "smtp.gmail.com";  // Specify main and backup server
    $mail->SMTPAuth = true;     // Turn on SMTP authentication
    $mail->Username =  $env["Username"];  // SMTP username
    $mail->Password = $env["Password"]; // SMTP password
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    $mail->setFrom($env["Username"], 'Project -Protfolio');
    $mail->addAddress($email, $recipient_name);

    $mail->WordWrap = 50;                                 // Set word wrap to 50 characters
    $mail->IsHTML(true);                                  // Set email format to HTML (true) or plain text (false)

    $mail->Subject = "New Project Idea";
    $mail->Body    = $message;

    if (!$mail->Send()) {
        return json_encode(['result' => "Message could not be sent.",'reason' =>  $mail->ErrorInfo]);
        exit;
    }
    return json_encode(['result' => "Message has been sent"]);
}
if (!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['project'])) {
    echo json_encode(['result' => "All field is required."]);
    exit;
}
$email = $_POST['email'];
$name = $_POST['name'];
$project = $_POST['project'];
$msg = "Hi, New Project Idea From $name email : $email <br>$project";
echo send_mail($email, $env["Username"], $msg);
send_mail($email, $name, 'Thank you for your idea <br>We will be in touch soon.');
exit;
