import { loop } from "../loop.svelte.js"
import { untrack } from 'svelte'
import { innerWidth, innerHeight } from 'svelte/reactivity/window'

const reactToWindow = () => ([ innerWidth.current, innerHeight.current ])

function resizeCanvas(canvas: HTMLCanvasElement) {
   const rect = canvas.getBoundingClientRect()
   if (!rect) return
   canvas.width = rect.width
   canvas.height = rect.height
}

export const attach = {
   draw: (ctx: string) => (drawFn: DrawFunction, settings?: any) => attachFn(ctx, () => drawFn, settings),
   init: (ctx: string) => (initFn: (ctx: CanvasContext) => GetDrawFunction, settings?: any) => attachFn(ctx, initFn, settings),
   scale: (ctx: string) =>  (initFn: (ctx: CanvasContext) => GetDrawFunction, settings?: any) => attachFn(ctx, initFn, settings, reactToWindow, resizeCanvas)
}

type CanvasContext = CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext | ImageBitmapRenderingContext
type DrawFunction = (context: CanvasContext) => void;
type GetDrawFunction = (context: CanvasContext) => DrawFunction

export function attachFn(ctxString: string, getDrawMaybeInitFn: GetDrawFunction, settings?: any, prereactiveFunc?: Function, canvasReactiveFunc?: (canvas: HTMLCanvasElement) => any): any {
   let fn: () => void
   prereactiveFunc?.()
   return function(canvas: HTMLCanvasElement) {
      canvasReactiveFunc?.(canvas)
      untrack(() => {
         const ctx: CanvasContext | null = settings ? canvas.getContext(ctxString, settings) : canvas.getContext(ctxString)
         if (!ctx) return
         const drawFn: DrawFunction = getDrawMaybeInitFn(ctx)
         fn = () => drawFn(ctx)
         loop.register("draw", fn)
      })

      return () => {
         loop.unregister("draw", fn)
      }
   }
}
