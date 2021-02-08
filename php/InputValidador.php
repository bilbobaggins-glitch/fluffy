<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 23/06/2018
 * Time: 10:26
 */

class InputValidador
{
    public $erro = false;

    public function emailVazio($mensagemObj){
        if(!isset($mensagemObj->dadosEntrada->email) || empty($mensagemObj->dadosEntrada->email)){
            $mensagemObj->dadosSaida->erros->emailVazio = true;
            $this->erro = true;
        }

        return $mensagemObj;
    }

    public function senhaVazia($mensagemObj){
        if(!isset($mensagemObj->dadosEntrada->senha) || empty($mensagemObj->dadosEntrada->senha)){
            $mensagemObj->dadosSaida->erros->senhaVazia = true;
            $this->erro = true;
        }

        return $mensagemObj;
    }

    public function rankingNomeVazio($mensagemObj){
        if(!isset($mensagemObj->dadosEntrada->rankingNome) || empty($mensagemObj->dadosEntrada->rankingNome)){
            $mensagemObj->dadosSaida->erros->rankingNomeVazio = true;
            $this->erro = true;
        }

        return $mensagemObj;
    }

    public function emailFormatoInvalido($mensagemObj){
        if(!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/", $mensagemObj->dadosEntrada->email)){
            $mensagemObj->dadosSaida->erros->emailFormatoInvalido = true;
            $this->erro = true;
        }

        return $mensagemObj;
    }
}