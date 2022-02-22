class Particle {
    constructor(name, x, y, width, height, speed, direction, color) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = direction;
        this.color = color;
    }

    draw(ctx) {
        console.log(`Drawing ${this.name} at (${this.x}, ${this.y})`)

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    degrees_to_radians(degrees)
    {
        return degrees * (Math.PI / 180);
    }

    updatePosition(canvas) {
        console.log(`Current position for ${this.name} is (${this.x}, ${this.y}) with direction ${this.direction}`);

        let newX = this.x + Math.cos(this.degrees_to_radians(this.direction)) * this.speed;
        let newY = this.y - Math.sin(this.degrees_to_radians(this.direction)) * this.speed;

        const newRX = newX + this.width;
        const newLY = newY + this.height;

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
            newX = canvas.width - this.width;
            if (this.direction <= 90) {
                this.direction = 180 - this.direction;
            } else {
                this.direction = 360 - this.direction + 180;
            }
        } else if (newLY >= canvas.height) {
            newY = canvas.height - this.height;
            if (this.direction <= 270) {
                this.direction = (270 - this.direction) + 90;
            } else {
                this.direction = 360 - this.direction;
            }
        }

        if (this.direction > 360 || this.direction < 0) debugger;

        this.x = newX;
        this.y = newY;

        console.log(`New position for ${this.name} is (${this.x}, ${this.y}) with direction ${this.direction}`);

    }
}


export { Particle };