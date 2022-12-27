function midiNoteNumberToNoteFrequency(noteNumber: number, precision: number) { 
    return Math.round(
        ((440 * Math.pow(2, (noteNumber - 69) / 12))
            + Number.EPSILON)
        * precision
    )
    / precision;
}

export default midiNoteNumberToNoteFrequency;