function midiControlChangeToFrequency({ value = 127, precision = 1 }) {
    const minFrequency = 19;
    const maxFrequency = 20000;

    if (value < 0) value = 0;
    if (value > 127) value = 127;

    let logValue = Math.log(value + 1) / Math.log(128);
    
    const frequency = Math.exp(logValue * Math.log(maxFrequency - minFrequency)) + minFrequency;

    return Math.round(frequency * precision) / precision;
}
  
  
export default midiControlChangeToFrequency;