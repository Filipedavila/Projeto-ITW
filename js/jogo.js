
const openedCellSound = new Audio('../audio/open.mp3');

var table

function init(colunas = 8, linhas = 8){
     this.table  =  new Table(colunas,linhas);
console.log("criou table");
var localJogo = document.getElementById("table");

// criar table
var tabela = document.createElement('table');
tabela.setAttribute('class' ,'gameTable');
tabela.setAttribute('alt','Janela do Jogo');

// faz cada linha
for(i=0;i<linhas; i++ ){
 var linha =document.createElement('tr');
 linha.setAttribute('class' ,'gameRow');

    //Criar Celulas do jogo
    for(j = 1 ; j < colunas;j++){
        var celula = document.createElement('td');
        let row = String(i);
        let col = String(j);
        let id = row + col ;
        celula.setAttribute('class','celula');
        celula.setAttribute('id', id);
       celula.addEventListener("click",function(e){ clicado(e) },false)
       table.cells[i][j].buttonTd = celula;
        linha.appendChild(celula);
        
        } 
        
  tabela.appendChild(linha);
}

localJogo.appendChild(tabela);

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
          celula2.addEventListener("click",function(e){ clicado(e.id);    },false);
          
          linha2.appendChild(celula2);
          
          } 
          
    tabela2.appendChild(linha2);
  }
  localJogo2.appendChild(tabela2);
  }



function clicado(e){
     // manda abrir o opencell e espera retorno, dependendo do retorno ira fazer uma acção no jogo
    var t = e.target;

   let id = t.id;
   let row = id.charAt(0);
   let col = id.charAt(1);
console.log(col);
    openedCellSound.play();
    table.cells[row][col].openCell();




}

class Table {

    cells;
    col ;
    row;
    constructor(row,col){
        this.col = col;
        this.row = row;

        this.cells = new Array(row);
        for(var i = 0 ; i< row ; i++){
                this.cells[i] =new Array(col);
        }

        for(var i = 0 ; i< col ; i++){
            for(var j = 0; j< row; j++){
            this.cells[i][j] =new Cell();
            }

        }
    }


}






















class Cell {

    col ;
    row;
    buttonTd;

    constructor(){
        this.buttonTd = null;


    }
    setTdElement(cellButton){
        this.buttonTd = cellButton;
    }

    openCell(){
        this.buttonTd.setAttribute(  'class','openedCell');
    }










}