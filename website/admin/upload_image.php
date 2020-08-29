<?php

function generateRandomString($length = 10) {
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

require ("../php/database.php");

$conn = getDbConnection();
//$image = file_get_contents('php://input');
$image = $_FILES["image"];
$tree_id = $_POST["tree"];
$hash = hash_file('md5', $image["tmp_name"]);

//error_log(print_r($image, TRUE));


$stmt = $conn->prepare("SELECT * FROM images WHERE hash = ?;");
$stmt->bind_param("s", $hash);
$stmt->execute();
$res = $stmt->get_result();

$url = null;
if ($res->num_rows > 0) {
// output data of each row
    while ($row = $res->fetch_assoc()) {
        $url = $row["image"];
    }
}
if (is_null($url)){
    //Upload image
    $target = "../uploads/".generateRandomString(5).$image["name"];
    move_uploaded_file($image["tmp_name"], $target);
    $url = substr($target, 3);
}

$stmt = $conn->prepare("INSERT INTO images (tree_id, image, hash) VALUE (?,?,?);");
$stmt->bind_param("iss", $tree_id, $url, $hash);
$stmt->execute();
print($stmt->insert_id);

