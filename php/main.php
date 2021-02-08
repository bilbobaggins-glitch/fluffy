<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 23/06/2018
 * Time: 03:30
 */

session_start();

$jsonObj = new stdClass();
if(!empty($_GET['jsonTxt'])){
    $jsonObj = json_decode($_GET['jsonTxt']);
}else if(!empty($_POST['jsonTxt'])){
    $jsonObj = json_decode($_POST['jsonTxt']);
}
unset($_POST);
unset($_GET);

require_once("MainClass.php");
$main = new MainClass();
switch($jsonObj->comando) {
    case "contaAtivarEmail()": $main->contaAtivarEmail($jsonObj); break;
    case "trocarPagina()": $main->trocarPagina(); break;
    case "recuperarSenhaEmail()": $main->recuperarSenhaEmail($jsonObj); break;
    case "criarConta()": $main->criarConta($jsonObj); break;
    case "contaAtivar()": $main->contaAtivar($jsonObj); break;
    case "logar()": $main->logar($jsonObj); break;
    case "ranking()": $main->ranking($jsonObj); break;
    case "carregarDados()": $main->carregarDados($jsonObj); break;
    case "carregarPontuacao()": $main->carregarPontuacao($jsonObj); break;
    case "contaAlterar()": $main->contaAlterar($jsonObj); break;
    case "recuperarSenha()": $main->recuperarSenha($jsonObj); break;
    case "redefinirSenha()": $main->redefinirSenha($jsonObj); break;
    case "salvarPontuacao()": $main->salvarPontuacao($jsonObj); break;
    case "redirecionar()": $main->redirecionar($jsonObj); break;
    case "voltar()": $main->voltar(); break;
    case "sair()": $main->sair(); break;
}