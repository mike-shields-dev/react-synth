function mapMidiCCToResonance(value: number): number {
    if (value < 0) value = 0;
    if (value > 127) value = 127;
    
    return value / 127 * 30;
}

export default mapMidiCCToResonance;