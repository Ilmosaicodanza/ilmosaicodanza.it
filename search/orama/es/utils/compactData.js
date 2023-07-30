import _filter from "lodash/filter";
import isDatum from './isDatum'; // same as _.compact, but keep the zeros, they are important for dataVis

export default function compactData(array) {
  return _filter(array, isDatum);
}