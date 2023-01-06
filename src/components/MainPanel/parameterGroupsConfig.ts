import { toFilterFreq, toFilterQ } from '../../utils/filterScalers';
import {
    toEnvelopeAttack,
    toEnvelopeDecay,
    toEnvelopeSustain,
    toEnvelopeRelease,
    toEnvelopeAmount
} from '../../utils/envelopeScalers';

const uiSectionsConfig = [
    {
        groupName: "Oscillator", 
        parameters: [
            {
                uiType: "ComboBox", 
                paramName: "Type",
                statusByte: 176,
                controlNumber: 21,
                options: ["sine", "sawtooth", "square", "triangle"],
                scale: null,
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
            },
            {
                uiType: "Slider",
                paramName: 'Resonance',
                statusByte: 176,
                controlNumber: 71,
                scale: toFilterQ,
            },
            {
                uiType: "Slider",
                paramName: 'Env Amount',
                statusByte: 176,
                controlNumber: 18,
                scale: toEnvelopeAmount,
            },
            {
                uiType: "Slider",
                paramName: 'Attack',
                statusByte: 176,
                controlNumber: 14,
                scale: toEnvelopeAttack,
            },
            {
                uiType: "Slider",
                paramName: 'Decay',
                statusByte: 176,
                controlNumber: 15,
                scale: toEnvelopeDecay,
            },
            {
                uiType: "Slider",
                paramName: 'Sustain',
                statusByte: 176,
                controlNumber: 16,
                scale: toEnvelopeSustain,
            },
            {
                uiType: "Slider",
                paramName: 'Release',
                statusByte: 176,
                controlNumber: 17,
                scale: toEnvelopeRelease,
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
            }, 
            {
                uiType: "Slider",
                paramName: "Decay",
                statusByte: 176,
                controlNumber: 76,
                scale: toEnvelopeDecay,
            },
            {
                uiType: "Slider",
                paramName: "Sustain",
                statusByte: 176,
                controlNumber: 77,
                scale: toEnvelopeSustain,
            }, 
            {
                uiType: "Slider",
                paramName: "Release",
                statusByte: 176,
                controlNumber: 72,
                scale: toEnvelopeRelease,
            }
        ],
    }
];

export default uiSectionsConfig;