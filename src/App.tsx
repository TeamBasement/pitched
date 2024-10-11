import './App.css';
import { AudioManager } from './audio/AudioManager';

function App() {
  const audioManager = new AudioManager();

  const handleInitializeAudio = () => {
    audioManager.initialize();
    console.log("AudioManager initialized");
  };
    <div>
      <h1>Pitched</h1>
      <p>Welcome to Pitched, an app that plays with pitch detection and replication.</p>
      <button onClick={handleInitializeAudio}>Initialize Audio</button>
    </div>
  );
}

export default App;
