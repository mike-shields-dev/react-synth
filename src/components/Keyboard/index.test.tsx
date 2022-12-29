import { describe, test, expect, vi} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Keyboard from '.';

let midiMessageMock = vi.fn((e: CustomEvent) => {
    return { type: e.type, data: e.detail.data };
});

document.addEventListener('midiMessage', midiMessageMock);

describe('Keyboard', () => {
    beforeEach(() => render(<Keyboard />));
    afterEach(() => vi.clearAllMocks());
    
    describe('keys', () => {
        test('displays a button for each key in an octave', () => {
            const keys = screen.getAllByRole('button');
    
            expect(keys.length).toEqual(12);
        });
    
        test('mouseDown events on each key dispatch a CustomEvent with the name "midiMessage" and the correct payload to the document', () => {
            const keys: HTMLButtonElement[] = screen.getAllByRole('button');
            
            keys.forEach((key, i) => {
                const octave = 5;
                const noteNumber = +key.value + (octave * 12);
                const statusByte = 144;
                const velocity = 80;

                fireEvent.mouseDown(key);
    
                expect(midiMessageMock).toHaveBeenCalledTimes(i + 1);
                expect(midiMessageMock).toHaveBeenCalledWith(new CustomEvent(''));
                expect(midiMessageMock).toHaveReturnedWith({
                    type: 'midiMessage',
                    data: [statusByte, noteNumber, velocity]
                });
            });
        });

        test('mouseUp events on each key dispatch a CustomEvent with the name "midiMessage" and the correct payload to the document', () => {
            const keys: HTMLButtonElement[] = screen.getAllByRole('button');
            
            keys.forEach((key, i) => {
                const octave = 5;
                const statusByte = 128;
                const noteNumber = +key.value + (octave * 12);
                const velocity = 0;

                fireEvent.mouseUp(key);
    
                expect(midiMessageMock).toHaveBeenCalledTimes(i + 1);
                expect(midiMessageMock).toHaveBeenCalledWith(new CustomEvent(''));
                expect(midiMessageMock).toHaveReturnedWith({
                    type: 'midiMessage',
                    data: [statusByte, noteNumber, velocity]
                });
            });
        });

        test('mouseLeave events on each key dispatch a CustomEvent with the name "midiMessage" and the correct payload to the document', () => {
            const keys: HTMLButtonElement[] = screen.getAllByRole('button');
            
            keys.forEach((key, i) => {
                const octave = 5;
                const statusByte = 128;
                const noteNumber = +key.value + (octave * 12);
                const velocity = 0;

                fireEvent.mouseLeave(key);
    
                expect(midiMessageMock).toHaveBeenCalledTimes(i + 1);
                expect(midiMessageMock).toHaveBeenCalledWith(new CustomEvent(''));
                expect(midiMessageMock).toHaveReturnedWith({
                    type: 'midiMessage',
                    data: [statusByte, noteNumber, velocity]
                });
            });
        });
    });
});