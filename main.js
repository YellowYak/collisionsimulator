import { Canvas } from './modules/canvas.js';
import { Particle } from './modules/particle.js';

var colorMap = ['rgb(120,28,129)', 'rgb(67,40,151)', 'rgb(65,111,184)', 'rgb(81,156,184)', 'rgb(112,180,132)', 'rgb(153,189,92)', 'rgb(195,186,69)', 'rgb(224,162,57)', 'rgb(230,107,45)', 'rgb(217,33,32)'];

let myCanvas = new Canvas('myCanvas', document.body, 800, 600);
myCanvas.create();

const particles = [];
particles.push(new Particle({ name: 'Scott', x: 333, y: 200, radius: 100, mass: 8, speed: 2, direction: 155, color: colorMap[7] }));
particles.push(new Particle({ name: 'Big Boy', x: 130, y: 130, radius: 40, mass: 4, speed: 1, direction: 13, color: colorMap[3] }));
particles.push(new Particle({ name: 'Big Boy', x: 230, y: 312, radius: 40, mass: 4, speed: 1, direction: 69, color: colorMap[3] }));
particles.push(new Particle({ name: 'Big Boy', x: 30, y: 30, radius: 40, mass: 4, speed: 1, direction: 113, color: colorMap[3] }));
particles.push(new Particle({ name: 'Big Boy', x: 111, y: 120, radius: 40, mass: 4, speed: 1, direction: 321, color: colorMap[3] }));
particles.push(new Particle({ name: 'Big Boy', x: 333, y: 100, radius: 40, mass: 4, speed: 1, direction: 11, color: colorMap[3] }));
particles.push(new Particle({ name: 'Big Boy', x: 233, y: 230, radius: 40, mass: 4, speed: 1, direction: 188, color: colorMap[3] }));


setInterval(updateWorld, 1);

function updateWorld() {
    myCanvas.clear();

    for (let i = 0; i < particles.length; i++) {
        const currentParticle = particles[i];
        currentParticle.updatePosition(myCanvas);
        currentParticle.draw(myCanvas.ctx);

        for (let j = i + 1; j < particles.length; j++) {
            const checkingParticle = particles[j];
            if (currentParticle.collidedWith(checkingParticle)) {
                console.log(`${currentParticle.name} collided with ${checkingParticle.name}`);
                currentParticle.collision(checkingParticle);
            }
        }
    };


}
