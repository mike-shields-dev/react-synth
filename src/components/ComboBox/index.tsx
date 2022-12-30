import React, { useState } from 'react';
import isCustomEvent from '../../utils/isCustomEvent';
import emitMidiMessage from '../../utils/emitMidiMessage';
import mapRange from '../../utils/mapRange';
import useMidiMessageListener from '../../hooks/useMidiMessageListener';

interface Props { 
    paramName: string;
    statusByte: number;
    controlNumber: number;
    options: string[];
}

function ComboBox({
    paramName,
    statusByte,
    controlNumber,
    options
}: Props) {
    
    const [value, setValue] = useState(0);

    function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const { value } = e.target;
        
        setValue(+value);

        const controlValue = mapRange({
            value: +value,
            inRangeMin: 0,
            inRangeMax: options.length - 1,
            outRangeMin: 0,
            outRangeMax: 127
        })

        emitMidiMessage([statusByte, controlNumber, controlValue]);
    }

    useMidiMessageListener(onMidiMessage);

    function onMidiMessage(e: Event) {
        if (!isCustomEvent(e)) return;

        const [eStatusByte, eControlNumber, eControlValue] = e.detail.data;
        if (eStatusByte !== statusByte || eControlNumber !== controlNumber) return; 
        
        setValue(Math.floor(
            mapRange({
                value: +eControlValue,
                inRangeMin: 0, inRangeMax: 127,
                outRangeMin: 0, outRangeMax: options.length - 1
            }))
        );
    }

    return (<>
        <label htmlFor={paramName}>{paramName}</label>
        <select
            id={paramName}
            onChange={onChange}
            value={value}>
            {options.map((option, i) =>
                <option
                    key={`${paramName}:${option}`} 
                    value={i}>
                    {option}
                </option>
            )}
        </select>
    </>
    )
}

export default ComboBox;