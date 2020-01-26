
const socket = io();

let allPlayers;
let players;
let removedPlayers;

let started;

function setup() {
  createCanvas(windowWidth, windowHeight);
  started = false;

  const startButton = document.createElement('button');
  startButton.innerHTML = 'Start game';
  startButton.onclick = () => {
    document.body.removeChild(startButton);
    started = true;
  }
  document.body.prepend(startButton);

  const p1 = new Player(10, 10, 1);
  const p2 = new Player(10, 10, 2);
  const p3 = new Player(10, 10, 3);
  const p4 = new Player(10, 10, 4);

  allPlayers = [p1, p2, p3, p4];
  players = {};
  removedPlayers = [];

  
  socket.on('update position', (data) => {
    if (data.player in players && !removedPlayers.includes(data.player)) {
      players[data.player].turnBoi(data.turn / 45);
    } else {
      players[data.player] = allPlayers[data.player]
    }
  });
}

function draw() {
  background(0);

  for (let p in players) {
    if (removedPlayers.includes(p)) {
      continue;
    }
    let player = players[p]
    if (started) {
      checkCollisions()
      player.update();
    }
    player.draw();
  }
}

function checkCollisions() {
  for (let p1 in players) {
    if (removedPlayers.includes(p1)) {
      continue;
    }
    for (let p2 in players) {
      // allow players to collide with selves (similar to slither.io)
      // i think this makes the most sense since accelerometer controls are pretty jittery
      if (p1 !== p2 && !removedPlayers.includes(p2) && players[p1].collides(players[p2])) {
        // p2 hits the tail of p1
        console.log(p2 + ' collided with ' + p1);
        removedPlayers.push(p2);
      }
    }
  }
}

class Player {

  constructor(turn, speed, playNum) {
    this.turn = turn;
    this.speed = speed;
    this.playNum = playNum;
    this.radius = 10;
    this.history = [];

    // how often to record position in history for drawing and collision checking
    // reduces time spent drawing, etc
    this.historyFreq = 5; 
    this.historyIdx = 0;

    switch (playNum) {
      case 1:
        this.pos = createVector(windowWidth / 10, windowHeight / 10);
        this.direction = 0;
        this.color = color(255, 0, 0);
        break;
      case 2:
        this.pos = createVector(
          windowWidth - windowWidth / 10,
          windowHeight / 10
        );
        this.direction = 180;
        this.color = color(255, 184, 255);
        break;
      case 3:
        this.pos = createVector(
          windowWidth / 10,
          windowHeight - windowHeight / 10
        );
        this.direction = 0;
        this.color = color(0, 255, 255);
        break;
      case 4:
        this.pos = createVector(
          windowWidth - windowWidth / 10,
          windowHeight - windowHeight / 10
        );
        this.direction = 180;
        this.color = color(255, 184, 82);
        break;
    }
    this.speed = 0.5;
    this.vel = p5.Vector.fromAngle(radians(this.direction));
    this.vel.mult(this.speed);
  }

  draw() {
    noStroke();
    fill(this.color);
    for (let i = 0; i < this.history.length; i++) {
      ellipse(this.history[i].x, this.history[i].y, this.radius * 2, this.radius * 2);
    }
    ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
  }

  collides(otherPlayer) {
    return this.history.some((hPos) => {
      return dist(hPos.x, hPos.y, otherPlayer.pos.x, otherPlayer.pos.y) < this.radius + otherPlayer.radius;
    });
  }
  
  update() {
    this.vel = p5.Vector.fromAngle(radians(this.direction));
    this.pos.add(this.vel);
    if (this.historyIdx % this.historyFreq === 0) {
      this.history.push(this.pos.copy());
      if (this.history.length >= 30) {
        this.history.shift();
      }
    }
    this.historyIdx++;
    if (this.pos.x > windowWidth) {
      this.pos.x = Math.abs(this.pos.x % windowWidth);
    }
    else if (this.pos.x < 0) {
      this.pos.x = windowWidth + this.pos.x;
    }
    
    if (this.pos.y > windowHeight) {
      this.pos.y = Math.abs(this.pos.y % windowHeight);
    }
    else if (this.pos.y < 0) {
      this.pos.y = windowHeight + this.pos.y;
    }
  }
  
  turnBoi(deg) {
    this.direction += deg;
  }
}
