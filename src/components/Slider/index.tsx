import React, { useState, useEffect } from "react"
import isCustomEvent from "../../utils/isCustomEvent";
import emitMidiMessage from "../../utils/emitMidiMessage";

interface Props { 
    paramName: string;
    statusByte: number;
    controlNumber: number;
    readout: Function;
}

function Slider(props: Props) { 
    const [sliderValue, setSliderValue] = useState(65);
    const [readout, setReadout] = useState(null);

    function onMidiMessage(e: Event) {
        if(!isCustomEvent(e)) return;

        const [statusByte, controlNumber, controlValue] = e.detail.data;
        if (+statusByte === props.statusByte && +controlNumber === props.controlNumber) setSliderValue(+controlValue);
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) { 
        const { value } = e.target;

        setSliderValue(+value);
        const [statusByte, dataByte1, dataByte2]
            = [props.statusByte, props.controlNumber, +value];
        
        setReadout(props.readout(+value));

        emitMidiMessage([statusByte, dataByte1, dataByte2]);
    }

    useEffect(() => {
        document.addEventListener('midiMessage', onMidiMessage);
        
        return () => {
            document.removeEventListener('midiMessage', onMidiMessage);
        };
    }, []);

    return (
        <>
            <label htmlFor={props.paramName}>{props.paramName}</label>
            <input 
                id={props.paramName} 
                max="127" 
                min="0" 
                onChange={onChange} 
                step="1" 
                type='range' 
                value={sliderValue}
            />
            <output>{readout}</output>
        </>
    )
}

export default Slider;