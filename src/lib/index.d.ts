import type { SvelteComponent } from 'svelte'

declare module 'svelte-mainloop' {
   export class JoinLoop extends SvelteComponent { }
   export class ViewLoop extends SvelteComponent { }
}

export type StageString = 'begin' | 'draw' | 'update' | 'end'
/** 
 * The begin() function runs at the beginning of the main loop.
 * Typically used to process input before the updates run. Processing input here (in chunks) 
 * can reduce the running time of event handlers, which is useful because long-running 
 * event handlers can sometimes delay frames.
 * 
 * Unlike update(), which can run zero or more times per frame, begin() always runs exactly 
 * once per frame. This makes it useful for any updates that are not dependent on time in 
 * the simulation. Examples include adjusting HUD calculations or performing long-running 
 * updates incrementally. Compared to end(), generally actions should occur in begin() if 
 * they affect anything that update() or draw() use.
 * @param timestamp The current timestamp (when the frame started), in milliseconds. This should only be 
 * used for comparison to other timestamps because the epoch (i.e. the "zero" time) depends 
 * on the engine running this code. In engines that support DOMHighResTimeStamp (all modern 
 * browsers except iOS Safari 8) the epoch is the time the page started loading, specifically 
 * performance.timing.navigationStart. Everywhere else, including node.js, the epoch is the 
 * Unix epoch (1970-01-01T00:00:00Z).
 * @param delta The total elapsed time that has not yet been simulated, in milliseconds
 * 
 * Note: Parameters can be safely omitted if not needed. (The first will always be timestamp though)
 */
export type BeginCallback = (timestamp: number, delta: number) => void;

/**
 * The draw() function draws things on the screen.
 * Gets passed the percent of time that the next run of update() will simulate that has actually elapsed.
 * 
 * To interpolate motion for rendering purposes, objects' state after the last update() must be 
 * retained and used to calculate an intermediate state. Note that this means renders will be up 
 * to one update() behind. This is still better than extrapolating (projecting objects' state 
 * after a future update()) which can produce bizarre results. Storing multiple states can be 
 * difficult to set up, and keep in mind that running this process takes time that could push 
 * the frame rate down, so it's often not worthwhile unless stuttering is visible.
 * @param interpolationPercentage The cumulative amount of time that hasn't been simulated yet, divided by the amount 
 * of time that will be simulated the next time update() runs. Useful for interpolating frames.
 * 
 * Note: Parameters can be safely omitted if not needed.
 */
export type DrawCallback = (interpolationPercentage: number) => void;

/**
 * The update() function runs updates (e.g. AI and physics).
 * Should simulate anything that is affected by time. Can be called zero or more 
 * times per frame depending on the frame rate.
 * 
 * As with everything in the main loop, the running time of update() directly affects the frame rate. 
 * If update() takes long enough that the frame rate drops below the target ("budgeted") frame rate, 
 * parts of the update() function that do not need to execute between every frame can be moved into 
 * Web Workers. (Various sources on the internet sometimes suggest other scheduling patterns using 
 * setTimeout() or setInterval(). These approaches sometimes offer modest improvements with minimal 
 * changes to existing code, but because JavaScript is single-threaded, the updates will still block 
 * rendering and drag down the frame rate. Web Workers execute in separate threads, so they free up 
 * more time in the main loop.)
 * @param delta The amount of time in milliseconds to simulate in the update.
 * In most cases this timestep never changes to ensure deterministic updates.
 * The timestep is the same as that returned by getSimulationTimestep().
 * 
 * Note: Parameters can be safely omitted if not needed.
 */
export type UpdateCallback = (delta: number) => void;

/**
 * The end() function runs at the end of the main loop.
 * Unlike update(), end() always runs exactly once per frame. This makes it useful for any updates 
 * that are not dependent on time in the simulation. Examples include cleaning up any temporary 
 * state set up by begin(), lowering the visual quality if the frame rate is too low, or performing 
 * long-running updates incrementally. Compared to begin(), generally actions should occur in end() 
 * if they use anything that update() or draw() affect.
 * @param fps The exponential moving average of the frames per second. This can be used to take action 
 * when the FPS is too low (or to restore to normalcy if the FPS moves back up). Examples of 
 * actions to take if the FPS is too low include exiting the application, lowering the visual 
 * quality, stopping or reducing activities outside of the main loop like event handlers or 
 * audio playback, performing non-critical updates less frequently, or increasing the simulation 
 * timestep. Note that this last option results in more time being simulated per update() call, 
 * which causes the application to behave non-deterministically.
 * @param panic Indicates whether the simulation has fallen too far behind real time.
 * Specifically, panic will be true if too many updates occurred in one frame. In networked 
 * lockstep applications, the application should wait for some amount of time to see if the 
 * user can catch up before dropping the user. In networked but non-lockstep applications, 
 * this typically indicates that the user needs to be snapped or eased to the current 
 * authoritative state. When this happens, it may be convenient to call resetFrameDelta() 
 * to discard accumulated pending updates.
 * 
 * Note: Parameters can be safely omitted if not needed. (The first will always be fps though)
 */
export type EndCallback = (fps: number, panic: boolean) => void;
declare const loop: Loop
export default loop