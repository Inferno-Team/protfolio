<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once "../vendor/autoload.php";
try {
    // Create instance of PHPMailer class
    $mail = new PHPMailer(true);
    // if ($debug) {
    //     // issue a detailed log
    //     // $mail->SMTPDebug = \PHPMailer\PHPMailer\SMTP::DEBUG_SERVER;
    // }
    // Authentication with SMTP
    $mail->isSMTP();
    $mail->SMTPAuth = true;
    // Login
    $mail->Host = "smtp.ionos.com";
    $mail->Port = "465";
    $mail->Username = "admin@inferno-team.cloud";
    $mail->Password = "inferno-team";
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    // $mail-> addAttachment("/home/user/Desktop/sampleimage.png", "sampleimage.png");
    $mail->addAddress('mohammed.9issa@gmail.com');
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';
    $mail->isHTML(true);
    $mail->Subject = 'The subject of your mail';
    $mail->Body = 'The mail text in HTML content. <b>bold</b> elements are allowed.';
    $mail->AltBody = 'The text as a simple text element';
    $mail->send();
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: " . $mail->ErrorInfo;
}
