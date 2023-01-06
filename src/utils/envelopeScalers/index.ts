import { scaleLinear, scalePow } from 'd3-scale';

const toEnvelopeAttack = scalePow().exponent(2).domain([0, 127]).range([0, 2]);

const toEnvelopeDecay = scaleLinear().domain([0, 127]).range([0, 2]);

const toEnvelopeSustain = scaleLinear().domain([0, 127]).range([0, 1]);

const toEnvelopeRelease = scaleLinear().domain([0, 127]).range([0.0001, 5]);

const toEnvelopeAmount = scaleLinear().domain([0, 127]).range([0, 10]);

export {
    toEnvelopeAttack,
    toEnvelopeDecay,
    toEnvelopeSustain,
    toEnvelopeRelease, 
    toEnvelopeAmount,
};