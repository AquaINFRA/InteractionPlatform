<?php

//Test UI
if(!empty($_GET)) {
 
    $url = 'http://127.0.0.1/html/nfdi/api/';
    $data = ['name' => $_GET['name'],
             'email' => $_GET['email'],
             'subject' => $_GET['subject'],
             'message' => $_GET['message']];

    // use key 'http' even if you send the request to https://...
    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data),
        ],
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === false) {
        
    }

var_dump($result);
    var_dump($http_response_header);
}

print '
<form name="contactForm">
<div>
    <label for="input_name">Name</label>
    <input id="input_name" name="name" value="Mai Name">
</div>
<div>
    <label for="input_mail">Email</label>
    <input id="input_mail" name="email" value="test@mailaddress.de">
</div>
<div>
    <label for="input_subject">Anliegen</label>
    <input id="input_subject" name="subject" value="Some more subject please">
</div>
<div>
    <label for="input_content">Nachricht</label>
    <textarea id="input_content" name="message">Hi there, Id like to learn more</textarea>
</div>
<input type="submit">
</form>';