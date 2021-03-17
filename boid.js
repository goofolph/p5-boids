/* jshint esversion: 8 */

class Boid {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1, 5));
    this.acc = createVector();

    this.viewDist = random(minViewDist, maxViewDist);
    this.viewAngle = random(minViewAngle, maxViewAngle);
    this.r = 5;
    this.maxVel = random(2, 4);
    this.maxAcc = random(1, 2);
  }

  show() {
    fill(255);
    noStroke();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading() - PI / 2);
    triangle(-this.r, 0, this.r, 0, 0, this.r * 3);
    pop();
  }

  update() {
    this.acc.limit(this.maxAcc);
    // this.vel.add(this.acc);
    this.vel.x = lerp(this.vel.x, this.vel.x + this.acc.x, .5);
    this.vel.y = lerp(this.vel.y, this.vel.y + this.acc.y, .5);
    this.vel.limit(this.maxVel);
    this.pos.add(this.vel);

    // if (this.pos.x < 0) {
    //   this.pos.x = width;
    // } else if (this.pos.x > width) {
    //   this.pos.x = 0;
    // }
    // if (this.pos.y < 0) {
    //   this.pos.y = height;
    // } else if (this.pos.y > height) {
    //   this.pos.y = 0;
    // }
    this.pos.x = (this.pos.x + width) % width;
    this.pos.y = (this.pos.y + height) % height;
  }

  flock(others) {
    this.acc.mult(0);
    let separ = this.separation(others);
    let align = this.alignment(others);
    let cohes = this.cohesion(others);
    this.acc.add(separ);
    this.acc.add(align);
    this.acc.add(cohes);
    this.acc.setMag(1);
  }

  separation(others) {
    let separ = createVector(0, 0);
    let count = 0;
    if (others.length == 0) {
      return separ;
    }
    for (let ot of others) {
      if (this.inRange(ot)) {
        // separ.add(p5.Vector.sub(ot.pos, this.pos))
        separ.add(ot.pos);
        separ.sub(this.pos);
        count++;
      }
    }
    separ.div(count);
    separ.mult(-.5);
    separ.normalize();
    return separ;
  }

  alignment(others) {
    let align = createVector(0, 0);
    let count = 0;
    if (others.length == 0) {
      return align;
    }
    for (let ot of others) {
      if (this.inRange(ot)) {
        align.add(ot.vel);
        count++;
      }
    }
    align.div(count);
    align.normalize();
    return align;
  }

  cohesion(others) {
    let cohes = createVector(0, 0);
    let count = 0;
    if (others.length == 0) {
      return cohes;
    }
    for (let ot of others) {
      if (this.inRange(ot)) {
        cohes.add(ot.pos);
        count++;
      }
    }
    cohes.div(count);
    cohes.sub(this.pos);
    cohes.normalize();
    return cohes;
  }

  inRange(other) {
    let dist = this.pos.dist(other.pos);
    let angle = this.vel.heading();
    let otherAngle = other.pos.heading();
    let diffAngle = abs(otherAngle - angle);
    diffAngle = 0;
    if (diffAngle <= this.viewAngle && dist <= this.viewDist) {
      return true;
    } else {
      return false;
    }
  }
}
