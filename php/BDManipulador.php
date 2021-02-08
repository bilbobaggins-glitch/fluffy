<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 23/06/2018
 * Time: 10:07
 */

class BDManipulador
{
    public $sqlScript;
    public $registrosContagem;
    public $queryResultado;
    public $registros;
    public $registro;
    public $conexaoReferencia;

    public function contaNovaInserir($dados){
        $this->sqlScript = "insert into pessoa (email, senha, rankingNome, pontuacao, hash, ativo)
                            values ('$dados->email', '$dados->senha', '$dados->rankingNome', $dados->pontuacao,
                            '$dados->hash', '$dados->ativo');";

        mysqli_query($this->conexaoReferencia, $this->sqlScript);
    }

    public function pontuacaoAlterar($id, $pontuacao){
        $this->sqlScript = "select * from pessoa where id = $id;";
        $this->queryResultado = mysqli_query($this->conexaoReferencia, $this->sqlScript);
        $this->registro = mysqli_fetch_array($this->queryResultado, MYSQLI_ASSOC);

        if($this->registro['pontuacao'] < $pontuacao){
            $this->sqlScript = "update pessoa set pontuacao = $pontuacao where id = $id;";

            mysqli_query($this->conexaoReferencia, $this->sqlScript);
        }

        mysqli_query($this->conexaoReferencia, $this->sqlScript);
    }

    public function contaCarregarDados($id){
        $this->sqlScript = "select * from pessoa where id = $id;";
        $this->queryResultado = mysqli_query($this->conexaoReferencia, $this->sqlScript);
        $this->registrosContagem = mysqli_num_rows($this->queryResultado);

        $this->registro = mysqli_fetch_array($this->queryResultado, MYSQLI_ASSOC);

        return $this->registro;
    }

    public function contaAlterarSenhaRankingNome($id, $dados){
        $this->sqlScript = "update pessoa set rankingNome = '$dados->rankingNome', senha = '$dados->senha'
                            where id = $id;";

        mysqli_query($this->conexaoReferencia, $this->sqlScript);
    }

    public function contaNovaAtivar($dados){
        $this->sqlScript = "update pessoa set ativo = true where email = '$dados->email';";

        mysqli_query($this->conexaoReferencia, $this->sqlScript);
    }

    public function contaHashVerificar($dados){
        $this->sqlScript = "select * from pessoa where email = '$dados->email' and hash = '$dados->hash';";
        $this->queryResultado = mysqli_query($this->conexaoReferencia, $this->sqlScript);
        $this->registrosContagem = mysqli_num_rows($this->queryResultado);

        if($this->registrosContagem === 1){
            return 1;
        }else{
            return 0;
        }
    }

    public function alterarSenha($dados){
        $this->sqlScript = "update pessoa set senha = '$dados->senha' where email = '$dados->email';";

        $this->queryResultado = mysqli_query($this->conexaoReferencia, $this->sqlScript);
    }

    public function idAdquirir($dados){
        $this->sqlScript = "select * from pessoa where email = '$dados->email' and senha = '$dados->senha';";
        $this->queryResultado = mysqli_query($this->conexaoReferencia, $this->sqlScript);
        $this->registrosContagem = mysqli_num_rows($this->queryResultado);

        if($this->registrosContagem === 1){
            $registro = mysqli_fetch_array($this->queryResultado);

            return $registro['id'];
        }else{
            return 0;
        }
    }

    public function senhaVerificar($dados){
        $this->sqlScript = "select * from pessoa where email = '$dados->email' and senha = '$dados->senha';";
        $this->queryResultado = mysqli_query($this->conexaoReferencia, $this->sqlScript);
        $this->registrosContagem = mysqli_num_rows($this->queryResultado);

        if($this->registrosContagem === 1){
            return 1;
        }else{
            return 0;
        }
    }

    public function contaAtivaVerificar($dados){
        $this->sqlScript = "select * from pessoa where email = '$dados->email' and ativo = true;";
        $this->queryResultado = mysqli_query($this->conexaoReferencia, $this->sqlScript);
        $this->registrosContagem = mysqli_num_rows($this->queryResultado);

        if($this->registrosContagem === 1){
            return 1;
        }else{
            return 0;
        }
    }

    public function rankingAdquirir(){
        $this->sqlScript = "select rankingNome, pontuacao from pessoa order by pontuacao desc limit 10;";
        $this->queryResultado = mysqli_query($this->conexaoReferencia, $this->sqlScript);
        $this->registrosContagem = mysqli_num_rows($this->queryResultado);

        for($i = 0; $i < $this->registrosContagem; $i++){
            $this->registros[$i] = mysqli_fetch_array($this->queryResultado, MYSQLI_ASSOC);
        }

        return $this->registros;
    }

    public function contaExisteVerificar($dados){
        $this->sqlScript = "select * from pessoa where email = '$dados->email';";
        $this->queryResultado = mysqli_query($this->conexaoReferencia, $this->sqlScript);
        $this->registrosContagem = mysqli_num_rows($this->queryResultado);

        if($this->registrosContagem === 1){
            return 1;
        }else{
            return 0;
        }
    }

    public function hashNovoCriar($dados){
        $this->sqlScript = "update pessoa set hash = '$dados->hash' where email = '$dados->email';";
        $this->queryResultado = mysqli_query($this->conexaoReferencia, $this->sqlScript);
    }

    public function getSqlScript()
    {
        return $this->sqlScript;
    }
    public function setSqlScript($sqlScript)
    {
        $this->sqlScript = $sqlScript;
    }
    public function getRegistrosContagem()
    {
        return $this->registrosContagem;
    }
    public function setRegistrosContagem($registrosContagem)
    {
        $this->registrosContagem = $registrosContagem;
    }
    public function getQueryResultado()
    {
        return $this->queryResultado;
    }
    public function setQueryResultado($queryResultado)
    {
        $this->queryResultado = $queryResultado;
    }
    public function getRegistros()
    {
        return $this->registros;
    }
    public function setRegistros($registros)
    {
        $this->registros = $registros;
    }
    public function getRegistro()
    {
        return $this->registro;
    }
    public function setRegistro($registro)
    {
        $this->registro = $registro;
    }
    public function getConexaoReferencia()
    {
        return $this->conexaoReferencia;
    }
    public function setConexaoReferencia($conexaoReferencia)
    {
        $this->conexaoReferencia = $conexaoReferencia;
    }
}