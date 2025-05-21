<script lang="ts">
   import '../app.css'
   import { ViewLoop } from '$lib/index.js'
   import { type Snippet } from 'svelte'

   let { children, data }: { children: Snippet, data: { stars: number }} = $props()
</script>

<svelte:head>
   <title>Svelte MainLoop</title>
</svelte:head>

<header id="page">
   <a href="/">svelte-mainloop</a>
   <!-- <nav>
      <ul>
         <li>
            <a href="/test">Test Apps</a>
         </li>
      </ul>
   </nav> -->
   <nav>
      <ul>
         <li>
            <a href="https://github.com/retrotheft/svelte-mainloop"><span id="github-stars"><svg xmlns="http://www.w3.org/2000/svg" class="text-[#facc15]" width="16" height="16" viewBox="0 0 24 24" fill="gold">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"></path> </svg>
{data.stars}
            <svg aria-hidden="true" class="text-accent-600 dark:text-accent-200" width="16" height="16" viewBox="0 0 24 24" fill="lightgrey" style="--sl-icon-size: 1em;">
            <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.08 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3Z"></path></svg></span></a>
         </li>
         <!-- <li>
            <a href="https://www.npmjs.com/package/svelte-mainloop">npm</a>
         </li> -->
      </ul>
   </nav>
</header>

{@render children()}

<!-- <footer>
   Svelte MainLoop is a wrapper for IceCreamYou's MainLoop.js
</footer> -->
