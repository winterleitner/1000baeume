<html lang="de">
<head>
    <script src="https://kit.fontawesome.com/9b34ae5609.js" crossorigin="anonymous"></script>
    <title>1000 Bäume - Administrator</title>
    <link rel="stylesheet" href="admin/styles/style.css">
    <link href="admin/vendors/coreui/icons/css/free.min.css" rel="stylesheet">
</head>
<body class="c-body">
<?php
session_start();
require '../php/database.php';
require 'authentication.php';

$conn = getDbConnection();

$sql = "SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'description', description, 'date_planted', DATE_FORMAT(date_planted, '%d.%m.%Y'), 'x', ST_X(location), 'y', ST_Y(location), 'location_name', location_name, 'last_modified', last_modified,
       'images', (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'image', image, 'text', text)) FROM images WHERE tree_id = t.id),
       'sponsors', (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name, 'contribution', contribution)) FROM sponsors WHERE tree_id = t.id))) AS res
       FROM trees t ORDER BY t.id DESC;";

$res = $conn->query($sql);

?>
<div class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" id="sidebar">
    <div class="c-sidebar-brand d-lg-down-none">
        <img class="c-sidebar-brand-full" height="46" alt="Irish Logo" src="../images/Logo_Kreis.png"/>
        <img class="c-sidebar-brand-minimized" height="46" alt="Irish Logo" src="../images/Logo_Kreis.png">
    </div>
    <ul class="c-sidebar-nav">
        <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="/admin">
                <svg class="c-sidebar-nav-icon">
                    <use xlink:href="/admin/vendors/coreui/icons/svg/free.svg#cil-speedometer"></use>
                </svg> Baumliste
            </a>
        </li>
    </ul>
    <button class="c-sidebar-minimizer c-class-toggler" type="button" data-target="_parent" data-class="c-sidebar-minimized"></button>
</div>
<div class="c-wrapper c-fixed-components">
    <header class="c-header c-header-light c-header-fixed c-header-with-subheader">
        <button class="c-header-toggler c-class-toggler d-lg-none mfe-auto" type="button" data-target="#sidebar" data-class="c-sidebar-show">
            <svg class="c-icon c-icon-lg">
                <use xlink:href="/admin/vendors/coreui/icons/svg/free.svg#cil-menu"></use>
            </svg>
        </button>
        <button class="c-header-toggler c-class-toggler mfs-3 d-md-down-none" type="button" data-target="#sidebar" data-class="c-sidebar-lg-show" responsive="true">
            <svg class="c-icon c-icon-lg">
                <use xlink:href="/admin/vendors/coreui/icons/svg/free.svg#cil-menu"></use>
            </svg>
        </button>
        <ul class="c-header-nav d-md-down-none">
            <li class="c-header-nav-item px-3">
                <a class="c-header-nav-link" href="/admin">Baumliste</a>
            </li>
        </ul>
        <ul class="c-header-nav ml-auto mr-4">
            <li class="c-header-nav-item dropdown">
                <a class="c-header-nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                    <div class="c-avatar">
                        <img class="c-avatar-img" src="../images/Logo_Kreis.png" alt="user@email.com">
                    </div>
                </a>
                <div class="dropdown-menu dropdown-menu-right pt-0">
                    <div class="dropdown-header bg-light py-2">
                        <strong>Account</strong>
                    </div>
                    <a class="dropdown-item" href="admin/logout.php">
                        <svg class="c-icon mr-2">
                            <use xlink:href="/admin/vendors/coreui/icons/svg/free.svg#cil-account-logout"></use>
                        </svg> Logout
                    </a>
                </div>
            </li>
        </ul>
        <!--Breadcrumbs
        <div class="c-subheader px-3">
            <ol class="breadcrumb border-0 m-0">
                <li class="breadcrumb-item">Home</li>
                <li class="breadcrumb-item">
                    <a href="#">Admin</a>
                </li>
                <li class="breadcrumb-item active">Dashboard</li>
            </ol>
        </div>
        -->
    </header>

    <div class="c-body">
        <main class="c-main">
            <div class="container-fluid">
                <div class="fade-in">
                    <div id="admin_root"></div>
                </div>
            </div>
        </main>
        <footer class="c-footer">
            <div><a href="mailto:felix.winterleitner@gmail.com">1000 Bäume für Steyr - Verwaltungsoberfläche</a> © 2020 Felix Winterleitner.</div>
            <div class="ml-auto">Version 1.0 - 01.09.2020</div>
        </footer>
    </div>
</div>

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

    .tree-list-tr:hover {
        background-color: darkgray !important;
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

