import { useEffect } from 'react'
import './App.css'
import useMIDI from './hooks/useMIDI'

function App() {
  useMIDI();

  useEffect(() => {
    document.addEventListener('midiMessage', (e) => console.log(e.detail.data));
  }, []);

  return (
    <div className="App">
    </div>
  )
}

export default App;
