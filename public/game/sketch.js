let players;
const socket = io();

function setup() {
  createCanvas(windowWidth, windowHeight);
 
  const p1 = new Player(10, 10, 1);
  const p2 = new Player(10, 10, 2);
  const p3 = new Player(10, 10, 3);
  const p4 = new Player(10, 10, 4);
  
  players = [p1, p2, p3, p4];
  
  socket.on('update position', (data) => {
    p1.turnBoi(data.turn / 45);
  });
}

function draw() {
  background(0);

  for (let p of players) {
    p.update();
    p.draw();
  }
}

class Player {

  constructor(turn, speed, playNum) {
    this.turn = turn;
    this.speed = speed;
    this.playNum = playNum;
    this.radius = 10;
    this.history = [];

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
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    noFill();
    stroke(255);
    beginShape();
    for (var i = 0; i < this.history.length; i++) {
      var pos = this.history[i];
      vertex(pos.x, pos.y);
    }
    endShape();
  }
  
  update() {
    this.vel = p5.Vector.fromAngle(radians(this.direction));
    this.pos.add(this.vel);
    this.history.push(this.pos);
    if (this.history.length >= 30) {
      this.history.shift();
    }
  }
  
  turnBoi(deg) {
    this.direction += deg;
  }
}
