class QuadTree {
  constructor(fx, fy, fw, fh, iCap) {
    this.boundry = new Box(fx, fy, fw, fh);
    this.capacity = iCap;
    this.contained = [];
    this.nw = undefined;
    this.ne = undefined;
    this.sw = undefined;
    this.se = undefined;

    this.show = function () {
      // this.boundry.show();
      if (this.nw != undefined) {
        this.nw.show();
        this.ne.show();
        this.sw.show();
        this.se.show();
      }
      for (let o of this.contained) {
        o.show();
      }
    };

    this.insert = function (object) {
      // ignore objects outside boundry
      if (!this.boundry.containsPoint(object.pos.x, object.pos.y)) {
        return false;
      }
      // if space in this tree and not subdivided add object
      if (this.contained.length < this.capacity && this.nw == undefined) {
        this.contained.push(object);
        // console.log('Inserted boid (%d,%d) in box x: %d y: %d w: %d h: %d', object.pos.x, object.pos.y, this.boundry.x - this.boundry.w,this.boundry.y - this.boundry.h, this.boundry.w * 2, this.boundry.h * 2);
        return true;
      }
      // otherwise subdivide and add points to matching quadrant
      if (this.nw == null) {
        this.subdivide();
      }
      // only insert into one quadrant if it matches
      if (this.nw.insert(object))
        return true;
      if (this.ne.insert(object))
        return true;
      if (this.sw.insert(object))
        return true;
      if (this.se.insert(object))
        return true;
      // otherwise the point cannot be inserted. this should never happen
      return false;
    };

    this.subdivide = function () {
      let x, y;
      let w = this.boundry.w;
      let h = this.boundry.h;
      let hw = w / 2;
      let hh = h / 2;
      x = this.boundry.x - hw;
      y = this.boundry.y - hh;
      this.nw = new QuadTree(x, y, w, h, this.capacity);
      x = this.boundry.x + hw;
      y = this.boundry.y - hh;
      this.ne = new QuadTree(x, y, w, h, this.capacity);
      x = this.boundry.x - hw;
      y = this.boundry.y + hh;
      this.sw = new QuadTree(x, y, w, h, this.capacity);
      x = this.boundry.x + hw;
      y = this.boundry.y + hh;
      this.se = new QuadTree(x, y, w, h, this.capacity);
    };

    this.queryRange = function (b) {
      var pointsInRange = [];
      // abort if range not in this quad
      if (!this.boundry.intersectsBox(b)) {
        return pointsInRange;
      }
      // check objects at this quad level
      for (let p of this.contained) {
        if (b.containsPoint(p.pos.x, p.pos.y)) {
          pointsInRange.push(p);
        }
      }
      // exit if no children
      if (this.nw == undefined) {
        return pointsInRange;
      }
      // otherwise add points from children
      Array.prototype.push.apply(pointsInRange, this.nw.queryRange(b));
      Array.prototype.push.apply(pointsInRange, this.ne.queryRange(b));
      Array.prototype.push.apply(pointsInRange, this.sw.queryRange(b));
      Array.prototype.push.apply(pointsInRange, this.se.queryRange(b));

      return pointsInRange;
    };

    this.printRects = function () {
      console.log('Center at (' + this.boundry.x + ', ' + this.boundry.y + ') and ' + this.boundry.w + ' half width and ' + this.boundry.h + ' half height');
      if (this.nw != undefined) {
        this.nw.printRects();
        this.ne.printRects();
        this.sw.printRects();
        this.se.printRects();
      }
    }
  }
}
