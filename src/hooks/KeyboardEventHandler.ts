import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import keyIndexFromChar from '../utils/keyIndexFromChar';
import { usePublish } from './PubSub';
import useKeyboardEventListeners from './useKeyboardEventListeners';

const messageId = uuidv4();

function useKeyboardEvents() {
    const [octave, setOctave] = useState(5);
    const [velocity, setVelocity] = useState(80);
    
    useKeyboardEventListeners(onKey);

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
        
        const [statusByte, dataByte1, dataByte2] = [144, noteNumber, velocity];
        
        usePublish('midiMessage', {
            messageId,
            data: [statusByte, dataByte1, dataByte2]
        });
    }

    function onNoteOff(e: KeyboardEvent) { 
        const keyIndex = keyIndexFromChar(e.key);
        if (typeof keyIndex !== 'number') return;
            
        const noteNumber = keyIndex + octave * 12;
        if (noteNumber < 0 || noteNumber > 127) return;
        
        const [statusByte, dataByte1] = [128, noteNumber];
            
        usePublish('midiMessage', {
            messageId,
            data: [statusByte, dataByte1]
        });
    }
}

export default useKeyboardEvents;