const socket = io();
let invert = false;
const leftTri = document.getElementsByClassName("triangle-left")[0];
const rightTri = document.getElementsByClassName("triangle-right")[0];
const upTri = document.getElementsByClassName("triangle-up")[0];
const display = document.getElementById('gamma');

// const ROOM = 'test';
function main() {
  window.addEventListener("deviceorientation", handleOrientation, true);
  // let registered = false;
  // socket.emit('connect mobile', { room: ROOM }, (data) => {
  //   if (data.registered) {
  //     registered = true;
  //   } else {
  //     console.log('Error: ' + data);
  //   }
  // });

  // request permission if on iOS 
  if (DeviceOrientationEvent.requestPermission) {
    const button = document.createElement('button');
    button.innerHTML = 'enable device orientation';
    button.onclick = DeviceOrientationEvent.requestPermission;
    document.body.appendChild(button);
  }
  const button2 = document.createElement('button');
  button2.innerHTML = 'join game';
  button2.onclick = () => {
    socket.emit('join game');
  }
  document.body.appendChild(button2);
}

main();

function invertControls() {
  invert = !invert;
}

function handleOrientation(event) {
  //gamma is accelleration as gamma increases
  //beta is lef
  let out;
  
  if (!invert) {
    out = {
      sid: socket.id,
      turn: event.beta,
      speed: event.gamma
    };
  } else {
    out = {
      sid: socket.id,
      turn: -event.beta,
      speed: event.gamma
    };
  }

  socket.emit("phone", out);
  display.innerHTML = event.beta;
  // const num = 255 - Math.floor((Math.floor(out.turn) / 50) * 255);
  // const num2 = Math.floor((50 + Math.floor(out.speed) / 50) * 255);
  //resting it is 0
  // very forward it is 50+
  // leftTri.style.borderLeft =
  //   "50px solid rgb(" + -num + ", " + -num + ", " + -num + ")";
  // rightTri.style.borderLeft =
  //   "50px solid rgb(" + num + ", " + num + ", " + num + ")";
  // upTri.style.borderLeft =
  //   "50px solid rgb(" + num2 + ", " + num2 + ", " + num2 + ")";

  // Do stuff with the new orientation data
}
