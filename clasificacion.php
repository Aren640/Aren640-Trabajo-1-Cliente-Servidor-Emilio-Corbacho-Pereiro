<?php
header("Content-Type: text/html; charset=UTF-8");

try {
    require __DIR__ . "/conexion.php";
    $partidas = $baseDatos->selectCollection("partidas");
    $mejores = $partidas->find([], [
        "sort" => ["puntos" => -1, "tiempo" => 1],
        "limit" => 5
    ]);

    foreach ($mejores as $partida) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars($partida["nombre"], ENT_QUOTES, "UTF-8") . "</td>";
        echo "<td>" . (int) $partida["tiempo"] . " s</td>";
        echo "<td>" . (int) $partida["puntos"] . "</td>";
        echo "</tr>";
    }
} catch (MongoDB\Driver\Exception\Exception $error) {
    http_response_code(500);
    echo "No hay clasificacion";
}
