import { scalePow } from "d3-scale";

const toFilterFreq = scalePow().exponent(4).domain([0, 127]).range([20, 20000]);
 
const toFilterQ = scalePow().exponent(1).domain([0, 127]).range([0, 24])
  
export { toFilterFreq, toFilterQ };