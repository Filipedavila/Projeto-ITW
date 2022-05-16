/* ------------------------------------------------------------------------- */
"use strict";
/* ------------------------Game Screens IDS--------------------------- */
/**  Current page */
const PAGE_NAME  = window.location.pathname.split("/").pop();

window.addEventListener("DOMContentLoaded", isLoggedIn);
/** Tempo do jogo SINGLE PLAYER e QuickGame */
const ID_SPAN_TEMPO_JOGO = "idScreenTempoJogo";

/** Tempo do jogo SINGLE PLAYER e QuickGame */
const ID_BOMBS_REMAINED = "idBombsRemained";

/** Tempo do jogo SINGLE PLAYER e QuickGame */
const ID_BOMBS_REMAINED_P1 = "idBombsRemained1";


/** Tempo do jogo SINGLE PLAYER e QuickGame */
const ID_BOMBS_REMAINED_P2 = "idBombsRemained2";


/**  Times Won SINGLE PLAYER Information **/

const ID_TIMES_WON_SINGLE_PLAYER= "timesWonPlayer";

/**  Times Won MULTIPLAYER P1 Information **/

const ID_TIMES_WON_MULTIPLAYER_P1= "timesWonPlayer1";

/**  Times Won MULTIPLAYER P2 Information **/

const ID_TIMES_WON_MULTIPLAYER_P2= "timesWonPlayer2";

/**  ID points game SinglePlayer **/

const ID_POINTS_SINGLEPLAYER= "idPointsSinglePlayer";

/**  ID points game Multiplayer P1 **/

const ID_POINTS_MULTIPLAYER_P1= "idPointsPlayer1";

/**  ID points game Multiplayer P2 **/

const ID_POINTS_MULTIPLAYER_P2= "idPointsPlayer2";

/**  id Sound Control Game **/

const ID_SOUND_CONTROL ="soundControl";

/**  choose dificulty SinglePlayer */

const BTN_CHOOSE_GAME_TYPE_SP = "btnJogarSinglePlayer";

const RADIO_BUTTON_GAMETYPE_SP ="radioTipoDeJogo";

const FORM_GAME_DIFFICULTY_SP = "formGameTypeSp";




/** Intervalo do tempo do jogo */
var temporizadorTempoJogo;

var verificarSeAcabou;

var verificacaoPontos;


/* ------------------------Game Buttons--------------------------- */

/** Restart Game SinglePlayer do tempo do jogo */

const BTN_ID_RESET_GAME_SP = "idResetGame";

/** Restart Game Multiplayer player 1 */

const BTN_ID_RESET_GAME_MP_P1 = "smileP1";

/** Restart Game Multiplayer Player 2 */

const BTN_ID_RESET_GAME_MP_P2 = "smileP2";





/* ------------------------Game Tables--------------------------- */

/** Game Table SINGLE PLAYER */

const ID_TABLE_SINGLEPLAYER = "idGameTable";

/** Game Table SINGLE PLAYER */

const ID_TABLE_MULTIPLAYER_P1 = "idGameTableP1";


/** Game Table SINGLE PLAYER */

const ID_TABLE_MULTIPLAYER_P2  = "idGameTableP2";

/* ------------------------Game OPTIONS--------------------------- */

/** Numero de bombas modo EASY */
const BOMBS_GAME_EASY  = 10;

/** Numero de bombas modo MEDIUM */
const BOMBS_GAME_MEDIUM  = 40;

/** Numero de bombas modo HARD */
const BOMBS_GAME_HARD  = 99;

/** Pontuação ganha por cada Celula Aberta */

const POINTS_GIVEN_OPENED_CELL = 1;







/* ------------------------------------------------------------------------- */

/** Identificador do formulário para escolher as opções de um jogo singleplayer */
const FORMULARIO_SINGLEPLAYER = 'frmSinglePlayerSettings';

/** Campo do formulário com o nome do jogador no caso singleplayer */
const NOME_JOGADOR_S = 'nome';

/** Campo do formulário com o tamanho do jogo no caso singleplayer */
const TAMANHO_JOGO_S = 'tamanho';

/** Campo do formulário com a dificuldade do jogo no caso singleplayer */
const DIFICULDADE_JOGO_S = 'difficulty';

/** Item de local storage que guarda as configurações do jogo singleplayer */
const ITEM_CONFIGURACAO_S = 'configuracao';

/** Identificador do nome do avatar no caso singleplayer */
const NOME_AVATAR_S = 'nomeAvatar';

/** Identificador da imagem do avatar no caso singleplayer */
const IMAGEM_AVATAR_S = 'imagemAvatar';

/* ------------------------------------------------------------------------- */

/** Identificador do formulário para escolher as opções de um jogo multiplayer */
const FORMULARIO_MULTIPLAYER = 'frmMultiPlayerSettings';

/** Campo do formulário com o nome do jogador 1 no caso multiplayer */
const NOME_JOGADOR_1 = 'nome1';

/** Campo do formulário com o nome do jogador 2 no caso multiplayer */
const NOME_JOGADOR_2 = 'nome2';

/** Campo do formulário com o tamanho do jogo no caso multiplayer */
const TAMANHO_JOGO_M = 'tamanhoMulti';

/** Campo do formulário com a dificuldade do jogo no caso multiplayer */
const DIFICULDADE_JOGO_M = 'difficultyMulti';

/** Item de local storage que guarda as configurações do jogo multiplayer */
const ITEM_CONFIGURACAO_M = 'configuracaoMulti';

/** Identificador do nome do avatar 1 no caso multiplayer */
const NOME_AVATAR_1 = 'nomeAvatar1';

/** Identificador da imagem do avatar 1 no caso multiplayer */
const IMAGEM_AVATAR_1 = 'imagemAvatar1'

/** Identificador do nome do avatar 2 no caso multiplayer */
const NOME_AVATAR_2 = 'nomeAvatar2';

/** Identificador da imagem do avatar 2 no caso multiplayer */
const IMAGEM_AVATAR_2 = 'imagemAvatar2';

const ID_SPAN_PLAYER_TURN = "idTurnPlayer";

/* --------------------------Rankings------------------------------ */
const LOCALSTORAGE_KEY_RANKINGS ="rankings";


const openedCellSound = new Audio('../audio/open.mp3');
/**Game Objects
 *
 */

/** Estado do jogo Multiplayer, que vai sendo preenchido no decorrer do jogo. */
const jogo = {
    table_player:[],
    name_player:[],
    inicio: null,
    times_won_player1:0,
    times_won_player2:0,
    turn:0,
    turns_played:0,
    nextTurn: function (){
        this.turn = (this.turn+1) % 2;
        this.turns_played++;
    },
    difficulty:null,
    size:null,
    finished:false,
    addTimeWonP1: function(){  this.times_won_player1++;

    },
    addTimeWonP2: function(){  this.times_won_player2++ ;

    },
    resetGame:function (){
        jogo.table_player.forEach((table)=>{
            table.resetTable();
        })




        jogo.won = false;
        jogo.lost = false;
        jogo.turns_played = 0;
        jogo.finished =false;
        jogo.inicio=Math.floor(Date.now() / 1000);
        removeScore();
        temporizadorTempoJogo = setInterval(mostraTempoJogo, 1000);
        verificarSeAcabou = setInterval(isFinished, 300);
        verificacaoPontos = setInterval(updatePointsSP, 300);

     }

};

var  rankings = {
    SpRankings:[],
    MpRankings:[]
}
function Ranking(ranking,ranking2){
    this.SpRankings =ranking;
    this.MpRankings = ranking2;
}

/**Construtor tipo objecto RankingSp que guarda informação sobre o ranking
 * de um jogo SinglePlayer
 *
 * @param nome - nome do jogador
 * @param points - pontos do jogo
 * @param time - tempo decorrido para ganhar
 * @constructor
 */
function RankingSP(nome,points,time){
    this.nomePlayer = nome;
    this.points = points ;
    this.timeGame = time;
}

/**Construtor tipo objecto RankingMp que guarda informação sobre o ranking
 * de um jogo multplayer
 * @param winner -Jogador que ganhou
 * @param loser - Jogador que perdeu
 * @param pointsWinner - Pontos do jogador que ganhou
 * @param pointsLoser - Pontos do jogador que perdeu
 * @param timeGame - tempo do jogo decorrido
 * @constructor
 */
function RankingMP(winner,loser,pointsWinner,pointsLoser,timeGame){
    this.winner = winner;
    this.loser = loser ;
    this.pointsWinner = pointsWinner;
    this.pointsLoser = pointsLoser;
    this.timeGame = timeGame;
}

/* ------------------------------------------------------------------------- */
/**Function verifica se é utilizador autenticado e caso contrario redireciona para a
 * pagina principal
 *
 */
function isLoggedIn(){
    if(sessionStorage.getItem("user") == undefined){
        window.location.replace("index.html");

    }
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

/**Function to set ranking of singleplayer game in local Storage
 *
 * @param nome - name of player
 * @param score - score of player
 * @param time - time of game
 */
function setRankingSP(nome,score,time){

    let thisRanking = new RankingSP(nome, score, time);

        rankings.SpRankings.push(thisRanking);

        rankings.SpRankings.sort((a,b)=>{
            return a.timeGame - b.timeGame ;
        })

        localStorage.setItem("rankings",JSON.stringify(rankings));



}


/**Function to set Rankings of multiplayer in localstorage
 *
 * @param winner - name of winner
 * @param loser - name of looser
 * @param pointsWinner - points of winner
 * @param pointsLoser - points of loser
 * @param timeGame - time of game
 */
function setRankingMP(winner,loser,pointsWinner,pointsLoser,timeGame){

        let thisRanking = new RankingMP(winner, loser, pointsWinner,pointsLoser,timeGame);

        rankings.MpRankings.push(thisRanking);

        rankings.MpRankings.sort((a,b)=>{
            return a.timeGame - b.timeGame ;
        })

        localStorage.setItem("rankings",JSON.stringify(rankings));



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

function removeScore(){
    $("#rankingBox").empty();

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





/*
/**Função responsavel por iniciar o jogo singleplayer e perguntar o nivel de dificuld
 *
 */
function iniciarJogoRapido(){
    $(".game").css("visibility", "visible");
    jogo.name_player[0] = JSON.parse(sessionStorage.getItem("user"));

    init(9, 9,1);

}

/* ------------------------------------------------------------------------- */
/**Função responsavel por iniciar o jogo singleplayer e perguntar o nivel de dificuld
 *
 */
function iniciarJogo(){
    $("#"+FORM_GAME_DIFFICULTY_SP).hide();
    $(".game").css("visibility", "visible");
    jogo.name_player[0] = JSON.parse(sessionStorage.getItem("user"));
    var tamanho = $("input[type=radio][name=difficulty]:checked").val();
    if (tamanho == 'dificuldadeEasy') {
        init(9, 9,BOMBS_GAME_EASY);
    } else if (tamanho == 'dificuldadeMedium') {
        init(16, 16,BOMBS_GAME_MEDIUM);
    } else if (tamanho == 'dificuldadeHard') {
        init(16, 30,BOMBS_GAME_HARD);
    }

}
/**Função responsavel por iniciar o jogo singleplayer e perguntar o nivel de dificuld
 *
 */
function iniciarJogoMP(){
    $("#"+FORMULARIO_MULTIPLAYER).hide();
    $(".game").css("visibility", "visible");
    var nomePlayer2 = $("#nomePlayer2").val();
    var tamanho = $("input[type=radio][name=difficulty]:checked").val();
    jogo.name_player[0] = JSON.parse(sessionStorage.getItem("user"));
    jogo.name_player[1] = nomePlayer2;


    if (tamanho == 'dificuldadeEasy') {
        initMulti(9, 9,BOMBS_GAME_EASY);
    } else if (tamanho == 'dificuldadeMedium') {
        initMulti(16, 16,BOMBS_GAME_MEDIUM);
    } else if (tamanho == 'dificuldadeHard') {
        initMulti(16, 30,BOMBS_GAME_HARD);
    }

}


/**Função que inicia o jogo Singular
 *
 * //TO DO  distribuir de forma random as bombas no jogo
 *
 * @param colunas - numero de colunas do jogo
 * @param linhas  - numero de Linhas do jogo
 */
function init(linhas, colunas,bombs){
    initRankings();
    let table = new Table(linhas,colunas,bombs);
    jogo.table_player.push(table);
    jogo.row = Number(linhas);
    jogo.col = Number(colunas);
    jogo.bombs = Number(bombs);


    let localJogo = document.getElementById(ID_TABLE_SINGLEPLAYER);

// criar table
    let tabela = document.createElement('table');
    tabela.setAttribute('class' ,'gameTable');
    tabela.setAttribute('alt','Janela do Jogo');

// faz cada linha
    for(let i=1;i<=linhas; i++ ){
        let linha =document.createElement('tr');
        linha.setAttribute('class' ,'gameRow');

        //Criar Celulas do jogo
        for(let j = 1 ; j <= colunas;j++){
            let celula = document.createElement('td');
            let row = String(i);
            let col = String(j);
            let id = row +","+ col ;
            celula.setAttribute('class','celula');
            celula.setAttribute('id', id);
            celula.setAttribute('alt','Celula nº '  + "("+id+")");
            celula.addEventListener("mouseup",clicado,false);

            jogo.table_player[0].cells[i][j].buttonTd = celula;
            linha.appendChild(celula);

        }


        tabela.appendChild(linha);
    }

    localJogo.appendChild(tabela);

    // Marca o inicio do tempo de jogo
    jogo.inicio = Math.floor(Date.now() / 1000);

    // Chama mostraTempoJogo() a cada segundo
    temporizadorTempoJogo = setInterval(mostraTempoJogo, 1000);
    verificarSeAcabou = setInterval(isFinished, 300);
    verificacaoPontos = setInterval(updatePointsSP, 1000);
    document.getElementById(BTN_ID_RESET_GAME_SP).addEventListener("mouseup",function(){
        jogo.resetGame();
    },false);


}



/**Função que inicia o jogo para multiplayer
 *
 * @param colunas - numero de colunas
 * @param linhas - numero de linhas
 */
function initMulti(linhas, colunas, bombs){
    initRankings();
    jogo.table_player.push(new Table(linhas,colunas,bombs));
    jogo.table_player.push(new Table(linhas,colunas,bombs));

    console.log("criou table");

    var localJogo = document.getElementById(ID_TABLE_MULTIPLAYER_P1);
    var localJogo2 = document.getElementById(ID_TABLE_MULTIPLAYER_P2);

    let tabela = document.createElement('table');
    tabela.setAttribute('class' ,'gameTable');
    tabela.setAttribute('alt','Jogador 1');

    // faz cada linha
    for(let i=1;i<=linhas; i++ ){
        let linha =document.createElement('tr');
        linha.setAttribute('class' ,'gameRow');
        //faz cada celula
        for(let j = 1 ; j <= colunas;j++){
            var celulaMp1 = document.createElement('td');
            let row = String(i);
            let col = String(j);
            let id ="P1," +row +","+ col ;
            celulaMp1.setAttribute('class','celula');
            celulaMp1.setAttribute('id', id);
            celulaMp1.setAttribute('alt','Player 1 Celula nº ' + "("+id+")");
            celulaMp1.addEventListener("mouseup",clicado,false);
            // por o elemento da celula diretamente na abstração da celula
            jogo.table_player[0].cells[i][j].setTdElement(celulaMp1);

            linha.appendChild(celulaMp1);

        }

        tabela.appendChild(linha);
    }

    localJogo.appendChild(tabela);

    var tabela2 = document.createElement('table');
    tabela2.setAttribute('class' ,'gameTable');
    tabela2.setAttribute('alt','Jogador 2');

    // faz cada linha
    for(let i=1;i<=linhas; i++){
        var linha2 =document.createElement('tr');
        linha2.setAttribute('class' ,'gameRow');
        linha2.setAttribute('alt','Linha ' + i);
        //faz cada celula
        for(let j = 1 ; j <= colunas;j++){
            var celulaMp2 = document.createElement('td');
            let row = String(i);
            let col = String(j);
            let id ="P2," + row +","+ col ;
            celulaMp2.setAttribute('class','celula');
            celulaMp2.setAttribute('id',  id);
            celulaMp2.setAttribute('alt','Player 2 Celula nº '  + "("+id+")");
            celulaMp2.addEventListener("mouseup",clicado,false);
            jogo.table_player[1].cells[i][j].setTdElement(celulaMp2);

            linha2.appendChild(celulaMp2);

        }

        tabela2.appendChild(linha2);
    }
    localJogo2.appendChild(tabela2);
    jogo.inicio = Math.floor(Date.now() / 1000);

    // Chama mostraTempoJogo() a cada segundo

    temporizadorTempoJogo = setInterval(mostraTempoJogo, 1000);

    verificarSeAcabou = setInterval(isFinished, 300);
    verificacaoPontos = setInterval(updatePointsMP, 1000);
    document.getElementById(BTN_ID_RESET_GAME_MP_P1).addEventListener("mouseup",jogo.resetGame,false);
    document.getElementById(BTN_ID_RESET_GAME_MP_P2).addEventListener("mouseup",jogo.resetGame,false);
}

/**Função que lida com as acções do jogador no jogo e que por sua vez de acordo com a intenção manifestada pelo utilizador
 * encaminha para o tabuleiro e acção correspondente
 *
 * @param e - evento do elemento clickado
 */
function clicado(e){

    // manda abrir o opencell e espera retorno, dependendo do retorno ira fazer uma acção no jogo
    let t = e.target;

    let id = t.id.split(",");
    if(id[0]== "P1" || id[0]== "P2"){
        clicadoMp(id,e);
    }else {
        clicadoSp(id,e);
    }

}
/**Função responsavel pelo o evento que ocorre quando uma celula do jogo é premida
 *
 * @param e
 */
function clicadoSp(id,e){


    // manda abrir o opencell e espera retorno, dependendo do retorno ira fazer uma acção no jogo

    let row = id[0];
    let col = id[1];


    if(e.button == 0) {
        jogo.table_player[0].open(row,col);
    }else  if(e.button ==1) {

        jogo.table_player[0].placeQuestion(row,col);

    }  else if(e.button ==2){
        jogo.table_player[0].placeFlag(row,col);
    }
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();


}

/**Função responsavel pelo o evento que ocorre quando uma celula do jogo é premida
 *
 * @param e
 */
function clicadoMp(id,e){
    var currentPlayer = jogo.table_player[jogo.turn];
    let turn = "P"+Number(jogo.turn + 1);
    // manda abrir o opencell e espera retorno, dependendo do retorno ira fazer uma acção no jogo

    if(id[0] == turn){
        console.log("Jogou o jogador " + turn);
        let row = id[1];
        let col = id[2];


        if(e.button == 0) {
            currentPlayer.open(row,col);
        }else  if(e.button ==1) {


            currentPlayer.placeQuestion(row,col);


        }else if(e.button ==2){
            currentPlayer.placeFlag(row,col);
        }
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        jogo.nextTurn();
        document.getElementById(ID_SPAN_PLAYER_TURN).innerText = "P" + Number(jogo.turn+1);

    }else {
        console.log("Jogador errado, espere a sua vez, agora é a vez do jogador " + Number(jogo.turn +1) + " " +  jogo.name_player[jogo.turn] );

    }

}


/** Mostra o tempo do jogo
 *
 * Função chamada pelo setinterval que atualiza o contador de tempo do jogo no sitio pretendido
 *
 */
function mostraTempoJogo() {
    var zeroPad = (num, places) => String(num).padStart(places, '0')
    document.getElementById(ID_SPAN_TEMPO_JOGO).innerHTML = zeroPad(Math.floor((Date.now()/1000)-jogo.inicio), 3);
}

/**Função que verifica se o jogo currente acabaou e caso isto se verifique remove e blooqueia o jogo até ser reniciado
 *
 */
function isFinished() {

        if (jogo.finished) {
            clearInterval(temporizadorTempoJogo);
            clearInterval(verificacaoPontos);
            clearInterval(verificarSeAcabou);
            if(jogo.won && (jogo.table_player[1] == undefined)){
                let timePassed = Math.floor((Date.now()/1000)-jogo.inicio);
                console.log(" "+ jogo.name_player[0] + " " +  jogo.table_player[0].points + " " +timePassed);
                setRankingSP(jogo.name_player[0], jogo.table_player[0].points,timePassed);
                jogo.addTimeWonP1();
                showTopRankingSp();
            }

            let celulas = document.getElementsByClassName("celula");
            for (let i = 0; i < celulas.length; i++) {
                celulas[i].removeEventListener("mouseup", clicado);



            }


        }

}

/**Função que atualiza os pontos do modo singlePlayer e coloca-os nas zonas designadas
 *  //TO DO  colocar todos os getElementById já em uma var correspondente
 */
function updatePointsSP() {
    let pointElement = document.getElementById(ID_POINTS_SINGLEPLAYER);
    var zeroPad = (num, places) => String(num).padStart(places, '0')
    pointElement.innerText = zeroPad(jogo.table_player[0].getPoints(),3);

    let bombsRemained = document.getElementById(ID_BOMBS_REMAINED);
    bombsRemained.innerText= zeroPad(jogo.table_player[0].getBombsRemained(),3);

}

/**Função que atualiza os pontos do modo Multiplayer e coloca-os nas zonas designadas
 *  //TO DO  colocar todos os getElementById já em uma var correspondente
 */
function updatePointsMP() {
    let pointElementP1 = document.getElementById(ID_POINTS_MULTIPLAYER_P1)
    let pointElementP2 = document.getElementById(ID_POINTS_MULTIPLAYER_P2)
    var zeroPad = (num, places) => String(num).padStart(places, '0')
    pointElementP1.innerText = zeroPad(jogo.table_player[0].getPoints(),3);
    pointElementP2.innerText = zeroPad(jogo.table_player[1].getPoints(),3);
    let bombsRemainedP1 = document.getElementById(ID_BOMBS_REMAINED_P1);
    bombsRemainedP1.innerText= zeroPad(jogo.table_player[0].getBombsRemained(),3);
    let bombsRemainedP2 = document.getElementById(ID_BOMBS_REMAINED_P2);
    bombsRemainedP2.innerText= zeroPad(jogo.table_player[1].getBombsRemained(),3);
}

/**Classe que representa cada tabuleiro de jogo , usada no modo singular e no modo multiplaye.
 *
 */
class Table {

    cells;
    cellNumbers;
    openedCells;
    col ;
    row;
    difficulty;
    bombs;
    placedFlags;
    points;
    lost;
    won;


    /**Construtor da classe Table , que inicia todas as celulas e estados corrrespondentes do jogo
     *
     * @param row - numero de linhas
     * @param col - numero de colunas
     */
    constructor(row,col,bombs){
        //acerto pois não usammos a fila ou coluna 0
        this.cellNumbers = row * col;
        this.openedCells=0;
        this.col = col;
        this.row = row;
        this.points = 0;
        this.bombs = bombs;
        this.placedFlags = 0;
        this.lost = false;
        this.won = false;
        this.scrambled = false;
        this.cells = new Array(this.row);
        // inicia cada linha
        for(let i = 1 ; i<= this.row ; i++){
            this.cells[i] =new Array(this.col);
            // ciclo para iniciar cada celula dessa linha
            for(let j = 1; j<= this.col; j++){
                this.cells[i][j] =new Cell(i,j);
            }
        }
        //ciclo para definir dentro de cada celula a sua adjacente
        for(let i = 1 ; i <= this.row ; i++){
            for(let j = 1; j<= this.col; j++){
                this.setAdjCell(i,j);
            }

        }
        this.scrambled = false;


    }

    /**Método getter que retorna a pontuação atual
     *
     * @returns {Number} pontuação atual
     */
    getPoints() {
        return this.points;
    }

    /**Método que distribui de forma random as bombas nas celulas do jogo excluindo a primeira célula selecionada
     *
     * @param firsOpenedRow - linha da primeira celula aberta
     * @param firsOpenedCol - coluna da primeira celula aberta
     *
     */
    scrambleBombs(firsOpenedRow,firsOpenedCol) {
        let bombsToPlace = this.bombs;
        while (bombsToPlace != 0) {
            let colRandom = Math.floor(Math.random() * (this.col  -1 )) + 1;
            let rowRandom = Math.floor(Math.random() * (this.row - 1  )) + 1;
            if(colRandom == firsOpenedCol && rowRandom ==firsOpenedRow ) continue;
            console.log(colRandom);
            console.log(rowRandom);
            console.log(this.col);
            console.log(this.row);
            console.log(bombsToPlace)
            if (!this.cells[rowRandom][colRandom].hasBomb()) {
                this.cells[rowRandom][colRandom].setBomb();
                bombsToPlace--;
            }
        }
        this.scrambled = true;
    }
    placeQuestion(row,col){

        if(!this.cells[row][col].hasFlag() && !this.cells[row][col].isQuestioned() ){
            this.cells[row][col].placeQuestion();

        }else if(!this.cells[row][col].hasFlag() && this.cells[row][col].isQuestioned() ){
            this.cells[row][col].removeQuestion();
        }
    }

    /**Função responsavel por gerir a colocação e remoção de flags
     *
     * @param row
     * @param col
     */
    placeFlag(row,col){
        if(!this.cells[row][col].hasFlag() && !this.cells[row][col].isOpened() && !this.cells[row][col].isQuestioned()){
            this.cells[row][col].placeFlag();
            this.placedFlags++;


        }else if (this.cells[row][col].hasFlag()){
            this.cells[row][col].removeFlag();
            this.placedFlags++;

        }
        this.checkIfWon();
    }

    /**
     *
     * @param row
     * @param col
     */
    removeFlag(row,col){
        if(this.cells[row][col].hasFlag() && !this.cells[row][col].isOpened()){
            this.cells[row][col].removeFlag();
            this.placedFlags--;


        }
    }

    /**Método que responsavel pela lógica associada à abertura de celulas
     *
     * @param row -linha da célula
     * @param col - coluna da célula
     */
    open(row, col){
        let AdjCells = [];
        if(this.scrambled && !this.cells[row][col].hasFlag() && !this.cells[row][col].isQuestioned() ) {
            // numero de bombas adjacentes iniciado

            // caso esta celula tenha bomba ela explode
            if (this.cells[row][col].hasBomb()) {
                this.cells[row][col].explode();
                //é posto como verdadeiro o estado jogoCurrente finished
                jogo.finished = true;
                jogo.lost = true;
                // caso contrario se não estiver aberto
            } else if (!this.cells[row][col].isOpened()) {
                // abrir celula
                this.openCell(row,col);

                AdjCells = this.cells[row][col].getAdj();
                this.processAdjacentCells(AdjCells, row, col);
                // se array contiver adjacencias

            }
        }else if(!this.cells[row][col].hasFlag() && !this.cells[row][col].isQuestioned()){
            // Em caso de ser a primeira jogada, abre a celula e depois invoca a função para distribuir as bombas
            this.openCell(row,col);
            this.scrambleBombs(row,col);
            AdjCells = this.cells[row][col].getAdj();
            // invoca a função para processar as adjacentes
            this.processAdjacentCells(AdjCells, row, col);

        }

    }

    /**
     *
     * @param AdjCells
     * @param row
     * @param col
     */
    processAdjacentCells(AdjCells, row, col) {
        let numBombs = this.countAdjBombs(AdjCells);
        AdjCells.filter(cell => cell !== this.cells[row][col].id);
        if (numBombs == 0) {
            this.openAdjCells(AdjCells);
        } else {
            this.cells[row][col].placeNumber(numBombs);
        }
    }

    /**
     *
     * @param AdjCells
     */
    openAdjCells(AdjCells){


        if(AdjCells.length > 0){

            // fazer um loop nas adjacencias
            for(let i = 0; i< AdjCells.length;i++){
                // obter o id
                let id = AdjCells[i].split(",");
                //obter linha e coluna do id
                let rowAdj = id[0];
                let colAdj = id[1];
                if(!this.cells[rowAdj][colAdj].isOpen && !this.cells[rowAdj][colAdj].hasBomb() &&
                        !this.cells[rowAdj][colAdj].hasFlag() && !this.cells[rowAdj][colAdj].isQuestioned()) {
                    let newAdjCell = [];
                    newAdjCell =this.cells[rowAdj][colAdj].getAdj();

                    newAdjCell.filter(cell => cell !== AdjCells[i])
                    let numBombs = this.countAdjBombs(newAdjCell);
                    this.openCell(rowAdj,colAdj);
                    if (numBombs != 0) {
                        this.cells[rowAdj][colAdj].placeNumber(numBombs);

                    } else {
                        this.openAdjCells(newAdjCell);

                    }
                }


            }


        }else {
            return;
        }


    }

    /**Função que abre a celula e faz update do estado do jogo
     *
     * @param row - numero da Linha
     * @param col - numero da Coluna
     * @requires !this.cells[row][col].isOpened() &&  !this.cells[row][col].hasBomb()
     */
    openCell(row,col){

        this.cells[row][col].openCell();
        this.points += POINTS_GIVEN_OPENED_CELL;
        this.openedCells++;
        this.checkIfWon();


    }

    /**Função que verifica quantas bombas existem nas celulas adjacentes
     *
     * @param Adj - array que contem os ids das celulas adjacentes
     * @returns {number} numero de celulas adjacentes
     */
    countAdjBombs(Adj){
        let numBomb = 0;
        for(let i = 0 ; i< Adj.length ; i++){
            let id = Adj[i].split(",");
            //obter linha e coluna do id
            let rowAdj = id[0];
            let colAdj = id[1];
            if( this.cells[rowAdj][colAdj].hasBomb()){
                numBomb++
            }
        }
        return numBomb;
    }

    /**Método que obtem as celulas adjacentes a uma certa celula adicionando oss id´s deste à celula correspondente
     *
     * @param currentRow - numero da linha da celula atual
     * @param currentCol - numero da coluna da celula atual
     */
    setAdjCell(currentRow,currentCol) {

        if (this.cells != undefined) {
            let AdjCells = [];
            let thisCell = currentRow+','+currentCol;
            for (let i = currentRow - 1; i <= currentRow + 1; i++) {
                for (let j = currentCol - 1; j <= currentCol +1; j++) {
                    if( (i >= 1 && i <= this.row) && (j >= 1 && j <= this.col)){
                        AdjCells.push(Number(i) + "," + j);
                    }
                }
            }
            AdjCells = AdjCells.filter(cell => cell !== thisCell);
            this.cells[currentRow][currentCol].setAjacentCells(AdjCells);
        }
    }

    /**Método que obtem o numero de bombas que faltam assinalar
     *
     * @returns {number} - numero de bombas não assinaladas
     */
    getBombsRemained(){
        return Number(this.bombs - this.placedFlags);
    }

    /**Método que verifica se o utilizador ganhou o jogo verificando o estado do jogo e se o numero de celulas por
     * abrir é igual a 0, contando as celulas com flag como celulas a menos
     *
     */
    checkIfWon(){
        let cellsToGo = this.cellNumbers - ( this.openedCells + this.placedFlags);
        if(cellsToGo == 0){
            jogo.finished = true;
            jogo.won = true;
        }
    }

    /**Método que renicia a tabela colocando todos os estados em estado inicial e fazendo reset do estado de cada
     * celula desta table de jogo
     *
     */
    resetTable(){
        this.scrambled = false;
        this.won = false;
        this.placedFlags = 0;
        this.openedCells = 0;
        this.lost = false;
        this.points = 0;
        for(let i = 1 ; i <= this.row ; i++){
            for(let j = 1; j<= this.col; j++){
                this.cells[i][j].resetCell();
            }

        }
    }



}


/**Classe que representa uma celula do jogo
 *
 */
class Cell {
    adjCells;
    col ;
    row;
    isFlagged;
    isBombed;
    isOpen;
    buttonTd;
    suspect;


    /**Construtor de Celula do jogo
     *
     * @param row - recebe a linha do jogo
     * @param col - recebe a coluna do jogo
     */
    constructor(row,col){
        this.row = Number(row);
        this.col = Number(col);
        this.buttonTd = null;
        this.isBombed=false;
        this.isFlagged = false;
        this.adjCells = [];
        this.suspect=false;


    }

    /**Método setter que coloca a referencia do elemento html referente a esta celula para manipulação  direta
     * da celula a partir desta abstração de celula de jogo
     *
     * @param cellButton elemento html referente a esta celula no jooo
     */
    setTdElement(cellButton){
        this.buttonTd = cellButton;
    }

    /** Método que abre a celula e consoante o estado da celula explode ou abre, mudando o visual da mesma no jogo
     *
     */
    openCell(){
        if(this.isBombed){
            this.explode();
            jogo.finished;
            this.buttonTd.removeEventListener("mouseup",clicado);
        }else {

            console.log("Aberta Celula [" + this.row + "," + this.col + "]");

            this.buttonTd.setAttribute('class', 'openedCell');
            this.buttonTd.removeEventListener("mouseup",clicado);
            this.isOpen=true;

        }
    }

    /**Método que verifica se esta celula têm uma bomba
     *
     * @returns {boolean} se a celula tem bomba
     */
    hasBomb(){
        return this.isBombed;
    }

    /**Método setter que coloca esta celula como portadora de bomba
     *
     */
    setBomb(){
        this.isBombed =true;
    }

    /**Obtem lista de celulas adjacentes a esta celula
     *
     * @returns {Array} array de id´s de celulas adjacentes
     */
    getAdj(){
        let Adjacent = this.adjCells;
        return Adjacent;

    }

    /**M etodo que coloca a flag mudando o estado da celula e coloca as classes css associadas a celula com flag
     *
     */
    placeFlag(){
        if(!this.isOpen){
            this.isFlagged = true;
            this.buttonTd.setAttribute('class','celula flagCell');
        }
        ;
    }
    /**Metodo que remove a flag mudando o estado da celula e coloca as classes css associadas a celula normal
     *
     */
    removeFlag(){
        if(this.isFlagged) {

            this.isFlagged = false;
            this.buttonTd.removeAttribute('class','flagCell')
            this.buttonTd.setAttribute('class', 'celula ');
        }
    }

    /**Método que verifica se a celula currente contem uma flag e
     *
     * @returns {flagged} booleano que representa se a celula tem flag
     */
    hasFlag(){
        let flagged = this.isFlagged;
        return flagged;
    }


    /**Metodo getter para o estado da celula em relação a estar aberta ou não
     *
     * @returns {opened} booleano que representa se a celula está aberta
     */
    isOpened(){
        let opened = this.isOpen;
        return opened;
    }

    /**Método responsavel por colocar o numero de bombas e a classe associada caso o numero de bombas seja maior que 0
     *
     * @param numberBomb
     */
    placeNumber(numberBomb){
        if(numberBomb > 0) {
            this.buttonTd.setAttribute('class', 'openedCell numberBombs');
            this.buttonTd.innerText = numberBomb;
        }
    }

    /**Método responsavel por mudar a classe da celula associada para estado aberto e de bomba explodida
     *
     */
    explode(){

        this.buttonTd.setAttribute('class','openedCell bombCell');
        this.buttonTd.removeEventListener("mouseup",clicado);
        this.isOpen=true;
    }

    /**Método setter que guarda as celulas adjacentes a esta celula
     *
     * @param AdjCells - array de id´s de celulas adjacentes
     */
    setAjacentCells(AdjCells){
        this.adjCells = AdjCells;

    }

    isQuestioned(){
        return this.suspect;
    }

    placeQuestion(){
        this.buttonTd.setAttribute('class','celula interrogation');

        this.suspect=true;

    }

    removeQuestion(){
        this.buttonTd.removeAttribute('class',' interrogation');
        this.buttonTd.setAttribute('class', 'celula ');

        this.suspect=false;
    }

    /**Método que faz reinicia os estados desta célula
     *
     */
    resetCell(){

        this.buttonTd.removeAttribute('class', 'flagCell')
        this.buttonTd.setAttribute('class', 'celula ');
        this.isFlagged = false;
        this.isOpen = false;
        this.isBombed = false;
        this.buttonTd.removeAttribute('class', 'openedCell')
        this.buttonTd.removeAttribute('class', 'bombCell')
        this.buttonTd.removeAttribute('class', 'numberBombs')

        this.buttonTd.addEventListener("mouseup",clicado,false);
        this.buttonTd.setAttribute('class', 'celula ');
        this.buttonTd.innerText ="";
    }



}

function putRanking(time, score){
    //put at localstorage ranking this game , and organize new top 10 scores

}
function showRanking(){
    // get from localstorage best rankings at singleplayer
}


/**Código que impossibilita que quando clickemos com o botão direito apareça o menu de opções,
 * Util para conseguirmos meter bandeiras nas celulas
 *
 * @type {string}
 */
var message ="";
function clickIE() {if (document.all) {(message);return false;}}
function clickNS(e) {if
(document.layers||(document.getElementById&&!document.all)) {
    if (e.which==2||e.which==3) {(message);return false;}}}
if (document.layers)
{document.captureEvents(Event.MOUSEDOWN);document.onmousedown=clickNS;}
else{document.onmouseup=clickNS;document.oncontextmenu=clickIE;}
document.oncontextmenu=new Function("return false")