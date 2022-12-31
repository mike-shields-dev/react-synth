import './App.css';
import FilterControls from './components/FilterControls';
import Keyboard from './components/Keyboard';
import WaveformControls from './components/WaveFormControls';
import KeyboardEventHandler from './hooks/KeyboardEventHandler';
import MidiStatusHandler from './hooks/MidiStatusHandler';
import useMidiAccess from './hooks/useMidiAccess';

function App() {
  useMidiAccess();
  MidiStatusHandler();
  KeyboardEventHandler();

  return (
    <div className="App">
      <FilterControls />
      <WaveformControls />
      <Keyboard />
    </div>
  )
}

export default App;
