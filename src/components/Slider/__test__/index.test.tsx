import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Slider from '../index';

const props = {
    paramName: 'Cutoff',
    statusByte: 176,
    controlNumber: 74,
    readout: vi.fn(),
}

describe('Slider Component', () => {
    beforeEach(() => {
        render(<Slider {...props} />);
    });

    test(`has a range input with the label ${props.paramName}`, () => {
        expect(screen.getByLabelText(`${props.paramName}`, { selector: 'input' })).toBeInTheDocument();
    });

    test('only allows the user to select integers between 0 and 127', async () => {
        const inputEl = screen.getByRole('slider'); 
        
        expect(inputEl.getAttribute('min')).toEqual('0');
        expect(inputEl.getAttribute('max')).toEqual('127');
        expect(inputEl.getAttribute('step')).toEqual('1');

        fireEvent.change(inputEl, { target: { value: "128" } });
        expect(inputEl).toHaveValue("127");

        fireEvent.change(inputEl, { target: { value: "-1" } });
        expect(inputEl).toHaveValue("0");
    });
});