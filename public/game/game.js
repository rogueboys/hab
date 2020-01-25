const socket = io.connect();

const ROOM = 'test';
const players = {};

socket.emit('new room', { room: ROOM });

socket.on('update position', (sid, data) => {
    console.log(sid + ' update position: ' + data.tiltData);
});

socket.on('add user', (sid, data) => {
    players[sid] = { data: data };
    console.log('Number of players: ' + Object.keys(players).length);
})