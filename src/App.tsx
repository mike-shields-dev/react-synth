import './App.css';
import FilterControls from './components/FilterControls';
import Keyboard from './components/Keyboard';
import WaveformControls from './components/WaveFormControls';
import KeyboardEventHandler from './hooks/KeyboardEventHandler';
import MidiStatusHandler from './hooks/MidiStatusHandler';
import useMidiAccess from './hooks/useMidiAccess';
import MainPanel from './components/MainPanel';

function App() {
  useMidiAccess();
  MidiStatusHandler();
  KeyboardEventHandler();

  return (
    <div className="App">
      <MainPanel>
        <FilterControls />
        <WaveformControls />
        <Keyboard />
      </MainPanel>
    </div>
  )
}

export default App;
