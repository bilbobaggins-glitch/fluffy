<?php
/**
 * Created by PhpStorm->
 * User: Admin
 * Date: 23/06/2018
 * Time: 04:04
 */

class BDConexao {
    public $referencia;
    public $servidor;
    public $senha;
    public $usuario;
    public $bancoNome;

    public function __construct($endereco)
    {
        $this->dadosAcessoAdquirir($endereco);

        $this->referencia = (mysqli_connect($this->servidor,
                                            $this->usuario,
                                            $this->senha,
                                            $this->bancoNome));
    }

    public function dadosAcessoAdquirir($endereco){
        $myfile = fopen($endereco, "r") or die("Unable to open file!");

        $this->servidor = (str_replace("host=", "", fgets($myfile)));
        $this->usuario = (str_replace("username=", "", fgets($myfile)));
        $this->senha = (str_replace("password=", "", fgets($myfile)));
        $this->bancoNome = (str_replace("database=", "", fgets($myfile)));

        $this->servidor = (preg_replace('/\s+/', '', $this->servidor));
        $this->usuario = (preg_replace('/\s+/', '', $this->usuario));
        $this->senha = (preg_replace('/\s+/', '', $this->senha));
        $this->bancoNome = (preg_replace('/\s+/', '', $this->bancoNome));

        fclose($myfile);
    }

    public function getReferencia()
    {
        return $this->referencia;
    }
    public function setReferencia($referencia)
    {
        $this->referencia = $referencia;
    }

}