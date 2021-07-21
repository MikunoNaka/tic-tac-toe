const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '../../build')));

io.on('connection', (socket) => {
  socket.on('update-remote-board', (board) => {
    io.emit('update-client-board', board)
  })
});

// Start the server
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
