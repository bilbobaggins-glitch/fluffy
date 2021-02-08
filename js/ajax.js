function ajaxReceber(callback, xhttp, superVar){
    if(xhttp.readyState == 4 && xhttp.status == 200){
        callback(xhttp.responseText, superVar);
    }
}

function ajaxEnviar(arquivo, assincrono, resposta, callback, metodo, mensagem, superVar){
    //cria uma variável e armazena nela um objeto que enviará e receberá mensagens do servidor
    var xhttp;
    xhttp = new XMLHttpRequest();

    //caso queira receber mensagens, determina que função processará a mensagem
    if(resposta === true) {
        xhttp.onreadystatechange = function(){ ajaxReceber(callback, xhttp, superVar); };
    }

    //determina o método de envio de mensagem (post ou get) e se o envio será assíncrono
    if(metodo == "post") {
        xhttp.open(metodo, arquivo, assincrono);
    }else if(metodo == "get"){
        xhttp.open(metodo, arquivo+"?jsonTxt="+mensagem, assincrono);
    }else{
        erroRequisicaoEnviar();
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //envia a mensagem de acordo com o método
    if(metodo === "post") {
        xhttp.send("jsonTxt=" + mensagem);
    }else if(metodo === "get"){
        xhttp.send();
    }else{
        erroRequisicaoEnviar();
    }

}

function erroRequisicaoEnviar(){
    alert("ERRO: Não foi possível enviar requisição!");
}