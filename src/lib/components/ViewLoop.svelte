<script lang="ts">
   import loop from "../loop.svelte.js";

   let isVisible = $state(true);
</script>

<section>
   <span>
      <button onclick={loop.state.isRunning ? loop.stop : loop.start}>
         {loop.state.isRunning ? "Stop" : "Start"}
      </button>
      <button onclick={() => (isVisible = !isVisible)}>
         {isVisible ? "Hide Debug Info" : "Show Debug Info"}
      </button>
      {#if isVisible}
         <button onclick={loop.reset}>Reset</button>
      {/if}
   </span>
   {#if isVisible}
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
      display: contents;
   }
</style>
