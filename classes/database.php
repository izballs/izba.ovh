<?php
class DB{
    private $host;
    private $username;
    private $password;
    private $database;

    private $connection;

    public function __construct()
    {
        require_once("../configs/dbConfigs.php")
        $this->host = $dbHost;
        $this->username = $dbUsername;
        $this->password = $dbPassword;
        $this->database = $dbDatabase;
    }


    public function connect(){
        $this->connection = null;

        try {
            $this->connection = new PDO("mysql:host= $this->host; dbname=$this->database", $this->username, $this->password);
            $this->connection->exec("set names utf8");
            $this->connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch(PDOExecption $exception)
        {
            echo "Error: " . $exception->getMessage();
        }
        return $this->connection;
    }    

    public function login($username)
    {
        try {
            $sql = "SELECT password, admin, activated, enabled FROM users WHERE username = ?";
            $sth = $this->conn->prepare($sql);
            $sth->execute(array($username));
            return $sth;
        } catch (PDOException $e) {
            return "getting user data failed: " . $e->getMessage();
        }
    }

    public function register($username, $password, $email, $puh)
    {
        try {
            if (!isset($puh)) {
                $puh = "-";
            }

            $sql = "INSERT INTO users (username, password, email, puh) VALUES (?,?,?,?)";
            $sth = $this->conn->prepare($sql);
            $sth->execute(array($username, $password, $email, $puh));
        } catch (PDOException $e) {
            return "register failed: " . $e->getMessage();
        }
        return true;
    }



}
?>

