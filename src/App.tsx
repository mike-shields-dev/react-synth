import './App.css';
import Keyboard from './components/Keyboard';
import MainPanel from './components/MainPanel';
import parameterGroupsConfig from './components/MainPanel/parameterGroupsConfig';
import ParameterGroup from './components/ParameterGroup';
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
        {parameterGroupsConfig.map(group =>
          <ParameterGroup key={group.groupName} {...group} />
        )}
      </MainPanel>
        <Keyboard />
    </div>
  )
}

export default App;
