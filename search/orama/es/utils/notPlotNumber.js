import _isNumber from "lodash/isNumber";
import _isNaN from "lodash/isNaN";

var checkNotPlotNumber = function checkNotPlotNumber(value) {
  return _isNaN(value) || !_isNumber(value);
};

export default function notPlotNumber(value) {
  return Array.isArray(value) ? value.some(checkNotPlotNumber) : checkNotPlotNumber(value);
}