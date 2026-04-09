class Particle {
    constructor(params) {
        this.name = params.name;
        this.x = params.x;
        this.y = params.y;
        this.radius = params.radius;
        this.mass = params.mass;
        this.speed = params.speed;
        this.direction = params.direction;
        this.color = params.color;
    }

    draw(ctx) {
        //console.log(`Drawing ${this.name} at (${this.x}, ${this.y})`)

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.radius, this.radius);
    }

    degreesToRadians(degrees)
    {
        return degrees * (Math.PI / 180);
    }

    radiansToDegrees(radians)
    {
        return 180 * radians / Math.PI;
    }

    collidedWith(otherParticle) {
        const otherLY = (otherParticle.y + otherParticle.radius);
        const thisLY = this.y + this.radius;
        const overlappingY = otherLY > this.y && otherParticle.y <= thisLY;

        const otherRX = (otherParticle.x + otherParticle.radius);
        const thisRX = this.x + this.radius;
        const overlappingX = otherRX > this.x && otherParticle.x <= thisRX;

        return overlappingX && overlappingY;
    }

    collision(otherParticle) {
        let m1 = this.mass;
        let v1ix = Math.cos(this.degreesToRadians(this.direction)) * this.speed;
        let v1iy = Math.sin(this.degreesToRadians(this.direction)) * this.speed;
        let v1i = Math.sqrt(v1ix * v1ix + v1iy * v1iy);

        let m2 = otherParticle.mass;
        let v2ix = Math.cos(this.degreesToRadians(otherParticle.direction)) * otherParticle.speed;
        let v2iy = Math.sin(this.degreesToRadians(otherParticle.direction)) * otherParticle.speed;
        let v2i = Math.sqrt(v2ix * v2ix + v2iy * v2iy);

        // Determine collision angle
        const dx = v2ix - v1ix;
        const dy = v2iy - v1iy;
        let phi = Math.PI / 2;
        if (dx !== 0) {
            phi = Math.atan(dy / dx);
        }

        const ang1 = this.findAngle(v1ix, v1iy);
        const ang2 = this.findAngle(v2ix, v2iy);

        let v1xr = v1i * Math.cos(ang1 - phi);
        let v1yr = v1i * Math.sin(ang1 - phi);
        let v2xr = v2i * Math.cos(ang2 - phi);
        let v2yr = v2i * Math.sin(ang2 - phi);

        let v1fxr = (m1 - m2) / (m1 + m2) * v1xr + (2 * m2) / (m1 + m2) * v2xr;
        let v2fxr = (m2 - m1) / (m2 + m1) * v2xr + (2 * m1) / (m2 + m1) * v1xr;
        let v1fyr = v1yr;
        let v2fyr = v2yr;

        let v1fx = Math.cos(phi) * v1fxr + Math.cos(phi + Math.PI / 2) * v1fyr;
        let v1fy = Math.sin(phi) * v1fxr + Math.sin(phi + Math.PI / 2) * v1fyr;
        let v1f = Math.sqrt(v1fx * v1fx + v1fy * v1fy);
        
        let v2fx = Math.cos(phi) * v2fxr + Math.cos(phi + Math.PI / 2) * v2fyr;
        let v2fy = Math.sin(phi) * v2fxr + Math.sin(phi + Math.PI / 2) * v2fyr;
        let v2f = Math.sqrt(v2fx * v2fx + v2fy * v2fy);
        
        let ang1f = this.radiansToDegrees(this.findAngle(v1fx, v1fy));
        let ang2f = this.radiansToDegrees(this.findAngle(v2fx, v2fy));
        
        this.speed = v1f;
        this.direction = ang1f;

        otherParticle.speed = v2f;
        otherParticle.direction = ang2f;
    }

    separateFrom(otherParticle) {
        const overlapX = (this.radius + otherParticle.radius) / 2
            - Math.abs((this.x + this.radius / 2) - (otherParticle.x + otherParticle.radius / 2));
        const overlapY = (this.radius + otherParticle.radius) / 2
            - Math.abs((this.y + this.radius / 2) - (otherParticle.y + otherParticle.radius / 2));

        if (overlapX < overlapY) {
            const push = overlapX / 2 + 1;
            if (this.x < otherParticle.x) {
                this.x -= push;
                otherParticle.x += push;
            } else {
                this.x += push;
                otherParticle.x -= push;
            }
        } else {
            const push = overlapY / 2 + 1;
            if (this.y < otherParticle.y) {
                this.y -= push;
                otherParticle.y += push;
            } else {
                this.y += push;
                otherParticle.y -= push;
            }
        }
    }

    findAngle(x, y) {
        if (x < 0) {
            return Math.PI + Math.atan(y / x);
        } else if (x > 0 && y >= 0) {
            return Math.atan(y / x);
        } else if (x > 0 && y < 0) {
            return 2 * Math.PI + Math.atan(y / x);
        } else if (x === 0 && y === 0) {
            return 0;
        } else if (x === 0 && y >= 0) {
            return Math.PI / 2;
        } else {
            return 3 * Math.PI / 2;
        }
    }

    updatePosition(canvas) {
        //console.log(`Current position for ${this.name} is (${this.x}, ${this.y}) with direction ${this.direction}`);

        let newX = this.x + Math.cos(this.degreesToRadians(this.direction)) * this.speed;
        let newY = this.y - Math.sin(this.degreesToRadians(this.direction)) * this.speed;

        const newRX = newX + this.radius;
        const newLY = newY + this.radius;

        if (newX <= 0) {
            newX = 0;
            if (this.direction <= 180) {
                this.direction = 180 - this.direction;
            } else {
                this.direction =  360 - (this.direction - 180);
            }
        } else if (newY <= 0) {
            newY = 0;
            if (this.direction <= 90) {
                this.direction = 360 - this.direction;
            } else { 
                this.direction = 270 - (this.direction - 90);
            }
        } else if (newRX >= canvas.width) {
            newX = canvas.width - this.radius;
            if (this.direction <= 90) {
                this.direction = 180 - this.direction;
            } else {
                this.direction = 360 - this.direction + 180;
            }
        } else if (newLY >= canvas.height) {
            newY = canvas.height - this.radius;
            if (this.direction <= 270) {
                this.direction = (270 - this.direction) + 90;
            } else {
                this.direction = 360 - this.direction;
            }
        }

        if (this.direction > 360 || this.direction < 0) debugger;

        this.x = newX;
        this.y = newY;

        //console.log(`New position for ${this.name} is (${this.x}, ${this.y}) with direction ${this.direction}`);

    }
}


export { Particle };