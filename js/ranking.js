// Impede alguns erros fáceis de cometer.
"use strict";

/* ------------------------------------------------------------------------- */
/*                                                                CONSTANTES */
/* ------------------------------------------------------------------------- */

/** Identificador do select que permite selecionar a estatistica */
const SELECIONAR_ESTATISTICA = 'selEstatistica'

/** Identificador da div com o número de jogos jogados. */
const RANKING_NUMERO_JOGOS = 'numeroJogosRanking';

/** Identificador da div com o tempo total a jogar */
const RANKING_TEMPO_TOTAL = 'tempoTotalRanking';

/** Identificador da div com o melhor tempo */
const RANKING_MELHOR_TEMPO = 'melhorTempoRanking';

/** Identificador da div com o tempo médio */
const RANKING_TEMPO_MEDIO = 'tempoMedioRanking';

/** Identificador da div com o número de vezes ganhas no modo multiplayer */
const RANKING_GANHOU_MULTIPLAYER = 'ganhouMultiplayerRanking';

/** IDentificador da divcom a melhor proporção. */
const RANKING_MELHOR_PROPORCAO = 'melhorProporcaoRanking';

/* ------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------- */
/*                                                INICIALIZAÇÃO DA APLICAÇÃO */
/* ------------------------------------------------------------------------- */

window.addEventListener("load", principal);

/* ------------------------------------------------------------------------- */

/**
 * Primeira função a ser executada após o browser completar o carregamento
 * de toda a informação presente no documento HTML.
 */
function principal() {

    // Associar comportamento a elementos na página HTML.
    defineEventHandlersParaElementosHTML();

}


/* ------------------------------------------------------------------------- */
/*                                            REAÇÃO A EVENTOS DO UTILIZADOR */
/* ------------------------------------------------------------------------- */

/**
 * Associa event handlers a elementos no documento HTML, em particular botões.
 * Com esta abordagem, evitam-se atributos onclick ou similares, e faz-se uma
 * melhor separação entre conteúdo, em HTML, e comportamento, em JavaScript.
 */
 function defineEventHandlersParaElementosHTML() {

    document.getElementById(SELECIONAR_ESTATISTICA).
      addEventListener("click", mostraEstatistica);
  
}

/* ------------------------------------------------------------------------- */

/**
 * Mostra a div correspondente à estatistica que o utilizador selecionou
 */
function mostraEstatistica() {
    let elems = document.querySelectorAll('#numeroJogosRanking, #tempoTotalRanking, #melhorTempoRanking, #tempoMedioRanking, #ganhouMultiplayerRanking, #melhorProporcaoRanking');
    for (let i=0; i<elems.length; i++) {
        elems[i].style.display = 'none';
    }
    if (this.selectedIndex === 0) {
        document.getElementById(RANKING_NUMERO_JOGOS).style.display = 'block';
    } else if (this.selectedIndex === 1) {
        document.getElementById(RANKING_TEMPO_TOTAL).style.display = 'block';
    } else if (this.selectedIndex === 2) {
        document.getElementById(RANKING_MELHOR_TEMPO).style.display = 'block';
    } else if (this.selectedIndex === 3) {
        document.getElementById(RANKING_TEMPO_MEDIO).style.display = 'block';
    } else if (this.selectedIndex === 4) {
        document.getElementById(RANKING_GANHOU_MULTIPLAYER).style.display = 'block';
    } else if (this.selectedIndex === 5) {
        document.getElementById(RANKING_MELHOR_PROPORCAO).style.display = 'block';
    }
}