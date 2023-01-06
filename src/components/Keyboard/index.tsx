import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { usePublish, useSubscribe, MidiMessage } from '../../hooks/PubSub';
import css from './style.module.css';

const uid = uuidv4();

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
    const [activeNotes, setActiveNotes] = useState(Array(128).fill({ isActive: false }));

    useEffect(() => {        
        if (!keyboardRef.current) return;

        keyboardRef.current.style.setProperty(
            "--key-width",
            `calc(${keyboardWidth}% / ${numMajorKeys})`
        );
    }, []);

    useSubscribe('midiMessage', onMidiMessage);
    
    function onMidiMessage(_topic: PubSubJS.Message, payload: MidiMessage) {
        if (payload.uid === uid) return;

        const [statusByte, dataByte1] = payload.data;
        if (![128, 144].includes(+statusByte)) return;

        const noteNumber = +dataByte1;
        let isActive: boolean = false;

        if (+statusByte === 144) isActive = true;
        if (+statusByte === 128) isActive = false;
        
        setActiveNotes(activeNotes => {
            const newActiveNotes = [...activeNotes];
            newActiveNotes[noteNumber] = { isActive };

            return newActiveNotes;
        })
    }

    function onNote(e: React.MouseEvent) {        
        const { value } = (e.target as HTMLButtonElement);
        const noteNumber = +value + octave * 12;
        
        if (noteNumber < 0 || noteNumber > 127) return;

        let statusByte = -1;

        if (e.type === 'mousedown') statusByte = 144;
        if (e.type === 'mouseup' || e.type === 'mouseleave') statusByte = 128;
 
        if (statusByte === 144) usePublish('midiMessage', {
            uid,
            data: [statusByte, noteNumber, 80]
        });
        
        if (statusByte === 128) usePublish('midiMessage', {
            uid,
            data: [statusByte, noteNumber, 0]
        });
    };

    return (
        <>
            <div className={css.Keyboard} ref={keyboardRef}>
                {keys.map(key =>
                    <button
                        name="key"
                        key={`key${key.name}`}
                        className={`${activeNotes[+key.value + octave * 12].isActive
                            ? css[`${key.className}--active`]
                            : css[key.className]
                        }`}
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