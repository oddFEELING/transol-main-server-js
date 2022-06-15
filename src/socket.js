const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const http = require('http');

const App = express();
App.use(cors());
const server = http.createServer(App);
const io = socketIO(server, { cors: { origin: '*' } });

App.get('/', (req, res) => {
  res.status(200).send('Test sockets');
});

server.listen(3000, (error) => {
  if (error) return console.log('Failed to connect');
  console.log('Connected');
});

io.on('connection', (socket) => {
  console.log(`new conncetion: ${socket.id}`);
  socket.emit('connection', { message: 'Connection successful' });
});
