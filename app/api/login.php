<?php
session_start(); // включение работы с сессиями
$_POST = json_decode (file_get_contents("php://input"),true);

$password =$_POST["password"];
$userName = $_POST['username'];

if ($password && $userName) {
    $settings = json_decode (file_get_contents("./settings.json"),true);
    if($password == $settings["password"] && $userName == $settings["username"]) {
        $_SESSION["auth"] = true;
        echo json_encode( array("auth" => true));
    } else {
          echo json_encode( array("auth" => false));
    }
} else {
    header("HTTP/1.0 400 Bad Request"); // выброс ошибки
}