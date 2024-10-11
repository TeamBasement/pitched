import { useEffect, useState } from "react";
import "./App.css";
import { AudioManager } from "./audio/AudioManager";

function App() {
  const [audioManager, setAudioManager] = useState<AudioManager | null>(null);

  useEffect(() => {
    const audioManager = new AudioManager();
    setAudioManager(audioManager);
    return () => audioManager.shutdown();
  }, []);

  return (
    <div>
      <h1>Pitched</h1>
      <p>
        Welcome to Pitched, an app that plays with pitch detection and
        replication.
      </p>
      <button onClick={() => audioManager?.initialize()}>Begin</button>
    </div>
  );
}

export default App;
