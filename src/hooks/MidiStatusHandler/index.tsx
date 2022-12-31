import synth from '../../synthInstance';
import { useSubscribe } from "../PubSub";

interface MidiMessage {
    id: string;
    data: [number, number, number];
}

function MidiStatusHandler() {
    function onMidiMessage(_topic: string, payload: MidiMessage) {
        const [statusByte, dataByte1, dataByte2] = payload.data;
        
        if (statusByte === 144) {
            const [noteNumber, velocity] = [dataByte1, dataByte2];
            return synth.onNoteOn([noteNumber, velocity])
        }
        if (statusByte === 128) {
            const noteNumber = dataByte1;
            return synth.onNoteOff(noteNumber);
        }
        if (statusByte === 176) {
            const [controlNumber, controlValue] = [dataByte1, dataByte2];
            return synth.onControlChange([controlNumber, controlValue])
        };
    };

    useSubscribe('midiMessage', onMidiMessage);
    
    return null;
}

export default MidiStatusHandler;