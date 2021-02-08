<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 13/06/2018
 * Time: 00:17
 */

require "../lib/PHPMailer/PHPMailerAutoload.php";

class EmailMensageiro {
    public $referencia;
    public $servidor;
    public $usuario;
    public $senha;
    public $from;
    public $nome;

    function __construct($endereco){
        $this->dadosAcessoAdquirir($endereco);

        $this->referencia = new PHPMailer;

        $this->referencia->Port = 465;
        $this->referencia->isSMTP();
        $this->referencia->SMTPAuth = true;
        $this->referencia->Host = $this->servidor;
        $this->referencia->Username = $this->usuario;
        $this->referencia->Password = $this->senha;
        $this->referencia->SMTPSecure = 'ssl';
        $this->referencia->IsHTML(false);
        $this->referencia->From = $this->usuario;
        $this->referencia->FromName = $this->nome;
    }

    public function dadosAcessoAdquirir($endereco){
        $myfile = fopen($endereco, "r") or die("Unable to open file!");

        $this->servidor = (str_replace("servidor=", "", fgets($myfile)));
        $this->usuario = (str_replace("usuario=", "", fgets($myfile)));
        $this->senha = (str_replace("senha=", "", fgets($myfile)));
        $this->nome = (str_replace("nome=", "", fgets($myfile)));

        $this->servidor = (preg_replace('/\s+/', '', $this->servidor));
        $this->usuario = (preg_replace('/\s+/', '', $this->usuario));
        $this->senha = (preg_replace('/\s+/', '', $this->senha));
        $this->nome = (preg_replace('/\s+/', '', $this->nome));

        fclose($myfile);
    }

    public function enviarMensagem($destinatario, $assunto, $mensagem){
        $sub = '=?UTF-8?B?'.base64_encode($assunto).'?=';

        $this->referencia->addAddress($destinatario);
        $this->referencia->Subject = $sub;
        $this->referencia->Body = $mensagem;

        $this->referencia->send();
/*        if($this->referencia->Send()){
            echo 'Enviado com sucesso!';
        }else{
            echo 'Erro ao enviar email: '. $this->referencia->ErrorInfo;
        }*/
    }
}