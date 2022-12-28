interface Params {
    value: number;
    inRangeMin: number;
    inRangeMax: number;
    outRangeMin: number;
    outRangeMax: number;
}

function mapRange({ value, inRangeMin, inRangeMax, outRangeMin, outRangeMax }: Params) {
    return (value - inRangeMin) * (outRangeMax - outRangeMin) / (inRangeMax - inRangeMin) + outRangeMin;
}

export default mapRange;