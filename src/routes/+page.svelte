<script lang="ts">
   import { JoinLoop } from '$lib/index.js'
   import { scale } from '$lib/canvas/2d/index.js'
   import updateCode from "$lib/content/update.txt?raw"
   import init2dCode from "$lib/content/init2d.txt?raw"
   import scale2dCode from "$lib/content/scale2d.txt?raw"
   import canvasCode from "$lib/content/canvas.txt?raw"
   import hljs from 'highlight.js'
   // @ts-ignore
   import hljs_svelte from 'highlightjs-svelte'

   hljs_svelte(hljs)

   const hlUpdateCode = hljs.highlight(updateCode, { language: 'svelte'}).value
   const hlCanvasCode = hljs.highlight(canvasCode, { language: 'svelte'}).value
   const hlInit2dCode = hljs.highlight(init2dCode, { language: 'svelte'}).value
   const hlScale2dCode = hljs.highlight(scale2dCode, { language: 'svelte'}).value

   let activeTab = $state("joinloop")

   let secondsElapsed = $state(0)

   function update(delta: number) {
      secondsElapsed += delta
   }

   function init(ctx: CanvasRenderingContext2D) {
      console.log(init)
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = "white"
      ctx.font="24px Lato"
      return paint
   }

   function paint(ctx: CanvasRenderingContext2D) {
      const c = ctx.canvas
      ctx.clearRect(0,0,c.width, c.height)
      ctx.save()
      ctx.translate(c.width / 2, c.height / 2)
      ctx.rotate(secondsElapsed / 5)
      ctx.fillText("Hello there", 0, 0)
      ctx.restore()
   }
</script>

<main id="hero">
   <div id="spacer-top"></div>
   <div id="main-content">
      <section id="title">
         <h1>Svelte MainLoop</h1>
         <p>The easiest and most powerful way to add a loop to your Svelte app.</p>
         <p><code>npm i svelte-mainloop</code></p>
         <p>NEW: Attachments for Canvas let you set and forget. <em>(req. Svelte 5.29)</em></p>
      </section>

      <section id="preview">
         <header>
            <nav class="tabs">
               <button onclick={() => activeTab = "joinloop"} class:active={activeTab === "joinloop"}>JoinLoop</button>
               <button onclick={() => activeTab = "draw2d"} class:active={activeTab === "draw2d"}>draw2d</button>
               <button onclick={() => activeTab = "init2d"} class:active={activeTab === "init2d"}>init2d</button>
               <button onclick={() => activeTab = "scale2d"} class:active={activeTab === "scale2d"}>scale2d</button>
            </nav>
         </header>
         <article>
            {#if activeTab === "joinloop"}
               <pre><code>{@html hlUpdateCode}</code></pre>
               <p>{secondsElapsed.toFixed(1)}</p>
            {:else if activeTab === "draw2d"}
               <pre><code>{@html hlCanvasCode}</code></pre>
               <canvas {@attach scale(init)}></canvas>
            {:else if activeTab === "init2d"}
               <pre><code>{@html hlInit2dCode}</code></pre>
               <canvas {@attach scale(init)}></canvas>
            {:else if activeTab === "scale2d"}
               <pre><code>{@html hlScale2dCode}</code></pre>
               <canvas {@attach scale(init)}></canvas>
            {/if}
         </article>
      </section>
   </div>
   <div id="spacer-bottom"></div>
</main>

<JoinLoop {update} />

<style>
   canvas {
      width: 100%;
      height: 160px;
   }
</style>
