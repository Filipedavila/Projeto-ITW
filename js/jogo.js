
const openedCellSound = new Audio('../audio/open.mp3');

var table;

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
        celula.addEventListener("mouseup",function(e){
            clicado(e);    },false);
       table.cells[i][j].buttonTd = celula;
        linha.appendChild(celula);
        
        }
    table.initTable();
        
  tabela.appendChild(linha);
}

localJogo.appendChild(tabela);

}
function startGame(){

}

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



function clicado(e){
    openedCellSound.play();
     // manda abrir o opencell e espera retorno, dependendo do retorno ira fazer uma acção no jogo
    var t = e.target;

   let id = t.id;
   let row = id.charAt(0);
   let col = id.charAt(1);
console.log(e.button )

    if(e.button == 0) {
        table.cells[row][col].placeNumber();
    }
    if(e.button ==2){
        table.cells[row][col].placeFlag();
    }
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();


}

class Table {

    cells;
    col ;
    row;
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



}



class Cell {
    adjCells = [];
    col ;
    row;
    isFlagged;
    isBombed;
    buttonTd;
    nearBombNumber;

    constructor(row,col){
        this.row = Number(row);
        this.col = Number(col);
        this.buttonTd = null;
        this.nearBombNumber =0;
        this.adjCells = new Array(4);

    }
    setTdElement(cellButton){
        this.buttonTd = cellButton;
    }

    openCell(){
        if(this.isBombed){
            this.explode();
        }else {
            this.openAdj();
            console.log("Aberta Celula [" + this.row + "," + this.col + "]");
            this.buttonTd.setAttribute('class', 'openedCell');
            this.placeNumber();
        }
        }
    hasBomb(){
        let bomb = 0;
        if(this.isBombed){
            bomb = 1;
        }
        return bomb;
    }
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
    placeFlag(){
        this.isFlagged = true;
        this.buttonTd.setAttribute('class','celula flagCell');
    }

    placeNumber(){
        if(this.nearBombNumber > 0) {
            this.buttonTd.setAttribute('class', 'openedCell numberBombs');
            this.buttonTd.innerText = String(this.nearBombNumber);
        }
    }

    explode(){

        this.buttonTd.setAttribute('class','openedCell bombCell');
    }
    setAdjacentCelulas(adjCelulas){
        this.adjCells.push(new this.constructor(2,3));

    }

}


var message ="";
function clickIE() {if (document.all) {(message);return false;}}
function clickNS(e) {if
(document.layers||(document.getElementById&&!document.all)) {
    if (e.which==2||e.which==3) {(message);return false;}}}
if (document.layers)
{document.captureEvents(Event.MOUSEDOWN);document.onmousedown=clickNS;}
else{document.onmouseup=clickNS;document.oncontextmenu=clickIE;}
document.oncontextmenu=new Function("return false")