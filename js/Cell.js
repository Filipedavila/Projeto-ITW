class Cell {
     adjCells =[];
     buttonTd;
     col ;
     row;

constructor(col,row){
this.col = col;
this.row = row;
this.buttonTd = null;
this.adjCells = null;
}

  openCell() {



    
}
    setTdElement(cellButton){
    this.buttonTd = cellButton
    }

   

    setAdjacentCells(adj){
    this.adjCells = adj;
    }




    
}