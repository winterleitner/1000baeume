<?php
session_start();
require 'php/database.php';

$conn = new mysqli($dbserver, $dbuser, $dbpassword, $dbname);


$sql1 = "SELECT id, description, date_planted, ST_X(location) as x, ST_Y(location) as y, location_name, last_modified,
       (SELECT JSON_ARRAYAGG(image) FROM images WHERE tree_id = id) AS images,
       (SELECT JSON_ARRAYAGG(JSON_OBJECT('name', name, 'contribution', contribution)) FROM sponsors WHERE tree_id = id) AS sponsors 
       FROM trees ORDER BY id DESC;";

$sql = "SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'description', description, 'date_planted', DATE_FORMAT(date_planted, '%d.%m.%Y'), 'x', ST_X(location), 'y', ST_Y(location), 'location_name', location_name, 'last_modified', last_modified,
       'images', (SELECT JSON_ARRAYAGG(image) FROM images WHERE tree_id = id),
       'sponsors', (SELECT JSON_ARRAYAGG(JSON_OBJECT('name', name, 'contribution', contribution)) FROM sponsors WHERE tree_id = id))) AS res
       FROM trees ORDER BY id DESC;";

$res = $conn->query($sql);

?>
<div id="admin_root"></div>

<h3>Baum-Liste</h3>
<?php
if ($res->num_rows > 0) {
    // output data of each row
    while($row = $res->fetch_assoc()) {
        print ("<script>const trees=".$row["res"]."</script>");
    }
}
?>

<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }

    th, td {
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even){background-color: #f2f2f2}

    th {
        background-color: #4CAF50;
        color: white;
    }

    .inline {
        display: inline;
    }

    .images-list {
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
    }

    .images-list-item {
        height: 200px;
        margin-left: 15px;
        margin-right: 15px;
        /*border: 1px solid black;*/
        display: inline-block;
        text-align: center;
        scroll-snap-align: center;
        overflow: hidden;
        border: 1px solid gray;
        padding: 5px;
    }
</style>

<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<script src="AdminView.js"></script>

