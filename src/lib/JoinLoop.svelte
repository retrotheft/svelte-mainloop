<script>
   import loop from "./loop.svelte.js";
   import { onMount, onDestroy } from "svelte";

   /** @type {{
    * begin?: import('./loop.svelte.js').BeginCallback,
    * update?: import('./loop.svelte.js').UpdateCallback,
    * draw?: import('./loop.svelte.js').DrawCallback,
    * end?: import('./loop.svelte.js').EndCallback
    * }} */
   let { begin = undefined, update = undefined, draw = undefined, end = undefined } = $props();

   /**
    * @typedef {(name: "begin" | "update" | "draw" | "end", callback: Function) => void} LoopFunction
    * @param {LoopFunction} fn Function to register/unregister loop callbacks
    */
   function run(fn) {
      if (begin) fn("begin", begin);
      if (update) fn("update", update);
      if (draw) fn("draw", draw);
      if (end) fn("end", end);
   }

   onMount(() => run(loop.register));
   onDestroy(() => run(loop.unregister));
</script>
