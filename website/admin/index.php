<html lang="de">
<head>
    <script src="https://kit.fontawesome.com/9b34ae5609.js" crossorigin="anonymous"></script>
    <title>1000 Bäume Administrator</title>
    <link rel="stylesheet" href="/admin/styles/style.css">
</head>
<body>
<?php
session_start();
require '../php/database.php';

$conn = getDbConnection();


$sql1 = "SELECT id, description, date_planted, ST_X(location) as x, ST_Y(location) as y, location_name, last_modified,
       (SELECT JSON_ARRAYAGG(JSON_OBJECT('image', image, 'text', text)) FROM images WHERE tree_id = id) AS images,
       (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name, 'contribution', contribution)) FROM sponsors WHERE tree_id = id) AS sponsors 
       FROM trees ORDER BY id DESC;";

$sql = "SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'description', description, 'date_planted', DATE_FORMAT(date_planted, '%d.%m.%Y'), 'x', ST_X(location), 'y', ST_Y(location), 'location_name', location_name, 'last_modified', last_modified,
       'images', (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'image', image, 'text', text)) FROM images WHERE tree_id = t.id),
       'sponsors', (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name, 'contribution', contribution)) FROM sponsors WHERE tree_id = t.id))) AS res
       FROM trees t ORDER BY t.id DESC;";

$res = $conn->query($sql);

?>
<div class="c-body">
    <main class="c-main">
        <div class="container-fluid">
            <div class="fade-in">
                <div id="admin_root"></div>
            </div>
        </div>
    </main>
</div>

<h3>Baum-Liste</h3>
<?php
if ($res->num_rows > 0) {
    // output data of each row
    while ($row = $res->fetch_assoc()) {
        $trees = json_decode($row["res"]);
        foreach ($trees as $tree) {
            if (is_null($tree -> images))  $tree -> images = [];
            if (is_null($tree -> sponsors))  $tree -> sponsors = [];
        }

        print ("<script>const trees=" . json_encode($trees) . "</script>");
    }
}
?>

</body>

<style>

    .inline {
        display: inline;
    }

    .images-list {
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
    }

    .images-list-item {
        height: 250px;
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
<script src="../AdminView.js"></script>

<!-- CoreUI and necessary plugins-->
<script src="admin/vendors/coreui/coreui/js/coreui.bundle.min.js"></script>
<!--[if IE]><!-->
<script src="admin/vendors/coreui/icons/js/svgxuse.min.js"></script>
<!--<![endif]-->
<!-- Plugins and scripts required by this view-->
<script src="admin/vendors/coreui/chartjs/js/coreui-chartjs.bundle.js"></script>
<script src="admin/vendors/coreui/utils/js/coreui-utils.js"></script>
<script src="admin/js/main.js"></script>


</html>

