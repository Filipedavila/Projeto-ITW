class Table {
    cells = [];
    col ;
    row;
    constructor(col,row,typeOfGame, diffculty){
        this.col = col;
        this.row = row;

    for(let i = 0 ; i< col ; i++){
        for(let j = 0 ; j< row; j++){
            this.cells[i][j] = new Cell();
        }

    }
    }

    setAdjCells(celle, i, j){
        let adj = [];
        if(this.cells[i-1][j] !== 'undefined') adj.push(this.cells[i-1][j]);
        if(this.cells[i-1][j] !== 'undefined') adj.push(this.cells[i][j-1]);
        if(this.cells[i-1][j] !== 'undefined') adj.push(this.cells[i][j+i]);
        if(this.cells[i-1][j] !== 'undefined') adj.push(this.cells[i+1][j]);
        celle.setAdjacentCells(adj);

    }
    initTable(){
    if(!this.cells.empty()){
        let adjCells = [];
        for(let i = 0 ; i< this.col ; i++){
            for(let j = 0 ; j< this.row; j++){
                adjCells = this.setAdjCells(this.cells[i][j],i,j);
            }
        }
    }
    }


    startGame(){


    }

    randomBomb(){

    }
   //Abrir celula
    // Caso o jogo esteja em funcionamento
    //  quer as colunas e as linhas sejam validas
    // faz com que a cell mude o estado para aberta chama a celula em questão
    openCell(col,row){
        if(this.cells[col][row] == 'undefined'){
            console.log("celula invalida");
        }else{
            this.cells[col][row].openCell();
        }


    }

    flagCell(col,row){


    }

    getCellStatus(col,row){

    }

    getPoints(){


    }    



}