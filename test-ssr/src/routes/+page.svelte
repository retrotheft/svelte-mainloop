<script lang="ts">
   import { JoinLoop, ViewLoop } from 'svelte-mainloop'
   
   let secondsElapsed = $state(0)

   function update(delta: number) {
     secondsElapsed += delta
   }
 </script>
 
 <JoinLoop {update} />

<p>Seconds elapsed: {secondsElapsed.toFixed(1)}</p>

<ViewLoop />