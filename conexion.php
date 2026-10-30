<?php
require __DIR__ . "/vendor/autoload.php";
require __DIR__ . "/config.local.php";

$uri = "mongodb+srv://" . rawurlencode($usuario) . ":" . rawurlencode($password) . "@parejas.roydger.mongodb.net/";

$cliente = new MongoDB\Client($uri);
$baseDatos = $cliente->selectDatabase("trabajo1");
