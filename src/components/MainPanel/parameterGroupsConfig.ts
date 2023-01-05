import controlValueToFrequency from '../../utils/controlValueToFrequency';
import controlValueToResonance from '../../utils/controlValueToResonance';

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
                scale: controlValueToFrequency,
            },
            {
                uiType: "Slider",
                paramName: 'Resonance',
                statusByte: 176,
                controlNumber: 71,
                scale: controlValueToResonance
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
    }
];

export default uiSectionsConfig;