import { Gain, BaseContext} from 'tone';
import midiControlValueToFrequency from '../../utils/controlValueToFrequency';
import midiControlValueToResonance from '../../utils/controlValueToResonance';
import Oscillator from '../Oscillator';

class Synth {
    #filterCutoff: number = 200;
    #filterResonance: number = 0;
    #gain = new Gain({ gain: 0.05 });
    #oscillators = [...Array(128).fill(null).map((_, i) =>
        new Oscillator({
            oscillator: {
                type: 'sawtooth',
                volume: 1,
                phase: 0,
                mute: false,
                onstop: () => null,
            },
            filter: {
                type: 'lowpass',
                detune: 0,
                frequency: 0,
                gain: 1,
                Q: 0,
                rolloff: -12,
            }, 
            envelope: {
                attack: 0,
                attackCurve: "linear",
                decay: 0,
                decayCurve: "linear",
                sustain: 1,
                release: 1,
                releaseCurve: "linear",
            },
            detune: 0,
            filterEnvelope: {
                attack: 0,
                attackCurve: "linear",
                baseFrequency: 0,
                decay: 0,
                decayCurve: 'linear',
                exponent: 0,
                octaves: 0,
                release: 0,
                releaseCurve: 'linear',
                sustain: 0,
            },
            onsilence: () => null,
            portamento: 0,
            volume: 0,
        }, i)
    )];

    toDestination() {
        this.#oscillators.forEach(oscillator => oscillator.connect(this.#gain));
        this.#gain.toDestination();
    }

    onNoteOn([noteNumber, velocity]: number[]) {
        const osc = this.#oscillators[noteNumber];
        if (osc.isActive) return;

        if (!velocity) velocity = 0;

        osc.set({ filterEnvelope: { baseFrequency: this.#filterCutoff } });
        osc.noteOn();
    }

    onNoteOff(noteNumber: number) {
        const osc = this.#oscillators[noteNumber];
        if (!osc.isActive) return;
        osc.noteOff();
    }

    onControlChange([controlNumber, controlValue]: number[]) {
        if (controlNumber === 71) return this.onResonance(controlValue);
        if (controlNumber === 74) return this.onCutoff(controlValue);
    }

    onResonance(controlValue: number) {
        this.#filterResonance = midiControlValueToResonance(controlValue);
        this.#oscillators.forEach(osc =>
            osc.set({ filter: { Q: this.#filterResonance } })
        );
    }

    onCutoff(controlValue: number) {
        this.#filterCutoff = midiControlValueToFrequency(controlValue);
        this.#oscillators.forEach(osc => 
            !osc.isSilent &&
            osc.set({ filterEnvelope: { baseFrequency: this.#filterCutoff } })
        );
    }
}

export default Synth;