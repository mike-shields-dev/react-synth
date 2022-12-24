import { useEffect, useState } from "react"

const useMIDI = () => { 
  const [isRequesting, setIsRequesting] = useState(true);
  const [midiAccess, setMidiAccess] = useState<WebMidi.MIDIAccess>();
  const [midiAccessError, setMidiAccessError] = useState();
  const [midiInputs, setMidiInputs] = useState<WebMidi.MIDIInputMap>();
  const [midiOutputs, setMidiOutputs] = useState<WebMidi.MIDIOutputMap>();

  const setMidiPorts = (midiAccess: WebMidi.MIDIAccess) => { 
    setMidiInputs(midiAccess.inputs);
    setMidiOutputs(midiAccess.outputs);
  }

  const onMidiMessage = (midiMessage: WebMidi.MIDIMessageEvent) => {
    const midiMessageEvent = new CustomEvent('midiMessage', {
      detail: midiMessage,
    });

    document.dispatchEvent(midiMessageEvent);
  }

  const addEventListeners = (midiInputs: WebMidi.MIDIInputMap) => {
    midiInputs.forEach(midiInput => midiInput.addEventListener('midimessage', onMidiMessage));
  };
  
  useEffect(() => {
    navigator
        .requestMIDIAccess()
        .then(setMidiAccess)
        .then(() => setIsRequesting(false))
        .catch(setMidiAccessError);
  }, []);

  useEffect(() => {
    if (midiAccess) {
      setMidiPorts(midiAccess);
      midiAccess.addEventListener('statechange', () => setMidiPorts(midiAccess));
    }
  }, [midiAccess]);

  useEffect(() => {
    if (midiInputs) { addEventListeners(midiInputs) };
  }, [midiInputs]);

  return { isRequesting, midiAccess, midiAccessError, midiInputs, midiOutputs };
}

export default useMIDI;