<script lang="ts">
   import { init2d, JoinLoop, ViewLoop } from '$lib/index.js'

   let seconds = $state(0)

   const update = (delta: number) => seconds += delta

   function init(ctx: CanvasRenderingContext2D) {
      // const rect = ctx.canvas.parentElement?.getBoundingClientRect()
      // ctx.canvas.width = rect?.width!
      // ctx.canvas.height = rect?.height!
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = "white"
      ctx.font="24px Lato"
      return paint
   }

   function paint(ctx: CanvasRenderingContext2D) {
      const c = ctx.canvas!
      ctx.clearRect(0,0,c.width, c.height)
      ctx.save()
      ctx.translate(c.width / 2, c.height / 2)
      ctx.rotate(seconds / 5)
      ctx.fillText(`${ctx.canvas.width}, ${ctx.canvas.height}`, 0, 0)
      ctx.restore()
   }
</script>

<JoinLoop {update} />

<main>
   <article>
         <canvas {@attach init2d(init)}></canvas>
   </article>
</main>
<ViewLoop />
<style>

   main {
      display: grid;
      place-items: center;
   }

   canvas {
      border-radius: 0;
      width: 100%;
      height: 100%;
   }

   article {
      width: 50vw;
      height: 50vh;
   }
</style>
