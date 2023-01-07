import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MidiMessage, usePublish, useSubscribe } from '../../hooks/PubSub';
import css from './index.module.css';
import ArrowIcon from '../ArrowIcon';

interface NoteState {
    isActive: boolean;
}    


const uid = uuidv4();

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

const numMajorKeys = keys.reduce((count, current) => current.className === "MajorKey" ? count + 1 : count, 0);
const keyWidth = 100 / numMajorKeys;

function Keyboard() {
    const keyboardRef = useRef<HTMLDivElement>(null);
    const [octave, setOctave] = useState(5);
    const [activeNotes, setActiveNotes] = useState<NoteState[]>(Array(128).fill({ isActive: false }));
    const [isLeftArrowActive, setLeftArrowActive] = useState(false);
    const [isRightArrowActive, setRightArrowActive] = useState(false);

    useEffect(() => {        
        if (!keyboardRef.current) return;

        keyboardRef.current.style.setProperty(
            "--key-width",
            `${keyWidth}%`
        );
    }, []);

    useEffect(() => {
        const notesBelowKeyboardRange = activeNotes.slice(0, octave * 12);
        const notesAboveKeyboardRange = activeNotes.slice(keys.length + 1 + octave * 12);

        setLeftArrowActive(notesBelowKeyboardRange.some(note => note.isActive));
        setRightArrowActive(notesAboveKeyboardRange.some(note => note.isActive));

    }, [activeNotes, octave])

    function updateActiveNotes(statusByte: number, noteNumber: number) {
        let isActive = false;

        if (+statusByte === 144) isActive = true;
        if (+statusByte === 128) isActive = false;
        
        setActiveNotes(activeNotes => {
            const newActiveNotes = [...activeNotes];
            newActiveNotes[noteNumber] = { isActive };

            return newActiveNotes;
        })
    }

    useSubscribe('midiMessage', onMidiMessage);
    
    function onMidiMessage(_topic: PubSubJS.Message, payload: MidiMessage) {
        if (payload.uid === uid) return;

        const [statusByte, dataByte1] = payload.data;
        if (![128, 144].includes(+statusByte)) return;

        const noteNumber = +dataByte1;

        updateActiveNotes(statusByte, noteNumber);
    }

    function onNote(e: React.MouseEvent) {        
        const { value } = (e.target as HTMLButtonElement);
        const noteNumber = +value + octave * 12;
        
        if (noteNumber < 0 || noteNumber > 127) return;

        let statusByte = -1;
        let velocity = -1;

        if (e.type === 'mousedown') {
            statusByte = 144;
            velocity = 80;
        };

        if (e.type === 'mouseup' || e.type === 'mouseleave') {
            statusByte = 128;
            velocity = 0;
        };

        const [dataByte1, dataByte2] = [noteNumber, velocity];
         
        usePublish('midiMessage', {
            uid,
            data: [statusByte, dataByte1, dataByte2]
        });

        updateActiveNotes(statusByte, noteNumber);
    };

    return (
        <div className={css.Keyboard}>
                <ArrowIcon
                    size="1rem"
                    fillColors={["#ff8000", "#9e9e9e"]}
                    isFlipped={true}
                    isActive={isLeftArrowActive}
                /> 
            
            <div className={css.Keyboard__keys} ref={keyboardRef}>
                {keys.map(key => {
                    const isActive = activeNotes[+key.value + octave * 12].isActive
                    
                    return (
                        <button
                            name="key"
                            key={`key${key.name}`}
                            className={css[`${key.className}${isActive ? '--active' : ''}`]}
                            onMouseDown={onNote}
                            onMouseLeave={onNote}
                            onMouseUp={onNote}
                            style={{ left: `${keyWidth * key.leftOffset}%` }}
                            value={key.value}
                        />
                    )
                })}
            </div>
            
            <ArrowIcon
                size="1rem"
                fillColors={["#ff8000", "#9e9e9e"]}
                isFlipped={false}
                isActive={isRightArrowActive}
            /> 
        </div>
    )
}

export default Keyboard;