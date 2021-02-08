var superVar, juju;

juju = 30;

function superVarIni(superVar){
    superVar = {
        handle: {
            jogador: null
        },
        json1: {
            obj: {
                "comando": null,
                "dadosEntrada": {
                    "pontuacao": null
                },
                "dadosSaida": null
            },
            txt: null
        },
        json2: {
            obj: {
                "comando": null,
                "dadosEntrada": {
                    "pagina": null
                },
                "dadosSaida": null
            },
            txt: null
        },
        ajaxResposta: null
    };

    return superVar;
}

function formRefParaHandle(handle){
    handle.jogador = jogador;

    return handle;
}

function jsonObjSalvarIni(jsonObj){
    jsonObj.comando = "salvarPontuacao()";

    return jsonObj;
}

function jsonObjPontuacaoObtidaIni(jsonObj){
    jsonObj.comando = "redirecionar()";

    jsonObj.dadosEntrada.pagina = "pontuacaoObtida";

    return jsonObj;
}

function handleParaJsonObj(jsonObj, handle){
    jsonObj.dadosEntrada.pontuacao = handle.jogador.pontuacao;

    return jsonObj;
}

function receberResposta(texto, superVar){
    alert(texto);
    window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
}

function scriptIni(){
    superVar = superVarIni(superVar);

    superVar.json1.obj = jsonObjSalvarIni(superVar.json1.obj);
    superVar.json2.obj = jsonObjPontuacaoObtidaIni(superVar.json2.obj);
    superVar.json2.txt = JSON.stringify(superVar.json2.obj);
}

scriptIni();