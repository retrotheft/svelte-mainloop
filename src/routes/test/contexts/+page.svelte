<script lang="ts">
   import { draw as webGl } from '$lib/canvas/webgl/index.js'
   import { draw as webGl2 } from '$lib/canvas/webgl2/index.js'
   import { draw as bitmap } from '$lib/canvas/bitmap/index.js'

   function drawWebGl(gl: WebGLRenderingContext) {
      // Set clear color to red
        gl.clearColor(1.0, 0.0, 0.0, 1.0);

        // Clear the canvas
        gl.clear(gl.COLOR_BUFFER_BIT);
   }

   function drawWebGl2(gl2: WebGL2RenderingContext) {
      // Set clear color to green
        gl2.clearColor(0.0, 1.0, 0.0, 1.0);

        // Clear the canvas
        gl2.clear(gl2.COLOR_BUFFER_BIT);
   }

   function drawBitmap(ctx: ImageBitmapRenderingContext) {
      // Create ImageData with a purple color
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const imageData = new ImageData(width, height);
        const data = imageData.data;

        // Fill with purple (RGBA: 128, 0, 128, 255)
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 128;     // R
          data[i + 1] = 0;   // G
          data[i + 2] = 128; // B
          data[i + 3] = 255; // A
        }

        // Create a pattern in the center
        const centerX = Math.floor(width / 2);
        const centerY = Math.floor(height / 2);
        const size = 50;

        for (let y = centerY - size; y < centerY + size; y++) {
          for (let x = centerX - size; x < centerX + size; x++) {
            if (y >= 0 && y < height && x >= 0 && x < width) {
              const index = (y * width + x) * 4;
              data[index] = 255;     // R
              data[index + 1] = 255; // G
              data[index + 2] = 0;   // B
              data[index + 3] = 255; // A
            }
          }
        }

        // Convert ImageData to ImageBitmap
        createImageBitmap(imageData).then(bitmap => {
          // Transfer the bitmap to the destination canvas
          ctx.transferFromImageBitmap(bitmap);
        }).catch(error => {
          console.error('Error creating bitmap:', error);
        });
   }
</script>

<div>
   <canvas {@attach webGl(drawWebGl)}></canvas>
</div>

<div>
   <canvas {@attach webGl2(drawWebGl2)}></canvas>
</div>

<div>
   <canvas {@attach bitmap(drawBitmap)}></canvas>
</div>
