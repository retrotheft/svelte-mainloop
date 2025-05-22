import { type Attachment } from "svelte/attachments"
import { attach } from "../core.js"

const ctx = 'webgl'

export const draw = attach.draw(ctx) as (drawFn: (ctx: WebGLRenderingContext) => void, settings?: WebGLContextAttributes) => Attachment<HTMLCanvasElement>
export const init = attach.init(ctx) as (initFn: (ctx: WebGLRenderingContext) => (ctx: WebGLRenderingContext) => void, settings?: WebGLContextAttributes) => Attachment<HTMLCanvasElement>
export const scale = attach.scale(ctx) as (initFn: (ctx: WebGLRenderingContext) => (ctx: WebGLRenderingContext) => void, settings?: WebGLContextAttributes) => Attachment<HTMLCanvasElement>
