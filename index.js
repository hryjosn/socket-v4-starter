const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

io.on('connection', (socket) => {

  socket.on('join', (message) => {
    const { roomID } = message
    socket.join(roomID);
  
  });
  socket.on('message', (message) => {    
    const { roomID } = message
    io.to(roomID).emit('message', { ...message, socketId: socket.id });
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});