import _isNumber from "lodash/isNumber";
import { TICK_X_SPACE, TICK_Y_SPACE } from '../defaults';
export default function getTickCount(props, key) {
  if (_isNumber(props[key + "TickCount"])) return props[key + "TickCount"];
  var range = props[key + "Range"],
      _tickSpace = props[key + "TickSpace"];

  if (key === 'y') {
    var xTickSpace = _tickSpace || TICK_Y_SPACE;
    return Math.ceil((range[0] - range[1]) / xTickSpace);
  }

  if (key === 'x') {
    var yTickSpace = _tickSpace || TICK_X_SPACE;
    return Math.ceil((range[1] - range[0]) / yTickSpace);
  }

  return 0;
}