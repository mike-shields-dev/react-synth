import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MidiMessage, usePublish, useSubscribe } from '../../hooks/PubSub';
import mapRange from '../../utils/mapRange';

interface ComboBoxProps {
    uiType: string;
    paramName: string;
    statusByte: number;
    controlNumber: number;
    options: string[];
    scale: any;
    initValue: number;
}

const uid = uuidv4();

function ComboBox(props: ComboBoxProps) {
    const [value, setValue] = useState(props.initValue);

    useSubscribe('midiMessage', onMidiMessage);

    function onMidiMessage(_topic: PubSubJS.Message, payload: MidiMessage) {
        if (payload.uid === uid) return;

        const [statusByte, dataByte1, dataByte2] = payload.data;
        
        if (statusByte !== props.statusByte) return;
        if (dataByte1 !== props.controlNumber) return; 
        
        setValue(Math.floor(
            mapRange({
                value: +dataByte2,
                inRangeMin: 0, inRangeMax: 127,
                outRangeMin: 0, outRangeMax: props.options.length - 1
            }))
        );
    }

    function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const { value } = e.target;
        
        setValue(+value);

        const controlValue = mapRange({
            value: +value,
            inRangeMin: 0,
            inRangeMax: props.options.length - 1,
            outRangeMin: 0,
            outRangeMax: 127
        });

        usePublish('midiMessage', {
            uid,
            data: [props.statusByte, props.controlNumber, controlValue]
        });
    }

    return (<>
        <label htmlFor={props.paramName}>{props.paramName}</label>
        <select
            id={props.paramName}
            onChange={onChange}
            value={value}>
            {props.options.map((option, i) =>
                <option
                    key={`${props.paramName}:${option}`} 
                    value={i}>
                        {option}
                </option>
            )}
        </select>
    </>
    )
}

export { ComboBox };
export type { ComboBoxProps };
