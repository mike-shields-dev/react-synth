import synthConfig from './synthConfig';
import oscillatorConfig from './oscillatorConfig';
import {
    toEnvelopeAmount, toEnvelopeAttack,
    toEnvelopeDecay, toEnvelopeRelease, toEnvelopeSustain
} from '../utils/envelopeScalers';
import { toFilterFreq, toFilterQ } from '../utils/filterScalers';

const parameterGroupsConfig = [
    {
        groupName: "Oscillator", 
        parameters: [
            {
                uiType: "ComboBox", 
                paramName: "Type",
                statusByte: 176,
                controlNumber: 21,
                options: oscillatorConfig.oscillator.types,
                scale: null,
                initValue: oscillatorConfig.oscillator.types.indexOf(synthConfig.oscillator.type),
            }
        ],
    },
    { 
        groupName: "Filter", 
        parameters: [
            {
                uiType: "Slider", 
                paramName: 'Cutoff',
                statusByte: 176,
                controlNumber: 74,
                scale: toFilterFreq,
                initValue: toFilterFreq.invert(synthConfig.filterEnvelope.baseFrequency),
            },
            {
                uiType: "Slider",
                paramName: 'Resonance',
                statusByte: 176,
                controlNumber: 71,
                scale: toFilterQ,
                initValue: toFilterQ.invert(synthConfig.filter.Q),
            },
            {
                uiType: "Slider",
                paramName: 'Env Amount',
                statusByte: 176,
                controlNumber: 18,
                scale: toEnvelopeAmount,
                initValue: toEnvelopeAmount.invert(synthConfig.filterEnvelope.octaves),
            },
            {
                uiType: "Slider",
                paramName: 'Attack',
                statusByte: 176,
                controlNumber: 14,
                scale: toEnvelopeAttack,
                initValue: toEnvelopeAttack.invert(synthConfig.filterEnvelope.attack),
            },
            {
                uiType: "Slider",
                paramName: 'Decay',
                statusByte: 176,
                controlNumber: 15,
                scale: toEnvelopeDecay,
                initValue: toEnvelopeDecay.invert(synthConfig.filterEnvelope.decay),
            },
            {
                uiType: "Slider",
                paramName: 'Sustain',
                statusByte: 176,
                controlNumber: 16,
                scale: toEnvelopeSustain,
                initValue: synthConfig.filterEnvelope.sustain,
            },
            {
                uiType: "Slider",
                paramName: 'Release',
                statusByte: 176,
                controlNumber: 17,
                scale: toEnvelopeRelease,
                initValue: toEnvelopeRelease.invert(synthConfig.filterEnvelope.sustain),
            },
        ]
    },
    {
        groupName: "Amp", 
        parameters: [
            {
                uiType: "Slider",
                paramName: "Attack",
                statusByte: 176,
                controlNumber: 73,
                scale: toEnvelopeAttack,
                initValue: toEnvelopeAttack.invert(synthConfig.envelope.attack),
            }, 
            {
                uiType: "Slider",
                paramName: "Decay",
                statusByte: 176,
                controlNumber: 76,
                scale: toEnvelopeDecay,
                initValue: toEnvelopeDecay.invert(synthConfig.envelope.decay),
            },
            {
                uiType: "Slider",
                paramName: "Sustain",
                statusByte: 176,
                controlNumber: 77,
                scale: toEnvelopeSustain,
                initValue: toEnvelopeSustain.invert(synthConfig.envelope.sustain),
            }, 
            {
                uiType: "Slider",
                paramName: "Release",
                statusByte: 176,
                controlNumber: 72,
                scale: toEnvelopeRelease,
                initValue: toEnvelopeRelease.invert(synthConfig.envelope.release),
            }
        ],
    }
];

export default parameterGroupsConfig;