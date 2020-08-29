<?php
function getDbConnection() {
    $dbserver = "0.0.0.0";
    $dbuser = "root";
    $dbpassword = "password";
    $dbname = "1000baeume";
    return new mysqli($dbserver, $dbuser, $dbpassword, $dbname);
}
?>
