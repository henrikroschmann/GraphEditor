class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    equals(point) {
        return this.x == point.x && this.y == point.y;
    }

    // if we have large properties input in a method it is hard to remember the position
    // by grouping them with the { } we just pass them using the names
    draw(ctx, { size = 18, color = "black", outline = false, fill = false} = {}) {
        const rad = size / 2;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, rad, 0, Math.PI * 2); // last param is the radius two pi radius 360 deg
        ctx.fill();
        if (outline) {
            ctx.beginPath();
            ctx.lineWith = 2;
            ctx.strokeStyle = "yellow"; 
            ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
            ctx.stroke();
        }
        if (fill) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, rad * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = "yellow";
            ctx.fill();
        }
    }
}