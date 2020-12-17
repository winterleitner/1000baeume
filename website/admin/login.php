<?php
session_start();

$username = "test";
$password = "test";

if (isset($_GET['logout'])) {
    if ($_GET['logout']) {
        session_destroy();
    }
}

if (isset($_POST['login'])) {

    if (strcmp($_POST["username"], $username) == 0 && strcmp($_POST["password"], $password) == 0) {
        $_SESSION['username'] = $username;
        header('Location: /admin');
        echo '<script type="text/javascript"> window.location = "/admin"; </script>';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <base href="./">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>1000 Bäume Login</title>
    <link rel="manifest" href="/admin/assets/favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="assets/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <!-- Main styles for this application-->
    <link href="/admin/styles/style.css" rel="stylesheet">
</head>
<body class="c-app flex-row align-items-center">
<div class="container">
    <?php
    if (isset($_POST['login'])) {
        if (!(strcmp($_POST["username"], $username) == 0 && strcmp($_POST["password"], $password) == 0)) {
            echo '<div class="alert alert-warning alert-dismissible fade show" role="alert">
        Login fehlgeschlagen!
        <button class="close" type="button" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">×</span>
        </button>
    </div>';
        }
    }

    ?>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card-group">
                <div class="card p-4">
                    <div class="card-body">
                        <h1>Login</h1>
                        <p></p>
                        <form target="" method="post" class="form-horizontal" role="form">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <svg class="c-icon">
                                            <use xlink:href="/admin/vendors/coreui/icons/svg/free.svg#cil-user"></use>
                                        </svg>
                                    </span>
                                </div>
                                <input class="form-control" type="text" id="username" name="username"
                                       placeholder="Username"
                                       required>
                            </div>
                            <div class="input-group mb-4">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <svg class="c-icon">
                                            <use xlink:href="/admin/vendors/coreui/icons/svg/free.svg#cil-lock-locked"></use>
                                        </svg>
                                    </span>
                                </div>
                                <input class="form-control" type="password" id="password" name="password"
                                       placeholder="Password" required>
                                <input type="hidden" name="login" id="login" value="1">
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <button class="btn btn-primary px-4" type="submit">Login</button>
                                </div>
                                <div class="col-6 text-right">
                                    <a class="btn btn-link px-0" href="mailto:felix.winterleitner@gmail.com">Passwort
                                        vergessen?</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- CoreUI and necessary plugins-->
<script src="/admin/vendors/coreui/coreui/js/coreui.bundle.min.js"></script>
<!--[if IE]><!-->
<script src="/admin/vendors/coreui/icons/js/svgxuse.min.js"></script>
<!--<![endif]-->

</body>
</html>