# nfdi4earth-phpmailer

This php-script serves as a backend to provide a mailing functionality to the given NFDI4Earth frontend dev.

## Functionality

The script is called via HTTP POST with the relevant input data as payload. Those are vaildated and send via SMTP using [PHPMailer](https://github.com/PHPMailer/PHPMailer).
All required POST data is pre-defined by input-name to enable a validation check. Changes to the number or naming of the frontend input data stipulates an adjustment of this validation.

SMTP provider and credentials can be configured as needed.

## Configuration

To enable the POST data validation, please use the following values as input-name attributes only:

```bash
name
email
subject
message
```

All SMTP and sender/recipient data can be configured using the config.php file.

## Response

Following a successfull submit, a HTTP status 200 is send. In all other cases a HTTP status 400 is submitted. To activate server-side debugging messages, set

```bash
define('SMTP_DEBUG',true);
```

within config.php.
