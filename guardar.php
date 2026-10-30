<?php
if (!isset($_POST["nombre"], $_POST["tiempo"], $_POST["puntos"], $_POST["resultado"])) {
    http_response_code(400);
    exit("Faltan datos de la partida");
}

$nombre = $_POST["nombre"];
$tiempo = (int) $_POST["tiempo"];
$puntos = (int) $_POST["puntos"];
$resultado = $_POST["resultado"];

try {
    require __DIR__ . "/conexion.php";
    $partidas = $baseDatos->selectCollection("partidas");

    $partidas->insertOne([
        "nombre" => $nombre,
        "tiempo" => $tiempo,
        "puntos" => $puntos,
        "resultado" => $resultado
    ]);

    echo "Partida guardada";
} catch (MongoDB\Driver\Exception\Exception $error) {
    http_response_code(500);
    echo "No se ha podido guardar la partida";
}
