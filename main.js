import { Canvas } from './modules/canvas.js';
import { Particle } from './modules/particle.js';

let myCanvas = new Canvas('myCanvas', document.body, 480, 320);
myCanvas.create();

const particles = [];
particles.push(new Particle('Big Red', 130, 130, 40, 40, 3.5, 205, '#ff0000'));
particles.push(new Particle('Balpha', 230, 130, 10, 20, 12, 275, '#00ff00'));
particles.push(new Particle('Blue', 350, 250, 45, 20, 2.5, 222, '#0000ff'));


setInterval(updateWorld, 20);

function updateWorld() {
    myCanvas.clear();

    particles.forEach(p => {
        p.updatePosition(myCanvas);
        p.draw(myCanvas.ctx)
    });
}
