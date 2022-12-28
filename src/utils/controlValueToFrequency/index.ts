function midiControlChangeToFrequency(value: number) {
    const minFrequency = 4;
    const maxFrequency = 20000;

    if (value < 0) value = 0;
    if (value > 127) value = 127;

    let logValue = Math.log(value + 1) / Math.log(128);
    
    return ~~Math.exp(logValue * Math.log(maxFrequency - minFrequency)) + minFrequency;
}
  
  
export default midiControlChangeToFrequency;