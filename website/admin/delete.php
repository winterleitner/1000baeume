<?php

session_start();
require '../php/database.php';

if (!isset($_SESSION["username"])) {
    http_response_code(401);
    die();
}

if (!isset($_POST['id'])) {
    http_response_code(400);
    die();
}

$tree_id = $_POST['id'];

$conn = getDbConnection();

$stmt = $conn->prepare("DELETE FROM sponsors WHERE tree_id=?");
$stmt->bind_param("i", $tree_id);
$stmt->execute();

$stmt = $conn->prepare("DELETE FROM images WHERE tree_id=?");
$stmt->bind_param("i", $tree_id);
$stmt->execute();

$stmt = $conn->prepare("DELETE FROM trees WHERE id=?");
$stmt->bind_param("i", $tree_id);
$stmt->execute();

#endregion
http_response_code(200);

