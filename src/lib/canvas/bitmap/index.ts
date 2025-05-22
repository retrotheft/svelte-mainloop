import { type Attachment } from "svelte/attachments"
import { attach } from "../core.js"

const ctx = 'bitmaprenderer'

export const draw = attach.draw(ctx) as (drawFn: (ctx: ImageBitmapRenderingContext) => void, settings?: ImageBitmapRenderingContextSettings) => Attachment<HTMLCanvasElement>
export const init = attach.init(ctx) as (initFn: (ctx: ImageBitmapRenderingContext) => (ctx: ImageBitmapRenderingContext) => void, settings?: ImageBitmapRenderingContextSettings) => Attachment<HTMLCanvasElement>
export const scale = attach.scale(ctx) as (initFn: (ctx: ImageBitmapRenderingContext) => (ctx: ImageBitmapRenderingContext) => void, settings?: ImageBitmapRenderingContextSettings) => Attachment<HTMLCanvasElement>
