<script lang="ts">
   import loop, { JoinLoop } from "svelte-mainloop";

   let updatesPerSecond = $state(60);

   let value = $state(0);
   let prevValue = $state(0);
   let displayValue = $state(0);
   let max = 10;

   /** @type {import('svelte-mainloop').UpdateCallback} */
   function update(delta: number) {
      prevValue = value;
      value = (value + delta) % max;
   }

   /** @type {import('svelte-mainloop').DrawCallback} */
   function draw(interpolation: number) {
      displayValue = prevValue > value ? value : prevValue + (value - prevValue) * interpolation;
   }

   $effect(() => {
      loop.setSimulationTimestep(1000 / updatesPerSecond);
   });
</script>

<JoinLoop {update} {draw} />
<header>
   UpdatesPerSecond: {updatesPerSecond}
   <input type="range" min="1" max="100" bind:value={updatesPerSecond} />
   <button onclick={() => updatesPerSecond++}>+</button>
   <button onclick={() => updatesPerSecond--}>-</button>
</header>
<div>
   Raw: <progress {value} {max}>{value} / {max}</progress>
   {value.toFixed(1)}
   {((value / max) * 100).toFixed(1)}%
</div>
<div>
   Interpolated: <progress value={displayValue} {max}>{displayValue} / {max}</progress>
   {displayValue.toFixed(1)}
   {((displayValue / max) * 100).toFixed(1)}%
</div>
<article>
   <p>
      This component demonstrates the use of the <strong>update</strong> and <strong>draw</strong> stages of mainloop.
   </p>
   <p>The raw value is updated during the <strong>update</strong> stage, and displayed in the first progress bar.</p>
   <p>A second interpolated value is calculated during the <strong>draw</strong> stage, and displayed in the second progress bar.</p>
   <p>Try lowering the <strong>UpdatesPerSecond</strong> value down to 1 to see the interpolation in action.</p>
   <p>
      UpdatesPerSecond is using MainLoop's <strong>setSimulationTimestep</strong> to control the update rate. You most likely won't want to use this, but it makes
      for a good example.
   </p>
   <p>See the Roll component for a way to handle intermittent events while staying at full fps.</p>
</article>

<style>
   article {
      max-width: 50ch;
   }

   div {
      display: flex;
      gap: 0.5em;
      align-items: center;
      font-size: 0.8em;
      margin: 0.5em 0;
   }
</style>
