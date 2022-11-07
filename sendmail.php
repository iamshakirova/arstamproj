<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru','phpmailer/language/');
    $mail->IsHTML(true);

    $mail->setFrom('Новый пользователь');
    $mail->addAddress ('shakirova.2797@mail.ru');
    $mail->Subject = 'Привет!';

    $body ='<h1>Новая заявка</h1>';

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong>'.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p>strong>E-mail:</strong> '.$_POST ['email'].'</p>';
    }
    if(trim(!empty($_POST['number']))){
        $body.='<p>strong>Номер телефона:</strong>'.$_POST ['number'].'</p>';
    }


    $mail->Body = $body;


    if (!$mail->send()) {
        $message ='Ошибка';
    } else {
        $message ='Данные отправлены!';
    }
    $response =['message' => $message];

    header ('Content-type: application/json');
    echo json_encode ($response);

?>
