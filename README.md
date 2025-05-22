# Svelte-MainLoop

[![npm version](https://badge.fury.io/js/svelte-mainloop.svg)](https://badge.fury.io/js/svelte-mainloop)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**1.2.0 update**: introduces Attachments for setting up HTML Canvas. Hook up your draw function, run an init function and even keep the canvas scaled to its container, all with {@attach ... } call.

Refer to the video and/or Svelte Playground for instructions on how to use.

- [Svelte Playground](https://svelte.dev/playground/26bdfa021212402dab48ca10230d7ce6?version=5.32.1)
- [How to Use Video](https://www.youtube.com/watch?v=HKU3tb6L-MQ)

---

A svelte wrapper for mainloop.js that handles function registration and cleanup, and lets you join and leave the loop with a single component. It also provides some debugging info and tools, exposes all of the standard mainloop.js functionality, is fully typed, and provides inline documentation through intellisense.

* [MainLoop.js on github](https://github.com/IceCreamYou/MainLoop.js)
* [MainLoop.js documentation](https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop).

## Requirements

- [![Svelte](https://img.shields.io/badge/Svelte-5.x-FF3E00?logo=svelte)](https://www.npmjs.com/package/svelte?activeTab=versions)
- Browser environment with `requestAnimationFrame` support. If you're running node, try using [mainloop.js]('https://github.com/IceCreamYou/MainLoop.js') directly.
- If you're running SvelteKit, `svelte-mainloop` will provide a dummy loop for ssr, and should run correctly on the client side.

## Getting Started

First, install svelte-mainloop:

```
npm install svelte-mainloop
```

Then import the **JoinLoop** component, write your update function (this will get called each frame, basically) and pass update to JoinLoop:

```svelte
<script>
   import { JoinLoop } from 'svelte-mainloop'

   function update() {
      // do something
   }
</script>

<JoinLoop {update} />
```

[Try it on the Svelte Playground](https://svelte.dev/playground/74147e1570fe40be9f2314d90a0c2150?version=5.14.0)

That's literally all you need to do to get moving, but svelte-mainloop has a lot more functionality.

For starters, MainLoop gives you 4 different stages of the loop to tap into, which are used for various purposes. Each stage uses a callback that is slightly different, with different arguments. The most common one, and the one used above, is **update**. (the others are **begin**, **draw** and **end**.)

**Update** accepts **delta**, which is the time since the last update. You can use this to keep track of the time your app has been running, like so:

```svelte
<script>
   import { JoinLoop } from 'svelte-mainloop'

   let timeElapsed = $state(0)

   function update(delta) {
      timeElapsed += delta
   }
</script>

{timeElapsed} seconds passed.

<JoinLoop {update} />
```

> IMPORTANT: MainLoop.js by default provides its delta value as the number of milliseconds, so at 60fps the `delta` is 16.67. Svelte-mainloop divides this by 1000 when passing it to callbacks, in order to express delta in seconds.

If you want to remove your component from the loop, perhaps because it is paused or has completed its task, you can do so by wrapping JoinLoop in an #if block. JoinLoop will handle the cleanup for you.

```svelte
<script>
   import { JoinLoop } from 'svelte-mainloop'

   const COMPLETION_TIME = 10

   let isPaused = $state(false)
   let timeElapsed = $state(0)

   function update(delta) {
      timeElapsed += delta
   }
</script>

{timeElapsed} seconds passed.

<button onclick={() => isPaused = !isPaused}>{ isPaused ? 'Play' : 'Pause'}<button>

{#if !isPaused && timeElapsed < COMPLETION_TIME}
   <JoinLoop {update} />
{/if}
```

(You could also check for these and immediately return out of your update function, but doing it this way means that mainloop won't iterate over this component at all if it doesn't have to.)

There are three other stages you can also use: begin, draw, and end.

It's highly recommended to read through the mainloop docs to understand what each stage is used for and what arguments they pass to the callback.

## ViewLoop

You can import the **ViewLoop** component and display it in your app in order to display some information about the mainloop.

```svelte
<script>
   import { ViewLoop } from 'svelte-mainloop'
</script>

<ViewLoop />
```

In addition to providing start/stop and reset buttons, **ViewLoop** displays:

- The loop's current FPS
- The current frame (increments with each draw call)
- The current tick (increments with each update call)
- `Timestamp` Time since the app was loaded
- `Last Timestamp` (updates when the loop is stopped)
- `Last Absence` - the length of time the loop was paused for previously
- `Last Delta` - the delta of the last update (expressed in milliseconds here)
- MainLoop's `panic` boolean

**ViewLoop** also displays the number of functions that are registered with each stage of the loop. This can be useful to check if you have a memory leak and are not removing items from the loop when they're done.

## Typescript

svelte-mainloop is fully typed and should provide inline help via intellisense. Most of this is taken from the mainloop.js documentation directly.

You can also import the callback function types explicitly using typescript, and type them using arrow function syntax:

```svelte
<script lang="ts">
   import type { BeginCallback, UpdateCallback, DrawCallback, EndCallback} from 'svelte-mainloop'

   const update: UpdateCallback = (delta: number) => {
      // your code here
   }
</script>
```

Or if you prefer, you can type the callback functions with jsdoc:

```svelte
<script>
   // Use this option if you're using vanilla js
   /** @type {import('svelte-mainloop').UpdateCallback} */
   function update(delta: number) {
      prevValue = value;
      value = (value + delta) % max;
   }
</script>
```

```svelte
<script lang="ts">
   // use this option if you hate arrow functions
   // using implements - make sure to import the type
   import type { UpdateCallback} from 'svelte-mainloop'

   /** @implements {UpdateCallback} */
   function update(delta: number) {
      prevValue = value;
      value = (value + delta) % max;
   }
</script>
```

This might be useful if you prefer to use the `function` keyword. In all three cases, hovering over the `UpdateCallback` keyword will display intellisense.
