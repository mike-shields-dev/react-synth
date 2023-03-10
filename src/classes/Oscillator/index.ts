import { MonoSynth, MonoSynthOptions } from 'tone';
import { OmniOscillatorType } from 'tone/build/esm/source/oscillator/OscillatorInterface';
import midiNoteNumberToNoteFrequency from '../../utils/noteNumberToFrequency';

class Oscillator extends MonoSynth {
    #isActive: boolean = false;
    #isSilent: boolean = true;
    #noteFrequency: number = 0;

    constructor(noteNumber: number, options: MonoSynthOptions) { 
        super(options);

        this.#noteFrequency = midiNoteNumberToNoteFrequency(noteNumber, 1000);
        this.set({ filterEnvelope: { baseFrequency: this.#noteFrequency } });
        this.onsilence = () => this.#isSilent = true;
    }

    get isActive() {
        return this.#isActive;
    }

    set isActive(bool: boolean) { 
        this.#isActive = bool;
    }

    get noteFrequency() { 
        return this.#noteFrequency;
    }

    set isSilent(bool: boolean) { 
        this.#isSilent = bool;
    }

    get isSilent() { 
        return this.#isSilent;
    }

    noteOn() { 
        this.triggerAttack(this.#noteFrequency);
        this.filterEnvelope.triggerAttack();
        this.isActive = true;
        this.isSilent = false;
    }

    noteOff() { 
        this.triggerRelease();
        this.filterEnvelope.triggerRelease();
        this.isActive = false;
    }

    set waveform(type: OmniOscillatorType) {
        this.oscillator.type = type;
    }
}
 
export default Oscillator;