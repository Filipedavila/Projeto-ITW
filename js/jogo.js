/* ------------------------------------------------------------------------- */

/** Tempo do jogo */
const TEMPO_JOGO = "tempoJogo";

/** Intervalo do tempo do jogo */
var temporizadorTempoJogo;

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

/* ------------------------------------------------------------------------- */

/** Estado do jogo, que vai sendo preenchido no decorrer do jogo. */
let jogo = {
  
    inicio: null
  
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

    configuracao = JSON.parse(localStorage.getItem(ITEM_CONFIGURACAO_S)) || [];

    let tamanho = configuracao[1];

    if (tamanho == 'tamanhoEasy') {
        init(9,9);
    }
    else if (tamanho == 'tamanhoMedium') {
        init(16,16);
    }
    else if (tamanho == 'tamanhoHard') {
        init(30,16);
    }

    document.getElementById(NOME_AVATAR_S).innerHTML = configuracao[0];

    // Falta configurar a imagem
    

}

/* ------------------------------------------------------------------------- */

/** Configura o tamanho inicial do tabuleiro e o nome do jogador no
 * caso multiplayer
 */

 function configuracaoMultiplayer() {

    configuracaoM = JSON.parse(localStorage.getItem(ITEM_CONFIGURACAO_M)) || [];

    let nomesAvatar1 = document.getElementsByClassName(NOME_AVATAR_1);

    for (let i = 0; i < nomesAvatar1.length; i++) {
        nomesAvatar1[i].innerHTML = configuracaoM[0];
    }

    let nomesAvatar2 = document.getElementsByClassName(NOME_AVATAR_2);

    for (let i = 0; i < nomesAvatar2.length; i++) {
        nomesAvatar2[i].innerHTML = configuracaoM[1];
    }

    let tamanho = configuracaoM[2];


    /**
     * nao funciona o tamanho
     * problema com initMulti
     * Uncaught TypeError: Cannot read properties of undefined (reading 'cells')
     */

    if (tamanho == 'tamanhoEasy') {
        initMulti(9,9);
    }
    else if (tamanho == 'tamanhoMedium') {
        initMulti(16,16);
    }
    else if (tamanho == 'tamanhoHard') {
        initMulti(30,16);
    }

    // Falta configurar a imagem
    

}

/* ------------------------------------------------------------------------- */



//TO DO , FUNÇÕES QUE RECEBAM AS OPÇÕES DOS JOGOS DO HTML

const openedCellSound = new Audio('../audio/open.mp3');

var table;

/**TO DO , ligar o init as definições do user
 * TEREMOS QUE ARRANJAR MANEIRA TAMBÉM DE PASSAR TODOS OS DADOS
 * CRIAR LIGAÇÕES ENTRE CERTAS PARTES DO HTML PARA APRESENTAR O NOME DO JOGADOR,
 * O SCORE DO JOGADOR , E NO CASO DE MULTIPLAYER FUNÇÕES EXTRA
 *
 * @param colunas
 * @param linhas
 */
function init(colunas = 8, linhas = 8){
     this.table  =  new Table(colunas,linhas);
console.log("criou table");
var localJogo = document.getElementById("table");

// criar table
var tabela = document.createElement('table');
tabela.setAttribute('class' ,'gameTable');
tabela.setAttribute('alt','Janela do Jogo');

// faz cada linha
for(i=1;i<=linhas; i++ ){
 var linha =document.createElement('tr');
 linha.setAttribute('class' ,'gameRow');

    //Criar Celulas do jogo
    for(j = 1 ; j <= colunas;j++){
        var celula = document.createElement('td');
        let row = String(i);
        let col = String(j);
        let id = row + col ;
        celula.setAttribute('class','celula');
        celula.setAttribute('id', id);
        celula.addEventListener("mouseup",clicado,false);
       table.cells[i][j].buttonTd = celula;
        linha.appendChild(celula);
        
        }


  tabela.appendChild(linha);
}

localJogo.appendChild(tabela);

  // Marca o inicio do tempo de jogo
  jogo.inicio = Math.floor(Date.now() / 1000);

  // Chama mostraTempoJogo() a cada segundo
  temporizadorTempoJogo = setInterval(mostraTempoJogo, 1000);


}


/** Mostra o tempo do jogo */
function mostraTempoJogo() {
    var zeroPad = (num, places) => String(num).padStart(places, '0')
    document.getElementById(TEMPO_JOGO).innerHTML = zeroPad(Math.floor((Date.now()/1000)-jogo.inicio), 3);
}

/**
 * Colocar na funcao que terminar o jogo
 * Cancela o tempo do jogo
 * clearInterval(temporizadorTempoJogo)
 */

function startGame(){

}

/**
 *
 * @param colunas
 * @param linhas
 */
function initMulti(colunas = 8, linhas = 8){

  var localJogo = document.getElementById("game1");
  var localJogo2 = document.getElementById("game2");

  var tabela = document.createElement('table');
  tabela.setAttribute('class' ,'gameTable');
  tabela.setAttribute('alt','Jogador 1');
  
  // faz cada linha
  for(i=1;i<=linhas; i++ ){
   var linha =document.createElement('tr');
   linha.setAttribute('class' ,'gameRow');
      //faz cada celula
      for(j = 1 ; j <= colunas;j++){
          var celula = document.createElement('td');
          
          celula.setAttribute('class','celula');
          celula.setAttribute('id', i*10+j);
          celula.setAttribute('alt','Celula nº ' + i*10+j);
          celula.addEventListener("click",clicado,false);
          // por o elemento da celula diretamente na abstração da celula
          table.cells[linha][colunas].setTdElement(celula);
          
          linha.appendChild(celula);
          
          } 
          
    tabela.appendChild(linha);
  }
  
  localJogo.appendChild(tabela);

  var tabela2 = document.createElement('table');
  tabela2.setAttribute('class' ,'gameTable');
  tabela2.setAttribute('alt','Jogador 2');
  
  // faz cada linha
  for(i=0;i<linhas; i++){
   var linha2 =document.createElement('tr');
   linha2.setAttribute('class' ,'gameRow');
   linha2.setAttribute('alt','Linha ' + i);
      //faz cada celula
      for(j = 0 ; j < colunas;j++){
          var celula2 = document.createElement('td');
          let row = String(i);
          let col = String(j);
          let id = row + col ;
          celula2.setAttribute('class','celula');
          celula2.setAttribute('id',  id);
          celula2.setAttribute('alt','Celula nº ' + id);
          celula2.addEventListener("mouseup",function(e){
              e.preventDefault();
              clicado(e);    },false);
          
          linha2.appendChild(celula2);
          
          } 
          
    tabela2.appendChild(linha2);
  }
  localJogo2.appendChild(tabela2);
  }


/**
 *
 * @param e
 */
function clicado(e){
    openedCellSound.play();
     // manda abrir o opencell e espera retorno, dependendo do retorno ira fazer uma acção no jogo
    var t = e.target;

   let id = t.id;
   let row = id.charAt(0);
   let col = id.charAt(1);
console.log(e.button )

    if(e.button == 0) {
        table.cells[row][col].openCell();
    }
    if(e.button ==2){
        table.cells[row][col].placeFlag();
    }
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();


}

/**Classe que representa o tabuleiro do jogo que contem todos as celulas ou seja butões do Jogo
 * , é responsavel por manipular a lógica do jogo.
 *
 */
class Table {

    cells;
    col ;
    row;

    /**
     *
     * @param row
     * @param col
     */
    constructor(row,col){
        row++;
        col++; //acerto pois não usammos a fila ou coluna 0
        this.col = col;
        this.row = row;

        this.cells = new Array(row);
        for(var i = 1 ; i<= row ; i++){
                this.cells[i] =new Array(col);
        }

        for(var i = 1 ; i <= col ; i++){
            for(var j = 0; j< row; j++){
            this.cells[i][j] =new Cell(i,j);
            }

        }
    }

    /**Função que inicia a tablet, apesar de já estar funcional faltam uns retoques , na
     * parte que inicia e põe uma referencia das celulas adjacentes de cada celula na propria celula
     *
     */
    initTable(){
        if(this.cells != undefined){

            for(let i = 1 ; i< this.col ; i++){
                for(let j = 1 ; j< this.row; j++){
                    this.setAdjCells(i,j);
                }
            }
        }
    }
    setAdjCells(i, j){

        console.log(j);
        console.log(i);

            /// REVER LOGICA DOS ADJACENTES
        if(i>=2 ) this.cells.adjCells.push(this.cells[i-1][j]);
        if(j>=2)  this.cells.adjCells.push(this.cells[i][j-1]);
        if(i< this.cells.size) this.cells.adjCells.push(this.cells[i][j+i]);
        if(j< this.cells[i].size) this.cells.adjCells.push(this.cells[i+1][j]);


    }

    /** TO DO
     * função que inicia o jogo , terá de criar um random e com esse random tera que ao calhas colocar
     * tantas minas quando definidas pelo utilizador
     */
    startGame(){

    }

    startMultiplayerGame(){

    }

    /**TO DO
     * Função que faz reset do jogo atual
     *
     */
    resetGame(){

    }

}


/**
 *
 */
class Cell {
    adjCells = [];
    col ;
    row;
    isFlagged;
    isBombed;
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
        this.adjCells = new Array(4);

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
        }else {
            //this.openAdj();
            console.log("Aberta Celula [" + this.row + "," + this.col + "]");
            this.buttonTd.setAttribute('class', 'openedCell');
            this.buttonTd.removeEventListener("mouseup",clicado);
            this.placeNumber();
        }
    }

    /**
     *
     * @returns {number}
     */
    hasBomb(){
        let bomb = 0;
        if(this.isBombed){
            bomb = 1;
        }
        return bomb;
    }

    /**
     *
     */
    openAdj(){
    for(let i = 0; i< 4 ; i++){
        if(this.adjCells[i] != undefined) {
            if (this.adjCells[i].hasBomb() == 1) {
                this.nearBombNumber = +1;
            }else{
                this.adjCells[i].openCell();
            }
        }
        }


    }

    /**
     *
     */
    placeFlag(){
        this.isFlagged = true;
        this.buttonTd.setAttribute('class','celula flagCell');
    }

    /**
     *
     */
    placeNumber(){
        if(this.nearBombNumber > 0) {
            this.buttonTd.setAttribute('class', 'openedCell numberBombs');
            this.buttonTd.innerText = String(this.nearBombNumber);
        }
    }

    /**
     *
     */
    explode(){

        this.buttonTd.setAttribute('class','openedCell bombCell');
    }
    setAdjacentCelulas(adjCelulas){
        this.adjCells.push(new this.constructor(2,3));

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