<?php
require '../php/database.php';
session_start();
if (!isset($_SESSION["username"])) {
    http_response_code(401);
    die();
}

$count = $_POST['count'];

$conn = getDbConnection();


$stmt = $conn->prepare("UPDATE settings SET `value`=? WHERE `key`='tree_count';");
$stmt->bind_param("i", $count);
$stmt->execute();