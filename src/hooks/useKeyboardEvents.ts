import { useEffect, useState } from 'react';
import keyIndexFromChar from '../utils/keyIndexFromChar';

function useKeyboardEvents() {
    const [octave, setOctave] = useState(5);
    const [velocity, setVelocity] = useState(80);
    
    useEffect(() => {
        addListeners();
        return () => removeListeners();
    }, []);
    
    function addListeners() { 
        document.addEventListener('keydown', onKey);
        document.addEventListener('keyup', onKey);
    }

    function removeListeners() {
        document.removeEventListener('keydown', onKey);
        document.removeEventListener('keyup', onKey);
    }

    function onKey(e: KeyboardEvent) { 
        if (!e.getModifierState('CapsLock')) return;
        if (e.type === 'keydown') {
            onOctave(e);
            onNoteOn(e);
        }
        if (e.type === 'keyup') onNoteOff(e);
    }
        
    function onOctave(e: KeyboardEvent) { 
        let newOctave = octave;
        
        if (e.key === 'Z') newOctave -= 1;
        if (e.key === 'X') newOctave += 1;
        if (newOctave < 0 || newOctave > 10) return;
        
        setOctave(newOctave);
    }
    
    function onNoteOn(e: KeyboardEvent) { 
        if (e.repeat) return;
        
        const keyIndex = keyIndexFromChar(e.key);
        if (typeof keyIndex !== 'number') return;
        
        const noteNumber = keyIndex + octave * 12;
        if (noteNumber < 0 || noteNumber > 127) return;
        
        const [status, data1, data2] = [144, noteNumber, velocity];
        
        const noteOnEvent = new CustomEvent(
            'midiMessage',
            { detail: { data: [status, data1, data2] } }
        )
        
        document.dispatchEvent(noteOnEvent);
    }

    function onNoteOff(e: KeyboardEvent) { 
        const keyIndex = keyIndexFromChar(e.key);
        if (typeof keyIndex !== 'number') return;
            
        const noteNumber = keyIndex + octave * 12;
        if (noteNumber < 0 || noteNumber > 127) return;
        
        const [status, data1] = [128, noteNumber];
        
        const noteOffEvent = new CustomEvent(
            'midiMessage',
            { detail: { data: [status, data1] } }
        )   
            
        document.dispatchEvent(noteOffEvent);
    }
}

export default useKeyboardEvents;