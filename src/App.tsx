import './App.css'
import React from 'react';
import useMidiAccessHandler from './hooks/useMidiAccessHandler'
import SynthMidiMessageHandler from './hooks/SynthMidiMessageHandler';
import KeyboardEventHandler from './hooks/KeyboardEventHandler';
import FilterControls from './components/FilterControls';
import WaveformControls from './components/WaveFormControls';

function App() {
  useMidiAccessHandler();
  SynthMidiMessageHandler();
  KeyboardEventHandler();

  return (
    <div className="App">
      <FilterControls />
      <WaveformControls />
    </div>
  )
}

export default App;
