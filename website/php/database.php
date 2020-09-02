<?php
function getDbConnection() {
    $dbserver = "0.0.0.0";
    $dbuser = "root";
    $dbpassword = "password";
    $dbname = "1000baeume";
    $mysql = new mysqli($dbserver, $dbuser, $dbpassword, $dbname);
    $mysql -> set_charset("utf8");
    return $mysql;
}
?>
