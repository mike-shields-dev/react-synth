import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import ParameterGroup from '../index';

describe('FilterControls', () => { 
    beforeEach(() => {
        render(<ParameterGroup />);
    });
    test('has a range input with the name cutoff', () => {
        expect(screen.getByLabelText(/cutoff/i, { selector: 'input' })).toBeInTheDocument();
    });
})