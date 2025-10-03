const RADUIS = 20;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 绘制背景颜色，灰
ctx.fillStyle = "#cccccc"
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 设置系统关键信息，长宽，以及计算单元格间距
const width = canvas.width - 40;
const height = canvas.height - 40;
const cSpace = Math.min(width / (colSize - 1), height / (rowSize - 1));

// 绘制列线
ctx.fillStyle = "black";
for (let i = 0; i <= colSize; i++)
  ctx.fillRect(RADUIS + i * cSpace, RADUIS, 1, (rowSize - 1) * cSpace);
// 绘制行线
for (let i = 0; i <= rowSize; i++)
  ctx.fillRect(RADUIS, RADUIS + i * cSpace, (colSize - 1) * cSpace, 1);

let player = 1;
const playerGroup = ["undefined", "黑棋", "白棋"];
const playerColor = ["", "black", "white"];
let chessCount = [0, 0, 0];

canvas.addEventListener("click", function (event) {
  let finalY = event.layerY - RADUIS;
  let finalX = event.layerX - RADUIS;
  let row = Math.round(finalY / cSpace);
  let col = Math.round(finalX / cSpace);
  const currStatu = addChesspiece(row, col, player);
  if (currStatu == ChessStatus.UNLOGIC) {
    return
  }
  chessCount[player]++;
  ctx.beginPath();
  ctx.arc(col * cSpace + RADUIS, row * cSpace + RADUIS, RADUIS, 0, 2 * Math.PI);
  ctx.fill();
  document.getElementById("blackCount").innerText = chessCount[1];
  document.getElementById("whiteCount").innerText = chessCount[2];

  if (currStatu == ChessStatus.WIN) {
    console.log("Game Over");
    const winner = player;
    setTimeout(() => alert(`${playerGroup[winner]} win!!!`));
  }
  if (player == 1)
    player = 2;
  else
    player = 1;
  ctx.fillStyle = playerColor[player];
  document.getElementById("player").innerText = playerGroup[player];
});
