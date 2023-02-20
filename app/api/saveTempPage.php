<?php
$_POST = json_decode (file_get_contents("php://input"),true);
$newFile = "../../aadawqe324we1ras.html"; // путь

if ($_POST["html"]) {
   file_put_contents($newFile,$_POST["html"]); // сохраняет файл (куда, что)
} else {
     header("HTTP/1.0 400 Bad Request");
}