function superVarIni(superVar){
    superVar = {
        json1: {
            obj: {
                "comando": null,
                "dadosEntrada": {
                    "email": null,
                    "hash": null
                },
                "dadosSaida": {
                    "erros": {
                        "emailOuHashInvalid0": null
                    },
                    "sucesso": null,
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

function jsonObjContaAtivarIni(jsonObj){
    jsonObj.comando = "contaAtivar()";
    jsonObj.dadosSaida.erros.emailOuHashInvalido = false;
    jsonObj.dadosSaida.sucesso = false;

    return jsonObj;
}

function contaAtivarReceber(texto, superVar){
    alert(texto);

    if(superVar.json1 !== undefined) {
        superVar.json1.obj = JSON.parse(texto);
    }

    if(superVar.json1.obj.dadosSaida.erros.emailOuHashInvalido === true){
        alert("Email ou hash de ativação inválidos!");
    }

    if(superVar.json1.obj.dadosSaida.sucesso === true){
        alert("Conta ativada com sucesso! Você já pode logar na sua conta!");

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
    superVar.json1.obj = jsonObjContaAtivarIni(superVar.json1.obj);
    superVar.json1.txt = JSON.stringify(superVar.json1.obj);
    ajaxEnviar("../php/main.php", true, true, contaAtivarReceber, "post", superVar.json1.txt, superVar);
}

window.onload = scriptIni;