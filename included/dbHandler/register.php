<?php
if($_POST["type"] == "register")
{
    if(isset($_SESSION["username"]))
    {
        echo "Kirjaudu ulos ensin";
        return false;
    }

    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    $re = $db->register($_POST["username"], $password, $_POST["email"], $_POST["puh"]);
    if($re == true){
        $path = "users/" . $_POST["username"];
        mkdir($path, 0771);
        mkdir($path . "/uploaded", 0771);
        mkdir($path . "/projects", 0771);
        echo "Register succesful";
    }

}
