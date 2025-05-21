import MainLoop from './mainloop.js';

type StageString = 'begin' | 'update' | 'draw' | 'end';

export type BeginCallback = (timestamp: number, delta: number) => void
export type DrawCallback = (interpolationPercentage: number) => void
export type UpdateCallback = (delta: number) => void
export type EndCallback = (fps: number, panic: boolean) => void

interface LoopState {
  isRunning: boolean;
  timestamp: number;
  lastTimestamp: number;
  lastAbsence: number;
  checkAway: boolean;
  frame: number;
  tick: number;
  fps: number;
  lastInterp: number;
  lastDelta: number;
  panic: boolean;
}

export class Loop {
  // Functions for each stage
  functions: Record<StageString, Function[]> = $state({
    begin: [],
    draw: [],
    update: [],
    end: []
  });

  // Derived lengths for each function array
  lengths = $derived({
    begin: this.functions.begin.length,
    draw: this.functions.draw.length,
    update: this.functions.update.length,
    end: this.functions.end.length
  });

  // State for the loop
  state: LoopState = $state({
    isRunning: false,
    timestamp: 0,
    lastTimestamp: 0,
    lastAbsence: 0,
    checkAway: false,
    frame: 0,
    tick: 0,
    fps: 0,
    lastInterp: 0,
    lastDelta: 0,
    panic: false
  });

  constructor() {
    MainLoop.setBegin((timestamp: number, delta: number) => this.#run("begin", [timestamp, delta]));
    MainLoop.setDraw((interpolationPercentage: number) => this.#run("draw", [interpolationPercentage]));
    MainLoop.setUpdate((delta: number) => this.#run("update", [delta / 1000]));
    MainLoop.setEnd((fps: number, panic: boolean) => this.#run("end", [fps, panic]));

    this.register("begin", this.#begin);
    this.register("draw", this.#draw);
    this.register("update", this.#update);
    this.register("end", this.#end);

    if (typeof document !== 'undefined') {
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) return this.stop();
        return this.start(); // needs to check for manual pause first
      });
    }
  }

  /**
   * Runs all functions registered for a particular stage
   */
  #run(stage: StageString, params: any[]): void {
    this.functions[stage].forEach((fn) => {
      fn(...params);
    });
  }

  /**
   * Adds a function to a stage if it doesn't already exist
   */
  #addFunction(stage: StageString, fn: Function): void {
    if (this.functions[stage].indexOf(fn) === -1) this.functions[stage].push(fn);
  }

  /**
   * Removes a function from a stage if it exists
   */
  #removeFunction(stage: StageString, fn: Function): void {
    const index = this.functions[stage].indexOf(fn);
    if (index > -1) this.functions[stage].splice(index, 1);
  }

  /**
   * Register a function for a specific stage
   */
  register = (stage: StageString, fn: Function): void => this.#addFunction(stage, fn);

  /**
   * Unregister a function from a specific stage
   */
  unregister = (stage: StageString, fn: Function): void => this.#removeFunction(stage, fn);

  /**
   * Begin callback that updates timestamp and checks for absence
   */
  #begin: BeginCallback = (timestamp, delta) => {
    this.state.timestamp = timestamp;
    if (this.state.checkAway) {
      this.state.lastAbsence = timestamp - this.state.lastTimestamp;
      this.state.checkAway = false;
    }
  };

  /**
   * Draw callback that updates interpolation and frame counter
   */
  #draw: DrawCallback = (interp) => {
    this.state.lastInterp = interp;
    this.state.frame++;
  };

  /**
   * Update callback that increments tick and updates delta
   */
  #update: UpdateCallback = (delta) => {
    this.state.tick++;
    this.state.lastDelta = delta * 1000;
  };

  /**
   * End callback that updates fps and panic state
   */
  #end: EndCallback = (fps, panic) => {
    this.state.fps = fps;
    this.state.panic = panic;
  };

  /**
   * Returns the time elapsed since the loop was last active
   */
  getLastAbsence = (): number => this.state.lastAbsence;

  /**
   * Returns the exponential moving average of the frames per second.
   */
  getFPS = MainLoop.getFPS;

  /**
   * Gets the maximum frame rate.
   * Other factors also limit the FPS; see `MainLoop.setSimulationTimestep` for details.
   */
  getMaxAllowedFPS = MainLoop.getMaxAllowedFPS;

  /**
   * Gets how many milliseconds should be simulated by every run of update().
   */
  getSimulationTimestep = MainLoop.getSimulationTimestep;

  /**
   * Sets the maximum frame rate.
   * @param fps The maximum number of frames per second to execute.
   * If Infinity or not passed, there will be no FPS cap. If zero, this will stop the loop.
   */
  setMaxAllowedFPS = MainLoop.setMaxAllowedFPS;

  /**
   * Sets how many milliseconds should be simulated by every run of update().
   * @param timestep The number of milliseconds that should be simulated by every run of update()
   */
  setSimulationTimestep = MainLoop.setSimulationTimestep;

  /**
   * Starts the main loop.
   */
  start = (): void => {
    MainLoop.start();
    requestAnimationFrame(() => (this.state.isRunning = true));
  };

  /**
   * Stops the main loop.
   */
  stop = (): void => {
    this.state.isRunning = false;
    MainLoop.stop();
    this.state.lastTimestamp = this.state.timestamp;
    this.state.checkAway = true;
  };

  /**
   * Stops the main loop and resets frame and tick counters to 1.
   */
  reset = (): void => {
    this.stop();
    this.state.frame = 1;
    this.state.tick = 1;
  };
}

// Define the MainLoop interface for TypeScript
export interface MainLoopInterface {
  setBegin: (beginCallback: BeginCallback) => void;
  setDraw: (drawCallback: DrawCallback) => void;
  setUpdate: (updateCallback: (delta: number) => void) => void;
  setEnd: (endCallback: EndCallback) => void;
  getFPS: () => number;
  getMaxAllowedFPS: () => number;
  getSimulationTimestep: () => number;
  setMaxAllowedFPS: (fps?: number) => void;
  setSimulationTimestep: (timestep: number) => void;
  start: () => void;
  stop: () => void;
}

// Create and export the loop instance
export let loop: Loop | {
  register: (stage: StageString, fn: Function) => void;
  unregister: (stage: StageString, fn: Function) => void;
  state: LoopState;
  functions: Record<StageString, Function[]>;
  lengths: Record<StageString, number>;
  getLastAbsence: () => number;
  getFPS: () => number;
  getMaxAllowedFPS: () => number;
  getSimulationTimestep: () => number;
  setMaxAllowedFPS: (fps?: number) => void;
  setSimulationTimestep: (timestep: number) => void;
  start: () => void;
  stop: () => void;
  reset: () => void;
};

if (typeof window !== 'undefined') {
  loop = new Loop();
  loop.start();
} else {
  // Provide a no-op version for SSR
  console.warn(
    'svelte-mainloop was imported in a non-browser environment (probably during SSR). ' +
    'A no-op version will be used. The loop will start when the page hydrates in the browser.'
  );
  loop = {
    register: () => { },
    unregister: () => { },
    state: {
      isRunning: false,
      timestamp: 0,
      lastTimestamp: 0,
      lastAbsence: 0,
      checkAway: false,
      frame: 0,
      tick: 0,
      fps: 0,
      lastInterp: 0,
      lastDelta: 0,
      panic: false
    },
    functions: {
      begin: [],
      draw: [],
      update: [],
      end: []
    },
    lengths: {
      begin: 0,
      draw: 0,
      update: 0,
      end: 0
    },
    getLastAbsence: () => 0,
    getFPS: () => 0,
    getMaxAllowedFPS: () => 0,
    getSimulationTimestep: () => 0,
    setMaxAllowedFPS: () => { },
    setSimulationTimestep: () => { },
    start: () => { },
    stop: () => { },
    reset: () => { },
  };
}

export default loop;
