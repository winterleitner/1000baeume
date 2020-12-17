<?php
require '../php/database.php';
session_start();
if (!isset($_SESSION["username"])) {
    http_response_code(401);
    die();
}

$id = $_POST['id'];

$conn = getDbConnection();

$stmt = $conn->prepare("SELECT * FROM trees WHERE id = ?;");
$stmt->bind_param("i", $id);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows <= 0) die();

$stmt = $conn->prepare("UPDATE settings SET `value`=? WHERE `key`='highlight';");
$stmt->bind_param("i", $id);
$stmt->execute();