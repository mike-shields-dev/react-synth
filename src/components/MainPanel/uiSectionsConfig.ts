import controlValueToFrequency from '../../utils/controlValueToFrequency';
import controlValueToResonance from '../../utils/controlValueToResonance';

const uiSectionsConfig = [
    { 
        statusByte: 176,
        name: "Filter", 
        parameters: [
            {
                uiType: "Slider", 
                name: 'Cutoff',
                controlNumber: 74,
                convert: controlValueToFrequency,
            },
            {
                uiType: "Slider",
                name: 'Resonance',
                controlNumber: 71,
                convert: controlValueToResonance
            },
            {
                uiType: "Slider",
                name: 'Attack',
                controlNumber: 14,
                convert: controlValueToResonance
            },
            {
                uiType: "Slider",
                name: 'Decay',
                controlNumber: 15,
                convert: controlValueToResonance
            },
            {
                uiType: "Slider",
                name: 'Sustain',
                controlNumber: 16,
                convert: controlValueToResonance
            },
            {
                uiType: "Slider",
                name: 'Release',
                controlNumber: 16,
                convert: controlValueToResonance
            },
        ]
    },
];

export default uiSectionsConfig;