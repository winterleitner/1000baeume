<?php
session_start();
$_SESSION = array();
echo '<script type="text/javascript"> window.location = "/admin/login.php"; </script>';