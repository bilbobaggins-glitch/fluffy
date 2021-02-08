function superVarIni(superVar){
    superVar = {
        handle: {
            pontuacaoTxt: null,
            rankingBt: null,
            jogarBt: null,
            homeBt: null
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
            },
        },
        ajaxResposta: null
    };

    return superVar;
}

function formRefParaHandle(handle){
    handle.pontuacaoTxt = document.getElementById("pontuacaoTxt");
    handle.rankingBt = document.getElementById("rankingBt");
    handle.jogarBt = document.getElementById("jogarBt");
    handle.homeBt = document.getElementById("homeBt");

    return handle;
}

function jsonObjCarregarPontuacaoIni(jsonObj){
    jsonObj.comando = "carregarPontuacao()";

    return jsonObj;
}

function dadosParaForm(texto, superVar){
    alert(texto);
    superVar.json1.obj = JSON.parse(texto);

    superVar.handle.pontuacaoTxt.innerHTML += " "+superVar.json1.obj.dadosEntrada.pontuacao;
}

function jsonObjVoltarIni(jsonObj){
    jsonObj.comando = "voltar()";

    return jsonObj;
}

function scriptIni(){
    alert(555);

    var superVar;

    superVar = superVarIni(superVar);
    superVar.handle = formRefParaHandle(superVar.handle);
    superVar.json1.obj = jsonObjCarregarPontuacaoIni(superVar.json1.obj);
    superVar.json1.txt = JSON.stringify(superVar.json1.obj);
    ajaxEnviar("../php/main.php", false, true, dadosParaForm, "post", superVar.json1.txt, superVar);

    superVar.json2.obj.comando = "redirecionar()";

    superVar.handle.jogarBt.onclick = function(){
        superVar.json2.obj.dadosEntrada.pagina = "game";
        superVar.json2.txt = JSON.stringify(superVar.json2.obj);
        window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
    };
    superVar.handle.rankingBt.onclick = function(){
        superVar.json2.obj.dadosEntrada.pagina = "ranking";
        superVar.json2.txt = JSON.stringify(superVar.json2.obj);
        window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
    };
    superVar.handle.homeBt.onclick = function(){
        superVar.json2.obj.dadosEntrada.pagina = "home";
        superVar.json2.txt = JSON.stringify(superVar.json2.obj);
        window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
    };
}

window.onload = scriptIni;