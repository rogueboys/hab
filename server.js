const PORT = 8080;
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static('public'));
server.listen(port, () => {
  console.log('Server listening at port: ', port);
});

io.on('connection', () => {
  console.log('A client connected: ' + socket.id);
});