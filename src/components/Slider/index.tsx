import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { MidiMessage, usePublish, useSubscribe } from '../../hooks/PubSub';

interface SliderProps {
    uiType: string;
    paramName: string;
    statusByte: number;
    controlNumber: number;
    scale: (value: number) => number;
}

interface readoutArgs {
    value: number;
    precision: number;
}

const uid = uuidv4();

function Slider(props: SliderProps) { 
    const [sliderValue, setSliderValue] = useState(65);
    const [readout, setReadout] = useState(0);

    useSubscribe('midiMessage', onMidiMessage);

    function onMidiMessage(_topic: PubSubJS.Message, payload: MidiMessage) {
        if (payload.uid === uid) return;
        
        const [statusByte, controlNumber, controlValue] = payload.data;
        if (+statusByte !== props.statusByte || +controlNumber !== props.controlNumber) return;
        
        setSliderValue(+controlValue);
        setReadout(props.scale(+controlValue));
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement | undefined>) {
        const { value: controlValue } = e.target;

        setSliderValue(+controlValue);

        const [statusByte, dataByte1, dataByte2]
            = [props.statusByte, props.controlNumber, +controlValue];
        
        setReadout(Math.round(props.scale(+controlValue) * 10) / 10);
        
        usePublish('midiMessage', {
            uid,
            data: [statusByte, dataByte1, dataByte2]
        });
    }

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

export { Slider };
export type { SliderProps };

