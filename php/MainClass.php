<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 26/06/2018
 * Time: 15:57
 */

require_once("BDConexao.php");
require_once("Usuario.php");
require_once("InputValidador.php");
require_once("BDManipulador.php");
require_once("MensagemGerador.php");
require_once("EmailMensageiro.php");
require_once("ProjetoAcesso.php");


class MainClass
{
    public $conexao;
    public $inputValidador;
    public $bdManipulador;
    public $mensagemGerador;
    public $usuario;
    public $emailMensageiro;
    public $projetoAcesso;

    function __construct(){
        $this->conexao = new BDConexao("../config/banco-de-dados.txt");
        $this->inputValidador = new InputValidador();
        $this->bdManipulador = new BDManipulador();
        $this->mensagemGerador = new MensagemGerador();
        $this->usuario = new Usuario();
        $this->emailMensageiro = new EmailMensageiro("../config/email.txt");
        $this->projetoAcesso = new ProjetoAcesso();
    }

    function criarConta($jsonObj){
        $jsonObj = $this->inputValidador->emailVazio($jsonObj);
        $jsonObj = $this->inputValidador->emailFormatoInvalido($jsonObj);
        $jsonObj = $this->inputValidador->senhaVazia($jsonObj);
        $jsonObj = $this->inputValidador->rankingNomeVazio($jsonObj);

        if ($this->inputValidador->erro === false) {
            $this->bdManipulador->setConexaoReferencia($this->conexao->getReferencia());
            if ($this->bdManipulador->contaExisteVerificar($jsonObj->dadosEntrada) === 0) {
                $this->usuario->email = $jsonObj->dadosEntrada->email;
                $this->usuario->senha = $jsonObj->dadosEntrada->senha;
                $this->usuario->rankingNome = $jsonObj->dadosEntrada->rankingNome;
                $this->usuario->setHashAuto();
                $this->usuario->setAtivoAuto();
                $this->usuario->setPontuacaoAuto();

                $this->bdManipulador->contaNovaInserir($this->usuario);

                $emailMensagem = $this->mensagemGerador->contaNova($this->projetoAcesso->endereco, $this->usuario);
                $this->emailMensageiro->enviarMensagem($this->usuario->email, "Fluffy: Confirmação de Cadastro!", $emailMensagem);

                $jsonObj->dadosSaida->sucesso = true;
            } else {
                $jsonObj->dadosSaida->erros->emailJaCadastrado = true;
            }
        }

        echo json_encode($jsonObj);
    }

    function contaAtivar($jsonObj){
        if(isset($_SESSION['dadosEntrada']) && !empty($_SESSION['dadosEntrada'])) {
            $jsonObj->dadosEntrada = $_SESSION['dadosEntrada'];

            $this->bdManipulador->setConexaoReferencia($this->conexao->getReferencia());
            if($this->bdManipulador->contaHashVerificar($jsonObj->dadosEntrada) === 1) {
                $this->bdManipulador->contaNovaAtivar($jsonObj->dadosEntrada);

                $jsonObj->dadosSaida->sucesso = true;
            } else {
                $jsonObj->dadosSaida->erros->emailOuHashInvalido = true;
            }

            session_unset();

            echo json_encode($jsonObj);
        }
    }

    function logar($jsonObj){
        $jsonObj = $this->inputValidador->emailVazio($jsonObj);
        $jsonObj = $this->inputValidador->senhaVazia($jsonObj);

        $this->bdManipulador->setConexaoReferencia($this->conexao->getReferencia());
        if($this->bdManipulador->senhaVerificar($jsonObj->dadosEntrada) === 0) {
            $jsonObj->dadosSaida->erros->emailOuSenhaIncorreta = true;
        }

        if(!$jsonObj->dadosSaida->erros->emailOuSenhaIncorreta &&
            !$jsonObj->dadosSaida->erros->emailVazio &&
            !$jsonObj->dadosSaida->erros->senhaVazia) {
            if ($this->bdManipulador->contaExisteVerificar($jsonObj->dadosEntrada)) {
                if ($this->bdManipulador->contaAtivaVerificar($jsonObj->dadosEntrada) === 0) {
                    $jsonObj->dadosSaida->erros->contaNaoAtivada = true;
                }
            }
        }

        if(!$jsonObj->dadosSaida->erros->contaNaoAtivada &&
            !$jsonObj->dadosSaida->erros->emailVazio &&
            !$jsonObj->dadosSaida->erros->senhaVazia &&
            !$jsonObj->dadosSaida->erros->emailOuSenhaIncorreta &&
            !$jsonObj->dadosSaida->erros->contaNaoAtivada){

            $_SESSION['id'] = $this->bdManipulador->idAdquirir($jsonObj->dadosEntrada);
            $_SESSION['paginaProx'] = 'home-x.html';

            $jsonObj->dadosSaida->sucesso = true;
        }

        echo json_encode($jsonObj);
    }

    function ranking($jsonObj){
        $this->bdManipulador->setConexaoReferencia($this->conexao->getReferencia());

        $jsonObj->dadosSaida->ranking = $this->bdManipulador->rankingAdquirir();

        echo json_encode($jsonObj);
    }

    function carregarDados($jsonObj){
        $this->bdManipulador->setConexaoReferencia($this->conexao->getReferencia());

        $dadosCarregados = $this->bdManipulador->contaCarregarDados($_SESSION['id']);

        $jsonObj->dadosEntrada->email = $dadosCarregados['email'];
        $jsonObj->dadosEntrada->senha = $dadosCarregados['senha'];
        $jsonObj->dadosEntrada->rankingNome = $dadosCarregados['rankingNome'];

        echo json_encode($jsonObj);
    }

    function contaAlterar($jsonObj){
        $this->bdManipulador->setConexaoReferencia($this->conexao->getReferencia());

        $this->bdManipulador->contaAlterarSenhaRankingNome($_SESSION['id'], $jsonObj->dadosEntrada);

        $jsonObj->dadosSaida->sucesso = true;

        echo json_encode($jsonObj);
    }

    function recuperarSenha($jsonObj){
        $jsonObj = $this->inputValidador->emailVazio($jsonObj);

        if(!$jsonObj->dadosSaida->erros->emailVazio) {
            $this->bdManipulador->setConexaoReferencia($this->conexao->getReferencia());

            if ($this->bdManipulador->contaExisteVerificar($jsonObj->dadosEntrada) === 1) {
                $this->usuario->email = $jsonObj->dadosEntrada->email;
                $this->usuario->setHashAuto();
                $this->bdManipulador->hashNovoCriar($this->usuario);

                $emailMensagem = $this->mensagemGerador->senhaRecuperacao($this->usuario);
                $this->emailMensageiro->enviarMensagem($this->usuario->email, "Fluffy: Recuperação de Senha!", $emailMensagem);

                $jsonObj->dadosSaida->sucesso = true;
            } else {
                $jsonObj->dadosSaida->erros->emailNaoCadastrado = true;
            }
        }

        echo json_encode($jsonObj);
    }

    function redefinirSenha($jsonObj){
        if(!empty($_SESSION['dadosEntrada'])) {
            $jsonObj->dadosEntrada->email = $_SESSION['dadosEntrada']->email;
            $jsonObj->dadosEntrada->hash = $_SESSION['dadosEntrada']->hash;
            $this->bdManipulador->setConexaoReferencia($this->conexao->getReferencia());

            if ($this->bdManipulador->contaHashVerificar($jsonObj->dadosEntrada) === 1) {
                $this->bdManipulador->alterarSenha($jsonObj->dadosEntrada);

                $jsonObj->dadosSaida->sucesso = true;
            } else {
                $jsonObj->dadosSaida->erros->emailOuHashInvalido = true;
            }

            session_unset();
        }

        echo json_encode($jsonObj);
    }

    function carregarPontuacao($jsonObj){
        $this->bdManipulador->setConexaoReferencia($this->conexao->getReferencia());
        $jsonObj->dadosEntrada->pontuacao = $_SESSION['pontuacao'];

        echo json_encode($jsonObj);
    }

    function salvarPontuacao($jsonObj){
        if(isset($_SESSION['id'])){
            $_SESSION['pontuacao'] = $jsonObj->dadosEntrada->pontuacao;

            $this->bdManipulador->setConexaoReferencia($this->conexao->getReferencia());
            $this->bdManipulador->pontuacaoAlterar($_SESSION['id'], $_SESSION['pontuacao']);
        }
        echo "xxx";
    }

    function contaAtivarEmail($jsonObj){
        if(empty($_SESSION['dadosEntrada'])) {
            $_SESSION['dadosEntrada'] = $jsonObj->dadosEntrada;

            header("location: ../html/conta-ativar.html");
        }
    }

    function trocarPagina(){
        if(isset($_SESSION['paginaProx'])){
            $paginaProx = $_SESSION['paginaProx'];
            unset($_SESSION['paginaProx']);
            header('location: ../html/'.$paginaProx);
        }
    }

    function recuperarSenhaEmail($jsonObj)
    {
        if (empty($_SESSION['dadosEntrada'])) {
            $_SESSION['dadosEntrada'] = $jsonObj->dadosEntrada;

            header("location: ../html/senha-redefinicao.html");
        }
    }

    function redirecionar($jsonObj){
        if(isset($_SESSION['paginaAtual'])) {
            $_SESSION['paginaAnterior'] = $_SESSION['paginaAtual'];
        }
        $_SESSION['paginaAtual'] = $jsonObj->dadosEntrada->pagina;
        switch($jsonObj->dadosEntrada->pagina){
            case "login":
                header("location: ../html/login.html");

                break;
            case "ranking":
                header("location: ../html/ranking.html");

                break;
            case "home":
                if(isset($_SESSION['id'])) {
                    header("location: ../html/home-x.html");
                }

                break;
            case "alterar":
                if(isset($_SESSION['id'])) {
                    header("location: ../html/alterar-dados.html");
                }

                break;
            case "pontuacaoObtida":
                if(isset($_SESSION['id'])) {
                    header("location: ../html/pontuacao-final.html");
                }

                break;
            case "criarConta":
                header("location: ../html/conta-nova.html");

                break;
            case "esqueciSenha":
                header("location: ../html/senha-recuperacao.html");

                break;
            case "contato":
                header("location: ../html/contato.html");

                break;
            case "creditos":
                header("location: ../html/creditos.html");

                break;
            case "comoJogar":
                header("location: ../html/como-jogar.html");

                break;
            case "game":
                if(isset($_SESSION['id'])) {
                    header("location: ../html/game.html");
                }

                break;
            case "sobre":
                header("location: ../html/sobre.html");

                break;

        }
    }

    function voltar(){
        $temp = $_SESSION['paginaAtual'];
        $_SESSION['paginaAtual'] = $_SESSION['paginaAnterior'];
        $_SESSION['paginaAnterior'] = $temp;
        switch($_SESSION['paginaAtual']){
            case "login":
                header("location: ../html/login.html");

                break;
            case "home":
                header("location: ../html/home-x.html");

                break;
            case "pontuacaoObtida":
                header("location: ../html/pontuacao-final.html");
                break;
        }
    }

    function sair(){
        session_unset();
        $_SESSION['paginaAtual'] = "login";
        header("location: ../html/login.html");
    }
}