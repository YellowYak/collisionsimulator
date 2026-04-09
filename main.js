import { Canvas } from './modules/canvas.js';
import { StatusBoard } from './modules/statusBoard.js';
import { Particle } from './modules/particle.js';

const colorMap = ['rgb(120,28,129)', 'rgb(67,40,151)', 'rgb(65,111,184)', 'rgb(81,156,184)', 'rgb(112,180,132)', 'rgb(153,189,92)', 'rgb(195,186,69)', 'rgb(224,162,57)', 'rgb(230,107,45)', 'rgb(217,33,32)'];

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PARTICLE_RADIUS = 10;
const PARTICLE_COUNT = 50;
const MAX_MASS = 3;
const MAX_SPEED = 5;
const TICK_MS = 25;

let myCanvas = new Canvas('myCanvas', document.body, CANVAS_WIDTH, CANVAS_HEIGHT);
myCanvas.create();

let myStatusBoard = new StatusBoard(document.body);
myStatusBoard.create();

const particles = [];
for (let i = 0; i < PARTICLE_COUNT; i++) {
    const mass = getRandomInt(MAX_MASS) + 1;
    particles.push(
        new Particle({
            name: `Particle ${i+1}`,
            x: getRandomInt(CANVAS_WIDTH - PARTICLE_RADIUS),
            y: getRandomInt(CANVAS_HEIGHT - PARTICLE_RADIUS),
            radius: PARTICLE_RADIUS,
            mass: mass,
            speed: getRandomInt(MAX_SPEED) + 1,
            direction: getRandomInt(360),
            color: colorMap[mass]
        })
    );
}

let iteration = 0;
setInterval(updateWorld, TICK_MS);

function updateWorld() {
    myCanvas.clear();

    if (iteration % 10 === 0) {
        myStatusBoard.update(particles);
    }

    for (let i = 0; i < particles.length; i++) {
        const currentParticle = particles[i];
        currentParticle.updatePosition(myCanvas);
        currentParticle.draw(myCanvas.ctx);

        for (let j = i + 1; j < particles.length; j++) {
            const checkingParticle = particles[j];
            if (currentParticle.collidedWith(checkingParticle)) {
                console.log(`${currentParticle.name} collided with ${checkingParticle.name}`);
                currentParticle.collision(checkingParticle);
                currentParticle.separateFrom(checkingParticle);
            }
        }
    }

    iteration++;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
