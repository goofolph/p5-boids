/// <reference path="p5.global-mode.d.ts" />
/* jshint esversion: 8 */

var boids = [];
var popSize = 0;
var minViewDist = 20;
var maxViewDist = 100;
var minViewAngle;
var maxViewAngle;
var quadt;

var points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(400, 400);
  frameRate(30);
  // noLoop();
  var minViewAngle = PI / 4;
  var maxViewAngle = PI;
  while (boids.length < popSize) {
    boids.push(new Boid());
  }
  quadt = new QuadTree(width / 2, height / 2, width, height, 4);
}

function draw() {
  background(51);
  quadt = new QuadTree(width / 2, height / 2, width, height, 4);
  for (let b of boids) {
    quadt.insert(b);
  }
  quadt.show();


  // quadt.printRects();

  // get forces from flocking behavior before modifind any values
  for (let b of boids) {
    others = quadt.queryRange(new Box(b.pos.x, b.pos.y, b.viewDist, b.viewDist));
    b.flock(others);
  }
  // update and show after flocking behaviors
  for (let b of boids) {
    b.update();
    // b.show();
  }
  if (mouseIsPressed) {
    let x = mouseX;
    let y = mouseY;
    let p = new Boid();
    p.pos.x = x;
    p.pos.y = y;
    boids.push(p);
  }
}


class Tem {
  constructor(x, y) {
    this.pos = createVector(x, y);
  }
}
