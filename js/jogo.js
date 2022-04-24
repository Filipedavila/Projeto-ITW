const openedCellSound = new Audio('../audio/open.mp3');
var table ;
function init(colunas = 8, linhas = 8){

var localJogo = document.getElementById("table");

var tabela = document.createElement('table');
tabela.setAttribute('class' ,'gameTable');
tabela.setAttribute('alt','Janela do Jogo');

// faz cada linha
for(i=1;i<=linhas; i++ ){
 var linha =document.createElement('tr');
 linha.setAttribute('class' ,'gameRow');
    //faz cada celula
    for(j = 1 ; j <= colunas;j++){
        var celula = document.createElement('td');
        
        celula.setAttribute('class','celula');
        celula.setAttribute('id', i*10+j);
        celula.addEventListener("click",function(e){ clicado(e.id) },false)
        table.cells[linha][colunas].setTdElement(celula);
        linha.appendChild(celula);
        
        } 
        
  tabela.appendChild(linha);
}

localJogo.appendChild(tabela);
table = new Table(colunas,linhas)
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
  for(i=1;i<=linhas; i++ ){
   var linha2 =document.createElement('tr');
   linha2.setAttribute('class' ,'gameRow');
   linha2.setAttribute('alt','Linha ' + i);
      //faz cada celula
      for(j = 1 ; j <= colunas;j++){
          var celula2 = document.createElement('td');
          
          celula2.setAttribute('class','celula');
          celula2.setAttribute('id',  i*10+j);
          celula2.setAttribute('alt','Celula nº ' + i*10+j);
          celula2.addEventListener("click",function(e){ clicado(e.id) },false);
          
          linha2.appendChild(celula2);
          
          } 
          
    tabela2.appendChild(linha2);
  }
  localJogo2.appendChild(tabela2);
  }



function clicado(id){
     // manda abrir o opencell e espera retorno, dependendo do retorno ira fazer uma acção no jogo
    openedCellSound.play();
    let stringID = id.toString();
    let col = Number(stringID.charAt(0));
    let row = Number(stringID.charAt(1));
    table.cells[row][col].openCell();


}