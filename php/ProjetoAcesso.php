<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 29/06/2018
 * Time: 12:59
 */

class ProjetoAcesso{
    public $endereco;

    function __construct(){
        $myfile = fopen("../config/projeto.txt", "r") or die("Unable to open file!");

        $this->endereco = (str_replace("endereco=", "", fgets($myfile)));
        $this->endereco = (preg_replace('/\s+/', '', $this->endereco));

        fclose($myfile);
    }
}