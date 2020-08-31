<?php
require '../php/database.php';

session_start();
if (!isset($_SESSION["username"])) {
    http_response_code(401);
    die();
}

if(!isset($_POST)) {
    http_response_code(400);
    die();
}
try {
    $tree = json_decode(file_get_contents('php://input'));
}
catch (Exception $ex) {
    http_response_code(400);
    die("Invalid Format");
}

$tree_id = $tree -> id;
$desc = $tree -> description;
$date_planted = date("Y-m-d", strtotime($tree -> date_planted));
$location = $tree -> location_name;
$x = $tree -> x;
$y = $tree -> y;

$images = $tree -> images;
$sponsors = $tree -> sponsors;


$conn = getDbConnection();




$stmt = $conn->prepare("UPDATE trees SET description=?, date_planted=?, location=POINT(?,?), location_name=? WHERE id=?");
$stmt->bind_param("ssddsi", $desc, $date_planted, $x, $y, $location, $tree_id);
$stmt->execute();

#region Assign images
$image_id = null;
$text = null;

#region remove deleted images from tree
$images_to_remove = [];
$stmt = $conn->prepare("SELECT * FROM images WHERE tree_id = ?;");
$stmt->bind_param("i", $tree_id);
$stmt->execute();
$res = $stmt->get_result();


if ($res->num_rows > 0) {
// output data of each row
    while ($row = $res->fetch_assoc()) {
        $remove = true;
        foreach ($images as $image) {
            if ($image -> id == $row["id"]) $remove = false;
        }
        if ($remove) array_push($images_to_remove, $row["id"]);
    }
}

$img_id = -1;
$stmt = $conn->prepare("UPDATE images SET tree_id = 0 WHERE id = ?;");
$stmt->bind_param("i", $img_id);
foreach ($images_to_remove as $img) {
    $img_id = $img;
    var_dump($img_id);
    var_dump($stmt->execute());
}

#endregion

$stmt = $conn->prepare("UPDATE images SET tree_id = ?, text = ? WHERE id = ?;");
$stmt->bind_param("isi", $tree_id, $text, $image_id);

foreach ($images as $image) {
    $image_id = $image -> id;
    $text = $image -> text;
    $stmt->execute();
}
#endregion

#region Create Sponsors

#region remove deleted sponsors
$sponsors_to_remove = [];
$stmt = $conn->prepare("SELECT * FROM sponsors WHERE tree_id = ?;");
$stmt->bind_param("i", $tree_id);
$stmt->execute();
$res = $stmt->get_result();


if ($res->num_rows > 0) {
// output data of each row
    while ($row = $res->fetch_assoc()) {
        $remove = true;
        foreach ($sponsors as $s) {
            if ($s -> id == $row["id"]) $remove = false;
        }
        if ($remove) array_push($sponsors_to_remove, $row["id"]);
    }
}

$sponsor_id = -1;
$stmt = $conn->prepare("DELETE FROM sponsors WHERE id = ?;");
$stmt->bind_param("i", $sponsor_id);
foreach ($sponsors_to_remove as $sponsor_id) {
    $stmt->execute();
}

#endregion

$name = null;
$contr = null;

$stmt = $conn->prepare("INSERT INTO sponsors (tree_id, name, contribution) VALUE (?,?,?);");
$stmt->bind_param("iss", $tree_id, $name, $contr);

foreach ($sponsors as $sponsor) {
    if ($sponsor -> id != -1) continue; // Only add newly added sponsors
    $name = $sponsor -> name;
    $contr = $sponsor -> contribution;
    var_dump($stmt->execute());
}
#endregion
http_response_code(200);
echo $tree_id;
?>
