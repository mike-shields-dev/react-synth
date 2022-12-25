import './App.css'
import useMIDI from './hooks/useMIDI'
import useSynth from './hooks/useSynth';
import useKeyboardEvents from './hooks/useKeyboardEvents';

function App() {
  useMIDI();
  useSynth();
  useKeyboardEvents();

  return (
    <div className="App">
    </div>
  )
}

export default App;
