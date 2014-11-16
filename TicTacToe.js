var board;

Board = function(canvasId){
  this.canvas = document.getElementById(canvasId);
  this.context = this.canvas.getContext('2d');
};

Board.prototype.makePlay = function(e){
  var cellCoordinates = this.getCellAddress(e.x, e.y);
  console.log("Cell coordinates", cellCoordinates);
  this.boardState[cellCoordinates.x][cellCoordinates.y] = this.currentPlayer;
  if(this.currentPlayer == 1){
    this.currentPlayer = 2;
  } else {
    this.currentPlayer = 1;
  }
  this.drawState();
};

Board.prototype.getCellAddress = function(x, y){
  var row = this.coordOnAxis(y);
  var column = this.coordOnAxis(x);
  return {x: row, y: column};
};

Board.prototype.coordOnAxis = function(point){
  if(point <= this.cellSize){
    return 0;
  }else if(point <= this.cellSize * 2){
    return 1;
  }
  return 2;
};

Board.prototype.drawX = function(x,y){
  this.context.beginPath();
  this.context.moveTo(x * this.cellSize, y * this.cellSize);
  this.context.lineTo(x * this.cellSize + this.cellSize, y * this.cellSize + this.cellSize);
  this.context.stroke();

  this.context.beginPath();
  this.context.moveTo(x * this.cellSize + this.cellSize, y * this.cellSize);
  this.context.lineTo(x * this.cellSize, y * this.cellSize + this.cellSize);
  this.context.stroke();
};

Board.prototype.drawO = function(x,y){
  this.context.beginPath();
  this.context.arc(x * this.cellSize + (this.cellSize / 2), y*this.cellSize + this.cellSize/2, this.cellSize/2, 0, 360, false);
  this.context.stroke();
}
Board.prototype.clear = function(){
  this.context.clearRect(0,0,this.boardSize, this.boardSize);
};

Board.prototype.reset = function(){
  this.clear();
  this.boardState = [[0,0,0],[0,0,0],[0,0,0]];
  this.currentPlayer = 1;
};

Board.prototype.drawState = function(){
  this.clear();
  this.boardState.forEach(function(row, rowIndex, board){
    row.forEach(function(value, colIndex){
      if(value == 1){
        this.drawX(colIndex, rowIndex);
      } else if(value == 2){
        this.drawO(colIndex, rowIndex);
      }
    }, this);
  }, this);
};

Board.prototype.initialize = function(){
  var self = this;
  this.boardSize = 400;
  this.canvas.width = this.boardSize;
  this.canvas.height = this.boardSize;
  this.cellSize = this.boardSize / 3;
  this.canvas.onclick = function(e){
    self.makePlay(e);
  };
  this.reset();
};

window.onload = function(){
  board = new Board("gameboard");
  board.initialize();
};
