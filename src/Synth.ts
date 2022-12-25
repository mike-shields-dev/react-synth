import { MonoSynth, Gain, now } from 'tone';

const precision = 1000;

const freqFromMidiNoteNumber = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

const roundNum = (n: number, precision: number) =>
  Math.round((n + Number.EPSILON) * precision) / precision;


const monoSynthOptions = {
    filterEnvelope: {
        attack: 0.75,
        decay: 0.75,
        sustain: 0.5,
        release: 8,
        baseFrequency: 5,
        octaves: 20,
        exponent: 10
    },
    filter: { 
        type: 'highpass',
    }
};

class Synth {
    gain = new Gain({ gain: 0.05 });
    oscillators = [...Array(128).fill(null).map((_, i) => ({
        isActive: false,
        frequency: roundNum(freqFromMidiNoteNumber(i), 1000),
        src: new MonoSynth(monoSynthOptions),
    }))];

    toDestination() {
        this.oscillators.forEach(oscillator => oscillator.src.connect(this.gain));
        this.gain.toDestination();
    }

    onNoteOn(noteNumber: number, velocity: number) {
        const osc = this.oscillators[noteNumber];
        if (osc.isActive) return;
        osc.src.triggerAttack(osc.frequency, now());
        osc.isActive = true;
    }

    onNoteOff(noteNumber: number) {
        const osc = this.oscillators[noteNumber];
        if (!osc.isActive) return;
        osc.src.triggerRelease(now());
        osc.isActive = false;
    }

    onCutoff(value: number) {
        this.oscillators.forEach(osc => osc.src.set({ filter: { Q: value }}));
    }
}

const synth = new Synth();
synth.toDestination();

export { synth };