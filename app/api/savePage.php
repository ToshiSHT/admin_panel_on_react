<?php
$_POST = json_decode (file_get_contents("php://input"),true);
$file = $_POST["pageName"]; // путь
$newHTML = $_POST["html"]; 

if (!is_dir("../backups/")) { // проверка существует ли папка
   mkdir("../backups/"); // создает папку
}
$backups = json_decode(file_get_contents("../backups/backups.json")); // получаем данные из файла
if(!is_array($backups))
{
   $backups = [];
}

if ($newHTML && $file) {
   $backupFN = uniqid() . ".html";
   copy("../../" . $file, "../backups/" . $backupFN ); // копирует фаил 
   array_push($backups, ["page" => $file, "file" => $backupFN,"time" => date("H:i:s d:m:y" )]); // ассоциативный массив
   file_put_contents("../backups/backups.json", json_encode($backups));
   file_put_contents("../../" . $file,$newHTML); // сохраняет файл (куда, что)
} else {
     header("HTTP/1.0 400 Bad Request");
}