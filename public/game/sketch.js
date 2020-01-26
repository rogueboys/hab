var p1;
var p2;
var p3;
var p4;
function setup() {
  createCanvas(windowWidth, windowHeight);
  p1 = new player(10, 10, 1);
  p2 = new player(10, 10, 2);
  p3 = new player(10, 10, 3);
  p4 = new player(10, 10, 4);
}

function draw() {
  background(0);

  p1.show();
  p2.show();
  p3.show();
  p4.show();
  p1.move();
  p2.move();
  p3.move();
  p4.move();
  p1.turnBoi(0.2);
}

class player {
  constructor(turn, speed, playNum) {
    this.turn = turn;
    this.speed = speed;
    this.playNum = playNum;
    this.radius = 10;
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
  show() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
  }
  move() {
    this.pos.add(this.vel);
  }
  turnBoi(deg) {
    this.direction += deg;
    this.vel = p5.Vector.fromAngle(radians(this.direction));
  }
}
