import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import PubSub from 'pubsub-js';
import { describe, expect, test, vi } from 'vitest';
import Keyboard from '.';

const midiMessageMock = vi.fn((topic: string, payload: any) => {
    console.log(payload)
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
    });

    afterAll(() => vi.clearAllMocks())
    
    describe('keys', () => {
        test('displays a button for each key in an octave', () => {
            const keys = screen.getAllByRole('button');
            expect(keys.length).toEqual(12);
        });
    
        test('mouseDown events on each key publish to the "midiMessage" topic with the correct payload to the document', () => {
            const keys: HTMLButtonElement[] = screen.getAllByRole('button');

            
            keys.forEach(async (key, i) => {
                const octave = 5;
                const statusByte = 144;
                const noteNumber = +key.value + (octave * 12);
                const velocity = 80;

                act(async () => {
                    await fireEvent.mouseDown(key)
                    console.log(i)
                });
                await waitFor(() => expect(midiMessageMock).toHaveBeenCalledTimes(1000000));
            });
        });

        // test('mouseUp events on each key dispatch a CustomEvent with the name "midiMessage" and the correct payload to the document', () => {
        //     const keys: HTMLButtonElement[] = screen.getAllByRole('button');
            
        //     keys.forEach((key, i) => {
        //         const octave = 5;
        //         const statusByte = 128;
        //         const noteNumber = +key.value + (octave * 12);
        //         const velocity = 0;

        //         fireEvent.mouseUp(key);
    
        //         // expect(midiMessageMock).toHaveBeenCalledTimes(i + 1);
        //         // expect(midiMessageMock).toHaveReturnedWith({
        //         //     type: 'midiMessage',
        //         //     data: [statusByte, noteNumber, velocity]
        //         // });
        //     });
        // });

        // test('mouseLeave events on each key dispatch a CustomEvent with the name "midiMessage" and the correct payload to the document', () => {
        //     const keys: HTMLButtonElement[] = screen.getAllByRole('button');
            
        //     keys.forEach((key, i) => {
        //         const octave = 5;
        //         const statusByte = 128;
        //         const noteNumber = +key.value + (octave * 12);
        //         const velocity = 0;

        //         fireEvent.mouseLeave(key);
    
        //         expect(midiMessageMock).toHaveBeenCalledTimes(i + 1);
        //         expect(midiMessageMock).toHaveReturnedWith({
        //             type: 'midiMessage',
        //             data: [statusByte, noteNumber, velocity]
        //         });
        //     });
        // });
    });
});