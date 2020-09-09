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

// Link image type to correct image loader and saver
// - makes it easier to add additional types later on
// - makes the function easier to read
const IMAGE_HANDLERS = [
    IMAGETYPE_JPEG => [
        'load' => 'imagecreatefromjpeg',
        'save' => 'imagejpeg',
        'quality' => 100
    ],
    IMAGETYPE_PNG => [
        'load' => 'imagecreatefrompng',
        'save' => 'imagepng',
        'quality' => 0
    ],
    IMAGETYPE_GIF => [
        'load' => 'imagecreatefromgif',
        'save' => 'imagegif'
    ]
];

/**
 * @param $src - a valid file location
 * @param $dest - a valid file target
 * @param $targetWidth - desired output width
 * @param $targetHeight - desired output height or null
 */
function createThumbnail($src, $dest, $targetWidth, $targetHeight = null) {

    // 1. Load the image from the given $src
    // - see if the file actually exists
    // - check if it's of a valid image type
    // - load the image resource

    // get the type of the image
    // we need the type to determine the correct loader
    $type = exif_imagetype($src);

    // if no valid type or no handler found -> exit
    if (!$type || !IMAGE_HANDLERS[$type]) {
        return null;
    }

    // load the image with the correct loader
    $image = call_user_func(IMAGE_HANDLERS[$type]['load'], $src);

    // no image found at supplied location -> exit
    if (!$image) {
        return null;
    }


    // 2. Create a thumbnail and resize the loaded $image
    // - get the image dimensions
    // - define the output size appropriately
    // - create a thumbnail based on that size
    // - set alpha transparency for GIFs and PNGs
    // - draw the final thumbnail

    // get original image width and height
    $width = imagesx($image);
    $height = imagesy($image);

    // maintain aspect ratio when no height set
    if ($targetHeight == null) {

        // get width to height ratio
        $ratio = $width / $height;

        // if is portrait
        // use ratio to scale height to fit in square
        if ($width > $height) {
            $targetHeight = floor($targetWidth / $ratio);
        }
        // if is landscape
        // use ratio to scale width to fit in square
        else {
            $targetHeight = $targetWidth;
            $targetWidth = floor($targetWidth * $ratio);
        }
    }

    // create duplicate image based on calculated target size
    $thumbnail = imagecreatetruecolor($targetWidth, $targetHeight);

    // set transparency options for GIFs and PNGs
    if ($type == IMAGETYPE_GIF || $type == IMAGETYPE_PNG) {

        // make image transparent
        imagecolortransparent(
            $thumbnail,
            imagecolorallocate($thumbnail, 0, 0, 0)
        );

        // additional settings for PNGs
        if ($type == IMAGETYPE_PNG) {
            imagealphablending($thumbnail, false);
            imagesavealpha($thumbnail, true);
        }
    }

    // copy entire source image to duplicate image and resize
    imagecopyresampled(
        $thumbnail,
        $image,
        0, 0, 0, 0,
        $targetWidth, $targetHeight,
        $width, $height
    );


    // 3. Save the $thumbnail to disk
    // - call the correct save method
    // - set the correct quality level

    // save the duplicate version of the image to disk
    return call_user_func(
        IMAGE_HANDLERS[$type]['save'],
        $thumbnail,
        $dest,
        IMAGE_HANDLERS[$type]['quality']
    );
}

session_start();
if (!isset($_SESSION["username"])) {
    http_response_code(401);
    die();
}
require ("../php/database.php");

$conn = getDbConnection();
//$image = file_get_contents('php://input');
$image = $_FILES["image"];


// Um Bilder beim Hochladen auf einen bestehenden Baum-Eintrag direkt zu übernehmen (ohne Speichern-Button) folgende Zeile verwenden
//$tree_id = $_POST["tree"];
// Sonst diese:
$tree_id = 0;


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
        $url_high_res = $row["image_high_res"];
    }
}
if (is_null($url)){
    //Upload image
    $random = generateRandomString(5);
    $target = "../uploads/".$random.$image["name"];
    $target_high_res = "../uploads/highres/".$random.$image["name"];
    createThumbnail($image["tmp_name"], $target, 1000);
    move_uploaded_file($image["tmp_name"], $target_high_res);
    $url = substr($target, 3);
    $url_high_res = substr($target_high_res, 3);

}

$stmt = $conn->prepare("INSERT INTO images (tree_id, image, image_high_res, hash) VALUE (?,?,?,?);");
$stmt->bind_param("isss", $tree_id, $url, $url_high_res, $hash);
$stmt->execute();
print($stmt->insert_id);

