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
  const [state, setState] = useState("unstarted");

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

  useEffect(() => {
    audioManager?.debug_updateSineWaveFrequency(inputPitch);
  }, [inputPitch, audioManager]);

  return (
    <div>
      <div
        style={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          width="100px"
          height="100px"
          src="pitched-clean.webp"
          alt="Pitched Logo"
        />
        <h1 style={{ margin: "0 0 0 10px" }}>Pitched</h1>
      </div>
      <p>
        Welcome to Pitched, an app that plays with pitch detection and
        replication.
      </p>
      <div>
        <p>Current Pitch: {pitch ? pitch.toFixed(2) : "N/A"} Hz</p>
        <p>Confidence: {confidence ? (confidence * 100).toFixed(2) : "N/A"}%</p>
        <NearestNote pitch={pitch} />
      </div>

      {state == "sine-wave" ? (
        <div>
          <div>
            <label htmlFor="pitch-slider">Input Pitch:</label>
            <span style={{ display: "inline-block", width: "60px" }}>
              {inputPitch} Hz
            </span>
            <input
              id="pitch-slider"
              type="range"
              min="20"
              max="2000"
              value={inputPitch}
              onChange={(e) => setInputPitch(Number(e.target.value))}
            />
          </div>
        </div>
      ) : null}

      {state == "unstarted" ? (
        <div>
          <div>
            <button
              onClick={() => {
                audioManager?.initialize();
                audioManager?.debug_connectSineWave();
                setState("sine-wave");
              }}
            >
              Begin with Sine Wave
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                audioManager?.initialize();
                audioManager?.beginListening();
                setState("microphone");
              }}
            >
              Begin with Microphone
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
