function superVarIni(superVar){
    superVar = {
        handle: {
            senhaTxt: null,
            confirmarBt: null
        },
        json: {
            obj: {
                "comando": null,
                "dadosEntrada":{
                    "senha": null
                },
                "dadosSaida": {
                    "erros": {
                        "emailOuHashInvalido": null,
                        "senhaVazia": null
                    },
                    "sucesso": null
                }
            },
            txt: null
        },
        json2: {
            obj: {
                "comando": null,
                "dadosEntrada":{
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
    handle.senhaTxt = document.getElementById("senhaTxt");
    handle.confirmarBt = document.getElementById("confirmarBt");

    return handle;
}

function jsonObjRedefinirSenhaIni(jsonObj){
    jsonObj.comando = "redefinirSenha()";

    jsonObj.dadosSaida.erros.emailOuHashInvalido = false;
    jsonObj.dadosSaida.erros.senhaVazia = false;
    jsonObj.dadosSaida.sucesso = false;

    return jsonObj;
}

function handleParaJsonObj(jsonObj, handle){
    jsonObj.dadosEntrada.senha = handle.senhaTxt.value;

    return jsonObj;
}

function redefinirSenhaReceber(texto, superVar){
    alert(texto);

    if(superVar.json !== undefined) {
        superVar.json.obj = JSON.parse(texto);
    }

    if(superVar.json.obj.dadosSaida.erros.emailOuHashInvalido === true){
        alert("Email ou hash de ativação inválidos!");
    }

    if(superVar.json.obj.dadosSaida.erros.senhaVazia === true){
        alert("Senha vazia!");
    }


    if(superVar.json.obj.dadosSaida.sucesso === true){
        alert("A sua senha foi redefinida, você já pode logar na sua conta com a nova senha!");

        superVar.json2.obj.comando = "redirecionar()";
        superVar.json2.obj.dadosEntrada.pagina = "login";
        superVar.json2.txt = JSON.stringify(superVar.json2.obj);
        alert(superVar.json2.txt);
        window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
    }
}

function scriptIni(){
    var superVar;

    superVar = superVarIni(superVar);
    superVar.handle = formRefParaHandle(superVar.handle);

    superVar.handle.confirmarBt.onclick = function() {
        superVar.json.obj = jsonObjRedefinirSenhaIni(superVar.json.obj);
        superVar.json.obj = handleParaJsonObj(superVar.json.obj, superVar.handle);
        superVar.json.txt = JSON.stringify(superVar.json.obj);

        alert(superVar.json.txt);

        ajaxEnviar("../php/main.php", true, true, redefinirSenhaReceber, "post", superVar.json.txt, superVar);
    };
}

window.onload = scriptIni;