function emitMidiMessage([statusByte, dataByte1, dataByte2]: number[]) {
    document.dispatchEvent(new CustomEvent(
        'midiMessage',
        { detail: { data: [statusByte, dataByte1, dataByte2] } }
    ));
}

export default emitMidiMessage;