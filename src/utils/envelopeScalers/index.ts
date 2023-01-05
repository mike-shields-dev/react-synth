import { scaleLinear } from 'd3-scale';

const toEnvelopeAttack = scaleLinear().domain([0, 127]).range([0, 2]);

const toEnvelopeDecay = scaleLinear().domain([0, 127]).range([0, 2]);

const toEnvelopeSustain = scaleLinear().domain([0, 127]).range([0, 1]);

const toEnvelopeRelease = scaleLinear().domain([0, 127]).range([0, 5]);

export {
    toEnvelopeAttack,
    toEnvelopeDecay,
    toEnvelopeSustain,
    toEnvelopeRelease
};