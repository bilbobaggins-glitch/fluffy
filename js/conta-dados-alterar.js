function superVarIni(superVar){
    superVar = {
        handle: {
            emailTxt: null,
            senhaTxt: null,
            rankingNomeTxt: null,
            alterarBt: null,
            voltarBt: null
        },
        json1: {
            obj: {
                "comando": null,
                "dadosEntrada": {
                    "email": null,
                    "senha": null,
                    "rankingNome": null
                },
                "dadosSaida": {
                    "erros": {
                        "senhaVazia": null,
                        "rankingNomeVazio": null
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
                },
            },
        },
        ajaxResposta: null
    };

    return superVar;
}

function formRefParaHandle(handle){
    handle.emailTxt = document.getElementById("emailTxt");
    handle.senhaTxt = document.getElementById("senhaTxt");

    handle.rankingNomeTxt = document.getElementById("rankingNomeTxt");
    handle.alterarBt = document.getElementById("alterarBt");
    handle.voltarBt = document.getElementById("voltarBt");

    return handle;
}

function jsonObjCarregarDadosIni(jsonObj){
    jsonObj.comando = "carregarDados()";

    jsonObj.dadosSaida.erros.senhaVazia = false;
    jsonObj.dadosSaida.erros.rankingNomeVazio = false;
    jsonObj.dadosSaida.sucesso = false;

    return jsonObj;
}

function jsonObjContaAlterarIni(jsonObj){
    jsonObj.comando = "contaAlterar()";

    jsonObj.dadosSaida.erros.senhaVazia = false;
    jsonObj.dadosSaida.erros.rankingNomeVazio = false;
    jsonObj.dadosSaida.sucesso = false;

    return jsonObj;
}

function handleParaJsonObj(jsonObj, handle){
    jsonObj.dadosEntrada.email = handle.emailTxt.value;
    jsonObj.dadosEntrada.senha = handle.senhaTxt.value;
    jsonObj.dadosEntrada.rankingNome = handle.rankingNomeTxt.value;

    return jsonObj;
}

function dadosParaForm(texto, superVar){
    alert(texto);
    superVar.json1.obj = JSON.parse(texto);

    superVar.handle.emailTxt.value = superVar.json1.obj.dadosEntrada.email;
    superVar.handle.senhaTxt.value = superVar.json1.obj.dadosEntrada.senha;
    superVar.handle.rankingNomeTxt.value = superVar.json1.obj.dadosEntrada.rankingNome;
}

function flagsAcionar(texto, superVar){
    alert(texto);

    if(superVar.json1 !== undefined) {
        superVar.json1.obj = JSON.parse(texto);
    }

    if(superVar.json1.obj.dadosSaida.erros.senhaVazia === true){
        alert("Senha está vazia!");
    }
    if(superVar.json1.obj.dadosSaida.erros.rankingNomeVazio === true){
        alert("Nome de exibição está vazio!");
    }

    if(superVar.json1.obj.dadosSaida.sucesso === true){
        alert("Conta alterada com sucesso!");
    }
}
function jsonObjVoltarIni(jsonObj){
    jsonObj.comando = "voltar()";

    return jsonObj;
}

function scriptIni(){
    var superVar;

    superVar = superVarIni(superVar);
    superVar.handle = formRefParaHandle(superVar.handle);

    superVar.json1.obj = handleParaJsonObj(superVar.json1.obj, superVar.handle);
    superVar.json1.obj = jsonObjCarregarDadosIni(superVar.json1.obj);
    superVar.json1.txt = JSON.stringify(superVar.json1.obj);

    ajaxEnviar("../php/main.php", false, true, dadosParaForm, "post", superVar.json1.txt, superVar);

    superVar.handle.alterarBt.onclick = function(){
        superVar.json1.obj = handleParaJsonObj(superVar.json1.obj, superVar.handle);
        superVar.json1.obj = jsonObjContaAlterarIni(superVar.json1.obj);
        superVar.json1.txt = JSON.stringify(superVar.json1.obj);

        alert(superVar.json1.txt);

        ajaxEnviar("../php/main.php", true, true, flagsAcionar, "post", superVar.json1.txt, superVar);
    };

    superVar.handle.voltarBt.onclick = function(){
        superVar.json2.obj = jsonObjVoltarIni(superVar.json2.obj);
        superVar.json2.txt = JSON.stringify(superVar.json2.obj);

        window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
    }
}

window.onload = scriptIni;