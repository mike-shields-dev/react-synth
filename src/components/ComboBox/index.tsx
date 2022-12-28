import React, { useEffect, useState } from 'react';
import isCustomEvent from '../../utils/isCustomEvent';
import emitMidiMessage from '../../utils/emitMidiMessage';
import mapRange from '../../utils/mapRange';

interface Props { 
    paramName: string;
    statusByte: number;
    controlNumber: number;
    options: string[];
}

function ComboBox(props: Props) {
    const [value, setValue] = useState(0);

    function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const { value } = e.target;
        
        setValue(+value);

        const controlValue = 
            mapRange({
                value: +value,
                inRangeMin: 0, inRangeMax: props.options.length - 1,
                outRangeMin: 0, outRangeMax: 127
            })

        const [statusByte, dataByte1, dataByte2] =
            [props.statusByte, props.controlNumber, +controlValue]

        emitMidiMessage([statusByte, dataByte1, dataByte2]);
    }

    useEffect(() => {
        document.addEventListener('midiMessage', onMidiMessage);
    }, []);

    function onMidiMessage(e: Event) {
        if (!isCustomEvent(e)) return;

        const [statusByte, controlNumber, controlValue] = e.detail.data;
        if (statusByte !== props.statusByte || controlNumber !== props.controlNumber) return; 
        
        setValue(Math.floor(
            mapRange({
                value: +controlValue,
                inRangeMin: 0, inRangeMax: 127,
                outRangeMin: 0, outRangeMax: props.options.length - 1
            }))
        );
    }

    return (<>
        <label htmlFor={props.paramName}>{props.paramName}</label>
        <select id={props.paramName} onChange={onChange} value={value}>
            {props.options.map((option, i) =>
                <option key={`${props.paramName}:${option}`} value={i}>
                    {option}
                </option>
            )}
        </select>
    </>
    )
}

export default ComboBox;