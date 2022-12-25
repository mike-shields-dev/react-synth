import { useEffect } from "react";
import { synth } from "../Synth";

function useSynth() {
    function onMidiMessage(e: CustomEvent) {
        const [status, data1, data2] = e.detail.data;

        if (status === 144) onNoteOn([data1, data2]);
        if (status === 128) onNoteOff(data1);
        if (status === 176) onControl([data1, data2]);
    };

    function onNoteOn([noteNumber, velocity]: number[]) {
        synth.onNoteOn(noteNumber, velocity);
    };

    function onNoteOff(noteNumber: number) {
        synth.onNoteOff(noteNumber);
    };

    function onControl([data1, data2]: number[]) {
        const [param, value] = [data1, data2];
        if (param === 74) synth.onCutoff(value);
    }

    useEffect(() => {
        document.addEventListener('midiMessage', onMidiMessage);
        
        return () => document.removeEventListener('midiMessage', onMidiMessage);
     }, []);
}

export default useSynth;