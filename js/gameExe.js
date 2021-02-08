//Variáveis para integração com o backend
var xhttp, requisicaoEnviada;

requisicaoEnviada = false;

// Variáveis de jogo:
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const larguraDoCanvas = 500;
const alturaDoCanvas = 500;

let rodando = false;

// Variáveis de dificuldade e controle de jogo:
let forcaDeGravidade = 0.5;
let velocidadeDeJogo = 2;

let quantidadeDeObstaculos = 4;
let distanciaEntreOsObstaculos = 150;
let espacamentoEntreObstaculoDeCimaComODeBaixo = 150;
let larguraDosObstaculos = 50;

let intervaloEntreSorteioDeAlturas = 50; // Cuidado, um valor acima de 100 causa problemas de performance!!!
let quantidadeDeTestes = 3; // Cuidado, um valor acima de 3 causa problemas de performance!!!
let alturaSorteadaAnteriormente = 0;

function carregarImagem(caminho) {
    const imagem = new Image();

    imagem.src = caminho;

    return imagem;
}

const jogador = {
    // Propriedades:
    imagem: carregarImagem("../img/jogador.png"),

    x: 100,
    y: 250,

    largura: 35,
    altura: 40,

    velocidade: -10,
    forcaDePulo: 7,

    pontuacao: 0,

    //Métodos:
    atualizar: function() {
        this.velocidade += forcaDeGravidade;
        this.y += this.velocidade;

        if(this.y + this.altura > chao.y) {
            this.y = chao.y - this.altura;

            this.velocidade = 0;
        }
    },

    desenhar: function() {
        ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
    },

    pular: function() {
        this.velocidade = -this.forcaDePulo;
    }
};

const chao = {
    // Propriedades:
    imagem: carregarImagem("../img/chao.png"),

    x: 0,
    y: 450,

    largura: ((larguraDoCanvas * 2) - 200),
    altura: 100,

    // Métodos:
    atualizar: function() {
        this.x -= velocidadeDeJogo;

        if(this.x + this.largura < canvas.width) {
            this.x = 0;
        }
    },

    desenhar: function() {
        ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura)
    }
};

const cenario = {
    // Propriedades:
    imagem: carregarImagem("../img/cenario.png"),

    x: 0,
    y: 0,

    largura: larguraDoCanvas,
    altura: ((alturaDoCanvas + 50) - chao.altura),

    // Métodos:
    desenhar: function() {
        ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
    }
};

let obstaculos = [];

// Instanciação dos objetos do tipo obstaculo:
for(let i = 0; i < quantidadeDeObstaculos; i++) {
    obstaculos.push(new obstaculo());
}

function obstaculo() {
    // Propriedades:
    this.imagemDoCanoDeCima = carregarImagem("../img/obstaculo-invertido.png");
    this.imagemDoCanoDeBaixo = carregarImagem("../img/obstaculo.png");

    if(obstaculos.length === 0) {
        this.x = 600; // 600 é onde o primeiro obstáculo aparecerá, esta é uma posição perfeita, creio que não seja necessário modificá-la.
    } else {
        this.x = obstaculos[obstaculos.length - 1].x + distanciaEntreOsObstaculos;
    }

    // Testes para o aumento da dificuldade (para com que os obstáculos não fiquem alinhados com alturas próximas umas das outras):
    for(let i = 0; i < quantidadeDeTestes; i++) {
        this.altura = Math.floor((Math.random() * 200) + 50);

        if(this.altura < alturaSorteadaAnteriormente - intervaloEntreSorteioDeAlturas || this.altura >alturaSorteadaAnteriormente + intervaloEntreSorteioDeAlturas) {
            break;
        }
    }

    alturaSorteadaAnteriormente = this.altura;

    this.jogadorUltrapassou = false;

    // Métodos:
    this.obstaculo = obstaculo;
    this.atualizar = atualizar;
    this.desenhar = desenhar;

    function atualizar() {
        this.x -= velocidadeDeJogo;
    }

    function desenhar() {
        // Cano de cima
        ctx.drawImage(this.imagemDoCanoDeCima, this.x, -this.altura, larguraDosObstaculos, 300);

        // Cano de baixo
        ctx.drawImage(this.imagemDoCanoDeBaixo, this.x, chao.y - this.altura, larguraDosObstaculos, 300);
    }
}

function clique() {
    // Ações que serão realizadas ao clicar no canvas:
    if(rodando) {
        jogador.pular();
    }
}
function gameExe() {
    // Inicialização do jogo:
    canvas.width = larguraDoCanvas;
    canvas.height = alturaDoCanvas;

    ctx.font = "14px Arial";

    // Adição de Event Listeners para o pulo do jogador (clique com o mouse e barra de espaço pressionada):
    canvas.addEventListener("mousedown", clique());
    document.addEventListener("keypress", (e) => { if(e.keyCode == '32' && rodando) jogador.pular(); });

    rodando = true;

    gameLoop();
}


window.onload = gameExe();