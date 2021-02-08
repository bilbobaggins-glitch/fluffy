<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 23/06/2018
 * Time: 13:21
 */

class MensagemGerador
{
    public function contaNova($projetoEndereco, $dados){
        $jsonNovo = new stdClass();
        $jsonNovo->comando = "contaAtivarEmail()";
        $jsonNovo->dadosEntrada = new stdClass();
        $jsonNovo->dadosEntrada->email = $dados->email;
        $jsonNovo->dadosEntrada->hash = $dados->hash;

        $jsonNovoTxt = json_encode($jsonNovo);

        $mensagem = "

         Obrigado por se cadastrar!
         Clique no link abaixo para ativar a sua conta e comece a jogar Fluffy agora!
          
         $projetoEndereco/php/main.php?jsonTxt=$jsonNovoTxt

         Abaixo estão os seus dados para realizar login:
         
            ------------------------
            Email: $dados->email
            Senha: $dados->senha
            ------------------------
           
          Venha se divertir com nosso game!
          
        ";

        return $mensagem;
    }

    public function senhaRecuperacao($projetoEndereco, $dados){
        $jsonNovo = new stdClass();
        $jsonNovo->comando = "recuperarSenhaEmail()";
        $jsonNovo->dadosEntrada = new stdClass();
        $jsonNovo->dadosEntrada->email = $dados->email;
        $jsonNovo->dadosEntrada->hash = $dados->hash;

        $jsonNovoTxt = json_encode($jsonNovo);

        $mensagem = "

         Você solicitou a redefinição de senha, para continuar clique no link abaixo:
          
         $projetoEndereco/php/main.php?jsonTxt=$jsonNovoTxt
          
        ";

        return $mensagem;
    }

}