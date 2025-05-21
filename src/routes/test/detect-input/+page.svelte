<script lang="ts">
   import loop, { JoinLoop } from "$lib/index.js";
   import keyboard from "./Keyboard.js";

   // Define some example sequences to detect
   const sequences = {
      Hadoken: ["KeyA", "KeyS", "KeyD"],
      Shoryuken: ["KeyD", "KeyA", "KeyS"],
      "Tatsumaki Senpuukyaku": ["KeyD", "KeyS", "KeyA"],
   };

   let recentInputs = $state<string[]>([]);
   let detectedMove = $state("");
   let detectedMoveTimeout: number | null = null;

   function checkInput() {
      recentInputs = keyboard.getBuffer() ?? [];

      // Check for sequences
      for (const [move, sequence] of Object.entries(sequences)) {
         if (keyboard.checkSequence(sequence)) {
            if (detectedMoveTimeout) clearTimeout(detectedMoveTimeout);
            detectedMove = move;
            keyboard.clearBuffer();
            detectedMoveTimeout = setTimeout(() => (detectedMove = ""), 1000);
            break;
         }
      }
   }
</script>

<JoinLoop begin={checkInput} />

<article id="detect-input">
   <header>
      <span>Input Buffer Detection</span>
      {#if detectedMove}
         <span class="move">{detectedMove}!</span>
      {:else}
         <span class="info">(Try pressing "A", "S", "D" in quick succession)</span>
      {/if}
   </header>
   {#if loop.state.isRunning}
      Recent inputs: {recentInputs.join(" → ")}
   {:else}
      Loop must be running to check inputs
   {/if}
</article>
<article>
   <p>This component processes input sequences using the <strong>begin</strong> stage of mainloop.</p>
   <p>Key presses are detected and added to a keyboard buffer using standard keyboard events.</p>
   <p>Then, the <strong>begin</strong> stage is used to check the input buffer for a sequence of keys.</p>
   <p>If a sequence is detected, it clears the buffer and sets a timeout to clear the detected move after 1 second.</p>
</article>

<style>
   article {
      max-width: 70ch;
   }

   article#detect-input {
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 1rem;
   }

   header {
      display: flex;
      justify-content: space-between;
   }

   header span:first-child {
      font-size: 1.2em;
      font-weight: 700;
   }

   .info {
      font-size: 0.8em;
      color: #aaa;
   }

   .move {
      color: lightgreen;
      font-weight: bold;
   }
</style>
