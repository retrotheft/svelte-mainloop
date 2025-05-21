import loop from "../loop.svelte.js"
import { untrack } from "svelte"
import { innerWidth, innerHeight } from 'svelte/reactivity/window'

type CanvasRenderingContext2DAttributes = {
   alpha?: boolean,
   colorSpace?: "srgb" | "display-p3",
   desynchronized?: boolean,
   willReadFrequently?: boolean
}

/**
 * Function that performs drawing operations on a canvas context
 */
export type DrawFunction = (context: CanvasRenderingContext2D) => void;

/**
 * Function that performs initial setup of a canvas context and returns a drawing function
 */
export type InitFunction = (context: CanvasRenderingContext2D) => DrawFunction

/**
 * Function that applies drawing to a canvas and returns a cleanup function
 */
export type CanvasSetupFunction = (canvas: HTMLCanvasElement) => (() => void) | undefined;

/**
 * Registers a drawing function with the MainLoop, and unregisters it when the canvas element is destroyed.
 *
 * @param drawFn - Function that receives a CanvasRenderingContext2D and performs drawing operations
 *
 * @example
 *
 * <script lang="ts">
 *   function paint(ctx: CanvasRenderingContext2D) {
 *     ctx.clearRect(0, 0, 64, 64)
 *     ctx.font = "24px Arial";
 *     ctx.fillText("Hello there", 0, 64);
 *   }
 * </script>
 *
 * <canvas {@attach draw2d(paint)}></canvas>
 */
export function draw2d(drawFn: DrawFunction, attributes?: CanvasRenderingContext2DAttributes): CanvasSetupFunction {
   let fn: () => void
   return (canvas: HTMLCanvasElement) => {
      untrack(() => {
         const ctx = attributes ? canvas.getContext('2d', attributes) : canvas.getContext('2d')
         if (!ctx) return
         fn = () => drawFn(ctx)
         loop.register("draw", fn)
      })

      return () => {
         loop.unregister("draw", fn)
      }
   }
}

/**
 * Runs an initialisation function which is passed the canvas context, and which returns a drawing function.
 * Registers the returned drawing function with the MainLoop, and unregisters it when the canvas element is destroyed.
 *
 * @param initFn - Function that receives a CanvasRenderingContext2D, performs setup operations on it,
 *                 and then returns a drawing function to be registered with the MainLoop.
 *
 * @example
 *
 * <script lang="ts">
 *
 *   function init(ctx: CanvasRenderingContext2D) {
 *     ctx.font = "24px Arial"
 *     ctx.fillStyle ="white"
 *     ctx.textBaseline = "top"
 *     return paint
 *   }
 *
 *   function paint(ctx: CanvasRenderingContext2D) {
 *     ctx.clearRect(0, 0, width, height)
 *     ctx.fillText("Hello there", 0, 0);
 *   }
 * </script>
 *
 * <canvas {@attach init(paint)}></canvas>
 */
export function init2d(initFn: InitFunction, attributes?: CanvasRenderingContext2DAttributes): CanvasSetupFunction {
   let fn: () => void
   return (canvas: HTMLCanvasElement) => {
      untrack(() => {
         const ctx = attributes ? canvas.getContext('2d', attributes) : canvas.getContext('2d')
         if (!ctx) return
         const drawFn = initFn(ctx)
         fn = () => drawFn(ctx)
         loop.register("draw", fn)
      })

      return () => {
         loop.unregister("draw", fn)
      }
   }
}

const reactToWindow = () => ([ innerWidth.current, innerHeight.current ])
/**
 * Runs an initialisation function which is passed the canvas context, and which returns a drawing function.
 * Registers the returned drawing function with the MainLoop, and unregisters it when the canvas element is destroyed.
 * Will rerun the initialisation function any time the window inner dimensions change, after updating
 * the canvas width and height to match its new dimensions.
 *
 * @param initFn - Function that receives a CanvasRenderingContext2D, performs setup operations on it,
 *                 and then returns a drawing function to be registered with the MainLoop.
 *
 * @example
 *
 * <script lang="ts">
 *
 *   function init(ctx: CanvasRenderingContext2D) {
 *     ctx.font = "24px Arial"
 *     ctx.fillStyle ="white"
 *     ctx.textBaseline = "top"
 *     return paint
 *   }
 *
 *   function paint(ctx: CanvasRenderingContext2D) {
 *     ctx.clearRect(0, 0, width, height)
 *     ctx.fillText("Hello there", 0, 0);
 *   }
 * </script>
 *
 * <canvas {@attach scale2d(paint)}></canvas>
 */
export function scale2d(initFn: InitFunction, attributes?: CanvasRenderingContext2DAttributes): CanvasSetupFunction {
   let fn: () => void
   reactToWindow()
   return (canvas: HTMLCanvasElement) => {
      const rect = canvas.getBoundingClientRect()
      if (rect) {
         canvas.width = rect.width
         canvas.height = rect.height
      }
      untrack(() => {
         const ctx = attributes ? canvas.getContext('2d', attributes) : canvas.getContext('2d')
         if (!ctx) return
         const drawFn = initFn(ctx)
         fn = () => drawFn(ctx)
         loop.register("draw", fn)
      })

      return () => {
         loop.unregister("draw", fn)
      }
   }
}


/*
Should be able to centralise logic for each context, and
create a different export path that just passes the correct arguments in.

import { draw } from 'svelte-mainloop/canvas/2d'

<canvas {@attach draw(paint)}></canvas>
*/
