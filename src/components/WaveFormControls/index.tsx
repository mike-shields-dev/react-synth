import React from 'react';
import synth from '../../synthInstance';
import ComboBox from "../ComboBox";
import { OmniOscillatorType } from 'tone/build/esm/source/oscillator/OscillatorInterface';

const statusByte = 176;
const paramName = 'Type';
const controlNumber = 21;
const options: OmniOscillatorType[] = synth.oscTypes;

function WaveformControls() {
    return (
        <ComboBox
            paramName={paramName}
            options={options}
            statusByte={statusByte}
            controlNumber={controlNumber}
        />
    );
}

export default WaveformControls;