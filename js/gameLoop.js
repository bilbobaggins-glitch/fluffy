

function atualizar() {
	// Atualiza objetos (Obs: algumas coisas serão atualizadas apenas se o jogo ainda estiver rodando):
	jogador.atualizar();

	if(rodando) {
		chao.atualizar();
	}

	for(let i = 0; i < obstaculos.length; i++) {
		if(rodando) {
			obstaculos[i].atualizar();
		}

		if(obstaculos[i].x + larguraDosObstaculos < 0) {
			obstaculos.shift();

			obstaculos.push(new obstaculo());
		}

		// Detecção de colisões do jogador com os obstáculos::
		if(
			// Frente do jogador com a frente do obstáculo:
			(jogador.largura + jogador.x >= obstaculos[i].x && jogador.largura + jogador.x <= obstaculos[i].x &&

			(jogador.y <= (chao.y - obstaculos[i].altura) - espacamentoEntreObstaculoDeCimaComODeBaixo ||
			jogador.y + jogador.altura >= (chao.y - obstaculos[i].altura))) ||

			// Obs: o número 8 é porque a imagem possui partes brancas desnecessárias, o que acaba deixando o rect de colisão maior do que o personagem desenhado no canvas. Ao utilizar uma imagem perfeita, este problema não estará mais presente.

			// Parte superior do jogador com o obstáculo de cima:
			(jogador.y + 8 <= (chao.y - obstaculos[i].altura) - espacamentoEntreObstaculoDeCimaComODeBaixo &&
			obstaculos[i].x <= jogador.largura + jogador.x &&
			obstaculos[i].x + larguraDosObstaculos >= jogador.x) ||

			// Parte inferior do jogador com o obstáculo de baixo:
			((jogador.y + jogador.altura) - 8 >= (chao.y - obstaculos[i].altura) &&
			obstaculos[i].x <= jogador.largura + jogador.x &&
			obstaculos[i].x + larguraDosObstaculos >= jogador.x) ||

			// Parte inferior do jogador com o chão:
			(jogador.y + jogador.altura >= chao.y)
		) {
			if(requisicaoEnviada === false) {
                requisicaoEnviada = true;

                superVar.handle = formRefParaHandle(superVar.handle);
                handleParaJsonObj(superVar.json1.obj, superVar.handle);
                alert(superVar.json1.obj.dadosEntrada.pontuacao);
                superVar.json1.txt = JSON.stringify(superVar.json1.obj);
                ajaxEnviar("../php/main.php", false, true, receberResposta, "post", superVar.json1.txt, superVar);
            }
		}

		// Detecção de ultrapassagem do jogador em relação aos obstáculos, gerando o incremento da pontuação:
		if(
			// Se a metade do colision rect do jogador ultrapassou a metade do colision rect do obstáculo:
			((jogador.x + (jogador.largura / 2) >= obstaculos[0].x + (larguraDosObstaculos / 2)) &&
			!obstaculos[0].jogadorUltrapassou)
		) {
			jogador.pontuacao++;

			obstaculos[0].jogadorUltrapassou = true;
		}
	}
}

function desenhar() {
	// Preenche o canvas (com a imagem de cenário) para a limpeza de tela:
	cenario.desenhar();

	// Desenha objetos:
	chao.desenhar();

	for(let i = 0; i < obstaculos.length; i++) {
		obstaculos[i].desenhar();
	}

	jogador.desenhar();

	// Desenha infos:
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(2, 6, 115, 40);

	ctx.fillStyle = "#000000";
	ctx.fillText("Pontuação: " + jogador.pontuacao, 15, 30);
}

function gameLoop() {
	// Atualização de lógica e desenho de objetos:
	atualizar();
	desenhar();


	window.requestAnimationFrame(gameLoop);
}