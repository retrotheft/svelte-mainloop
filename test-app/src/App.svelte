<script lang="ts">
   import { ViewLoop } from "svelte-mainloop";
   import About from "./lib/About.svelte";
   import Job from "./lib/Job.svelte";
   import Roll from "./lib/Roll.svelte";
   import PolarSystem from "./lib/PolarSystem.svelte";
   import DetectInput from "./lib/DetectInput.svelte";
   import AutoType from "./lib/AutoType.svelte";

   const components = [
      { name: "About", component: About },
      { name: "Solar System", component: PolarSystem },
      { name: "Job", component: Job },
      { name: "Roll", component: Roll },
      { name: "Detect Input", component: DetectInput },
      { name: "Auto Type", component: AutoType },
   ];

   let selectedComponent = $state(components[0]);
</script>

<header>
   <span>Svelte Mainloop Test App</span>
   <ul>
      <li>mainloop.js:</li>
      <li><a href="https://github.com/IceCreamYou/MainLoop.js/">github</a></li>
      <li><a href="https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop">docs</a></li>
   </ul>
</header>
<aside>
   <ul>
      {#each components as component}
         <li><button onclick={() => (selectedComponent = component)}>{component.name}</button></li>
      {/each}
   </ul>
</aside>
<main>
   {#if selectedComponent}
      <selectedComponent.component />
   {/if}
</main>
<footer>
   <ViewLoop />
</footer>

<style scoped>
   :root {
      --border-color: #666;
   }
   header {
      grid-area: header;
      border-bottom: 1px solid var(--border-color);
      padding: 0 1em;
      display: flex;
      align-items: center;

      span:first-child {
         font-size: 1.5em;
         font-weight: 700;
         margin-right: auto;
      }

      ul {
         list-style: none;
         display: flex;
         gap: 1em;
      }
   }
   aside {
      grid-area: aside;
      border-right: 1px solid var(--border-color);
      padding: 0;

      ul {
         list-style: none;
         padding-inline-start: 0;

         button {
            width: 100%;
            border-radius: 0;
            margin-block: 0.25em;
         }
      }
   }
   main {
      grid-area: main;
      padding: 1em;
   }
   footer {
      grid-area: footer;
      border-top: 1px solid var(--border-color);
      margin: 0;
      font-family: monospace;
      font-size: 0.7rem;
      color: white;
      width: 100cqi;
      display: flex;
      justify-content: space-between;

      :global(section > span) {
         display: flex;
         align-items: center;
      }

      :global(span > span) {
         margin: 0 10px;
      }
   }
</style>
