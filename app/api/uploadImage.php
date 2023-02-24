<?php


if (file_exists($_FILES["image"]['tmp_name']) && is_uploaded_file($_FILES["image"]['tmp_name'])){
    $fileExt = explode("/",$_FILES["image"]['type'])[1]; // достаем тип переданного изображения(png/jpeg) 
    $fileName = uniqid() . "." .  $fileExt;
    move_uploaded_file($_FILES["image"]['tmp_name'], "../../img/" . $fileName); //премещаем переданное изображение
    echo json_encode(array('src' => "../../img/" . $fileName));
}