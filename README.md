# Svelte-MainLoop

[![npm version](https://badge.fury.io/js/svelte-mainloop.svg)](https://badge.fury.io/js/svelte-mainloop)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A svelte wrapper for mainloop.js that handles function registration and cleanup, and lets you join and leave the loop with a single component. It also provides some debugging info and tools, exposes all of the standard mainloop.js functionality, is fully typed, and provides inline documentation through intellisense.



* [MainLoop.js on github](https://github.com/IceCreamYou/MainLoop.js)
* [MainLoop.js documentation](https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop)
* [Test App](https://retrotheft.github.io/svelte-mainloop/) - reference alongside the Test

## Requirements

![Svelte](https://img.shields.io/badge/Svelte-5.x-FF3E00?logo=svelte)

## Getting Started

First, install svelte-mainloop:

```
npm install svelte-mainloop
```

Then you can connect your app up to the loop using the **JoinLoop** component and passing it your update function:

```svelte
<script>
   import { JoinLoop } from 'svelte-mainloop'

   function update() {
      // do something
   }
</script>

<JoinLoop {update}>
```

That's literally all you need to do to get moving, but svelte-mainloop has a lot more functionality.

For starters, MainLoop gives you 4 different stages of the loop to tap into, which are used for various purposes. Each stage uses a callback that is slightly different, with different parameters. The most common one, and the one used above, is **update**.

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

<JoinLoop {update}>
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
   <JoinLoop {update}>
{/if}
```

(You could also check for these and immediately return out of your update function, but doing it this way means that mainloop won't iterate over this component at all if it doesn't have to.)

There are three other stages you can also use: begin, draw, and end.

It's highly recommended to read through the mainloop docs to understand what each stage is used for and what parameters they pass in to the callback.

---

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

---

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
   /** @type {import('svelte-mainloop').UpdateCallback} */
   function update(delta: number) {
      prevValue = value;
      value = (value + delta) % max;
   }

   // using implements - make sure to import the type
   import type { UpdateCallback} from 'svelte-mainloop'
   
   /** @implements {UpdateCallback} */
   function update(delta: number) {
      prevValue = value;
      value = (value + delta) % max;
   }
```

This might be useful if you prefer to use the `function` keyword. In all three cases, hovering over the `UpdateCallback` keyword will display intellisense.