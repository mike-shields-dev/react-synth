import controlValueToFrequency from '../../utils/controlValueToFrequency';
import controlValueToResonance from '../../utils/controlValueToResonance';

const uiSectionsConfig = [
    { 
        groupName: "Filter", 
        parameters: [
            {
                uiType: "Slider", 
                paramName: 'Cutoff',
                statusByte: 176,
                controlNumber: 74,
                convert: controlValueToFrequency,
            },
            {
                uiType: "Slider",
                paramName: 'Resonance',
                statusByte: 176,
                controlNumber: 71,
                convert: controlValueToResonance
            },
            {
                uiType: "Slider",
                paramName: 'Attack',
                statusByte: 176,
                controlNumber: 14,
                convert: null,
            },
            {
                uiType: "Slider",
                paramName: 'Decay',
                statusByte: 176,
                controlNumber: 15,
                convert: null,
            },
            {
                uiType: "Slider",
                paramName: 'Sustain',
                statusByte: 176,
                controlNumber: 16,
                convert: null,
            },
            {
                uiType: "Slider",
                paramName: 'Release',
                statusByte: 176,
                controlNumber: 16,
                convert: null,
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
                convert: null,
            }
        ],
    }
];

export default uiSectionsConfig;