<article>
   <p>Svelte Mainloop is a wrapper for mainloop.js that adds some useful functionality and makes it dead simple to use.</p>
   <p>It takes care of function registry management, so you can add and remove functions from each stage of the loop.</p>
   <p>Just import and add the <strong>JoinLoop</strong> component and pass it your update function.</p>
   <p>Since mainloop.js provides multiple stages of the loop for various purposes, you can pass them in like so:</p>

   <section>
      <code>
         import &#123; JoinLoop &#125; from "svelte-mainloop";<br /><br />
         // write your own update functions here<br /><br />
         &lt;JoinLoop &#123;begin&#125; &#123;update&#125; &#123;draw&#125; &#123;end&#125; /&gt;
      </code>
   </section>

   <p>Each of these is entirely optional, though you will want to use at least one. Each stage passes different parameters to your function so it's important to understand which stage you should use.</p>
   <p>It's highly recommended to visit the mainloop.js docs.</p>
   <p>The components on the left provide various examples of some ways to use the different stages.</p>
   <p>The code is available at the svelte-mainloop github.</p>
   <p>There's also a <strong>ViewLoop</strong> component that you can use to control the loop and debug your apps.</p>
   <p>Svelte Mainloop also provides some of the mainloop.js docs inline using intellisense.</p>
   <p>To understand better why you might want to use mainloop instead of requestAnimationFrame, read this article by the author of mainloop.js:</p>
   <a href="https://www.isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing">A Detailed Explanation of JavaScript Game Loops and Timing</a> by Isaac Sukin.
</article>

<style>
   section {
      background: black;
      padding: 0.5em;
   }

   article {
      max-width: 70ch;
   }
</style>
