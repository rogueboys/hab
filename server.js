const PORT = 8080;

const fs = require('fs');
const privateKey = fs.readFileSync('key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const express = require('express');
const app = express();
const server = require('https').createServer(credentials, app);
const io = require('socket.io').listen(server);

const rooms = {};

app.use(express.static('public'));
server.listen(PORT, () => {
  console.log('Server listening at port: ', PORT);
});

// let colors = [[255, 0, 0], [255, 184, 255], [0, 255, 255], [255, 184, 82]];
let players = [];

io.on('connection', (socket) => {
  console.log('A client connected: ' + socket.id);

  // socket.on("new room", (data) => {
  //   rooms[data.room] = { 
  //     roomSocket: socket, 
  //     mobileSockets: [] 
  //   };
  //   console.log('Created a new room: ' + data.room);
  // });

  socket.on('join game', () => {
    players.push(socket.id);
  })

  socket.on("phone", (data) => {
    socket.broadcast.emit("update position", {
      ...data,
      player: players.indexOf(socket.id)
    });
  });

  // socket.on("connect mobile", (data, verify) => {
  //   if (data.room in rooms) {
  //     rooms[data.room].mobilesockets.push(socket);
  //     socket.roomid = data.room;
  //     verify({ registered: true });
  //     rooms[data.room].roomsocket.emit('add user', socket.id, data);
  //     console.log('added user for mobile');
  //   } else {
  //     verify({ registered: false, error: "no live desktop connection found" });
  //     console.log('failed to register');
  //   }
  // });

  // socket.on("update movement", (data) => {
  //   if (socket.roomId && socket.roomId in rooms) {
  //     rooms[socket.roomId].roomSocket.emit('update position', socket.id, data);
  //     console.log('Updated movement! ' + data.tiltData);
  //   }
  // });
});
