function mapMidiCCToResonance({ value = 0, precision = 1 }) {
    if (value < 0) value = 0;
    if (value > 127) value = 127;

    const max = 25
    
    return Math.floor((value / 127 * max) * precision) / precision;
}

export default mapMidiCCToResonance;