<?php session_start();

require_once("../classes/database.php");

$db = new DB();
$re = $db->connect();
if(!isset($re)){
    echo "Cannot connect to database";
    return false;
}
$scandir = scandir("included/dbHandler");
$scandir = array_diff($scandir, array(".",".."));
foreach($scandir as $function)
    include_once("included/dbHandler/$function");
