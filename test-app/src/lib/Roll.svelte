<script lang="ts">
   import { JoinLoop } from "svelte-mainloop";

   const ROLL_INTERVAL = 1000;

   let lastRollTimestamp = $state(0);
   let lastRoll = $state(0);

   function begin(timestamp: number) {
      if (lastRollTimestamp + ROLL_INTERVAL > timestamp) return;
      
      lastRollTimestamp = timestamp;
      lastRoll = Math.floor(Math.random() * 100);
   }
</script>

<JoinLoop {begin} />
<span>{lastRoll}</span>
<article>
   <p>This component is just rolling a number between 1-100 every second.</p>
   <p>It uses the <strong>begin</strong> stage of mainloop to handle the roll, because that way it can receive the timestamp, which isn't passed to the update function.</p>
   <p>This way the component only needs to keep track of the last roll's timestamp and compare it against the current timestamp.</p> 
   <p>Since update only receives delta, using update would require keeping a running counter as well as an internal timestamp to compare against.</p>
</article>

<style scoped>
   span {
      display: inline-flex;
      font-size: 3em;
      width: 1.5em;
      height: 1.5em;
      gap: 0.5em;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--border-color);
      padding: 0.5em;
      border-radius: 0.5em;
      /* aspect-ratio: 1/1; */
   }

   article {
      max-width: 40ch;
   }
</style>
