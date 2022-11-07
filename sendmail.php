<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "phpmailer/src/Exception.php";
    require "phpmailer/src/PHPMailer.php";
    
    $mail = new PHPMailer(true);
    $mail->CharSet = "UTF-8";

    $name = $_POST["name"];
    $number = $_POST["number"];
    $email = $_POST["email"];
    $image = $_POST["image"];

    $body = $name . ' ' . $number . ' ' . $email . ' ' . $image;
    $theme = "[Заявка с формы]";

    $mail->addAddress("shakirova.2797@mail.ru");

    $mail->Subject = $theme;
    $mail->Body = $body;

    $mail->send();
?>



