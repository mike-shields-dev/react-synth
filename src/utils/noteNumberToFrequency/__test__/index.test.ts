import midiNoteNumberToNoteFrequency from '..';

// Frequency values with assumed precision factor of 100
const precision = 100;

const testData = [
    { noteNumber: 127, frequency: 12543.85 }, 
    { noteNumber: 95, frequency: 1975.53 }, 
    { noteNumber: 63, frequency: 311.13 }, 
    { noteNumber: 31, frequency: 49.00 }, 
    { noteNumber: 0, frequency: 8.18 }, 
];

describe('midiNoteNumberToNoteFrequency', () => {
    test('returns the correct note frequency for the given midiNoteNumber', () => {
        testData.forEach(dataPoint => {
            expect(midiNoteNumberToNoteFrequency(dataPoint.noteNumber, precision)).toEqual(dataPoint.frequency);
        });
    });
});