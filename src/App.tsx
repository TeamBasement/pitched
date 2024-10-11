import { useEffect, useState } from "react";
import "./App.css";
import { AudioManager } from "./audio/AudioManager";

function App() {
  const [audioManager, setAudioManager] = useState<AudioManager | null>(null);
  const [pitch, setPitch] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);

  useEffect(() => {
    const audioManager = new AudioManager();
    setAudioManager(audioManager);
    
    const updatePitch = () => {
      if (audioManager) {
        const { pitch, confidence } = audioManager.getPitch();
        setPitch(pitch);
        setConfidence(confidence);
      }
      requestAnimationFrame(updatePitch);
    };

    updatePitch();

    return () => {
      audioManager.shutdown();
    };
  }, []);

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
      </div>
        onClick={() => {
          audioManager?.initialize();
          audioManager?.debug_connectSineWave();
        }}
      >
        Begin
      </button>
    </div>
  );
}

export default App;
