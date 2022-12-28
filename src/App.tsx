import './App.css'
import React from 'react';
import useMidiAccessHandler from './hooks/useMidiAccessHandler'
import SynthMidiMessageHandler from './hooks/SynthMidiMessageHandler';
import KeyboardEventHandler from './hooks/KeyboardEventHandler';

function App() {
  useMidiAccessHandler();
  SynthMidiMessageHandler();
  KeyboardEventHandler();

  return (
    <div className="App">
    </div>
  )
}

export default App;
