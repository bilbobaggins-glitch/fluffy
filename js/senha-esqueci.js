function superVarIni(superVar){
    superVar = {
        handle: {
            emailTxt: null,
            prosseguirBt: null,
            voltarBt: null
        },
        json: {
            obj: {
                "comando": null,
                "dadosEntrada": {
                    "email": null,
                },
                "dadosSaida": {
                    "erros": {
                        "emailVazio": null,
                        "emailNaoCadastrado": null
                    },
                    "sucesso": null
                }
            },
            txt: null
        },
        json2: {
            obj: {
                "comando": null,
                "dadosEntrada": {
                    "pagina": null
                }
            },
            txt: null
        },
        ajaxResposta: null
    };

    return superVar;
}

function formRefParaHandle(handle){
    handle.emailTxt = document.getElementById("emailTxt");
    handle.prosseguirBt = document.getElementById("prosseguirBt");
    handle.voltarBt = document.getElementById("voltarBt");

    return handle;
}

function jsonObjRecuperarSenhaIni(jsonObj){
    jsonObj.comando = "recuperarSenha()";

    jsonObj.dadosSaida.erros.emailVazio = null;
    jsonObj.dadosSaida.erros.emailNaoCadastrado = null;

    jsonObj.dadosSaida.sucesso = null;

    return jsonObj;
}

function handleParaJsonObj(jsonObj, handle){
    jsonObj.dadosEntrada.email = handle.emailTxt.value;

    return jsonObj;
}

function senhaEsqueciReceber(texto, superVar){
    alert(texto);

    if(superVar.json !== undefined) {
        superVar.json.obj = JSON.parse(texto);
    }

    if(superVar.json.obj.dadosSaida.erros.emailVazio === true){
        alert("Email está vazio!");
    }
    if(superVar.json.obj.dadosSaida.erros.emailNaoCadastrado === true){
        alert("Email não consta no nosso cadastro!");
    }

    if(superVar.json.obj.dadosSaida.sucesso === true){
        alert("Uma mensagem para redefinição de senha foi enviado para o seu email." +
            "Entre na sua conta para continuar o processo!");
    }
}

function scriptIni(){
    var superVar;

    superVar = superVarIni(superVar);

    superVar.handle = formRefParaHandle(superVar.handle);

    superVar.handle.prosseguirBt.onclick = function(){
        superVar.json.obj = jsonObjRecuperarSenhaIni(superVar.json.obj);
        superVar.json.obj = handleParaJsonObj(superVar.json.obj, superVar.handle);
        superVar.json.txt = JSON.stringify(superVar.json.obj);

        ajaxEnviar("../php/main.php", true, true, senhaEsqueciReceber, "post", superVar.json.txt, superVar);
    };

    superVar.handle.voltarBt.onclick = function(){
        superVar.json2.obj.comando = "voltar()";
        superVar.json2.obj.dadosEntrada.pagina = null;
        superVar.json2.txt = JSON.stringify(superVar.json2.obj);
        window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
    };
}

window.onload = scriptIni;