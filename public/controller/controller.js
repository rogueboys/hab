const socket = io();
let invert = false;
window.addEventListener("deviceorientation", handleOrientation, true);
const leftTri = document.getElementsByClassName("triangle-left")[0];
const rightTri = document.getElementsByClassName("triangle-right")[0];
const upTri = document.getElementsByClassName("triangle-up")[0];

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
  leftTri.style.borderLeft = "50px solid # ";
  rightTri.style.borderLeft = "50px solid # ";
  upTri.style.borderLeft = "50px solid # ";

  // Do stuff with the new orientation data
}
