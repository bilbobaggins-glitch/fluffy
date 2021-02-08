function superVarIni(superVar){
    superVar = {
        handle: {
            voltarBt: null,
        },
        json: {
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
    handle.voltarBt = document.getElementById("voltarBt");

    return handle;
}

function jsonObjRankingIni(jsonObj){
    jsonObj.comando = "ranking()";

    jsonObj.dadosSaida.ranking = null;

    return jsonObj;
}
function scriptIni(){
    var superVar;

    superVar = superVarIni(superVar);

    superVar.handle = formRefParaHandle(superVar.handle);

    superVar.handle.voltarBt.onclick = function(){
        superVar.json.obj.comando = "voltar()";
        superVar.json.obj.dadosEntrada.pagina = null;
        superVar.json.txt = JSON.stringify(superVar.json.obj);

        window.location.href = "../php/main.php?jsonTxt="+superVar.json.txt;
    };
}

window.onload = scriptIni;