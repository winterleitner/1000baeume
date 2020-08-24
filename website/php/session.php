<?php
session_start();
if(!isset($_SESSION['userid'])) {
    header('Location: login.php?loginfail=1');
    die('Bitte zuerst <a href="login.php">einloggen</a>');
}
//Abfrage der Nutzer ID vom Login
$userid = $_SESSION['userid'];
$username = $_SESSION['username'];
