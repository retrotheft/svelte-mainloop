<script lang="ts">
   import { JoinLoop } from "$lib/index.js";

   const width = 800;
   const height = 800;
   const centerX = width / 2;
   const centerY = height / 2;

   const SPEED = 100;

   function polarToCartesian(r: number, theta: number) {
      return {
         x: centerX + r * Math.cos(theta),
         y: centerY + r * Math.sin(theta),
      };
   }

   const planets = $state([
      { r: 100, period: 1, color: "#3498db", size: 10, theta: 0, prevTheta: 0 },
      { r: 160, period: 1.6, color: "#e74c3c", size: 15, theta: 0, prevTheta: 0 },
      { r: 220, period: 2.2, color: "#2ecc71", size: 16, theta: 0, prevTheta: 0 },
      { r: 280, period: 3, color: "#e67e22", size: 12, theta: 0, prevTheta: 0 },
   ]);

   let previousDelta = 0;
   let canvas: HTMLCanvasElement;
   let ctx: CanvasRenderingContext2D;

   function init(canvas: HTMLCanvasElement) {
      ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      draw();
   }

   function update(delta: number) {
      previousDelta = delta;
      const deltaSeconds = delta / 1000;
      planets.forEach((planet) => {
         planet.prevTheta = planet.theta;
         planet.theta = (planet.theta + (deltaSeconds / planet.period) * SPEED * (Math.PI * 2)) % (Math.PI * 2);
      });
   }

   function draw(interpolation = 1) {
      ctx.clearRect(0, 0, width, height);

      // Draw sun
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = "#f1c40f";
      ctx.fill();

      planets.forEach((planet) => {
         // Draw orbit path
         ctx.beginPath();
         ctx.arc(centerX, centerY, planet.r, 0, Math.PI * 2);
         ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
         ctx.stroke();

         // Handle wraparound case for interpolation
         let deltaTheta = planet.theta - planet.prevTheta;
         if (deltaTheta < -Math.PI) {
            deltaTheta += Math.PI * 2;
         } else if (deltaTheta > Math.PI) {
            deltaTheta -= Math.PI * 2;
         }

         const interpolatedTheta = planet.prevTheta + deltaTheta * interpolation;
         const pos = polarToCartesian(planet.r, interpolatedTheta);

         // Draw planet
         ctx.beginPath();
         ctx.arc(pos.x, pos.y, planet.size, 0, Math.PI * 2);
         ctx.fillStyle = planet.color;
         ctx.fill();
      });
   }
</script>

<JoinLoop {update} {draw} />

<canvas use:init bind:this={canvas} {width} {height} style="background: #000;"></canvas>

<p>A simple solar system simulation using both <em>update</em> and <em>draw</em> stages of mainloop. <em>Update</em> handles the position calculations, and <em>draw</em> handles the rendering.</p>

<style>
   canvas {
      max-width: 100%;
      max-height: 100%;
      aspect-ratio: 1/1;
   }
</style>
