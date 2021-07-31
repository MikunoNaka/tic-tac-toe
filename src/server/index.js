const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');

// const io = require('socket.io')(http);
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:5000", "http://localhost:3000"],
    "Access-Control-Allow-Origin": "*",
    methods: ["GET", "POST"]
  }
});

// check if room exists
const checkCode = (code) => {
  const connectedSockets = [];
  io.sockets.sockets.forEach(
    (i) => connectedSockets.push(i)
  );

  // returns true if room exists
  return connectedSockets.some(
    (i) => Array.from(i.rooms)[1] === code
  );
}

// generate new room code
// also checks for duplicates
const getCode = (code = `${Math.floor(1000 + Math.random() * 9000)}`) =>
  checkCode(code) ? getCode : code;

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

const getScore = (winner, scoreX, scoreO, board) => ({
  winner: winner < 2 
    ? (winner === 0 ? 'O' : 'X') 
    : (board.includes(2) ? undefined : 'Draw'),
  scoreX: winner === 1 ? scoreX + 1 : scoreX,
  scoreO: winner === 0 ? scoreO + 1 : scoreO
})

io.on('connection', (socket) => {
  socket.on('host', () => {
    const code = getCode();
    socket.join(code);
    io.to(code).emit('broadcast code', code);
  });

  socket.on('join', (code) => {
    if (checkCode(code)) {
      socket.join(code);
      io.to(code).emit('player joined');
    } else {
      // error if room doesn't exist
      socket.emit('join failed')
    }
  });

  socket.on('update-remote-data', (data) => {
    const room = Array.from(socket.rooms)[1]

    if (data.board.includes(0) || data.board.includes(1)) {
      const rows = getRows(data.board);
      const winner = (rows.some((i) => allEqual(i))
        || getCols(rows).some((i) => allEqual(i))
        || [getLeftDiagonal(data.board), getRightDiagonal(data.board)].some((i) => allEqual(i))
      ) ? data.turn : 2;

      const score = getScore(winner, data.scoreX, data.scoreO, data.board)
      io.to(room).emit('update-client-data', {
        board: data.board, 
        turn: score.winner ? data.turn : (data.turn === 0 ? 1 : 0),
        score: score
      });
      
      score.winner && io.to(room).emit('update-winner', score)
    };
  });
});

// serve static front end
app.use(express.static(path.join(__dirname, '../../build')));

// Start the server
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
