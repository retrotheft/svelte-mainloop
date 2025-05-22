import { type Attachment } from "svelte/attachments"
import { attach } from "../core.js"

const ctx = '2d'

export const draw = attach.draw(ctx) as (drawFn: (ctx: CanvasRenderingContext2D) => void, settings?: CanvasRenderingContext2DSettings) => Attachment<HTMLCanvasElement>
export const init = attach.init(ctx) as (initFn: (ctx: CanvasRenderingContext2D) => (ctx: CanvasRenderingContext2D) => void, settings?: CanvasRenderingContext2DSettings) => Attachment<HTMLCanvasElement>
export const scale = attach.scale(ctx) as (initFn: (ctx: CanvasRenderingContext2D) => (ctx: CanvasRenderingContext2D) => void, settings?: CanvasRenderingContext2DSettings) => Attachment<HTMLCanvasElement>
