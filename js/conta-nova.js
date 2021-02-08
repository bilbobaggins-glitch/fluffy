function superVarIni(superVar){
    superVar = {
        handle: {
            emailTxt: null,
            senhaTxt: null,
            rankingNomeTxt: null,
            criarBt: null,
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
                        "emailFormatoInvalido": null,
                        "emailVazio": null,
                        "emailJaCadastrado": null,
                        "senhaVazia": null,
                        "rankingNomeVazio": null
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
    handle.senhaTxt = document.getElementById("senhaTxt");
    handle.rankingNomeTxt = document.getElementById("rankingNomeTxt");
    handle.criarBt = document.getElementById("criarBt");
    handle.voltarBt = document.getElementById("voltarBt");

    return handle;
}

function jsonObjCriarContaIni(jsonObj){
    jsonObj.comando = "criarConta()";

    jsonObj.dadosSaida.erros.emailVazio = false;
    jsonObj.dadosSaida.erros.emailFormatoInvalido = false;
    jsonObj.dadosSaida.erros.emailJaCadastrado = false;
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

function criarContaReceber(texto, superVar){
    alert(texto);
    alert(5656);
    if(superVar.json1 !== undefined) {
        superVar.json1.obj = JSON.parse(texto);
    }

    if(superVar.json1.obj.dadosSaida.erros.emailVazio === true){
        alert("Email está vazio!");
    }
    if(superVar.json1.obj.dadosSaida.erros.emailFormatoInvalido === true){
        alert("Email está em um formato inválido!");
    }
    if(superVar.json1.obj.dadosSaida.erros.emailJaCadastrado === true){
        alert("Email já cadastrado!");
    }
    if(superVar.json1.obj.dadosSaida.erros.senhaVazia === true){
        alert("Senha está vazia!");
    }
    if(superVar.json1.obj.dadosSaida.erros.rankingNomeVazio === true){
        alert("Ranking está vazio!");
    }
    if(superVar.json1.obj.dadosSaida.sucesso === true){
        alert("Conta criada com sucesso!");
    }
}

function scriptIni(){

    var superVar;

    superVar = superVarIni(superVar);

    superVar.handle = formRefParaHandle(superVar.handle);

    superVar.handle.criarBt.onclick = function(){

        superVar.json1.obj = jsonObjCriarContaIni(superVar.json1.obj);
        alert("jujuju2");
        superVar.json1.obj = handleParaJsonObj(superVar.json1.obj, superVar.handle);
        superVar.json1.txt = JSON.stringify(superVar.json1.obj);

        alert(superVar.json1.txt);
        ajaxEnviar("../php/main.php", true, true, criarContaReceber, "post", superVar.json1.txt, superVar);
    };

    superVar.handle.voltarBt.onclick = function(){
        superVar.json2.obj.comando = "voltar()";
        superVar.json2.obj.pagina = null;
        superVar.json2.txt = JSON.stringify(superVar.json2.obj);

        window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
    }
}

window.onload = scriptIni;