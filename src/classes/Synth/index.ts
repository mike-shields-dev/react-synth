import { Gain } from 'tone';
import { OmniOscillatorType } from 'tone/build/esm/source/oscillator/OscillatorInterface';
import { toFilterFreq, toFilterQ }  from '../../utils/filterScalers';
import mapRange from '../../utils/mapRange';
import Oscillator from '../Oscillator';
import { 
    toEnvelopeAttack, 
    toEnvelopeDecay, 
    toEnvelopeSustain, 
    toEnvelopeRelease, 
    toEnvelopeAmount
} from '../../utils/envelopeScalers';
    
class Synth {
    #oscillatorConfig: any = {
        oscillator: {
            type: "square",
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
            attack: 0.5,
            attackCurve: "linear",
            decay: 1,
            decayCurve: "linear",
            sustain: 1,
            release: 3,
            releaseCurve: "linear",
        },
        detune: 0,
        filterEnvelope: {
            attack: 0.5,
            attackCurve: "linear",
            baseFrequency: 2000,
            decay: 1,
            decayCurve: 'linear',
            exponent: 1,
            octaves: 0,
            release: 3,
            releaseCurve: 'linear',
            sustain: 1,
        },
        onsilence: () => null,
        portamento: 0,
        volume: 0,
    };
    
    #oscTypes: OmniOscillatorType[] = ['sine', 'sawtooth', 'square', 'triangle'];
    #gain = new Gain({ gain: 0.05 });
    #oscillators = [...Array(128).fill(null).map((_, noteNumber) => 
        new Oscillator(noteNumber, this.#oscillatorConfig)
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
        osc.set(this.#oscillatorConfig);
        osc.noteOn();
    }

    onNoteOff(noteNumber: number) {
        const osc = this.#oscillators[noteNumber];
        if (!osc.isActive) return;
        osc.noteOff();
    }

    onControlChange([controlNumber, controlValue]: number[]) {
        if (controlNumber === 21) return this.onOscType(controlValue);
        if (controlNumber === 71) return this.update(["filter", "Q"], controlValue, toFilterQ);
        if (controlNumber === 74) return this.update(["filterEnvelope", "baseFrequency"], controlValue, toFilterFreq);
        if (controlNumber === 18) return this.update(["filterEnvelope", "octaves"], controlValue, toEnvelopeAmount);
        if (controlNumber === 14) return this.update(["filterEnvelope", "attack"], controlValue, toEnvelopeAttack);
        if (controlNumber === 15) return this.update(["filterEnvelope", "decay"], controlValue, toEnvelopeDecay);
        if (controlNumber === 16) return this.update(["filterEnvelope", "sustain"], controlValue, toEnvelopeSustain);
        if (controlNumber === 17) return this.update(["filterEnvelope", "release"], controlValue, toEnvelopeRelease);
        if (controlNumber === 73) return this.update(["envelope", "attack"], controlValue, toEnvelopeAttack);
        if (controlNumber === 74) return this.update(["envelope", "decay"], controlValue, toEnvelopeDecay);
        if (controlNumber === 77) return this.update(["envelope", "sustain"], controlValue, toEnvelopeSustain);
        if (controlNumber === 72) return this.update(["envelope", "release"], controlValue, toEnvelopeRelease);
    }


    getValue(obj: any, keys: string[]) {
        if (!keys.length) throw new Error('Keys array cannot be empty');
        let current = obj;

        for (const key of keys) {
            if (!current.hasOwnProperty(key)) throw new Error(`Key "${key}" does not exist in object`);
            
            current = current[key];
        }

        return current;
    }

    setValue(obj: any, keys: string[], value: string | number) {
        if (!keys.length) throw new Error('Keys array cannot be empty');
        
        const key = keys[0];
        
        if (keys.length === 1) return obj[key] = value;
      
        if (!obj.hasOwnProperty(key)) throw new Error(`Key "${key}" not found in object`);
        
        this.setValue(obj[key], keys.slice(1), value);
    }

    update(keys: string[], controlValue: number, toScale: (n: number) => number) {
        let paramValue = this.getValue(this.#oscillatorConfig, keys);
        
        const scaledValue = toScale(controlValue);
          
        this.setValue(this.#oscillatorConfig, keys, scaledValue);

        this.#oscillators.forEach(osc =>
            !osc.isSilent && osc.set({
                [keys[0]]: {
                   [keys[1]]: paramValue,     
                }   
            }));
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