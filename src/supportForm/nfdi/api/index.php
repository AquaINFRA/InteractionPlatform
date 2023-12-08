<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once 'config.php';

require 'vendor/autoload.php';

$contentFields = array(
    'name' 	    => 'Name',
    'email' 	=> 'Email address',
    'subject'   => 'Subject',
    'message' 	=> 'Message'
);

$mail = new PHPMailer(true);

try {

    if (!empty($_POST)) {

        if(SMTP_DEBUG)
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;  
        else
            $mail->SMTPDebug = 0;                      

        $mail->isSMTP();                                           
        $mail->Host       = SMTP_SERVER;                    
        $mail->SMTPAuth   = true;                                  
        $mail->Username   = SMTP_USER;                     
        $mail->Password   = SMTP_PASSWORD;                            
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;           
        $mail->Port       = 587;                                   

        //Recipients
        $mail->setFrom(SENDER_MAIL, SENDER_NAME);
        $mail->addAddress(RECIPIENT_MAIL, RECIPIENT_NAME);   

        //Content
        $mail->isHTML(true);                                  
		$mail->CharSet = "UTF-8";
        $mail->Subject = 'NFDI4earth Support form';

        $htmlMail = '<b>The message below was sent via the NFDI4Earth support form</b><br><br>';

        if (count($_POST) == count($contentFields)) {

            $send = true;

            // validate email
            if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
                $send = false;
            }

            // check and add post fields
            foreach ($_POST as $key => $value) {

                if (isset($contentFields[$key]) && strlen($value)>0) {
                    
                    if ($key == 'message') {
                        $htmlMail .= "<br><b>$contentFields[$key]:</b> <br>";

                        $htmlMail .= nl2br($value);
                    }
                    else {
                        $htmlMail .= "<b>$contentFields[$key]:</b> $value<br>";
                    }
                } else
                    $send = false;
            }

            $mail->Body    = $htmlMail;

            if($send) {

                // add reply
                $mail->addReplyTo($_POST['email'], $_POST['name']); 
                 
                $mail->send();
                http_response_code(200);
            } else
                http_response_code(400);

        } else 
            http_response_code(400);
        
    } else 
        http_response_code(400);

} catch (Exception $e) {
    //echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    http_response_code(400);
}