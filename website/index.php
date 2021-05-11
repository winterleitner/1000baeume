<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">

    <title>1000 Bäume für Steyr</title>
    <link rel="icon" type="image/png" href="images/Logo_Kreis.png">

    <meta name="description"
          content="Das Projekt: Ganz Steyr pflanzt 1000 Bäume, damit das Klima auch in 30 Jahren erträglich bleibt. Helfen Sie jetzt mit!">

    <!-- This is Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <!--This is my own stylesheet-->
    <link rel="stylesheet" href="1000-Baeume.css">

    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&amp;" rel="stylesheet">
    <link rel="stylesheet" href="https://use.typekit.net/ezd2sip.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&amp;display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/6d2ea8d999.js" crossorigin="anonymous"></script>
    <link href="https://kit-free.fontawesome.com/releases/latest/css/free-v4-shims.min.css" media="all"
          rel="stylesheet">
    <link href="https://kit-free.fontawesome.com/releases/latest/css/free-v4-font-face.min.css" media="all"
          rel="stylesheet">
    <link href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css" media="all" rel="stylesheet">

    <style>
        gearbox-hud {
            position: absolute !important;
            bottom: 13% !important;
            right: 5% !important;
            height: 50% !important;
            width: 90% !important;
            z-index: 2147483647 !important;
            pointer-events: none !important;
        }

        gearbox-hud {
            transition-property: opacity !important;
            transition-duration: 1s !important;
        }

        gearbox-hud {
            opacity: 0 !important;
        }

        gearbox-hud.gbx-recently-active {
            opacity: 1 !important;
        }
    </style>

    <!--Leaflet Maps-->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
            integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
            crossorigin=""></script>
    <style>
        #map {
            height: 400px;
        }
    </style>
    <!---->

</head>


<body class="gbx-installed">


<div class="myentrance">
    <div class="myentrancelogobox">
        <a class="myentrancelogo" href="/"></a>
    </div>
    <div class="myentrancetext">
        <div class="myentrancetexth1">
            <h1>Für das Klima in Steyr.</h1>
        </div>
        <div class="myentrancetexth2">
            <h2>Helfen Sie jetzt mit!</h2>
        </div>
    </div>
    <?php
    require "php/database.php";
    $conn = getDbConnection();
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "SELECT `value` FROM settings WHERE `key`='tree_count';";
    $res = $conn->query($sql);
    $treeCount = "100+";
    if ($res->num_rows > 0) {
        // output data of each row
        while ($row = $res->fetch_assoc()) {
            $treeCount = $row['value'];
        }
    }
    ?>
    <div class="tree-progress">
        <div><?php echo($treeCount); ?></div>
        gepflanzte Bäume
    </div>
</div>


<script>
    function onGiftContactClicked() {
        document.getElementById("gift-contact").hidden = true
        document.getElementById("gift-contact-phone").hidden = false
        document.getElementById("gift-contact-mail").hidden = false
    }
    function onGiftPhone() {
        window.location.href="tel: 0664 3423146"
    }
    function onGiftMail() {
        const body = "Guten Tag,\n\nich möchte einen Gutschein für eine Baumpatenschaft in Steyr im Wert von 350€ bestellen.\n\nMeine Kontaktdaten:\n\nName:\nTelefonnummer:\n\n\n" +
            "Die Zahlung erfolgt auf folgendes Konto:\n\n\"Tourismusverband Steyr und die Nationalparkregion\", Zusatzbezeichnung \"1000 Bäume für Steyr\"\nAT97 3411 4000 0004 2572\n"
        window.location.href=("mailto:leopold@foedermayr.at?subject=Gutschein für eine Baumpatenschaft&body=" + encodeURI(body))
    }


</script>

<div class="gutschein-box">
    <div>
        <span class="gutschein-box-intro">Nachhaltigkeit zu verschenken:</span>
        <h1>Baumpatenschaft als Gutschein!</h1>
        <button id="gift-contact" onclick="onGiftContactClicked()">Kontakt</button>
        <button id="gift-contact-phone" onclick="onGiftPhone()" hidden>Telefon: 0664 3423146</button>
        <button id="gift-contact-mail" onclick="onGiftMail()" hidden>Mail</button>
    </div>
</div>

<div class="container">

    <div class="myheading">
        <h1>1000 Bäume für Steyr</h1>
    </div>

    <div class="mytext">
        <p>Wenn wir wollen, dass sich die sommerlichen Höchsttemperaturen in der Stadt Steyr auch in 30 Jahren noch in
            einem einigermaßen erträglichen Rahmen bewegen, dann müssen wir jetzt damit starten, etwas zu unternehmen.
            Das Projekt „1000 Bäume für Steyr“ hat zum Ziel, im Stadtgebiet 1000 Bäume zu pflanzen. Bäume produzieren
            Sauerstoff und sorgen für saubere, kühle Klimatisierung der Stadt. Die Bürger der Stadt realisieren
            gemeinsam mit der Politik und dem Magistrat Steyr dieses Projekt.
            Helfen Sie mit!</p>
    </div>

    <div class="myquotes">
        <div class="myquote1"></div>
        <div class="myquote2"></div>
        <div class="myquote3"></div>
        <div class="myquote4"></div>
    </div>
</div>


<div class="mygreybox">
    <div class="myFAQbox">
        <div class="myFAQtext">
            <h1>Ihre Fragen rund um das Projekt</h1>
        </div>
        <div class="myFAQfragen">
            <div class="myFAQantworten">
                <h2>Wie kann ich als Bürger/Unternehmer/Verein diese tolle Aktion unkompliziert unterstützen?</h2>
                <ul>
                    <li>Bekanntgabe von möglichen Pflanzorten</li>
                    <li>Übernahme einer Baumpatenschaft</li>
                    <li>Spende</li>
                    <li>Pflanzung eines Baumes im eigenen Betriebsgelände oder Garten</li>
                </ul>
                <h2>Wo können Bäume gepflanzt werden?</h2>
                <ul>
                    <li>Sie haben eine Idee für einen neuen Standort, senden Sie uns ein Foto und die
                        Standortbeschreibung
                    </li>
                    <li>Wir kontaktieren den Grundeigentümer</li>
                    <li>Wir klären die rechtliche und technische Möglichkeit</li>
                    <li>Wir kümmern uns um die Finanzierung (Patenschaft, Spende)</li>
                    <li>Wir pflanzen den Baum</li>
                </ul>
                <h2>Wie kann man eine Baumpatenschaft übernehmen, wie läuft das ab?</h2>
                <ul>
                    <li>Sie senden uns ein Mail mit dem Betrag für eine Baumpatenschaft</li>
                    <li>Wir stimmen mit Ihnen den Pflanzort und den Baum (Gattung, Stammdurchmesser) ab und informieren
                        Sie über den Termin der Pflanzung.
                    </li>
                    <li>Sie überweisen den Betrag der Patenschaft auf das Konto "Tourismusverban Steyr und die
                        Nationalparkregion", Zusatzbezeichnung "1000 Bäume für Steyr": AT97 3411 4000 0004 2572 ein.
                    </li>
                    <li>Die Pflanzung erfolgt durch unseren Projektpartner in ihrem Beisein (sofern gewünscht)</li>
                    <li>Sie erhalten eine Urkunde - am Baum wird eine Plakette mit ihrem Namen befestigt.</li>
                    <li>Eigentümer des Baumes ist der jeweilige Grundeigentümer der die Pflege übernimmt</li>
                </ul>
            </div>
            <div class="myFAQantworten">
                <h2>Kann man auch einfach nur spenden?</h2>
                <p>Ja, sie zahlen einen Betrag auf das Bankkonto "Tourismusverband Steyr und die Nationalparkregion",
                    Zusatzbezeichnung "1000 Bäume für Steyr": AT97 3411 4000 0004 2572 ein.</p>
                <h2>Auf welchen Grundstücken werden die Bäume gepflanzt? Privat, öffentlich? Wer plant das?</h2>
                <ul>
                    <li>In der ersten Phase des Projektes werden mögliche Pflanzorte gesucht, alle Bürger werden
                        gebeten, ihre Vorschläge und Ideen mittels eMail mit Angabe des gewünschten Standortes nach
                        Möglichkeit mit Foto bekanntzugeben.
                    </li>
                    <li>Diese Vorschläge werden vom Projektteam mit dem Grundeigentümer und den Behörden abgestimmt.
                    </li>
                    <li>Die Finanzierung der Pflanzung erfolgt dann durch Baumpatenschaft bzw. Spenden.</li>
                </ul>
                <h2>Wie wird dafür gesorgt, dass das gespendete bzw. überwiesene Geld für diese Aktion verwendet wird -
                    und nicht für die Verwaltung "draufgeht"?</h2>
                <p>Die Verwaltung des Geldes erfolgt durch den Tourismusverband der Stadt Steyr. Die gesamte
                    Verwaltungsarbeit erfolgt ehrenamtlich. Die Kontrolle der Gebarung erfolgt durch Dr. Christoph
                    Grumböck von der Notariatskanzlei Dr. Kaliba</p>
                <h2>Wer ist mein Ansprechpartner? Wo kann ich mich wie hinwenden?</h2>
                <h3>Projektansprechpartner:</h3>
                <p>STR Reinhard Kaufmann und Dkfm. Leopold Födermayr
                    <a href="mailto:leopold@foedermayr.at">leopold@foedermayr.at</a>
                    <a href="tel:+436643423146">0664 3423146</a></p>
                <!-- <p>Dkfm. Leopold Födermayr (leopold@foedermayr.at, 0664/3423146)</p> -->
                <h3>Mailadressen:</h3>
                <p><a href="mailto:1000baeume@steyr.gv.at">1000baeume@steyr.gv.at</a>
                    <a href="mailto:steyr@nachrichten.at">steyr@nachrichten.at</a></p>
                <h3>Projektpartner:</h3>
                <p>OÖ Nachrichten, Raiffeisenbank Steyr, Tourismusverband Steyr und die Nationalparkregion, GRS
                    Wirtschaftsprüfung Steuerberatung GmbH und Christoph Grumböck Notariatsubstitut Rechtsberatung</p>
            </div>
        </div>
    </div>
</div>

<script>
    let trees = []
    let highlight = {}

    <?php
    $sql = "SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'beschreibung', description, 'anzahl', no_of_trees, 'datum', DATE_FORMAT(date_planted, '%d.%m.%Y'), 'ort', JSON_OBJECT('lat', ST_X(location), 'long', ST_Y(location), 'name', location_name), 'last_modified', last_modified,
           'bilder', (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'src', image, 'highRes', image_high_res, 'alt', text)) FROM images WHERE tree_id = t.id),
           'paten', (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name, 'beitrag', contribution)) FROM sponsors WHERE tree_id = t.id))) AS res
           FROM trees t ORDER BY t.id DESC;";

    $res = $conn->query($sql);
    if ($res->num_rows > 0) {
        // output data of each row
        while ($row = $res->fetch_assoc()) {
            $trees = json_decode($row["res"]);
            foreach ($trees as $tree) {
                if (is_null($tree->bilder)) $tree->bilder = [];
                if (is_null($tree->paten)) $tree->paten = [];
            }
            if (is_null($trees)) print("trees=[];\n");
            else print ("trees=" . json_encode($trees) . ";\n");
        }
    }

    $sql = "SELECT JSON_OBJECT('bilder', (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'src', image_high_res, 'alt', text)) 
            FROM images WHERE tree_id = t.id), 'beschreibung', description) as res FROM trees t
            WHERE (SELECT CAST(`value` AS SIGNED) FROM settings WHERE `key` = 'highlight')=t.id;";

    $res = $conn->query($sql);
    if ($res->num_rows > 0) {
        // output data of each row
        while ($row = $res->fetch_assoc()) {
            $tree = json_decode($row["res"]);
            if (is_null($tree->bilder)) $tree->bilder = [];
            print ("highlight=" . json_encode($tree) . ";\n");
        }
    }

    $conn->close()
    ?>
    trees = trees.reverse()

    //ALTERNATIVE-EXTERN
    // Load data from api
    //fetch("api").then(res => res.json()).then(res => trees = res.reverse())
    const scrollInterval = 10000
</script>

<div class="trees-map-container">
    <div id="map"></div>
</div>

<script>
    if (trees.length > 0) {
        document.getElementById("map").hidden = false;
        let mymap = L.map('map').setView([48.0392, 14.4192], 15);
        mymap.scrollWheelZoom.disable();

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);

        let LeafIcon = L.Icon.extend({
            options: {
                shadowUrl: '/images/Logo_HQ_shadow_blur.png',
                iconSize:     [38, 38],
                shadowSize:   [40, 38],
                iconAnchor:   [19, 38],
                shadowAnchor: [0, 38],
                popupAnchor:  [-1, -30]
            }
        });

        let greenIcon = new LeafIcon({iconUrl: '/images/Logo_HQ.png'})


        trees.forEach(t => {
            let marker = L.marker([t.ort.lat, t.ort.long], {icon: greenIcon}).addTo(mymap);
            marker.bindPopup(`<b>${t.anzahl} ${t.anzahl > 1 ? "Bäume" : "Baum"}</b><br>${t.datum}<br>${t.paten.map(p => p.name).join(", ")}`);

        })
    } else {
        document.getElementById("map").hidden = true;
    }

    // ALTERNATIVE-EXTERN
    /*
    fetch("api").then(res => res.json()).then(res => {
            if (res.length > 0) {
                document.getElementById("map").hidden = false;
                let mymap = L.map('map').setView([48.0392, 14.4192], 15);
                mymap.scrollWheelZoom.disable();

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mymap);


                res.forEach(t => {
                    let marker = L.marker([t.ort.lat, t.ort.long]).addTo(mymap);
                    marker.bindPopup(`<b>Baum Nr. ${t.id}</b><br>${t.datum}<br>${t.paten.map(p => p.name).join(",")}`);

                })
            } else {
                document.getElementById("map").hidden = true;
            }
        }
    )*/
</script>

<div id="trees_root"></div>

<div id="highlight_root"></div>


<div class="mydata">
    <div class="mydatatext">
        <h2>1000 Bäume für Steyr</h2>
        <p><i class="far fa-copyright" aria-hidden="true"></i> 2020 Dkfm. Leopold Födermayr</p>
        <a href="mailto:leopold@foedermayr.at">leopold@foedermayr.at</a> <a href="tel:+436643423146">0664 3423146</a>
        <!-- <p>e-Mail: leopold@foedermayr.at oder Tel.: 0664 3423146</p> -->
        <a href="datenschutzerklaerung.html">Datenschutzerklärung</a>
        <a href="Impressum.html">Impressum</a>
    </div>
</div>

<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<script src="TreeView.js"></script>
<script src="HighlightView.js"></script>
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
        integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
        crossorigin="anonymous"></script>

</body>
</html>