import useMidiMessageListener from "../useMidiMessageListener";
import isCustomEvent from "../../utils/isCustomEvent";
import synth from '../../synthInstance';

function SynthMidiMessageHandler() {
    function onMidiMessage(e: Event) {
        if (!isCustomEvent(e)) return;
        const [statusByte, dataByte1, dataByte2] = e.detail.data;

        console.log([statusByte, dataByte1, dataByte2]);

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

    useMidiMessageListener(onMidiMessage);
    
    return null;
}

export default SynthMidiMessageHandler;