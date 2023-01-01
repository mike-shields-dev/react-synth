import './App.css';
import Keyboard from './components/Keyboard';
import MainPanel from './components/MainPanel';
import uiSections from './components/MainPanel/uiSectionsConfig';
import UISection from './components/UISection';
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
      <MainPanel>
        {uiSections.map(group =>
          <UISection key={group.name} {...group} />
        )}
      </MainPanel>
        <WaveformControls />
        <Keyboard />
    </div>
  )
}

export default App;
