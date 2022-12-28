import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FilterControls from '../index';

describe('FilterControls', () => { 
    beforeEach(() => {
        render(<FilterControls />);
    });
    test('has a range input with the name cutoff', () => {
        expect(screen.getByLabelText(/cutoff/i, { selector: 'input' })).toBeInTheDocument();
    });
})