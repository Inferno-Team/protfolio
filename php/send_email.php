<?php
require_once "../vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;

function send_mail($email, $recipient_name, $message = '')
{
    // require("phpmailer/class.phpmailer.php");

    $mail = new PHPMailer(false);

    $mail->CharSet = "utf-8";
    $mail->IsSMTP();                                      // Set mailer to use SMTP
    $mail->Host = "smtp.ionos.com";  // Specify main and backup server
    $mail->SMTPAuth = true;     // Turn on SMTP authentication
    $mail->Username = "admin@inferno-team.cloud";  // SMTP username
    $mail->Password = "inferno-team"; // SMTP password
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    $mail->setFrom('project@inferno-team.cloud', 'Project -Protfolio');
    // $mail->FromName = "Test-Email";
    $mail->addAddress($email, $recipient_name);
    // $mail->addCC('admin@inferno-team.cloud');

    $mail->WordWrap = 50;                                 // Set word wrap to 50 characters
    $mail->IsHTML(true);                                  // Set email format to HTML (true) or plain text (false)

    $mail->Subject = "New Project Idea";
    $mail->Body    = $message;
    // $mail->AltBody = "This is the body in plain text for non-HTML mail clients";
    // $mail->AddEmbeddedImage('images/logo.png', 'logo', 'logo.png');
    // $mail->addAttachment('files/file.xlsx');

    if (!$mail->Send()) {
        // echo "Message could not be sent. <p>";
        // echo "Mailer Error: " . $mail->ErrorInfo;
        return json_encode(['result' => "Message could not be sent."]);
        exit;
    }
    return json_encode(['result' => "Message has been sent"]);
    // echo "Message has been sent";
}
if (!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['project'])) {
    echo json_encode(['result' => "All field is required."]);
    exit;
}
$email = $_POST['email'];
$name = $_POST['name'];
$project = $_POST['project'];
$msg = "Hi, New Project Idea From $name email : $email <br>$project";
echo send_mail("project@inferno-team.cloud", 'project@inferno-team.cloud', $msg);
send_mail($email, $name, 'Thank you for your idea <br>We will be in touch soon.');
exit;
