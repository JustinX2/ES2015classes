//process for making connect 4 game includes the following:
//1.Make Board
//2.Make HTML Board
//3.Find Spot for Column
//4.Place In Table
//5.End Game
//6. Handle Click Event
//7. Check for Win


//Game property
class Game{
    construtor(height=6,width=7){
        this.height=height;
        this.width=width;
        this.currentPlayer=1;
        this.board=[];
        this.gameOver=false;
        this.makeBoard();
        this.makeHtmlBoard();
        this.makeHtmlBoard();
    }
}

//makeboard
makeBoard(){
    for(let y=0;y<this.height;y++){
        this.board.push(Array.from({length:this.width}));
    }
}

//makeHtmlBoard

makeHtmlBoard(){
    const board = document.getElementById('board');
    board.innerHTML='';

    const top=document.createElement('tr');
    top.setAttribute('id','column-top');
    top.addEventListener('click', this.handleClick.bind(this));

    for(let x=0;x<this.width;x++){
        const headCell=document.createElement('td');
        headCell.setAttribute('id',x);
        top.append(headCell);
    }
}

board.append(top);

//main board

for (let y=0; y<this.height;y++){
    const row=document.createElement('tr');

    for (let x=0;x<this.width;x++){
        const cell=document.createElement('td');
        cell.setAttribute('id',`${y}-${x}`);
        row.append(cell);
    }

    board.append(row);
}

//findSpotforCol(x)

findSpotforCol(x) {
    for (let y=this.height-1;y>=0;y--){
        if(!this.board[y][x]){
            return y;
        }
    }
    return null;
}

//place in table

placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${this.currentPlayer}`);
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  //end game

  endGame(msg) {
    alert(msg);
    this.gameOver = true;
  }

  //handle click

  handleClick(evt) {
    if (this.gameOver) return;
    const x = +evt.target.id;
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

  // place piece in board
    this.board[y][x] = this.currentPlayer;
    this.placeInTable(y, x);

//check for win
if (this.checkForWin()) {
    return this.endGame(`Player ${this.currentPlayer} won!`);
  }

//check for tie
if (this.board.every(row => row.every(cell => cell))) {
    return this.endGame('Tie!');
  }

//switch player
this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
}

// Check four cells to see if they're all color of current player

checkForWin() {
    const _win = cells =>
      cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currentPlayer
      );

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // horizontal win 
        if (_win([[y, x], [y, x + 1], [y, x + 2], [y, x + 3]])) {
          return true;
        }

        // vertical win
        if (_win([[y, x], [y + 1, x], [y + 2, x], [y + 3, x]])) {
          return true;
        }

        // right diagonal win
        if (_win([[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]])) {
          return true;
        }

        // left diagonal win
        if (_win([[y, x], [y - 1, x + 1], [y - 2, x + 2], [y - 3, x + 3]])) {
          return true;
        }
      }
    }
  }

// Create a new game
new Game();
