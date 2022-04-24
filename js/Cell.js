class Cell {
     adjCells =[];
     buttonTd;
constructor(col,row,adjCells,isBomb,isFlag,isOpen){
this.colN = col;
this.rowN = row;
this.adjCells = adjCells;
this.isBomb = isBomb;
this.isFlag = isFlag;
this.isOpen= isOpen;
this.number ;
this.buttonTd = null;
}

  openCell() {
    if(this.isBomb){

    }
    
}
    setTdElement(cellButton){
    this.buttonTd = cellButton
    }
    openAdj(){
   
}
    setAdjacentCells(adj){
    this.adjCells = adj;
    }

    isOpen(){

}


    
}