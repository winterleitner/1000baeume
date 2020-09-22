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

#region RETRIEVE post body
try {
    $tree = json_decode(file_get_contents('php://input'));
    /*
     * file_get_contents('php://input') does not work when request is redirected, e.g. from http to https
     * see https://stackoverflow.com/questions/19146984/file-get-contentsphp-input-always-returns-an-empty-string for more details
     */
}
catch (Exception $ex) {
    http_response_code(400);
    die("Invalid Format");
}
$desc = $tree -> description;
$no_trees = $tree -> no_of_trees;
$date_planted = date("Y-m-d", strtotime($tree -> date_planted));
$location = $tree -> location_name;
$x = $tree -> x;
$y = $tree -> y;

$images = $tree -> images;
$sponsors = $tree -> sponsors;
#endregion

$conn = getDbConnection();

// Create Tree in DB
$stmt = $conn->prepare("INSERT INTO trees (description, no_of_trees, date_planted, location, location_name) VALUE (?, ?, ?, POINT(?,?), ?)");
$stmt->bind_param("sisdds", $desc, $no_trees, $date_planted, $x, $y, $location);
$stmt->execute();
$tree_id = $stmt->insert_id;


#region Assign Images to Tree
$image_id = null;
$text = null;

$stmt = $conn->prepare("UPDATE images SET tree_id = ?, text = ? WHERE id = ?");
$stmt->bind_param("isi", $tree_id, $text, $image_id);

foreach ($images as $image) {
    $image_id = $image -> id;
    $text = $image -> text;
    $stmt->execute();
}
#endregion

#region Create Sponsors in DB

$name = null;
$contr = null;

$stmt = $conn->prepare("INSERT INTO sponsors (tree_id, `name`, contribution) VALUE (?,?,?)");
$stmt->bind_param("iss", $tree_id, $name, $contr);

foreach ($sponsors as $sponsor) {
    $name = $sponsor -> name;
    $contr = $sponsor -> contribution;
    $stmt->execute();
}
#endregion

http_response_code(200);
echo $tree_id;
?>