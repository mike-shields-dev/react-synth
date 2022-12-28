import Slider from '../Slider';
import React from 'react';
import controlValueToFrequency from '../../utils/controlValueToFrequency';
import controlValueToResonance from '../../utils/controlValueToResonance';

const statusByte = 176
const params = [
    {
        name: 'Cutoff',
        controlNumber: 74,
        readout: controlValueToFrequency
    },
    {
        name: 'Resonance',
        controlNumber: 71,
        readout: controlValueToResonance
    },
];

function FilterControls() {
    return (<>
        {params.map(param => 
            <Slider
                key={`filter${param.name}`}
                paramName={param.name}
                statusByte={statusByte}
                controlNumber={param.controlNumber}
                readout={param.readout}
            />
        )}
    </>)
}

export default FilterControls;