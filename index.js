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
  socket.on('chat message', (message) => {
    logger.info('new message', message);
    const { roomID } = message
    io.to(roomID).emit('new message', { ...message, socketId: socket.id });
    
  });
  socket.on('join_room', (message) => {
    logger.info('join_room', message);
    const { roomID } = message
    socket.join(roomID);
    io.to(roomID).emit('new message', { ...message, socketId: socket.id });
  });
  socket.on('message', (message) => {
    logger.info('join_room', message);
    const { roomID } = message
    io.to(roomID).emit('new message', { ...message, socketId: socket.id });
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});