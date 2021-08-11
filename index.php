<?php

header('Access-control-allow-origin *');
header('Access-Control-Allow-Methods: PUT, POST, OPTIONS, DELETE, GET');

$merchantid = '053f5757-b9e0-eb11-bacb-000d3addda2d'; // merchant id from api settings
$apikey = 'zXCzSDQ$#'; // api key from api settings
$source_code = '8052'; // source code from api settings
$requestLang = 'es-ES'; // Language ;
$base64encode = base64_encode($merchantid . ':' . $apikey);
$demo = false; // false - if need to start payments; true - demo mode;


/* Incoming params */
$email = $_REQUEST['Email'];
$name = $_REQUEST['Name'];
$cartItems = $_REQUEST['cartItems'];
$phone = $_REQUEST['Phone'];
$price = $_REQUEST['amount'] * 100;
$adress = $_REQUEST['Textarea_4'] . ' ' . $_REQUEST['Textarea'] . ' ' . $_REQUEST['Textarea_2'] . ' ' . $_REQUEST['Textarea_3'] . '; ' . $_REQUEST['newdelivery'] ;
$comment = $_REQUEST['Comment'];
/* End incoming params */

if (isset($_REQUEST['Comment'])) {
    $comment = 'Comentario: ' . $_REQUEST['Comment'];
}
if ($demo) {
    $CURLOPT_URL = 'https://demo.vivapayments.com/api/orders';
    $CURL_URL = 'https://demo.vivapayments.com/web/checkout?ref=';
} else {
    $CURLOPT_URL = 'https://www.vivapayments.com/api/orders';
    $CURL_URL = 'https://www.vivapayments.com/web/checkout?ref=';
}

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => $CURLOPT_URL,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS =>'{
    "amount": " ' .$price. ' ",
    "email": " ' .$email. ' ",
    "fullName": " ' .$name. ' ",
    "phone": " ' .$phone. ' ",
    "customerTrns": " ' .$cartItems . ' ' . $adress . '; ' .$comment .' ",
    "requestLang": "'.$requestLang.'",
    "sourceCode": "'.$source_code.'"
}',
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Authorization: Basic ' . $base64encode
    ),
));
$response = curl_exec($curl);
curl_close($curl);
$order_id = json_decode($response)->OrderCode;
$order_location = $CURL_URL . $order_id;
echo $order_location;

//header('Location: ' . $order_location);
//exit;
