<?php
session_start();
if (!isset($_SESSION["username"])) {
    echo '<script type="text/javascript"> window.location = "/admin/login.php"; </script>';
    die();
}