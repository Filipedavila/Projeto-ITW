"use strict";

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

/* ------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------- */
/*                                                OBJETOS  DA APLICAÇÃO */
/* ------------------------------------------------------------------------- */

/** Utilizador autenticado */
var currentUser;

/** Rankings  */
var rankings = {
    SpRankings: [],
    MpRankings: [],
    LostGames: []
}




/**
 * Primeira função a ser executada após o browser completar o carregamento
 * de toda a informação presente no documento HTML.
 */
function principal() {

    if(isLoggedIn()) {
        document.getElementById( 'selEstatistica').style.visibility = "visible";
        // Associar comportamento a elementos na página HTML.
        currentUser = JSON.parse(sessionStorage.getItem("user"));
        defineEventHandlersParaElementosHTML();
        initRankings();

    }
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
    $("#rankingBox").empty();
    $("#titleBox").empty();
    let elems = document.querySelectorAll('#numeroJogosRanking, #tempoTotalRanking, #melhorTempoRanking, #tempoMedioRanking, #ganhouMultiplayerRanking, #melhorProporcaoRanking');
    for (let i=0; i<elems.length; i++) {
        elems[i].style.display = 'none';
    }
    if (this.selectedIndex === 1) {

        mostraNumeroJogos();
    } else if (this.selectedIndex === 2) {

        mostraTempoTotal();
    } else if (this.selectedIndex === 3) {

        mostraTempoMédio();
    } else if (this.selectedIndex === 4) {
        showTopRankingSp()

    } else if (this.selectedIndex === 5) {
        showTopRankingMp();



    }
}


/* ------------------------------------------------------------------------- */
/*                                                      MOSTRAR ESTATÍSTICAS */
/* ------------------------------------------------------------------------- */


/** Mostra o top10 do número de jogos ganhos */

function mostraNumeroJogos() {


    let rankingTop = document.createElement("table");
    rankingTop.setAttribute("class", "rankingTable");
    rankingTop.innerHTML += " <tr><th>Jogador</th><th>Jogos SP</th><th>Jogos MP</th> <th>Jogos Perdidos</th><th>Total</th>  </tr> ";

    let numPlayedGames = 0;
    let numSpGames = 0;
    let numMpGames = 0;
    let numLostGames = 0;

    let spGames = rankings.SpRankings;
    let mpGames = rankings.MpRankings;
    let lostGames = rankings.LostGames;


    spGames.forEach((game)=>{
        if(game.nomePlayer == currentUser){
            numSpGames++;
    };
    });
    mpGames.forEach((game)=>{
        if(game.winner == currentUser){
            numMpGames++;
        };
        if(game.loser == currentUser){
            lostGames++;
        }
    });

    rankings.LostGames.forEach((game)=>{
        if(game.nomePlayer === currentUser){
            numLostGames++;
        };

    });
    numPlayedGames = numSpGames + numMpGames + numLostGames;



            rankingTop.innerHTML += "<tr><td>" + currentUser + " </td>" +
                "<td>" + numSpGames+ "</td><td>" + numMpGames + "</td>"
                + "<td>" + numLostGames + "</td><td>" + numPlayedGames + "</td></tr>";



    let divBox = document.getElementById("rankingBox");


    document.getElementById("titleBox").innerHTML+= "<h1 className=''>Número de jogos ganhos</h1>";
    divBox.setAttribute("class", "ranking centeredDialog");

    divBox.appendChild(rankingTop);
    divBox.appendChild(rankingTop);

}



/* ------------------------------------------------------------------------- */

/** Mostra o top10 do tempo total a jogar */

/** Mostra o top10 do número de jogos ganhos */

function mostraTempoTotal() {


    let rankingTop = document.createElement("table");
    rankingTop.setAttribute("class", "rankingTable");
    rankingTop.innerHTML += " <tr><th>Jogador</th><th>Tempo SP</th><th>Tempo MP</th> <th>Tempo Jogos Perdidos</th><th>Tempo Total</th>  </tr> ";

    let timePlayedGames = 0;
    let timeSpGames = 0;
    let timeMpGames = 0;
    let timeLostGames = 0;

    let spGames = rankings.SpRankings;
    let mpGames = rankings.MpRankings;
    let lostGames = rankings.LostGames;


    spGames.forEach((game)=>{
        if(game.nomePlayer == currentUser){
            timeSpGames+=game.timeGame;
        };
    });
    mpGames.forEach((game)=>{
        if(game.winner == currentUser){
            timeMpGames+= game.timeGame;
        };
        if(game.loser == currentUser){
            timeLostGames+= game.timeGame;
        }
    });

    rankings.LostGames.forEach((game)=>{
        if(game.nomePlayer === currentUser){
            timeLostGames+= game.timeGame;
        };

    });
    timePlayedGames = timeSpGames + timeMpGames + timeLostGames;



    rankingTop.innerHTML += "<tr><td>" + currentUser + " </td>" +
        "<td>" + timeSpGames+ " sec" + "</td><td>" + timeMpGames + " sec" +"</td>"
        + "<td>" + timeLostGames +" sec" + "</td><td>" + timePlayedGames +" sec"+ "</td></tr>";



    let divBox = document.getElementById("rankingBox");


    document.getElementById("titleBox").innerHTML+= "<h1 className=''>Tempo Total de Jogo </h1>";
    divBox.setAttribute("class", "ranking centeredDialog");

    divBox.appendChild(rankingTop);
    divBox.appendChild(rankingTop);
}

function mostraTempoMédio() {



    let rankingTop = document.createElement("table");
    rankingTop.setAttribute("class", "rankingTable");
    rankingTop.innerHTML += " <tr><th></th><th colspan='3'>Single Player Mode</th><th colspan='3'>Multiplayer Mode</th> </tr> ";
    rankingTop.innerHTML += " <tr><th>Jogador</th><th>EASY</th><th>MEDIUM</th> <th>HARD</th><th>EASY</th><th>MEDIUM</th> <th>HARD</th>  </tr> ";



    let spGames = rankings.SpRankings;
    let mpGames = rankings.MpRankings;


    let easySp = spGames.find((game)=> ((game.nomePlayer == currentUser) && (game.gameType == "EASY")));
    let mediumSp = spGames.find((game)=> ((game.nomePlayer == currentUser) && (game.gameType == "MEDIUM")));
    let hardSp = spGames.find((game)=> ((game.nomePlayer == currentUser) && (game.gameType == "HARD"))) ;
    let easyMp = mpGames.find((game)=> ((game.winner == currentUser) && (game.gameType == "EASY")));
    let mediumMp = mpGames.find((game)=> ((game.winner == currentUser) && (game.gameType == "MEDIUM")));
    let hardMp = mpGames.find((game)=> ((game.winner == currentUser) && (game.gameType == "HARD")));
    easySp = (easySp == undefined)? "n/a" : easySp.timeGame+" sec";
    mediumSp = (mediumSp == undefined)? "n/a" : mediumSp.timeGame+" sec";
    hardSp = (hardSp == undefined)? "n/a" : hardSp.timeGame+" sec" ;
    easyMp = (easyMp == undefined)? "n/a" : easyMp.timeGame +" sec";
    mediumMp = (mediumMp == undefined)? "n/a" : mediumMp.timeGame+" sec";
    hardMp = (hardMp == undefined)? "n/a" : hardMp.timeGame+" sec";

    rankingTop.innerHTML += "<tr><td>" + currentUser + " </td>" +
        "<td>" + easySp+ "</td><td>" + mediumSp  +"</td><td>" + hardSp + "</td><td>"
        + easyMp + "</td>"+ "<td>" + mediumMp+ "</td><td>" + hardMp + "</td></tr>";



    let divBox = document.getElementById("rankingBox");


    document.getElementById("titleBox").innerHTML+= "<h1 className=''>Meus Melhores Tempos </h1>";
    divBox.setAttribute("class", "ranking centeredDialog");

    divBox.appendChild(rankingTop);
    divBox.appendChild(rankingTop);

}

/**Function verifica se é utilizador autenticado e caso contrario redireciona para a
 * pagina principal
 *
 */
function isLoggedIn() {
    let logged = true;
    if (sessionStorage.getItem("user") == undefined) {
        window.location.replace("index.html");
    logged = false;
    }
    return logged;

}


/**Função que obtem os rankings atuais ou caso os mesmos não existam cria e devolve um
 *
 * @returns {string}
 */

function initRankings(){
    let loadRankings = getRankings();

        rankings = JSON.parse(loadRankings);



}


/**
 *
 * @returns {string}
 */
function getRankings(){
    return localStorage.getItem("rankings");

}


/**
 *
 */
function showALLRankingSp(){
    $("#rankingBox").empty();


    let tittleBox = document.createElement("div");
    tittleBox.innerHTML = "<span> Ranking Top 10 SinglePlayer </span>";
    let rankingTop = document.createElement("table");
    rankingTop.setAttribute("class", "rankingTable");
    rankingTop.innerHTML += " <tr><th>Nome Jogador</th><th>Pontos</th><th>Tempo Jogo</th><th>Difficulty</th>   </tr> ";
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


/**
 *
 */
function showTopRankingSp(){
    $("#rankingBox").empty();
    let divBox = document.getElementById("rankingBox");



    let rankingTop = document.createElement("table");
    rankingTop.setAttribute("class", "rankingTable");
    rankingTop.innerHTML += " <tr><th>Nome Jogador</th><th>Pontos</th><th>Tempo Jogo</th> <th>Difficulty</th> </tr> ";

    let limit = 10 ;
    if(rankings.SpRankings.length<=10){
        limit =rankings.SpRankings.length;
    }
    for(let i = 0;i < limit ; i++){
        if(rankings.SpRankings[i].nomePlayer== currentUser){
            rankingTop.innerHTML += "<tr><td>"+rankings.SpRankings[i].nomePlayer +" </td>" +
                "<td>"+ rankings.SpRankings[i].points  +"</td><td>"+ rankings.SpRankings[i].timeGame  +"</td> <td>" + rankings.SpRankings[i].gameType + "</td></tr>";
        }}


    divBox.setAttribute("class", "ranking centeredDialog");

    divBox.appendChild(rankingTop);
    divBox.appendChild(rankingTop);
}


/**
 *
 */
function showTopRankingMp(){

    $("#rankingBox").empty();

    let rankingTop = document.createElement("table");
    rankingTop.setAttribute("class", "rankingTable");
    rankingTop.innerHTML += " <tr><th>Winner</th><th>Loser</th><th>Pontos Winner</th> <th>Pontos Loser</th><th>Tempo de Jogo</th>  </tr> ";
    console.log(rankings);
    let limit = 10 ;
    if(rankings.MpRankings.length<=10){
        limit =rankings.MpRankings.length;
    }
    for(let i = 0;i < limit ; i++) {
        console.log(currentUser);
        console.log(rankings.MpRankings[i].winner);
        if (rankings.MpRankings[i].winner == currentUser) {
            rankingTop.innerHTML += "<tr><td>" + rankings.MpRankings[i].winner + " </td>" +
                "<td>" + rankings.MpRankings[i].loser + "</td><td>" + rankings.MpRankings[i].pointsWinner + "</td>"
                + "<td>" + rankings.MpRankings[i].pointsLoser + "</td><td>" + rankings.MpRankings[i].timeGame + "</td></tr>";
        }
    }

    let divBox = document.getElementById("rankingBox");

    divBox.setAttribute("class", "ranking centeredDialog");

    divBox.appendChild(rankingTop);
    divBox.appendChild(rankingTop);

}



function removeScore(){
    $("#rankingBox").empty();

}



