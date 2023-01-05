import { toFilterFreq, toFilterQ } from '../../utils/filterScalers';

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
                paramName: 'Attack',
                statusByte: 176,
                controlNumber: 14,
                scale: null,
            },
            {
                uiType: "Slider",
                paramName: 'Decay',
                statusByte: 176,
                controlNumber: 15,
                scale: null,
            },
            {
                uiType: "Slider",
                paramName: 'Sustain',
                statusByte: 176,
                controlNumber: 16,
                scale: null,
            },
            {
                uiType: "Slider",
                paramName: 'Release',
                statusByte: 176,
                controlNumber: 16,
                scale: null,
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
                scale: null,
            }, 
            {
                uiType: "Slider",
                paramName: "Decay",
                statusByte: 176,
                controlNumber: 76,
                scale: null,
            },
            {
                uiType: "Slider",
                paramName: "Sustain",
                statusByte: 176,
                controlNumber: 77,
                scale: null,
            }, 
            {
                uiType: "Slider",
                paramName: "Release",
                statusByte: 176,
                controlNumber: 72,
                scale: null,
            }
        ],
    }
];

export default uiSectionsConfig;