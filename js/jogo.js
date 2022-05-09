/* ------------------------------------------------------------------------- */
"use strict";
/* ------------------------Game Screens IDS--------------------------- */

/** Tempo do jogo SINGLE PLAYER e QuickGame */
const ID_SPAN_TEMPO_JOGO = "idScreenTempoJogo";

/** Tempo do jogo SINGLE PLAYER e QuickGame */
const ID_BOMBS_REMAINED = "idBombsRemained";


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


const openedCellSound = new Audio('../audio/open.mp3');

/* ------------------------------------------------------------------------- */
var jogoCurrente;
/** Estado do jogo, que vai sendo preenchido no decorrer do jogo. */
var jogoSp = {
    table_player:null,
    inicio: null,
    times_won_player1:0,
    bombs:0,
    size:null,
    col:0,
    row:0,
    finished:false,
    resetGame: function(){
        this.table_player= null;
        console.log(this.bombs);
        console.log(this.col);
        init(this.row,this.col,this.bombs); },
    addTimeWonP1: function(){  this.times_won_player1++;},



};
/** Estado do jogo Multiplayer, que vai sendo preenchido no decorrer do jogo. */
var jogoMp = {
    table_player1:null,
    table_player2:null,
    name_player1:null,
    name_player2:null,
    inicio: null,
    points_player1:0,
    points_player2:0,
    times_won_player1:0,
    times_won_player2:0,
    difficulty:null,
    size:null,
    finished:false,
    addPointsP1: function(points){  this.points_player1 += points;},
    addPointsP2: function(points){  this.points_player2 += points;},
    addTimeWonP1: function(){  this.times_won_player1++;},
    addTimeWonP2: function(){  this.times_won_player2++ ;},
    resetGame:function (){
        this.points_player1 = 0;
        this.points_player2= 0}

};

/* ------------------------------------------------------------------------- */

/** Recolhe os dados da configuração para um jogo singleplayer e guarda-os na
 * local storage
 */
function recolheDadosConfiguracaoSingleplayer() {

    let formulario = document.forms[FORMULARIO_SINGLEPLAYER];

    let configuracao = [];

    let nome = formulario.elements[NOME_JOGADOR_S].value;
    configuracao.push(nome);

    for (let t of formulario.elements[TAMANHO_JOGO_S]) {
        if (t.checked) {
            configuracao.push(t.value);
        }
    }

    for (let d of formulario.elements[DIFICULDADE_JOGO_S]) {
        if (d.checked) {
            configuracao.push(d.value)
        }
    }

    // falta guardar a imagem do jogador

    localStorage.setItem(ITEM_CONFIGURACAO_S, JSON.stringify(configuracao));

}

/* ------------------------------------------------------------------------- */

/** Recolhe os dados da configuração para um jogo multiplayer e guarda-os na
 * local storage
 */
function recolheDadosConfiguracaoMultiplayer() {

    let formulario = document.forms[FORMULARIO_MULTIPLAYER];

    let configuracaoM = [];

    let nome1 = formulario.elements[NOME_JOGADOR_1].value;
    configuracaoM.push(nome1);

    let nome2 = formulario.elements[NOME_JOGADOR_2].value;
    configuracaoM.push(nome2);

    console.log(configuracaoM);


    for (let t of formulario.elements[TAMANHO_JOGO_M]) {
        if (t.checked) {
            configuracaoM.push(t.value);
        }
    }

    for (let d of formulario.elements[DIFICULDADE_JOGO_M]) {
        if (d.checked) {
            configuracaoM.push(d.value)
        }
    }

    // falta guardar a imagem do jogador

    localStorage.setItem(ITEM_CONFIGURACAO_M, JSON.stringify(configuracaoM));

}

/* ------------------------------------------------------------------------- */

/** Configura o tamanho inicial do tabuleiro e o nome do jogador no
 * caso singleplayer
 */

function configuracaoSingleplayer() {
    if(window.localStorage.getItem(ITEM_CONFIGURACAO_S) != null) {

        let configuracao = JSON.parse(localStorage.getItem(ITEM_CONFIGURACAO_S)) || [];

        let tamanho = configuracao[1];

        if (tamanho == 'tamanhoEasy') {
            init(9, 9,BOMBS_GAME_EASY);
        } else if (tamanho == 'tamanhoMedium') {
            init(16, 16,BOMBS_GAME_MEDIUM);
        } else if (tamanho == 'tamanhoHard') {
            init(30, 16,BOMBS_GAME_HARD);
        }


        document.getElementById(NOME_AVATAR_S).innerHTML = configuracao[0];

        // Falta configurar a imagem
    }else{
        window.location.replace("index.html");
    }


}

/* ------------------------------------------------------------------------- */

/** Configura o tamanho inicial do tabuleiro e o nome do jogador no
 * caso multiplayer
 */

function configuracaoMultiplayer() {
    if(window.localStorage.getItem(ITEM_CONFIGURACAO_M) != null) {

        let configuracaoM = JSON.parse(localStorage.getItem(ITEM_CONFIGURACAO_M)) || [];

        let nomesAvatar1 = document.getElementsByClassName(NOME_AVATAR_1);

        for (let i = 0; i < nomesAvatar1.length; i++) {
            nomesAvatar1[i].innerHTML = configuracaoM[0];
        }

        let nomesAvatar2 = document.getElementsByClassName(NOME_AVATAR_2);

        for (let i = 0; i < nomesAvatar2.length; i++) {
            nomesAvatar2[i].innerHTML = configuracaoM[1];
        }

        let tamanho = configuracaoM[2];


        if (tamanho == 'tamanhoEasy') {
            initMulti(9, 9,BOMBS_GAME_EASY);
        } else if (tamanho == 'tamanhoMedium') {
            initMulti(16, 16,BOMBS_GAME_MEDIUM);
        } else if (tamanho == 'tamanhoHard') {
            initMulti(30, 16,BOMBS_GAME_HARD);
        }



    }else{
        window.location.replace("index.html");
    }
}

/* ------------------------------------------------------------------------- */







/**Função que inicia o jogo Singular
 *
 * //TO DO  distribuir de forma random as bombas no jogo
 *
 * @param colunas - numero de colunas do jogo
 * @param linhas  - numero de Linhas do jogo
 */
function init(linhas, colunas,bombs){
    jogoCurrente = jogoSp;

    jogoSp.table_player  =  new Table(linhas,colunas,bombs);
    jogoSp.row = Number(linhas);
    jogoSp.col = Number(colunas);
    jogoSp.bombs = Number(bombs);

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

            jogoSp.table_player.cells[i][j].buttonTd = celula;
            linha.appendChild(celula);

        }


        tabela.appendChild(linha);
    }

    localJogo.appendChild(tabela);

    // Marca o inicio do tempo de jogo
    jogoSp.inicio = Math.floor(Date.now() / 1000);
    document.getElementById(BTN_ID_RESET_GAME_SP).addEventListener("mouseup",jogoCurrente.resetGame, false);
    // Chama mostraTempoJogo() a cada segundo
    temporizadorTempoJogo = setInterval(mostraTempoJogo, 1000);
    verificarSeAcabou = setInterval(isFinished, 1000);
    verificacaoPontos = setInterval(updatePointsSP, 1000);

}



/**
 *
 * @param colunas
 * @param linhas
 */
function initMulti(colunas, linhas, bombs){
    jogoCurrente = jogoMp;
    jogoMp.table_player1  =  new Table(linhas,colunas,bombs);
    jogoMp.table_player2 =  new Table(linhas,colunas,bombs);
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
            jogoMp.table_player1.cells[i][j].setTdElement(celulaMp1);

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
            jogoMp.table_player2.cells[i][j].setTdElement(celulaMp2);

            linha2.appendChild(celulaMp2);

        }

        tabela2.appendChild(linha2);
    }
    localJogo2.appendChild(tabela2);
    jogoMp.inicio = Math.floor(Date.now() / 1000);

    // Chama mostraTempoJogo() a cada segundo

    temporizadorTempoJogo = setInterval(mostraTempoJogo, 1000);
}

function clicado(e){
    openedCellSound.play();
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
    openedCellSound.play();

    // manda abrir o opencell e espera retorno, dependendo do retorno ira fazer uma acção no jogo

    let row = id[0];
    let col = id[1];


    if(e.button == 0) {
        if (!jogoSp.table_player.cells[row][col].hasFlag()){
            jogoSp.table_player.openCell(row, col);
    }
    }
    if(e.button ==2){
        if (!jogoSp.table_player.cells[row][col].hasFlag()) {
            jogoSp.table_player.placeFlag(row, col);
        }else{
            jogoSp.table_player.removeFlag(row,col)
        }
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
    var currentPlayer;

    // manda abrir o opencell e espera retorno, dependendo do retorno ira fazer uma acção no jogo

    if(id[0] == "P1"){
        console.log(id[0]);
        currentPlayer = jogoMp.table_player1;
    }else if(id[0] == "P2"){

        currentPlayer = jogoMp.table_player2;

    }
    let row = id[1];
    let col = id[2];


    if(e.button == 0) {
        currentPlayer.openCell(row,col);
    }
    if(e.button ==2){
        currentPlayer.placeFlag(row,col);
    }
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();


}
/** Mostra o tempo do jogo
 *
 * Função chamada pelo setinterval que atualiza o contador de tempo do jogo no sitio pretendido
 *
 */
function mostraTempoJogo() {
    var zeroPad = (num, places) => String(num).padStart(places, '0')
    document.getElementById(ID_SPAN_TEMPO_JOGO).innerHTML = zeroPad(Math.floor((Date.now()/1000)-jogoCurrente.inicio), 3);
}
function isFinished() {
    if (jogoCurrente != null) {
        if (jogoCurrente.finished) {

            let celulas = document.getElementsByClassName("celula");
            for (let i = 0; i < celulas.length; i++) {
                celulas[i].removeEventListener("mouseup", clicado);



            }

            clearInterval(temporizadorTempoJogo);
            clearInterval(verificacaoPontos);
            clearInterval(verificarSeAcabou);
        }
    }
}

function updatePointsSP() {
    let pointElement = document.getElementById(ID_POINTS_SINGLEPLAYER);
    var zeroPad = (num, places) => String(num).padStart(places, '0')
    pointElement.innerText = zeroPad(jogoSp.table_player.getPoints(),3);

    let bombsRemained = document.getElementById(ID_BOMBS_REMAINED);
    bombsRemained.innerText= jogoSp.table_player.getBombsRemained();

}

function updatePointsMP() {
    let pointElement = document.getElementById(ID_POINTS_SINGLEPLAYER)

}

/**Classe que representa o tabuleiro do jogo que contem todos as celulas ou seja butões do Jogo
 * , é responsavel por manipular a lógica do jogo.
 *
 */
class Table {

    cells;
    col ;
    row;
    difficulty;
    bombs;
    placedFlags;
    points;
    lost;
    won;


    /**
     *
     * @param row
     * @param col
     */
    constructor(row,col,bombs){
        //acerto pois não usammos a fila ou coluna 0
        this.col = col;
        this.row = row;
        this.points = 0;
        this.bombs = bombs;
        this.placedFlags = 0;
        this.lost = false;
        this.won = false;
        this.scrambled = false;
        this.cells = new Array(this.row);
        for(let i = 1 ; i<= this.row ; i++){
            this.cells[i] =new Array(this.col);
        }

        for(let i = 1 ; i <= this.row ; i++){
            for(let j = 1; j<= this.col; j++){
                this.cells[i][j] =new Cell(i,j);
            }

        }
        this.scrambled = false;
        this.setAdjCell();

    }
    getPoints() {
        return this.points;
    }

    scrambleBombs(firsOpenedCol,firsOpenedRow) {
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


    placeFlag(row,col){
            if(!this.cells[row][col].hasFlag() && !this.cells[row][col].isOpened()){
                this.cells[row][col].placeFlag();
                this.placedFlags++;
            }else if (this.cells[row][col].isFlagged()){
                this.cells[row][col].removeFlag();
                this.placedFlags++;

            }
        }

    removeFlag(row,col){
        if(this.cells[row][col].hasFlag() && !this.cells[row][col].isOpened()){
            this.cells[row][col].removeFlag();
            this.placedFlags--;


        }
    }

    openCell(row,col){
        if(this.scrambled) {
            // numero de bombas adjacentes iniciado

            // caso esta celula tenha bomba ela explode
            if (this.cells[row][col].hasBomb()) {
                this.cells[row][col].explode();
                //é posto como verdadeiro o estado jogoCurrente finished
                jogoCurrente.finished = true;
                // caso contrario se não estiver aberto
            } else if (!this.cells[row][col].isOpened()) {
                // abrir celula
                this.cells[row][col].openCell();
                this.points += POINTS_GIVEN_OPENED_CELL;
                let AdjCells = this.cells[row][col].getAdj();
                // se array contiver adjacencias
                this.openAdjCells(AdjCells);

            }
        }else{
            this.cells[row][col].openCell();
            this.points += POINTS_GIVEN_OPENED_CELL;
            this.scrambleBombs(row,col);
            let AdjCells = this.cells[row][col].getAdj();
            let numBombs = this.coundAdjBombs(AdjCells);
            AdjCells.filter(cell => cell !== this.cells[row][col].id);
            if(numBombs == 0) {
                this.openAdjCells( AdjCells);
            }else{
                this.cells[row][col].placeNumber(numBombs);
            }
        }

    }

    openAdjCells(AdjCells){


        if(AdjCells.length > 0){

            // fazer um loop nas adjacencias
            for(let i = 0; i< AdjCells.length;i++){
                // obter o id
                let id = AdjCells[i].split(",");
                //obter linha e coluna do id
                let rowAdj = id[0];
                let colAdj = id[1];
                if(!this.cells[rowAdj][colAdj].isOpen && !this.cells[rowAdj][colAdj].hasBomb()) {
                    let newAdjCell = [];
                    newAdjCell =this.cells[rowAdj][colAdj].getAdj();

                    newAdjCell.filter(cell => cell !== AdjCells[i])
                    let numBombs = this.coundAdjBombs(newAdjCell);

                    if (numBombs == 0) {
                        this.cells[rowAdj][colAdj].openCell();
                        this.openAdjCells(newAdjCell);
                    } else {
                        this.cells[rowAdj][colAdj].placeNumber(numBombs);
                    }
                }
                //se a adjacente atual tiver bomba continua para a proxima iteração e adiciona uma bomba a contagem
               /* if(this.cells[rowAdj][colAdj].hasBomb()){
                    numBombs++;

                    // se a celula adjacente não esta aberta, abre a adjacente
                }else if (!this.cells[rowAdj][colAdj].isOpened()) {
                    this.cells[rowAdj][colAdj].openCell()

                    // adiciona pontos
                    this.points += POINTS_GIVEN_OPENED_CELL;
                    let newAdjCell = [];
                    newAdjCell =this.cells[rowAdj][colAdj].getAdj();
                    newAdjCell.filter(cell => cell !== AdjCells[i]);

                    this.openAdjCells(rowAdj,colAdj,newAdjCell);


                }*/

            }


        }else {
            return;
        }


    }

    coundAdjBombs(Adj){
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



    /**Função que inicia a tablet, apesar de já estar funcional faltam uns retoques , na
     * parte que inicia e põe uma referencia das celulas adjacentes de cada celula na propria celula
     *
     */
    setAdjCell(){
        if(this.cells != undefined){

            for(let i = 1 ; i<=this.row ; i++){
                for(let j = 1 ; j<= this.col; j++){

                    let AdjCells = [];
                    if(i>1) {
                        if (this.cells[i - 1] != undefined) {
                            if (this.cells[i - 1][j] != undefined) {
                                //console.log("Adj of " + i + " " + j + " =  " + Number(i - 1) + "," + j);
                                AdjCells.push(Number(i - 1) + "," + j);
                            }
                        }
                    }
                    if(i>1 && j> 1) {
                        if (this.cells[i - 1] != undefined) {
                            if (this.cells[i - 1][j-1] != undefined) {
                                //console.log("Adj of " + i + " " + j + " =  " + Number(i - 1) + "," + j);
                                AdjCells.push(Number(i - 1) + "," + Number(j-1));
                            }
                        }
                    }
                    if(i<this.row && j < this.col){

                        if (this.cells[i + 1] != undefined) {
                            if (this.cells[i + 1][j+1] != undefined) {
                                //console.log("Adj of " + i + " " + j + " =  " + Number(i - 1) + "," + j);
                                AdjCells.push(Number(i + 1) + "," + Number(j+1));
                            }
                        }
                    }
                    if(i<this.row && j > 1){

                        if (this.cells[i + 1] != undefined) {
                            if (this.cells[i + 1][j-1] != undefined) {
                                //console.log("Adj of " + i + " " + j + " =  " + Number(i - 1) + "," + j);
                                AdjCells.push(Number(i + 1) + "," + Number(j-1));
                            }
                        }
                    }
                    if(i>1 && j < this.col){

                        if (this.cells[i - 1] != undefined) {
                            if (this.cells[i - 1][j+1] != undefined) {
                                //console.log("Adj of " + i + " " + j + " =  " + Number(i - 1) + "," + j);
                                AdjCells.push(Number(i - 1) + "," + Number(j+1));
                            }
                        }
                    }
                    if(i < this.row) {

                        if (this.cells[i + 1] != undefined) {
                            if (this.cells[i + 1][j] != undefined) {
                                // this.cells.adjCells[1] = this.cells[i + 1][j];
                                //console.log("Adj of " + i + " " + j + " =  " + Number(i + 1)+ "," + j);
                                AdjCells.push(Number(i + 1) + "," + j);
                            }

                        }
                    }
                    if(j<this.col) {
                        if (this.cells[i] != undefined) {
                            if (this.cells[i][j + 1] != undefined) {
                               // this.cells.adjCells[2] = this.cells[i][j + 1];
                                //console.log("Adj of " + i + " " + j + " =  " + i + "," + Number( 1 + j));
                                AdjCells.push(i + "," + Number( 1 + j));
                            }
                        }
                    }

                    if(j> 1) {
                        if (this.cells[i] != undefined) {
                            if (this.cells[i][j - 1] != undefined) {
                                //console.log("Adj of " + i + " " + j + " =  " + i +","+ Number( j-1));
                                AdjCells.push(i + "," + Number( j-1));


                            }
                        }
                    }
                    if(j> 1) {
                        if (this.cells[i] != undefined) {
                            if (this.cells[i][j - 1] != undefined) {
                                //console.log("Adj of " + i + " " + j + " =  " + i +","+ Number( j-1));
                                AdjCells.push(i + "," + Number( j-1));


                            }
                        }
                    }
                    this.cells[i][j].addAjacentCells(AdjCells);

                }
            }
        }
    }
    getBombsRemained(){
        return Number(this.bombs - this.placedFlags);
    }








}


/**
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
    nearBombNumber;

    /**
     *
     * @param row
     * @param col
     */
    constructor(row,col){
        this.row = Number(row);
        this.col = Number(col);
        this.buttonTd = null;
        this.isBombed=false;
        this.nearBombNumber =0;
        this.isFlagged = false;
        this.adjCells = [];


    }

    /**
     *
     * @param cellButton
     */
    setTdElement(cellButton){
        this.buttonTd = cellButton;
    }

    /**
     *
     */
    openCell(){
        if(this.isBombed){
            this.explode();
            jogoCurrente.finished;
            this.buttonTd.removeEventListener("mouseup",clicado);
        }else {

            console.log("Aberta Celula [" + this.row + "," + this.col + "]");

            this.buttonTd.setAttribute('class', 'openedCell');
            this.buttonTd.removeEventListener("mouseup",clicado);
            this.isOpen=true;

        }
    }

    /**
     *
     * @returns boolean
     */
    hasBomb(){
        return this.isBombed;
    }

    /**
     *
     * @returns {number}
     */
    setBomb(){
        this.isBombed =true;
    }

    /**
     *
     */
    getAdj(){
        return this.adjCells;

    }

    /**
     *
     */
    placeFlag(){
        if(!this.isOpen){
        this.isFlagged = true;
        this.buttonTd.setAttribute('class','celula flagCell');
        }
        ;
    }
    /**
     *
     */
    removeFlag(){
      if(this.isFlagged) {

            this.isFlagged = false;
            this.buttonTd.removeAttribute('class','flagCell')
            this.buttonTd.setAttribute('class', 'celula ');
        }
    }
    /**
     *
     */
    hasFlag(){
        return this.isFlagged;
        }


    /**
     *
     */
    isOpened(){
        return this.isOpen;
    }
    /**
     *
     */
    placeNumber(numberBomb){
        if(numberBomb > 0) {
            this.buttonTd.setAttribute('class', 'openedCell numberBombs');
            this.buttonTd.innerText = numberBomb;
        }
    }

    /**
     *
     */
    explode(){

        this.buttonTd.setAttribute('class','openedCell bombCell');
        this.buttonTd.removeEventListener("mouseup",clicado);
    }
    addAjacentCells(AdjCells){
        this.adjCells = AdjCells;

    }

    setNumber(num){
        this.buttonTd.innerText = num;
    }

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