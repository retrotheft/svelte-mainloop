<script lang="ts">
   import loop from "../loop.svelte.js";
   import { onMount, onDestroy } from "svelte";

   let { begin = undefined, update = undefined, draw = undefined, end = undefined } = $props();

   function run(fn: Function) {
      if (begin) fn("begin", begin);
      if (update) fn("update", update);
      if (draw) fn("draw", draw);
      if (end) fn("end", end);
   }

   onMount(() => run(loop.register));
   onDestroy(() => run(loop.unregister));
</script>
