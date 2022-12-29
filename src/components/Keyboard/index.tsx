import React, { useEffect, useRef, useState } from 'react';
import emitMidiMessage from '../../utils/emitMidiMessage';
import isCustomEvent from '../../utils/isCustomEvent';
import css from './style.module.css';

const keyboardWidth = 100;
const numMajorKeys = 7;
const keyWidth = keyboardWidth / numMajorKeys;

const keys = [
    { name: 'C', leftOffset: 0, value: 0, className: "MajorKey" },
    { name: 'D', leftOffset: 1, value: 2, className: "MajorKey" },
    { name: 'E', leftOffset: 2, value: 4, className: "MajorKey" },
    { name: 'F', leftOffset: 3, value: 5, className: "MajorKey" },
    { name: 'G', leftOffset: 4, value: 7, className: "MajorKey" },
    { name: 'A', leftOffset: 5, value: 9, className: "MajorKey" },
    { name: 'B', leftOffset: 6, value: 11, className: "MajorKey" },
    { name: 'Db', leftOffset: 0.75, value: 1, className: "MinorKey" },
    { name: 'Eb', leftOffset: 1.75, value: 3, className: "MinorKey" },
    { name: 'Gb', leftOffset: 3.75, value: 6, className: "MinorKey" },
    { name: 'Ab', leftOffset: 4.75, value: 8, className: "MinorKey" },
    { name: 'Bb', leftOffset: 5.75, value: 10, className: "MinorKey" },
  ];

function Keyboard() {
    const keyboardRef = useRef<HTMLDivElement>(null);
    const [octave, setOctave] = useState(5);
    
    useEffect(() => {        
        if (!keyboardRef.current) return;

        keyboardRef.current.style.setProperty(
            "--key-width",
            `calc(${keyboardWidth}% / ${numMajorKeys})`
        );

        document.addEventListener('midiMessage', onMidiMessage);

        return () =>
        document.removeEventListener('midiMessage', onMidiMessage);
    }, []);

    function onMidiMessage(e: CustomEvent) {
        if (!isCustomEvent(e)) return;
        // get the currently active note 
        // and use it to display which key is active
        // console.log(e.detail.data);
    }

    function onNote(e: React.MouseEvent) {
        const { value } = (e.target as HTMLButtonElement);
        const noteNumber = +value + octave * 12;
        if (noteNumber < 0 || noteNumber > 127) return;

        let statusByte = 0;

        if (e.type === 'mousedown') statusByte = 144;
        if (e.type === 'mouseup' || e.type === 'mouseleave') statusByte = 128;
 
        if (statusByte === 144) emitMidiMessage([statusByte, noteNumber, 80]);
        if (statusByte === 128) emitMidiMessage([statusByte, noteNumber, 0]);
    };

    return (
        <>
            <div className={css.Keyboard} ref={keyboardRef}>
                {keys.map(key =>
                    <button
                        name="key"
                        key={`key${key.name}`}
                        className={`${css[key.className]}`}
                        value={key.value}
                        onMouseDown={onNote}
                        onMouseLeave={onNote}
                        onMouseUp={onNote}
                        style={{ left: `${keyWidth * key.leftOffset}%` }}
                    />
                )}
            </div>
        </>
    )
}

export default Keyboard;