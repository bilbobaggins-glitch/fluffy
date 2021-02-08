function superVarIni(superVar){
    superVar = {
        handle: {
            jogarBt: null,
            rankingBt: null,
            alterarBt: null,
            contatoBt: null,
            sobreBt: null,
            sairBt: null
        },
        json: {
            obj: {
                "comando": null,
                "dadosEntrada": {
                    "pagina": null
                },
            },

            txt: null
        },
        ajaxResposta: null
    };

    return superVar;
}
function formRefParaHandle(handle){
    handle.rankingBt = document.getElementById("rankingBt");
    handle.alterarBt = document.getElementById("alterarBt");
    handle.contatoBt = document.getElementById("contatoBt");
    handle.sobreBt = document.getElementById("sobreBt");
    handle.sairBt = document.getElementById("sairBt");
    handle.jogarBt = document.getElementById("jogarBt");

    return handle;
}
function jsonObjRankingIni(jsonObj){
    jsonObj.comando = "redirecionar()";

    jsonObj.dadosEntrada.pagina = "ranking";

    return jsonObj;
}
function jsonObjAlterarIni(jsonObj){
    jsonObj.comando = "redirecionar()";

    jsonObj.dadosEntrada.pagina = "alterar";

    return jsonObj;
}
function scriptIni(){
    var superVar;

    superVar = superVarIni(superVar);
    superVar.handle = formRefParaHandle(superVar.handle);

    superVar.json.obj.comando = "redirecionar()";

    superVar.handle.jogarBt.onclick = function(){
        superVar.json.obj.dadosEntrada.pagina = "game";
        superVar.json.txt = JSON.stringify(superVar.json.obj);
        window.location.href = "../php/main.php?jsonTxt="+superVar.json.txt;
    };
    superVar.handle.alterarBt.onclick = function(){
        superVar.json.obj.dadosEntrada.pagina = "alterar";
        superVar.json.txt = JSON.stringify(superVar.json.obj);
        window.location.href = "../php/main.php?jsonTxt="+superVar.json.txt;
    };
    superVar.handle.rankingBt.onclick = function(){
        superVar.json.obj.dadosEntrada.pagina = "ranking";
        superVar.json.txt = JSON.stringify(superVar.json.obj);
        window.location.href = "../php/main.php?jsonTxt="+superVar.json.txt;
    };
    superVar.handle.contatoBt.onclick = function(){
        superVar.json.obj.dadosEntrada.pagina = "contato";
        superVar.json.txt = JSON.stringify(superVar.json.obj);
        window.location.href = "../php/main.php?jsonTxt="+superVar.json.txt;
    };
    superVar.handle.sobreBt.onclick = function(){
        superVar.json.obj.dadosEntrada.pagina = "sobre";
        superVar.json.txt = JSON.stringify(superVar.json.obj);
        window.location.href = "../php/main.php?jsonTxt="+superVar.json.txt;
    };

    superVar.handle.sairBt.onclick = function(){
        superVar.json.obj.comando = "sair()";
        superVar.json.obj.dadosEntrada.pagina = null;
        superVar.json.txt = JSON.stringify(superVar.json.obj);
        window.location.href = "../php/main.php?jsonTxt="+superVar.json.txt;
    };
}

window.onload = scriptIni;