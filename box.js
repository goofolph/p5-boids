class Box {
    constructor(fx, fy, fw, fh) {
        this.x = fx;
        this.y = fy;
        this.w = fw / 2; // keep this division in mind later
        this.h = fh / 2;

        this.containsPoint = function (fx, fy) {
            if (fx >= this.x - this.w && fx <= this.x + this.w) {
                if (fy >= this.y - this.h && fy <= this.y + this.h) {
                    return true;
                }
            }
            return false;
        };

        this.intersectsBox = function (other) {
            // if rectangles are to left or right of each other
            if (this.x - this.w > other.x + other.w ||
                this.x + this.h < other.x - other.h) {
                return false;
            }
            // if boxes are above or below each other
            if (this.y - this.w > other.y + other.w ||
                this.y + this.h < other.y - other.h) {
                return false;
            }
            return true;
        };

        this.show = function () {
            noFill();
            strokeWeight(1);
            stroke(255);
            // rect(this.x, this.y, this.w * 2, this.y * 2);
            let x = this.x - this.w;
            let y = this.y - this.h;
            let w = this.w * 2;
            let h = this.h * 2;
            rect(x, y, w, h);
        };
    }
}
