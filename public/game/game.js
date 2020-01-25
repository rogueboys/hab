const socket = io.connect();

const ROOM = 'test';

socket.emit('new room', { room: ROOM });

socket.on('update position', (data) => {
    console.log('Update position: ' + data);
});
