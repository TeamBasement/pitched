class AudioContext {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;
  private bufferLength: number = 0;

  public initialize() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
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

  public getTimeData(): Uint8Array | null {
    if (this.analyser && this.dataArray) {
      this.analyser.getByteTimeDomainData(this.dataArray);
      return this.dataArray;
    }
    return null;
  }

  public getFrequencyData(): Uint8Array | null {
    if (this.analyser && this.dataArray) {
      this.analyser.getByteFrequencyData(this.dataArray);
      return this.dataArray;
    }
    return null;
  }
}
