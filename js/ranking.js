"use strict";


var  rankings = {
    SpRankings:[],
    MpRankings:[]
}



function initRankings(){
   let loadRankings = getRankings();
    if(loadRankings == null){
        rankings = new Ranking(new Array(),new Array());

    }else {
        rankings = JSON.parse(loadRankings);
    }

}

/**Função que obtem os rankings atuais ou caso os mesmos não existam cria e devolve um
 *
 * @returns {string}
 */



function getRankings(){
    return localStorage.getItem("rankings");

}



function showALLRankingSp(){



    let tittleBox = document.createElement("div");
    tittleBox.innerHTML = "<span> Ranking Top 10 SinglePlayer </span>";
    let rankingTop = document.createElement("table");
    rankingTop.setAttribute("class", "rankingTable");
    rankingTop.innerHTML += " <tr><th>Nome Jogador</th><th>Pontos</th><th>Tempo Jogo</th>  </tr> ";
    console.log(rankings);
    rankings.SpRankings.forEach((score) =>{
        rankingTop.innerHTML += "<tr><td>"+score.nomePlayer +" </td>" +
            "<td>"+ score.points  +"</td><td>"+ score.timeGame  +"</td></tr>";
    });
    let divBox = document.getElementById("rankingBox");
    divBox.setAttribute("class", "topRankingBox");
    divBox.setAttribute("class", "centeredDialog");
    divBox.appendChild(tittleBox);
    divBox.appendChild(rankingTop);
    divBox.appendChild(rankingTop);
}

function showTopRankingSp(){

    let tittleBox = document.createElement("div");
    tittleBox.innerHTML = "<span> Ranking Top 10 SinglePlayer </span>";
    let rankingTop = document.createElement("table");
    rankingTop.setAttribute("class", "rankingTable");
    rankingTop.innerHTML += " <tr><th>Nome Jogador</th><th>Pontos</th><th>Tempo Jogo</th>  </tr> ";
    console.log(rankings);
    let limit = 10 ;
    if(rankings.SpRankings.length<=10){
        limit =rankings.SpRankings.length;
    }
    for(let i = 0;i < limit ; i++){
        rankingTop.innerHTML += "<tr><td>"+rankings.SpRankings[i].nomePlayer +" </td>" +
            "<td>"+ rankings.SpRankings[i].points  +"</td><td>"+ rankings.SpRankings[i].timeGame  +"</td></tr>";
    }

    let divBox = document.getElementById("rankingBox");
    divBox.setAttribute("class", "topRankingBox");
    divBox.setAttribute("class", "centeredDialog");
    divBox.appendChild(tittleBox);
    divBox.appendChild(rankingTop);
    divBox.appendChild(rankingTop);
}




function showTopRankingMp(){
    let tittleBox = document.createElement("div");
    tittleBox.innerHTML = "<span> Ranking Top 10 Multiplayer </span>";
    let rankingTop = document.createElement("table");
    rankingTop.setAttribute("class", "rankingTable");
    rankingTop.innerHTML += " <tr><th>Winner</th><th>Loser</th><th>Pontos Winner</th> <th>Pontos Loser</th><th>Tempo de Jogo</th>  </tr> ";
    console.log(rankings);
    let limit = 10 ;
    if(rankings.MpRankings.length<=10){
        limit =rankings.MpRankings.length;
    }
    for(let i = 0;i < limit ; i++){
        rankingTop.innerHTML += "<tr><td>"+rankings.MpRankings[i].winner +" </td>" +
            "<td>"+ rankings.MpRankings[i].loser  +"</td><td>"+ rankings.MpRankings[i].pointsWinner  +"</td>"
            +"<td>"+ rankings.MpRankings[i].pointsLoser  +"</td><td>" +  rankings.MpRankings[i].timeGame   +"</td></tr>";
    }

    let divBox = document.getElementById("rankingBox");
    divBox.setAttribute("class", "topRankingBox");
    divBox.setAttribute("class", "centeredDialog");
    divBox.appendChild(tittleBox);
    divBox.appendChild(rankingTop);
    divBox.appendChild(rankingTop);

}












function removeScore(){
    $("#rankingBox").empty();

}









/* ------------------------------------------------------------------------- */
/*                                                                CONSTANTES */
/* ------------------------------------------------------------------------- */

/** Identificador do select que permite selecionar a estatistica */
const SELECIONAR_ESTATISTICA = 'selEstatistica'

/** Identificador da div com o número de jogos ganhos. */
const RANKING_NUMERO_JOGOS = 'numeroJogosRanking';

/** Identificador da div com o tempo total a jogar */
const RANKING_TEMPO_TOTAL = 'tempoTotalRanking';

/** Identificador da div com o melhor tempo */
const RANKING_MELHOR_TEMPO = 'melhorTempoRanking';

/** Identificador da div com o tempo médio */
const RANKING_TEMPO_MEDIO = 'tempoMedioRanking';

/** Identificador da div com o número de vezes ganhas no modo multiplayer */
const RANKING_GANHOU_MULTIPLAYER = 'ganhouMultiplayerRanking';

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
        mostraNumeroJogos();
    } else if (this.selectedIndex === 1) {
        document.getElementById(RANKING_TEMPO_TOTAL).style.display = 'block';
        mostraTempoTotal();
    } else if (this.selectedIndex === 2) {
        document.getElementById(RANKING_MELHOR_TEMPO).style.display = 'block';
        mostraMelhorTempo();
    } else if (this.selectedIndex === 3) {
        document.getElementById(RANKING_TEMPO_MEDIO).style.display = 'block';
        mostraTempoMédio()
    } else if (this.selectedIndex === 4) {
        document.getElementById(RANKING_GANHOU_MULTIPLAYER).style.display = 'block';
    }
}


/* ------------------------------------------------------------------------- */
/*                                                      MOSTRAR ESTATÍSTICAS */
/* ------------------------------------------------------------------------- */

/** Mostra o top10 do número de jogos ganhos */

function mostraNumeroJogos() {

    initRankings();

    let table = document.getElementById('numeroJogosTable');

    let tableSize = $('#numeroJogosTable tbody tr').length

    if (tableSize === 0) {
        table.innerHTML += '<tbody>';

        let ranking = rankings.SpRankings;
        
        let jogadores = [];

        for (let i = 0; i < ranking.length ; i++) {
            if (!(jogadores.includes(ranking[i].nomePlayer))) {
                jogadores.push(ranking[i].nomePlayer);
            }
        }

        let numJogosJogadores = [];

        for (let j of jogadores) {
            let result = {}
            let count = ranking.filter((obj) => obj.nomePlayer === j).length;
            result['nomePlayer'] = j;
            result['numJogos'] = count;
            numJogosJogadores.push(result);
        }

        numJogosJogadores.sort(function(a,b) {
            return b.numJogos - a.numJogos;
        });

        let limit = 10;

        if (numJogosJogadores.length <= 10) {
            limit = numJogosJogadores.length;
        }

        for(let i = 0; i < limit ; i++){
            table.innerHTML += "<tr><td>" + numJogosJogadores[i].nomePlayer + "</td>" +
            "<td>" + numJogosJogadores[i].numJogos + "</td></tr>";
        }

        table.innerHTML += '</tbody>';        
    }
}

/* ------------------------------------------------------------------------- */

/** Mostra o top10 do tempo total a jogar */

function mostraTempoTotal() {

    initRankings();

    let table = document.getElementById('tempoTotalTable');

    let tableSize = $('#tempoTotalTable tbody tr').length

    if (tableSize === 0) {
        table.innerHTML += '<tbody>';

        let ranking = rankings.SpRankings;
        
        let jogadores = [];

        for (let i = 0; i < ranking.length ; i++) {
            if (!(jogadores.includes(ranking[i].nomePlayer))) {
                jogadores.push(ranking[i].nomePlayer);
            }
        }

        let tempoTotalJogadores = [];

        for (let j of jogadores) {

            let tt = 0;

            for (let i = 0; i < ranking.length; i++) {
                if (ranking[i].nomePlayer == j){
                    tt += ranking[i].timeGame;
                }
            }

            let result = {}
            result['nomePlayer'] = j;
            result['tempoTotal'] = tt;
            tempoTotalJogadores.push(result);
        }

        tempoTotalJogadores.sort(function(a,b) {
            return b.tempoTotal - a.tempoTotal;
        });

        let limit = 10;

        if (tempoTotalJogadores.length <= 10) {
            limit = tempoTotalJogadores.length;
        }

        for(let i = 0; i < limit ; i++){
            table.innerHTML += "<tr><td>" + tempoTotalJogadores[i].nomePlayer + "</td>" +
            "<td>" + tempoTotalJogadores[i].tempoTotal + "</td></tr>";
        }

        table.innerHTML += '</tbody>';   


    }
}

/* ------------------------------------------------------------------------- */

/** Mostra o top10 do melhor tempo por jogador */

function mostraMelhorTempo() {

    initRankings();

    let table = document.getElementById('melhorTempoTable');

    let tableSize = $('#melhorTempoTable tbody tr').length

    if (tableSize === 0) {
        table.innerHTML += '<tbody>';

        let ranking = rankings.SpRankings;
        
        let jogadores = [];

        for (let i = 0; i < ranking.length ; i++) {
            if (!(jogadores.includes(ranking[i].nomePlayer))) {
                jogadores.push(ranking[i].nomePlayer);
            }
        }

        let melhorTempoJogadores = [];

        for (let j of jogadores) {

            let min = Infinity;

            for (let i = 0; i < ranking.length; i++) {
                if (ranking[i].nomePlayer == j & ranking[i].timeGame < min){
                    min = ranking[i].timeGame;
                }
            }

            let result = {}
            result['nomePlayer'] = j;
            result['melhorTempo'] = min;
            melhorTempoJogadores.push(result);
        }

        melhorTempoJogadores.sort(function(a,b) {
            return a.melhorTempo - b.melhorTempo;
        });

        let limit = 10;

        if (melhorTempoJogadores.length <= 10) {
            limit = melhorTempoJogadores.length;
        }

        for(let i = 0; i < limit ; i++){
            table.innerHTML += "<tr><td>" + melhorTempoJogadores[i].nomePlayer + "</td>" +
            "<td>" + melhorTempoJogadores[i].melhorTempo + "</td></tr>";
        }

        table.innerHTML += '</tbody>';   


    }
}

/* ------------------------------------------------------------------------- */

/** Mostra o top10 do tempo médio por jogador */

function mostraTempoMédio() {

    initRankings();

    let table = document.getElementById('tempoMedioTable');

    let tableSize = $('#tempoMedioTable tbody tr').length

    if (tableSize === 0) {
        table.innerHTML += '<tbody>';

        let ranking = rankings.SpRankings;
        
        let jogadores = [];

        for (let i = 0; i < ranking.length ; i++) {
            if (!(jogadores.includes(ranking[i].nomePlayer))) {
                jogadores.push(ranking[i].nomePlayer);
            }
        }

        let tempoMedioJogadores = [];

        for (let j of jogadores) {

            let soma = 0;
            let nElems = 0;

            for (let i = 0; i < ranking.length; i++) {
                if (ranking[i].nomePlayer == j){
                    soma += ranking[i].timeGame;
                    nElems += 1;
                }
            }

            let result = {}
            result['nomePlayer'] = j;
            result['tempoMedio'] = soma/nElems;
            tempoMedioJogadores.push(result);
        }

        tempoMedioJogadores.sort(function(a,b) {
            return a.tempoMedio - b.tempoMedio;
        });

        let limit = 10;

        if (tempoMedioJogadores.length <= 10) {
            limit = tempoMedioJogadores.length;
        }

        for(let i = 0; i < limit ; i++){
            table.innerHTML += "<tr><td>" + tempoMedioJogadores[i].nomePlayer + "</td>" +
            "<td>" + tempoMedioJogadores[i].tempoMedio + "</td></tr>";
        }

        table.innerHTML += '</tbody>';   


    }
}

/* ------------------------------------------------------------------------- */