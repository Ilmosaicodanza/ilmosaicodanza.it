import _isNaN from "lodash/isNaN";
export default function isDatum(value) {
  return value != null && !_isNaN(value);
}