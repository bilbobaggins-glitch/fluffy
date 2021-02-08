function superVarIni(superVar){
    superVar = {
        handle: {
            voltarBt: null,
        },
        json1: {
            obj: {
                "comando": null,
                "dadosEntrada":null,
                "dadosSaida": {
                    "ranking": null
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
    handle.voltarBt = document.getElementById("voltarBt");

    return handle;
}

function jsonObjRankingIni(jsonObj){
    jsonObj.comando = "ranking()";

    jsonObj.dadosSaida.ranking = null;

    return jsonObj;
}

function jsonObjVoltarIni(jsonObj){
    jsonObj.comando = "voltar()";

    return jsonObj;
}

function rankingReceber(texto, superVar){
    alert(texto);

    if(superVar.json1 !== undefined) {
        superVar.json1.obj = JSON.parse(texto);
    }

    var table = document.getElementsByTagName("table")[0];
    var i;
    for(i = 0; ; i++){
        if(superVar.json1.obj.dadosSaida.ranking[i] === undefined){
            break;
        }

        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.innerHTML = i+1+"º";
        tr.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = superVar.json1.obj.dadosSaida.ranking[i]['rankingNome'];
        tr.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = superVar.json1.obj.dadosSaida.ranking[i]['pontuacao'];
        tr.appendChild(td);
        table.appendChild(tr);
    }

/*
    document.getElementsByTagName("body")[0].innerHTML = "ijijij";*/
}

function scriptIni(){
    var superVar;

    superVar = superVarIni(superVar);

    superVar.json1.obj = jsonObjRankingIni(superVar.json1.obj);
    superVar.json1.txt = JSON.stringify(superVar.json1.obj);
    ajaxEnviar("../php/main.php", true, true, rankingReceber, "post", superVar.json1.txt, superVar);

    superVar.handle = formRefParaHandle(superVar.handle);

    superVar.handle.voltarBt.onclick = function(){
        superVar.json2.obj = jsonObjVoltarIni(superVar.json2.obj);
        superVar.json2.txt = JSON.stringify(superVar.json2.obj);

        alert(superVar.json2.txt);

        window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
    };
}

window.onload = scriptIni;