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
        celula.addEventListener("click",clicado(i,j));
        
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
          celula.addEventListener("click",clicado(i,j));
          
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
          celula2.addEventListener("click",clicado(i,j));
          
          linha2.appendChild(celula2);
          
          } 
          
    tabela2.appendChild(linha2);
  }
  localJogo2.appendChild(tabela2);
  }



function clicado(linha,coluna){
 console.log("clicado a celula linha" + linha + "e a coluna" + coluna);

}