import controlValueToFrequency from '../../utils/controlValueToFrequency';
import controlValueToResonance from '../../utils/controlValueToResonance';
import ComboBox from '../ComboBox';
import Slider from '../Slider';

const statusByte = 176
const params = [
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
];

function FilterControls() {
    return (<>
        {params.map(param => {
            if (param.uiType === "Slider") return (
                <Slider
                    key={`filter${param.name}`}
                    paramName={param.name}
                    statusByte={statusByte}
                    controlNumber={param.controlNumber}
                    convert={param.convert}
                />
            )
            if (param.uiType === "ComboBox") return (
                <ComboBox
                    key={`filter${param.name}`}
                    controlNumber={param.controlNumber}
                    paramName={param.name}
                    statusByte={statusByte}
                    options={["lowpass", "bandpass", "highpass"]}
                />
            )
        }
        )}
    </>)
}

export default FilterControls;