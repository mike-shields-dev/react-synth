import './App.css'
import useMidiAccessHandler from './hooks/useMidiAccessHandler'
import SynthMidiMessageHandler from './hooks/SynthMidiMessageHandler';
import KeyboardEventHandler from './hooks/KeyboardEventHandler';
import FilterControls from './components/FilterControls';
import WaveformControls from './components/WaveFormControls';
import Keyboard from './components/Keyboard';

function App() {
  useMidiAccessHandler();
  SynthMidiMessageHandler();
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
