<?php
session_start();
include 'php/database.php';
include 'php/functions.php';
?>

<?php
if (isset($_POST['username'])) {
    $username = $_POST['username'];
}
if (isset($_POST['passwort'])) {
    $passwort = $_POST['passwort'];
}

// Create connection
$conn = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if(isset($_GET['logout'])) {
    if ($_GET['logout']) {
        session_destroy();
    }
}


if(isset($_GET['login'])) {
    $sql = 'SELECT `passwort`, `freigeschalten` FROM `tennis_user` WHERE `username`="'.$username.'"';
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $dbretrpass = $row['passwort'];
            $freigeschalten = $row['freigeschalten'];
        }
    }
    else {
        $dbretrpass = "4c494e4b53";
        $freigeschalten = 0;
    }

    //Überprüfung des Passworts
    if ($freigeschalten == 1) {
        if (password_verify($passwort, $dbretrpass) && strcmp($passwort, '') != 0) {
            $sql = 'SELECT `id` FROM `tennis_user` WHERE `username`="' . $username . '"';
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                // output data of each row
                while ($row = $result->fetch_assoc()) {
                    $dbretrID = $row['id'];
                }
            }
            $_SESSION['userid'] = $dbretrID;
            $_SESSION['username'] = $username;
            header('Location: index.php');
            echo '<script type="text/javascript"> window.location = "index.php"; </script>';
            //die('Login erfolgreich. Weiter zu <a href="index.php">internen Bereich</a>');
        }
    }
    else {
        echo '<p style="color: red">Login fehlgeschlagen</p>';
        $errorMessage = "User oder Passwort war ungültig ODER User noch nicht vom Administrator freigeschalten<br>";
    }

}

if (isset($_GET['newregistration'])) {
    $sql = 'SELECT COUNT(`username`) as "anzahl" FROM `tennis_user` WHERE `username`="'.$_POST['email'].'"';
    $result = $conn->query($sql);
    $userisnew = false;
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            if ($row['anzahl'] == 0) $userisnew = true;
            else $userisnew = false;
        }
    }

    if ($userisnew) {

        if (isset($_POST['telefon'])) $sql = 'INSERT INTO `tennis_user`(`username`, `passwort`, `stammspieler`, `vorname`, `nachname`, `phone`, `freigeschalten`, `hidefromlists`) VALUES ("' . $_POST['email'] . '","' . password_hash($_POST['passwort'], PASSWORD_DEFAULT) . '", "0","' . $_POST['vorname'] . '","' . $_POST['nachname'] . '","' . $_POST['telefon'] . '", 0, 1)';
        else $sql = 'INSERT INTO `tennis_user`(`username`, `passwort`, `stammspieler`, `vorname`, `nachname`, `freigeschalten`, `hidefromlists`) VALUES ("' . $_POST['email'] . '","' . password_hash($_POST['passwort'], PASSWORD_DEFAULT) . '", "0","' . $_POST['vorname'] . '","' . $_POST['nachname'] . '", 0, 1)';
        $result = $conn->query($sql);
        Pushover("Neue Registrierung: " . $_POST['vorname'] . " " . $_POST['nachname'] . " mit der Mailadresse ". $_POST['email'] . " hat sich neu registriert!");
    }
    else echo '<script> alert("User bereits vorhanden!"); </script>';

}
?>

<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Material Design Bootstrap</title>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- Material Design Bootstrap -->
    <link href="css/mdb.min.css" rel="stylesheet">
    <!-- Your custom styles (optional) -->
    <link href="css/style.css" rel="stylesheet">

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-102365943-3"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-102365943-3');
    </script>
</head>

<body>

<!-- Default form login -->
<section style="max-width: 400px; margin-top: 70px; margin-bottom: auto; margin-left: auto; margin-right: auto; padding-left: 15px; padding-right: 15px;">
    <form class="text-center border border-light p-5" action="?login=1" method="post">

        <p class="h4 mb-4">Anmelden</p>

        <!-- Email -->
        <input type="email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="Email" name="username">

        <!-- Password -->
        <input type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Passwort" name="passwort">


        <!-- Sign in button -->
        <button class="btn btn-success btn-block my-4" type="submit">Einloggen</button>

        <!-- Register -->
        <p>Noch kein Konto?
            <a href="#" data-toggle="modal" data-target="#registerModal">Registrieren!</a>
        </p>


    </form>
</section>
<!-- Default form login -->

<!-- Registrierung -->
<div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold">Neu Registrieren</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <form action="login.php?newregistration=1" method="post">
                <div class="modal-body mx-3">

                    <div class="md-form">
                        <input name="email" type="email" id="form8" class="md-textarea form-control" rows="1"></input>
                        <label data-error="wrong" data-success="right" for="form8">E-Mail</label>
                    </div>

                    <div class="md-form">
                        <input name="passwort" type="password" id="form8" class="md-textarea form-control" rows="1"></input>
                        <label data-error="wrong" data-success="right" for="form8">Passwort</label>
                    </div>

                    <div class="md-form">
                        <input name="vorname" style="text-transform: capitalize" type="text" id="form8" class="md-textarea form-control" rows="1"></input>
                        <label data-error="wrong" data-success="right" for="form8">Vorname</label>
                    </div>

                    <div class="md-form">
                        <input name="nachname" style="text-transform: capitalize" type="text" id="form8" class="md-textarea form-control" rows="1"></input>
                        <label data-error="wrong" data-success="right" for="form8">Nachname</label>
                    </div>

                    <div class="md-form">
                        <input name="telefon" type="tel" id="form8" class="md-textarea form-control" rows="1"></input>
                        <label data-error="wrong" data-success="right" for="form8">Telefonnummer(optional)</label>
                    </div>

                    <label data-error="wrong" data-success="right" for="form29">Die Freischaltung des Benutzers erfolgt manuell durch den Administrator und kann daher bis zu 24h dauern.</label>


                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button class="btn btn-success">Registrieren<i class="fa fa-paper-plane-o ml-1"></i></button>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- Registrierung -->


<section style="max-width: 400px; margin-top: 70px; margin-bottom: auto; margin-left: auto; margin-right: auto; padding-left: 15px; padding-right: 15px; text-align: center">
    <?php
    if(isset($errorMessage)) {
        echo $errorMessage;
    }
    ?>
    <a href="unlock.php">User-Freischaltung</a>
</section>


<!-- SCRIPTS -->
<!-- JQuery -->
<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
<!-- Bootstrap tooltips -->
<script type="text/javascript" src="js/popper.min.js"></script>
<!-- Bootstrap core JavaScript -->
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<!-- MDB core JavaScript -->
<script type="text/javascript" src="js/mdb.min.js"></script>
</body>
</html>

<style>
    body {
        width: 100%;
        padding-left: 0px;
        margin: 0px;
        background-image: url(background1.jpg);
        background-size: 100%;
    }
</style>
