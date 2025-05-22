import { type Attachment } from "svelte/attachments"
import { attach } from "../core.js"

const ctx = 'webgl2'

export const draw = attach.draw(ctx) as (drawFn: (ctx: WebGL2RenderingContext) => void, settings?: WebGLContextAttributes) => Attachment<HTMLCanvasElement>
export const init = attach.init(ctx) as (initFn: (ctx: WebGL2RenderingContext) => (ctx: WebGL2RenderingContext) => void, settings?: WebGLContextAttributes) => Attachment<HTMLCanvasElement>
export const scale = attach.scale(ctx) as (initFn: (ctx: WebGL2RenderingContext) => (ctx: WebGL2RenderingContext) => void, settings?: WebGLContextAttributes) => Attachment<HTMLCanvasElement>
