<?php
session_start(); // включение работы с сессиями
if ($_SESSION["auth"] == true ) {
    $_SESSION["auth"] = false; //меняем значение
    unset($_SESSION["auth"]); // удаляем значение
    session_destroy(); // завершение сессии
}