import { PitchDetector } from "pitchy";

export class AudioManager {
  private readonly audioContext: AudioContext;
  private readonly analyser: AnalyserNode;
  private readonly dataArray: Float32Array;
  private readonly pitchDetector: PitchDetector<Float32Array>;
  private readonly bufferLength: number = 0;

  public constructor() {
    this.audioContext = new window.AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Float32Array(this.bufferLength);
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
    this.analyser.getFloatTimeDomainData(this.dataArray);
    return this.dataArray;
  }

  public getFrequencyData(): Float32Array {
    this.analyser.getFloatFrequencyData(this.dataArray);
    return this.dataArray;
  }

  public getPitch(): { pitch: number; confidence: number } {
    const data = this.getTimeData();
    const [pitch, confidence] = this.pitchDetector.findPitch(
      data,
      this.audioContext.sampleRate
    );
    return { pitch, confidence };
  }

  public debug_connectSineWave() {}
}
