import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import ParameterGroup from '../index';

const sliderProps = {
    groupName: "Filter", 
    parameters: [
        {
            uiType: "Slider", 
            paramName: 'Cutoff',
            statusByte: 176,
            controlNumber: 74,
            scale: null,
            options: [],
        },
    ]
};

const comboBoxProps = {
    groupName: "Oscillator", 
    parameters: [
        {
            uiType: "ComboBox", 
            paramName: 'Type',
            statusByte: 176,
            controlNumber: 21,
            scale: null,
            options: [],
        },
    ]
};

describe('ParameterGroup', () => {
    test('renders the name of the parameter group', () => {
        render(
            <ParameterGroup
                groupName={sliderProps.groupName}
                parameters={sliderProps.parameters}
            />
        );

        expect(screen.getByText(sliderProps.groupName)).toBeInTheDocument();
    });

    test('renders a range input when provided parameter uiType === "Slider"', async () => {
        render(
            <ParameterGroup
                groupName={sliderProps.groupName}
                parameters={sliderProps.parameters}
            />
        );

        console.log(screen.getByRole("slider"))

        expect(screen.getByRole("slider")).toBeInTheDocument();
        expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    })
    
    test('renders a select input when provided parameter uiType === "Slider"', async () => {
        render(
            <ParameterGroup
                groupName={comboBoxProps.groupName}
                parameters={comboBoxProps.parameters}
            />
        );

        expect(screen.getByRole("combobox")).toBeInTheDocument();
        expect(screen.queryByRole("slider")).not.toBeInTheDocument();
    })
})