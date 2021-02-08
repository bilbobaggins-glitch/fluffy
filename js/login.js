function superVarIni(superVar){
    superVar = {
        handle: {
            emailTxt: null,
            senhaTxt: null,

            entrarBt: null,
            esqueciSenhaBt: null,
            criarContaBt: null,
            contatoBt: null,
            rankingBt: null,
            creditosBt: null,
            comoJogarBt: null,
            sobreBt: null
        },
        json1: {
            obj: {
                "comando": null,
                "dadosEntrada": {
                    "email": null,
                    "senha": null,
                },
                "dadosSaida": {
                    "erros": {
                        "emailOuSenhaIncorreta": null,
                        "emailVazio": null,
                        "senhaVazia": null,
                        "contaNaoAtivada": null
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
                },
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

    handle.entrarBt = document.getElementById("entrarBt");
    handle.esqueciSenhaBt = document.getElementById("esqueciSenhaBt");
    handle.criarContaBt = document.getElementById("criarContaBt");
    handle.contatoBt = document.getElementById("contatoBt");
    handle.rankingBt = document.getElementById("rankingBt");
    handle.creditosBt = document.getElementById("creditosBt");
    handle.comoJogarBt = document.getElementById("comoJogarBt");
    handle.sobreBt = document.getElementById("sobreBt");

    return handle;
}
function handleParaJsonObj(jsonObj, handle){
    jsonObj.dadosEntrada.senha = handle.senhaTxt.value;
    jsonObj.dadosEntrada.email = handle.emailTxt.value;

    alert(9999);

    return jsonObj;
}
function jsonObjEsqueciSenhaIni(jsonObj){
    jsonObj.comando = "redirecionar()";

    jsonObj.dadosEntrada.pagina = "esqueciSenha";

    return jsonObj;
}
function jsonObjCriarContaIni(jsonObj){
    jsonObj.comando = "redirecionar()";

    jsonObj.dadosEntrada.pagina = "criarConta";

    return jsonObj;
}
function jsonObjContatoIni(jsonObj){
    jsonObj.comando = "redirecionar()";

    jsonObj.dadosEntrada.pagina = "contato";

    return jsonObj;
}
function jsonObjCreditosIni(jsonObj){
    jsonObj.comando = "redirecionar()";

    jsonObj.dadosEntrada.pagina = "creditos";

    return jsonObj;
}
function jsonObjRankingIni(jsonObj){
    jsonObj.comando = "redirecionar()";

    jsonObj.dadosEntrada.pagina = "ranking";

    return jsonObj;
}
function jsonObjComoJogarIni(jsonObj){
    jsonObj.comando = "redirecionar()";

    jsonObj.dadosEntrada.pagina = "comoJogar";

    return jsonObj;
}
function jsonObjLoginIni(jsonObj){
    jsonObj.comando = "logar()";

    jsonObj.dadosSaida.erros.senhaVazia = null;
    jsonObj.dadosSaida.erros.emailVazio = null;
    jsonObj.dadosSaida.erros.emailOuSenhaIncorreta = null;
    jsonObj.dadosSaida.erros.contaNaoAtivada = null;
    jsonObj.dadosSaida.sucesso = null;

    return jsonObj;
}
function autenticarReceber(texto, superVar){
    alert(texto);

    if(superVar.json1 !== undefined) {
        superVar.json1.obj = JSON.parse(texto);
    }

    if(superVar.json1.obj.dadosSaida.erros.emailVazio === true){
        alert("Email está vazio!");
    }
    if(superVar.json1.obj.dadosSaida.erros.senhaVazia === true){
        alert("Senha está vazia!");
    }
    if(superVar.json1.obj.dadosSaida.erros.emailOuSenhaIncorreta === true) {
        alert("Email ou senha incorreta!");
    }
    if(superVar.json1.obj.dadosSaida.erros.contaNaoAtivada === true) {
        alert("Essa conta não foi ativada!");
    }

    if(superVar.json1.obj.dadosSaida.sucesso === true){

        superVar.json2.obj = loginRealizar(superVar.json2.obj);

        superVar.json2.txt = JSON.stringify(superVar.json2.obj);
        alert(superVar.json2.txt);
        window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
    }
}
function loginRealizar(jsonObj){
    jsonObj.comando = "redirecionar()";
    jsonObj.dadosEntrada.pagina = "home";

    return jsonObj;
}
function scriptIni(){
    var superVar;

    superVar = superVarIni(superVar);
    superVar.handle = formRefParaHandle(superVar.handle);

    superVar.handle.entrarBt.onclick = function(){
        superVar.json1.obj = jsonObjLoginIni(superVar.json1.obj);
        superVar.json1.obj = handleParaJsonObj(superVar.json1.obj, superVar.handle);
        superVar.json1.txt = JSON.stringify(superVar.json1.obj);

        alert(superVar.json1.txt);

        ajaxEnviar("../php/main.php", true, true, autenticarReceber, "post", superVar.json1.txt, superVar);
    };

/*    document.getElementById("rankingBt").onclick = function(){ alert(9); };*/
/*    superVar.handle.rankingBt.onclick = function(){ alert(100); };*/

    superVar.handle.rankingBt.onclick = function(){
        alert("dsds");
        superVar.json2.obj = jsonObjRankingIni(superVar.json2.obj);
        superVar.json2.txt = JSON.stringify(superVar.json2.obj);

        alert(superVar.json2.txt);

        window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
    };

    superVar.handle.criarContaBt.onclick = function(){
        alert("dsds");
        superVar.json2.obj = jsonObjCriarContaIni(superVar.json2.obj);
        superVar.json2.txt = JSON.stringify(superVar.json2.obj);

        alert(superVar.json2.txt);

        window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
    };

    superVar.handle.esqueciSenhaBt.onclick = function(){
        alert("dsds");
        superVar.json2.obj = jsonObjEsqueciSenhaIni(superVar.json2.obj);
        superVar.json2.txt = JSON.stringify(superVar.json2.obj);

        alert(superVar.json2.txt);

        window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
    };

    superVar.json2.obj.comando = "redirecionar()";

    superVar.handle.contatoBt.onclick = function(){
        superVar.json2.obj.dadosEntrada.pagina = "contato";
        superVar.json2.txt = JSON.stringify(superVar.json2.obj);

        alert(superVar.json2.txt);

        window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
    };
    superVar.handle.creditosBt.onclick = function(){
        superVar.json2.obj.dadosEntrada.pagina = "creditos";
        superVar.json2.txt = JSON.stringify(superVar.json2.obj);

        alert(superVar.json2.txt);

        window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
    };
    superVar.handle.rankingBt.onclick = function(){
        superVar.json2.obj.dadosEntrada.pagina = "ranking";
        superVar.json2.txt = JSON.stringify(superVar.json2.obj);

        alert(superVar.json2.txt);

        window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
    };
    superVar.handle.comoJogarBt.onclick = function(){
        superVar.json2.obj.dadosEntrada.pagina = "comoJogar";
        superVar.json2.txt = JSON.stringify(superVar.json2.obj);

        alert(superVar.json2.txt);

        window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
    };
    superVar.handle.sobreBt.onclick = function(){
        superVar.json2.obj.dadosEntrada.pagina = "sobre";
        superVar.json2.txt = JSON.stringify(superVar.json2.obj);

        alert(superVar.json2.txt);

        window.location.href = "../php/main.php?jsonTxt="+superVar.json2.txt;
    };
}

window.onload = scriptIni;