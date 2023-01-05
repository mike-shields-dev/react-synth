import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import PubSub from 'pubsub-js';
import { describe, expect, test, vi } from 'vitest';
import Keyboard from '.';

const midiMessageMock = vi.fn((topic: string, payload: any) => {
    return { topic, payload };
});

let subscription = PubSub.subscribe('midiMessage', midiMessageMock)

describe('Keyboard', () => {
    beforeEach(() => {
        render(<Keyboard />)
        subscription = PubSub.subscribe('midiMessage', midiMessageMock)
    });
    afterEach(() => {
        PubSub.unsubscribe(subscription)
        vi.restoreAllMocks();
    });

    afterAll(() => vi.clearAllMocks())
    
    describe('keys', () => {
        test('displays a button for each key in an octave', () => {
            const keys = screen.getAllByRole('button');
            expect(keys.length).toEqual(12);
        });
    
        test('mouseDown events on each key publish to the "midiMessage" topic with the correct payload to the document', async () => {
            const keys: HTMLButtonElement[] = screen.getAllByRole('button');

            
            keys.forEach(async (key, i) => {
                const octave = 5;
                const statusByte = 144;
                const noteNumber = +key.value + (octave * 12);
                const velocity = 80;

                await act(() => fireEvent.mouseDown(key));
            });

           await waitFor(() => expect(midiMessageMock).toHaveBeenCalledTimes(24));
        });

        test('mouseUp events on each key dispatch a CustomEvent with the name "midiMessage" and the correct payload to the document', async () => {
            const keys: HTMLButtonElement[] = screen.getAllByRole('button');
            
            keys.forEach((key, i) => {
                const octave = 5;
                const statusByte = 128;
                const noteNumber = +key.value + (octave * 12);
                const velocity = 0;

                fireEvent.mouseUp(key);
            });

            await waitFor(() => expect(midiMessageMock).toHaveBeenCalledTimes(24));
        });

        test('mouseLeave events on each key dispatch a CustomEvent with the name "midiMessage" and the correct payload to the document', async () => {
            const keys: HTMLButtonElement[] = screen.getAllByRole('button');
            
            keys.forEach((key, i) => {
                const octave = 5;
                const statusByte = 128;
                const noteNumber = +key.value + (octave * 12);
                const velocity = 0;

                fireEvent.mouseLeave(key);
            });

            await waitFor(() => expect(midiMessageMock).toHaveBeenCalledTimes(24));
        });
    });
});