import { PitchDetector } from "pitchy";

export class AudioManager {
  private readonly audioContext: AudioContext;
  private readonly analyser: AnalyserNode;
  private readonly pitchDetector: PitchDetector<Float32Array>;
  private readonly bufferLength: number = 0;

  public constructor() {
    this.audioContext = new window.AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.pitchDetector = PitchDetector.forFloat32Array(this.analyser.fftSize);
  }

  public initialize() {}

  public shutdown() {
    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  public async beginListening() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = this.audioContext.createMediaStreamSource(stream);
    source.connect(this.analyser!);
  }

  public getTimeData(): Float32Array {
    const data = new Float32Array(this.analyser.fftSize);
    this.analyser.getFloatTimeDomainData(data);
    return data;
  }

  public getFrequencyData(): Float32Array {
    const data = new Float32Array(this.analyser.frequencyBinCount);
    this.analyser.getFloatFrequencyData(data);
    return data;
  }

  public getPitch(): { pitch: number; confidence: number } {
    const data = this.getTimeData();
    const [pitch, confidence] = this.pitchDetector.findPitch(
      data,
      this.audioContext.sampleRate
    );
    return { pitch, confidence };
  }

  /**
   * Debug method to connect a sine wave.
   * @param frequency
   */
  public debug_connectSineWave(frequency: number = 440) {
    const oscillator = this.audioContext.createOscillator();
    oscillator.type = "sine"; // Set the waveform type to sine
    oscillator.frequency.setValueAtTime(
      frequency,
      this.audioContext.currentTime
    ); // Set frequency to 440 Hz (A4)
    oscillator.connect(this.analyser);
    oscillator.start();
  }
}
