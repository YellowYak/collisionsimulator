# Collision Simulator

A browser-based 2D physics simulation of elastic collisions between rectangular particles.

## What it does

Spawns 50 particles on an 800×600 canvas. Each particle moves at a random speed and direction, bounces off the canvas walls, and undergoes elastic collisions with other particles. Heavier particles transfer less momentum on impact. A live status table below the canvas tracks each particle's name, position, speed, direction, mass, and color.

## Running the project

```bash
npm install
npm start
```

Opens automatically at `http://localhost:10001`.

## Project structure

```
index.html          Entry point
main.js             Game loop, particle spawning
modules/
  canvas.js         Canvas wrapper (create, clear)
  particle.js       Particle class (movement, collision physics)
  statusBoard.js    Status table rendered below the canvas
```

## How collisions work

Collision detection uses axis-aligned bounding box (AABB) overlap testing. When two particles overlap, their post-collision velocities are resolved using the 2D elastic collision equations accounting for mass and approach angle. After each collision the particles are pushed apart to prevent re-collision sticking.
