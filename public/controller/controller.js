const socket = io();
let invert = false;
window.addEventListener("deviceorientation", handleOrientation, true);
const leftTri = document.getElementsByClassName("triangle-left")[0];
const rightTri = document.getElementsByClassName("triangle-right")[0];
const upTri = document.getElementsByClassName("triangle-up")[0];

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
  // just testing
  setInterval(() => {
    if (registered) {
      socket.emit('update movement', { tiltData: x});
      console.log('update movement: ' + x);

      x++;
    }
  }, 3000);
}

main();

function invertControls() {
  invert = !invert;
}

function handleOrientation(event) {
  //gamma is accelleration as gamma increases
  //beta is lef
  if (!invert) {
    const out = {
      turn: event.beta,
      speed: event.gamma
    };
    socket.emit("phone", out);
  } else {
    const out = {
      turn: -event.beta,
      speed: event.gamma
    };
    socket.emit("phone", out);
  }
  const num = 255 - Math.floor((Math.floor(out.turn) / 50) * 255);
  const num2 = Math.floor((50 + Math.floor(out.speed) / 50) * 255);
  //resting it is 0
  // very forward it is 50+
  leftTri.style.borderLeft =
    "50px solid rgb(" + -num + ", " + -num + ", " + -num + ")";
  rightTri.style.borderLeft =
    "50px solid rgb(" + num + ", " + num + ", " + num + ")";
  upTri.style.borderLeft =
    "50px solid rgb(" + num2 + ", " + num2 + ", " + num2 + ")";

  // Do stuff with the new orientation data
}
