import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { MidiMessage, usePublish, useSubscribe } from '../../hooks/PubSub';
import css from './index.module.css';

interface SliderProps {
    uiType: string;
    paramName: string;
    statusByte: number;
    controlNumber: number;
    scale: (value: number) => number;
    initValue: number;
}

const uid = uuidv4();

function Slider(props: SliderProps) { 
    const [sliderValue, setSliderValue] = useState(props.initValue);
    const [readout, setReadout] = useState(0);

    useEffect(() => setReadout(Math.round(props.scale(+sliderValue) * 10) / 10), []);

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
        <div className={css.Slider}>
            <label className={css.Slider__label} htmlFor={props.paramName}>{props.paramName}</label>
            <input 
                className={css.Slider__input}
                id={props.paramName} 
                max="127" 
                min="0" 
                onChange={onChange} 
                step="0.001" 
                type='range' 
                value={sliderValue}
            />
            <output className={css.Slider__output} htmlFor={props.paramName} style={{ display: "inline-block", width: '5rem' }}>{readout}</output>
        </div>
    )
}

export { Slider };
export type { SliderProps };

