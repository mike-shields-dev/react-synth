import './App.css'
import React from 'react';
import useMidiAccessHandler from './hooks/useMidiAccessHandler'
import SynthMidiMessageHandler from './hooks/SynthMidiMessageHandler';
import KeyboardEventHandler from './hooks/KeyboardEventHandler';
import FilterControls from './components/FilterControls';

function App() {
  useMidiAccessHandler();
  SynthMidiMessageHandler();
  KeyboardEventHandler();

  return (
    <div className="App">
      <FilterControls />
    </div>
  )
}

export default App;
