<?php session_start();

if(isset($_SERVER["REQUEST_URI"]))
{
    if(!stripos($_SERVER["REQUEST_URI"],"index.php?") && !stripos($_SERVER["REQUEST_URI"],"navigator.php")){
        $temp = substr($_SERVER["REQUEST_URI"], 1);
        $temp = explode("/",$temp);
        if($temp[0] != ""){
            $_POST["main"] = $temp[0];
        }
        else
        {
            $_POST["main"] = "Etusivu";
        }
        if(isset($temp[1]) && $temp[1] != "")
        {
            $_POST["sub"] = $temp[1];
        }
        if(isset($temp[2]) && $temp[2] != "")
        {
            $_POST["id"] = $temp[2];
        }
    }
    else
    {
        if(isset($_GET["main"]))
            $_POST["main"] = $_GET["main"];
        if(isset($_GET["sub"]))
            $_POST["sub"] = $_GET["sub"];
        if(isset($_GET["id"]))
            $_POST["id"] = $_GET["id"];

    }

}
else
{
        $_POST["main"] = "Etusivu";
}
$site = $_POST["main"];
if(strpos($site, "?") !== false){
    $splitted = explode("?",$site);
    $site = $splitted[0];
}
$sub = "";
$id = "";
if (isset($_POST["sub"]) && $_POST["sub"] != "undefined" ) {
    $sub = $_POST["sub"];
} else {
    $sub = $site;
}
if(isset($_POST["id"]) && $_POST["id"] != "undefined" ) 
    $id = $_POST["id"];



if (file_exists("pages/$site/$sub.html")) {
        readfile("pages/$site/$sub.html");
}
if (file_exists("pages/$site/$sub.php")) {
        include_once("pages/$site/$sub.php");
}
