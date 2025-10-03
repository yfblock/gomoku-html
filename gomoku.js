const rowSize = 15;
const colSize = 15;
const chessBoard = Array(rowSize).fill().map(() => Array(colSize).fill(0));
const ChessStatus = Object.freeze({
  DONE: Symbol('done'),
  UNLOGIC: Symbol('unlogic'),
  WIN: Symbol('win')
})

function countDir(row, col, drow, dcol, player) {
  let count = 0;
  while (true) {
    row += drow;
    col += dcol;
    if (row < 0 || col < 0 || row >= rowSize || col >= colSize)
      break;
    if (chessBoard[row][col] != player)
      break;
    count++;
  }
  return count;
}


function addChesspiece(row, col, player) {
  if (chessBoard[row][col] != 0)
    return ChessStatus.UNLOGIC;
  chessBoard[row][col] = player;
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
  ];
  for (let x of directions) {
    if (countDir(row, col, x[0], x[1], player) + countDir(row, col, -x[0], -x[1], player) + 1 >= 5)
      return ChessStatus.WIN;
  }
  return ChessStatus.DONE;
}

