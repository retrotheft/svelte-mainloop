<script lang="ts">
   import loop from "./loop.svelte.js";
</script>

<section>
   <span>
      <button onclick={loop.state.isRunning ? loop.stop : loop.start}>
         {loop.state.isRunning ? "Stop" : "Start"}
      </button>
      <button onclick={() => (loop.state.isVisible = !loop.state.isVisible)}>
         {loop.state.isVisible ? "Hide Debug Info" : "Show Debug Info"}
      </button>
      {#if loop.state.isVisible}
         <button onclick={loop.reset}>Reset</button>
         <button onclick={() => console.log(loop.functions.update)}>Log Update ƒs</button>
      {/if}
   </span>
   {#if loop.state.isVisible}
      <span>
         <span>{loop.state.isRunning ? "Running" : "Paused"}</span>
         <span>FPS: {loop.state.fps.toFixed(0)}</span>
         <span>Frame: {loop.state.frame}</span>
         <span>Tick: {loop.state.tick}</span>
         <span>Timestamp: {loop.state.timestamp.toFixed(0)}</span>
         <span>Last Timestamp: {loop.state.lastTimestamp.toFixed(0)}</span>
         <span>Last Absence: {loop.state.lastAbsence.toFixed(0)}</span>
         <span>Last Delta: {loop.state.lastDelta.toFixed(2)}ms</span>
         <!-- <span>Interpolation: {lastInterp.toFixed(2)}%</span> -->
         <span>{loop.state.panic ? "time to" : "don't"} panic</span>
      </span>
      <span>
         {#each Object.entries(loop.lengths) as [stage, length]}
            <span>{stage}:{length}</span>
         {/each}
      </span>
   {/if}
</section>

<style>
   section {
      font-family: monospace;
      font-size: 0.7rem;
      color: white;
      width: 100cqi;
      display: flex;
      justify-content: space-between;
   }

   section > span {
      display: flex;
      align-items: center;
   }

   span > span {
      margin: 0 10px;
   }
</style>
