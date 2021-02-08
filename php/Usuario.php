<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 23/06/2018
 * Time: 11:07
 */

class Usuario
{
    public $email;
    public $senha;
    public $rankingNome;
    public $pontuacao;
    public $hash;
    public $ativo;

    public function getEmail()
    {
        return $this->email;
    }
    public function setEmail($email)
    {
        $this->email = $email;
    }
    public function getSenha()
    {
        return $this->senha;
    }
    public function setSenha($senha)
    {
        $this->senha = $senha;
    }
    public function getRankingNome()
    {
        return $this->rankingNome;
    }
    public function setRankingNome($rankingNome)
    {
        $this->rankingNome = $rankingNome;
    }
    public function getPontuacao()
    {
        return $this->pontuacao;
    }
    public function setPontuacao($pontuacao)
    {
        $this->pontuacao = $pontuacao;
    }
    public function getHash()
    {
        return $this->hash;
    }
    public function setHash($hash)
    {
        $this->hash = $hash;
    }

    public function getAtivo()
    {
        return $this->ativo;
    }
    public function setAtivo($ativo)
    {
        $this->ativo = $ativo;
    }

    public function setHashAuto(){
        $this->hash = md5(rand(0, 1000));
    }
    public function setAtivoAuto(){
        $this->ativo = false;
    }
    public function setPontuacaoAuto(){
        $this->pontuacao = 0;
    }


}