const socket = io.connect();

const ROOM = 'test';

function main() {
  let registered = false;
  socket.emit('connect mobile', { room: ROOM }, (data) => {
    if (data.registered) {
      registered = true;
    } else {
      console.log('Error: ' + data);
    }
  });

  let x = 1;
  setInterval(() => {
    if (registered) {
      socket.emit('update movement', { tiltData: x});
      console.log('update movement: ' + x);

      x++;
    }
  }, 3000);
}

main();