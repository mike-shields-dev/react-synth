import { Gain } from 'tone';
import { OmniOscillatorType } from 'tone/build/esm/source/oscillator/OscillatorInterface';
import midiControlValueToFrequency from '../../utils/controlValueToFrequency';
import midiControlValueToResonance from '../../utils/controlValueToResonance';
import Oscillator from '../Oscillator';
import mapRange from '../../utils/mapRange';

class Synth {
    #filterCutoff: number = 200;
    #filterResonance: number = 0;
    #oscTypes: OmniOscillatorType[] = ['sine', 'sawtooth', 'square', 'triangle'];
    #gain = new Gain({ gain: 0.05 });
    #oscillators = [...Array(128).fill(null).map((_, i) =>
        new Oscillator({
            oscillator: {
                type: this.oscTypes[0],
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

    get oscTypes() {
        return this.#oscTypes;
    }

    toDestination() {
        this.#oscillators.forEach(oscillator => oscillator.connect(this.#gain));
        this.#gain.toDestination();
    }

    onNoteOn([noteNumber, velocity = 0]: number[]) {
        const osc = this.#oscillators[noteNumber];
        if (osc.isActive) return;
        osc.set({ filterEnvelope: { baseFrequency: this.#filterCutoff } });
        osc.noteOn();
    }

    onNoteOff(noteNumber: number) {
        const osc = this.#oscillators[noteNumber];
        if (!osc.isActive) return;
        osc.noteOff();
    }

    onControlChange([controlNumber, controlValue]: number[]) {
        if (controlNumber === 21) return this.onOscType(controlValue);
        if (controlNumber === 71) return this.onResonance(controlValue);
        if (controlNumber === 74) return this.onCutoff(controlValue);
    }

    onResonance(controlValue: number) {
        this.#filterResonance = midiControlValueToResonance({ value: controlValue });
        this.#oscillators.forEach(osc =>
            osc.set({ filter: { Q: this.#filterResonance } })
        );
    }

    onCutoff(controlValue: number) {
        this.#filterCutoff = midiControlValueToFrequency({ value: controlValue });
        this.#oscillators.forEach(osc => 
            !osc.isSilent &&
            osc.set({ filterEnvelope: { baseFrequency: this.#filterCutoff } })
        );
    }

    onOscType(controlValue: number) {
        const index = Math.floor(
            mapRange({
                value: +controlValue,
                inRangeMin: 0, inRangeMax: 127,
                outRangeMin: 0, outRangeMax: this.oscTypes.length - 1
            })
        )
        this.#oscillators.forEach(osc =>
            osc.oscillator.type = this.oscTypes[index]
        );
    }
}

export default Synth;