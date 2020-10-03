<?php
//$db on määritelty dbHandler.php tiedostossa.
if($_POST["type"] == "login")
{
    if(isset($_SESSION["username"])){
        echo "Olet jo kirjautunut sisään";
        return false;
    }

    $re = $db->login($_POST["username"]);
    if($re->rowCount() >= 1)
    {
        $result = $re->fetchAll();
        if(password_verify($_POST["password"], $result[0]["password"]))
        {
            $_SESSION["username"] = $_POST["username"];
            $_SESSION["admin"] = $result[0]["admin"];
        }
    }
}
?>
