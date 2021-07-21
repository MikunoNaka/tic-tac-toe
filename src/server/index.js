const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

const allEqual = (arr) =>
  arr.includes(2) ? false : arr.every(i => i === arr[0])

const getRow = (board, r) => board.slice(r * 3, (r * 3) + 3);
const getRows = (board, r = 0) =>
  r <= 2 ? [getRow(board, r)].concat(getRows(board, r+1)) : getRow(board, r)

const getCol = (board, c) => board.map((i) => i[c])
const getCols = (rows, c = 0) =>
  c < 2 ? [getCol(rows, c)].concat(getCols(rows, c+1)) : [getCol(rows, c)]

const getLeftDiagonal = (board, i = 0) =>
  i < 3 ? [getRow(board, i)[i]].concat(getLeftDiagonal(board, i+1)) : [];

const getRightDiagonal = (board, i = 2) =>
  i >= 0 ? [getRow(board, 2-i)[i]].concat(getRightDiagonal(board, i-1)) : [];

// const endGame = (winner: number) => {
//   const gameWinner = winner < 2 ? (winner === 1 ? "X" : "O") : "Draw";
//   props.setMessage(`WINNER: ${gameWinner}`);
//   props.setShowMessage(true);
//   gameWinner === "Draw" || (gameWinner === "X"
//     ? props.setScoreX(props.scoreX + 1)
//     : props.setScoreO(props.scoreO + 1));
//   setBoard([2,2,2,2,2,2,2,2,2]);
//   winner < 2 && props.setTurn(winner); // set turn to prev. winner
// }
// 
// useEffect(() => {
//   if (board.includes(0) || board.includes(1)) {
//     const rows = getRows();
//     (rows.some((i: number[]) => allEqual(i))
//       || getCols(rows).some((i: number[]) => allEqual(i))
//       || [getLeftDiagonal(), getRightDiagonal()].some((i) => allEqual(i))
//     ) ? endGame(turn === 0 ? 1 : 0) : (board.includes(2) || endGame(2));
//   }
// });

io.on('connection', (socket) => {
  socket.on('update-remote-board', (board) => {
    if (board.includes(0) || board.includes(1)) {
      const rows = getRows(board);
      (rows.some((i) => allEqual(i))
        || getCols(rows).some((i) => allEqual(i))
        || [getLeftDiagonal(board), getRightDiagonal(board)].some((i) => allEqual(i))
      ) ? console.log("win") : (board.includes(2) || console.log("maybe draw"))
      // ? endGame(turn === 0 ? 1 : 0) : (board.includes(2) || endGame(2));
    }
    io.emit('update-client-board', board)
  })
});

// serve static front end
app.use(express.static(path.join(__dirname, '../../build')));

// Start the server
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});


/*
 *   const allEqual = (arr: number[]) =>
    arr.includes(2) ? false : arr.every(i => i === arr[0])

  const getRow = (r: number) => board.slice(r * 3, (r * 3) + 3);
  const getRows: any = (r: number = 0) =>
    r <= 2 ? [getRow(r)].concat(getRows(r+1)) : getRow(r)

  const getCol = (arr: number[][], c: number) => arr.map((i: any) => i[c])
  const getCols: any = (rows: number[][], c: number = 0) =>
    c < 2 ? [getCol(rows, c)].concat(getCols(rows, c+1)) : [getCol(rows, c)]

  const getLeftDiagonal: any = (i: number = 0) =>
    i < 3 ? [getRow(i)[i]].concat(getLeftDiagonal(i+1)) : [];

  const getRightDiagonal: any = (i: number = 2) =>
    i >= 0 ? [getRow(2-i)[i]].concat(getRightDiagonal(i-1)) : [];

  const endGame = (winner: number) => {
    const gameWinner = winner < 2 ? (winner === 1 ? "X" : "O") : "Draw";
    props.setMessage(`WINNER: ${gameWinner}`);
    props.setShowMessage(true);
    gameWinner === "Draw" || (gameWinner === "X"
      ? props.setScoreX(props.scoreX + 1)
      : props.setScoreO(props.scoreO + 1));
    setBoard([2,2,2,2,2,2,2,2,2]);
    winner < 2 && props.setTurn(winner); // set turn to prev. winner
  }

  useEffect(() => {
    if (board.includes(0) || board.includes(1)) {
      const rows = getRows();
      (rows.some((i: number[]) => allEqual(i))
        || getCols(rows).some((i: number[]) => allEqual(i))
        || [getLeftDiagonal(), getRightDiagonal()].some((i) => allEqual(i))
      ) ? endGame(turn === 0 ? 1 : 0) : (board.includes(2) || endGame(2));
    }
  });
  */
