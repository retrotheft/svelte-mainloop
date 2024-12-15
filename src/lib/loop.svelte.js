/** @typedef {'begin' | 'draw' | 'update' | 'end'} StageString */

import MainLoop from 'mainloop.js'

class Loop {
   /** @type {Object.<StageString, Function[]>} */
   functions = $state({
      begin: [],
      draw: [],
      update: [],
      end: []
   });
   /** @type {Object.<StageString, number>} */
   lengths = $derived({
      begin: this.functions.begin.length,
      draw: this.functions.draw.length,
      update: this.functions.update.length,
      end: this.functions.end.length
   })
   /** @typedef {import('./types').LoopState} LoopState */
   state = $state({
      isVisible: true,
      timestamp: 0,
      lastTimestamp: 0,
      lastAbsence: 0,
      checkAway: false,
      frame: 0,
      tick: 0,
      isRunning: false,
      fps: 0,
      lastInterp: 0,
      lastDelta: 0,
      panic: false
   });
   constructor() {
      MainLoop.setBegin((timestamp, delta) => this.#run("begin", [timestamp, delta]))
      MainLoop.setDraw((interpolationPercentage) => this.#run("draw", [interpolationPercentage]))
      MainLoop.setUpdate((delta) => this.#run("update", [delta / 1000]))
      MainLoop.setEnd((fps, panic) => this.#run("end", [fps, panic]))

      this.register("begin", this.begin)
      this.register("draw", this.draw)
      this.register("update", this.update)
      this.register("end", this.end)

      document.addEventListener("visibilitychange", () => {
         if (document.hidden) return this.stop()
         return this.start() // needs to check for manual pause first
      })
   }

   /**
    * @param {StageString} stage
    * @param {any} params
    */
   #run(stage, params) {
      this.functions[stage].forEach((fn) => {
         fn(...params)
      })
   }

   /**
    * @param {StageString} stage
    * @param {Function} fn
    * @returns {void}
    */
   #addFunction(stage, fn) {
      if (this.functions[stage].indexOf(fn) === -1) this.functions[stage].push(fn)
   }

   /**
    * @param {StageString} stage
    * @param {Function} fn
    * @returns {void}
    */
   #removeFunction(stage, fn) {
      const index = this.functions[stage].indexOf(fn)
      if (this.functions[stage].indexOf(fn) > -1) this.functions[stage].splice(index, 1)
   }

   /**
    * @param {StageString} stage
    * @param {Function} fn
    */
   register = (stage, fn) => this.#addFunction(stage, fn);

   /**
    * @param {StageString} stage
    * @param {Function} fn
    */
   unregister = (stage, fn) => this.#removeFunction(stage, fn);

   
   /** @typedef {import('./types').BeginCallback} BeginCallback */
   begin = (timestamp, delta) => {
      this.state.timestamp = timestamp
      if (this.state.checkAway) {
         this.state.lastAbsence = timestamp - this.state.lastTimestamp
         this.state.checkAway = false
      }
   };

   /** @typedef {import('./types').DrawCallback} DrawCallback */
   draw = (interp) => {
      this.state.lastInterp = interp
      this.state.frame++
   };

   /** @typedef {import('./types').UpdateCallback} UpdateCallback */
   update = (delta) => {
      this.state.tick++
      this.state.lastDelta = delta * 1000
   };

   /** @typedef {import('./types').EndCallback} EndCallback */
   end = (fps, panic) => {
      this.state.fps = fps
      this.state.panic = panic
   };

   /**
    * @returns {number}
    */
   getLastAbsence = () => this.state.lastAbsence;

   /**
     * Returns the exponential moving average of the frames per second.
     * @returns {number} The exponential moving average of the frames per second.
     */
   getFPS = MainLoop.getFPS;

   /**
    * Gets the maximum frame rate.
    * Other factors also limit the FPS; see `MainLoop.setSimulationTimestep` for details.
    * 
    * See also `MainLoop.setMaxAllowedFPS()`.
    * @returns {number} The maximum number of frames per second allowed.
    */
   getMaxAllowedFPS = MainLoop.getMaxAllowedFPS;

   /**
    * Gets how many milliseconds should be simulated by every run of update().
    * See `MainLoop.setSimulationTimestep()` for details on this value.
    * @returns {number} The number of milliseconds that should be simulated by every run of update()
    */
   getSimulationTimestep = MainLoop.getSimulationTimestep;

   /**
    * Sets the maximum frame rate.
    * @param {number} [fps=Infinity] The maximum number of frames per second to execute. 
    * If Infinity or not passed, there will be no FPS cap. If zero, this will stop the loop.
    * @returns {void}
    */
   setMaxAllowedFPS = MainLoop.setMaxAllowedFPS;

   /**
    * Sets how many milliseconds should be simulated by every run of update().
    * The perceived frames per second (FPS) is effectively capped at the multiplicative inverse of the simulation timestep.
    * @param {number} timestep The number of milliseconds that should be simulated by every run of update()
    * @returns {void}
    */
   setSimulationTimestep = MainLoop.setSimulationTimestep;

   /**
    * Starts the main loop.
    * Note that the application is not considered "running" immediately after this function returns;
    * rather, it is considered "running" after the application draws its first frame.
    * @returns {void}
    */
   start() {
       MainLoop.start();
       requestAnimationFrame(() => (this.state.isRunning = true));
   }

   /**
    * Stops the main loop.
    * Event handling and other background tasks should also be paused when the main loop is paused.
    * @returns {void}
    */
   stop() {
       this.state.isRunning = false;
       MainLoop.stop();
       this.state.lastTimestamp = this.state.timestamp;
       this.state.checkAway = true;
   }

   /**
    * Stops the main loop and resets frame and tick counters to 1.
    * @returns {void} 
    */
   reset = () => {
      this.stop()
      this.state.frame = 1
      this.state.tick = 1
   };
}

const loop = new Loop()

loop.start()

export default loop

