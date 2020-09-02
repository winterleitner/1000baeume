<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");
require '../php/database.php';

$conn = getDbConnection();

if ($conn->connect_error) {
    http_response_code(400);
    die('{"error": "Connection failed:' . $conn->connect_error . '"}');
}
$sql = "SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'beschreibung', description, 'datum', DATE_FORMAT(date_planted, '%d.%m.%Y'), 'ort', JSON_OBJECT('lat', ST_X(location), 'long', ST_Y(location), 'name', location_name), 'last_modified', last_modified,
       'bilder', (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'src', image, 'alt', text)) FROM images WHERE tree_id = t.id),
       'paten', (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name, 'beitrag', contribution)) FROM sponsors WHERE tree_id = t.id))) AS res
       FROM trees t ORDER BY t.id DESC;";

$res = $conn->query($sql);
if ($res->num_rows > 0) {
    // output data of each row
    while ($row = $res->fetch_assoc()) {
        $trees = json_decode($row["res"]);
        foreach ($trees as $tree) {
            if (is_null($tree -> bilder))  $tree -> bilder = [];
            if (is_null($tree -> paten))  $tree -> paten = [];
        }
        http_response_code(200);
        print (html_entity_decode(json_encode($trees)));
    }
}
else {
    http_response_code(400);
    die('{"error": "No Results."}');
}
?>