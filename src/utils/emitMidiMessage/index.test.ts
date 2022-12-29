import { describe, test, expect, vi } from 'vitest';
import emitMidiMessage from '.';

let midiMessageMock = vi.fn((e: CustomEvent) => {
    return { type: e.type, data: e.detail.data };
});
document.addEventListener('midiMessage', midiMessageMock);

describe('emitMidiMessage', () => {
    afterAll(() => document.removeEventListener('midiMessage', midiMessageMock));

    test('emits a CustomEvent with the name "midiMessage"', () => {
        const data = [1, 2, 3]
        emitMidiMessage(data);

        expect(midiMessageMock).toHaveBeenCalledTimes(1);
        expect(midiMessageMock).toHaveBeenCalledWith(new CustomEvent(''));
        expect(midiMessageMock).toHaveReturnedWith({
            type: 'midiMessage',
            data,
        });
    });
});