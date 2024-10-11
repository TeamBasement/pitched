export class AudioManager {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Float32Array | null = null;
  private bufferLength: number = 0;

  public initialize() {
    this.audioContext = new window.AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Float32Array(this.bufferLength);
  }

  public shutdown() {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  public async beginListening() {
    if (!this.audioContext) {
      throw new Error("AudioContext is not initialized.");
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = this.audioContext.createMediaStreamSource(stream);
    source.connect(this.analyser!);
  }

  public getTimeData(): Float32Array | null {
    if (this.analyser && this.dataArray) {
      this.analyser.getFloatTimeDomainData(this.dataArray);
      return this.dataArray;
    }
    return null;
  }

  public getFrequencyData(): Float32Array | null {
    if (this.analyser && this.dataArray) {
      this.analyser.getFloatFrequencyData(this.dataArray);
      return this.dataArray;
    }
    return null;
  }
}
