<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 27/06/2018
 * Time: 23:34
 */

$jsonNovo = new stdClass();
$jsonNovo->comando = "redirecionar()";
$jsonNovo->dadosEntrada = new stdClass();
$jsonNovo->dadosEntrada->pagina = "login";

$jsonTxt = json_encode($jsonNovo);

header("location: php/main.php?jsonTxt=$jsonTxt");
