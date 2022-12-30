import React, { useState } from "react"
import isCustomEvent from "../../utils/isCustomEvent";
import emitMidiMessage from "../../utils/emitMidiMessage";
import useMidiMessageListener from "../../hooks/useMidiMessageListener";


interface Props { 
    paramName: string;
    statusByte: number;
    controlNumber: number;
    readout: ({ value, precision }: readoutArgs) => number;
}
interface readoutArgs {
    value: number;
    precision: number;
}

function Slider(props: Props) { 
    const [sliderValue, setSliderValue] = useState(65);
    const [readout, setReadout] = useState(0);

    function onMidiMessage(e: Event) {
        if(!isCustomEvent(e)) return;

        const [statusByte, controlNumber, controlValue] = e.detail.data;
        if (+statusByte !== props.statusByte || +controlNumber !== props.controlNumber) return;
        
        setSliderValue(+controlValue);
        setReadout(props.readout({ value: +controlValue, precision: 1}));
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value: controlValue } = e.target;

        setSliderValue(+controlValue);

        const [statusByte, dataByte1, dataByte2]
            = [props.statusByte, props.controlNumber, +controlValue];
        
        setReadout(props.readout({value: +controlValue, precision: 1}));
        emitMidiMessage([statusByte, dataByte1, dataByte2]);
    }

    useMidiMessageListener(onMidiMessage);

    return (
        <>
            <label htmlFor={props.paramName}>{props.paramName}</label>
            <input 
                id={props.paramName} 
                max="127" 
                min="0" 
                onChange={onChange} 
                step="0.001" 
                type='range' 
                value={sliderValue}
            />
            <output htmlFor={props.paramName} style={{ display: "inline-block", width: '5rem' }}>{readout}</output>
        </>
    )
}

export default Slider;