import { useEffect, useState } from "react";
import "./App.css";
import { AudioManager } from "./audio/AudioManager";
import { nearestNote } from "./audio/utils";

const NearestNote: React.FC<{ pitch: number | null }> = ({ pitch }) => {
  if (!pitch) {
    return null;
  }
  const { name, pitch: notePitch } = nearestNote(pitch ?? 0);

  return (
    <div>
      <p>
        Nearest Note: {name} ({notePitch} Hz)
      </p>
      <p>Note Difference: {(pitch - notePitch).toFixed(2)} Hz</p>
    </div>
  );
};

function App() {
  const [audioManager, setAudioManager] = useState<AudioManager | null>(null);
  const [pitch, setPitch] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [inputPitch, setInputPitch] = useState<number>(440); // Default to A4

  useEffect(() => {
    const manager = new AudioManager();
    setAudioManager(manager);
    return () => manager.shutdown();
  }, []);

  useEffect(() => {
    const updatePitch = () => {
      if (audioManager) {
        const { pitch, confidence } = audioManager.getPitch();
        setPitch(pitch);
        setConfidence(confidence);
      }
    };
    const intervalId = setInterval(updatePitch, 100);
    return () => clearInterval(intervalId);
  }, [audioManager]);

  return (
    <div>
      <h1>Pitched</h1>
      <p>
        Welcome to Pitched, an app that plays with pitch detection and
        replication.
      </p>
      <div>
        <p>Current Pitch: {pitch ? pitch.toFixed(2) : "N/A"} Hz</p>
        <p>Confidence: {confidence ? (confidence * 100).toFixed(2) : "N/A"}%</p>
        <NearestNote pitch={pitch} />
      </div>
      <div>
        <label htmlFor="pitch-slider">Input Pitch:</label>
        <span>{inputPitch} Hz</span>
        <input
          id="pitch-slider"
          type="range"
          min="20"
          max="2000"
          value={inputPitch}
          onChange={(e) => setInputPitch(Number(e.target.value))}
        />
      </div>
      <button
        onClick={() => {
          audioManager?.initialize();
          audioManager?.debug_connectSineWave(80);
        }}
      >
        Begin
      </button>
    </div>
  );
}

export default App;
