class Keyboard {
   private buffer: { key: string, timestamp: number }[] = [];
   private readonly bufferSize = 10;  // How many inputs to remember
   private readonly bufferTimeWindow = 500;  // How long to remember inputs (in ms)

   constructor() {
       window.addEventListener('keydown', (e) => this.addToBuffer(e.code));
   }

   private addToBuffer(key: string) {
       const now = performance.now();
       
       // Add new input
       this.buffer.push({ key, timestamp: now });
       
       // Remove old inputs outside the time window
       this.buffer = this.buffer.filter(input => 
           now - input.timestamp < this.bufferTimeWindow
       );

       // Trim buffer to size
       if (this.buffer.length > this.bufferSize) {
           this.buffer.shift();
       }
   }

   // Get the last n inputs
   getBuffer(count: number = this.bufferSize): string[] {
       return this.buffer.map(input => input.key).slice(-count);
   }

   // Check if a sequence of inputs was performed
   checkSequence(sequence: string[]): boolean {
       const recent = this.getBuffer(sequence.length);
       return sequence.every((key, i) => key === recent[i]);
   }

   // Clear the buffer
   clearBuffer() {
       this.buffer = [];
   }
}

export default new Keyboard();