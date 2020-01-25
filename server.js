const PORT = 8080;
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const rooms = {};

app.use(express.static('public'));
server.listen(PORT, () => {
  console.log('Server listening at port: ', PORT);
});

io.on('connection', (socket) => {
  console.log('A client connected: ' + socket.id);

  socket.on("new room", (data) => {
    rooms[data.room] = { 
      roomSocket: socket, 
      mobileSockets: [] 
    };
    console.log('Created a new room: ' + data.room);
  });

  socket.on("connect mobile", (data, verify) => {
    if (data.room in rooms) {
      rooms[data.room].mobileSockets.push(socket);
      socket.roomId = data.room;
      verify({registered: true});
      rooms[data.room].roomSocket.emit('add user', socket.id, data);
      console.log('Added user for mobile');
    } else {
      verify({ registered: false, error: "No live desktop connection found" });
      console.log('Failed to register');
    }
  });
  
  socket.on("update movement", (data) => {
    if (socket.roomId && socket.roomId in rooms) {
      rooms[socket.roomId].roomSocket.emit('update position', socket.id, data);
      console.log('Updated movement! ' + data.tiltData);
    }
  });
});
